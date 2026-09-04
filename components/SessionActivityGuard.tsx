"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/client";

const IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const ACTIVITY_THROTTLE_MS = 5 * 1000;
const LAST_ACTIVITY_KEY = "accountLastActivity";

function getLastActivity() {
  const value = localStorage.getItem(LAST_ACTIVITY_KEY);
  const timestamp = value ? Number(value) : Number.NaN;
  return Number.isFinite(timestamp) ? timestamp : undefined;
}

export default function SessionActivityGuard({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const supabase = createClient();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let lastRecordedActivity = 0;
    let isActive = true;

    const clearTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = undefined;
    };

    const signOutForInactivity = async () => {
      clearTimer();
      localStorage.removeItem(LAST_ACTIVITY_KEY);
      await supabase.auth.signOut();
      if (isActive) router.replace("/cuenta?expired=1");
    };

    const scheduleTimeout = () => {
      clearTimer();
      const lastActivity = getLastActivity() ?? Date.now();
      const remaining = IDLE_TIMEOUT_MS - (Date.now() - lastActivity);
      timeoutId = setTimeout(
        () => void signOutForInactivity(),
        Math.max(0, remaining),
      );
    };

    const recordActivity = (force = false) => {
      const now = Date.now();
      if (!force && now - lastRecordedActivity < ACTIVITY_THROTTLE_MS) return;
      lastRecordedActivity = now;
      localStorage.setItem(LAST_ACTIVITY_KEY, String(now));
      scheduleTimeout();
    };
    const handleActivity = () => recordActivity();

    const initialize = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const lastActivity = getLastActivity();
      if (lastActivity && Date.now() - lastActivity >= IDLE_TIMEOUT_MS) {
        await signOutForInactivity();
        return;
      }
      recordActivity(true);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) recordActivity(true);
        else clearTimer();
      },
    );
    const events: Array<keyof WindowEventMap> = [
      "pointerdown",
      "keydown",
      "scroll",
      "touchstart",
    ];
    events.forEach((eventName) =>
      window.addEventListener(eventName, handleActivity, { passive: true }),
    );
    void initialize();

    return () => {
      isActive = false;
      clearTimer();
      authListener.subscription.unsubscribe();
      events.forEach((eventName) =>
        window.removeEventListener(eventName, handleActivity),
      );
    };
  }, [router]);

  return children;
}
