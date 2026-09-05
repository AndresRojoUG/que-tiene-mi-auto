"use client";

import { useMemo, useState } from "react";
import type { Fuse } from "@/data/technical/fuses";
import { useLanguage } from "@/components/LanguageProvider";

type PositionedFuse = Fuse & { position: NonNullable<Fuse["position"]> };

export default function InteractiveFusePanel({ fuses }: { fuses: PositionedFuse[] }) {
  const { locale } = useLanguage();
  const isEnglish = locale === "en";
  const [selectedNumber, setSelectedNumber] = useState<string | number>(fuses[0]?.number);
  const selectedFuse = fuses.find((fuse) => fuse.number === selectedNumber) ?? fuses[0];
  const columns = useMemo(
    () => Math.max(...fuses.map((fuse) => fuse.position.column), 1),
    [fuses],
  );

  return (
    <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-sky-300">{isEnglish ? "Interactive diagram" : "Diagrama interactivo"}</p>
          <h2 className="mt-1 text-2xl font-bold">{isEnglish ? "Fuse box" : "Caja de fusibles"}</h2>
        </div>
        <p className="text-sm text-slate-400">{isEnglish ? "Select a position to view it." : "Toca una posición para consultarla."}</p>
      </div>

      <div
        className="mt-6 grid gap-2 rounded-2xl border border-slate-700 bg-slate-950 p-4"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        aria-label={isEnglish ? "Fuse diagram" : "Diagrama de fusibles"}
      >
        {fuses.map((fuse) => {
          const isSelected = fuse.number === selectedFuse?.number;
          return (
            <button
              key={`${fuse.location}-${fuse.number}`}
              type="button"
              onClick={() => setSelectedNumber(fuse.number)}
              className={`min-h-16 rounded-xl border p-2 text-center transition ${
                isSelected
                  ? "border-sky-300 bg-sky-400 text-slate-950"
                  : "border-slate-700 bg-slate-900 text-white hover:border-sky-400"
              }`}
              style={{ gridColumn: fuse.position.column, gridRow: fuse.position.row }}
              aria-pressed={isSelected}
            >
              <span className="block text-xs font-semibold">F{fuse.number}</span>
              <span className="mt-1 block text-sm font-black">{fuse.amperage}A</span>
            </button>
          );
        })}
      </div>

      {selectedFuse && (
        <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950 p-5">
          <p className="text-sm text-slate-400">{isEnglish ? "Fuse" : "Fusible"} #{selectedFuse.number} · {selectedFuse.amperage}A · {selectedFuse.type}</p>
          <p className="mt-2 font-semibold leading-7">{selectedFuse.description}</p>
          <p className="mt-3 text-sm text-amber-200">{isEnglish ? "Do not replace a fuse with one of higher amperage." : "No reemplaces un fusible por uno de mayor amperaje."}</p>
        </div>
      )}
    </section>
  );
}
