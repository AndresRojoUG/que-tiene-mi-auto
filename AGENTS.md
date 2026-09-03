<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ¿Qué tiene mi auto? — Codex Development Rules

## 1. Read project context first

Before making implementation changes, read:

- `docs/PROJECT-CONTEXT.md` — authoritative project context, product scope, architecture, current state, and roadmap.
- Relevant source files in the repository.
- Relevant Next.js documentation under `node_modules/next/dist/docs/` when the task involves framework APIs or conventions.

Do not assume that older Next.js knowledge is current.

## 2. Branch policy

- Primary development branch: `v1-development`.
- Do not develop directly on `master` unless explicitly instructed.
- Never merge, reset, force-push, or rewrite history without explicit approval.
- Prefer focused commits with clear messages.
- Keep unrelated changes out of the patch.

## 3. Product principles

- Product name: **¿Qué tiene mi auto?**
- Mobile-first: the main user may be standing next to their car using a phone.
- The experience must be simple enough for a non-expert vehicle owner.
- Technical information must be trustworthy and vehicle-specific.
- Never invent automotive specifications, fuse ratings, relay assignments, wiring information, torque values, maintenance intervals, diagnostic facts, or diagrams.
- If technical information is not verified, mark it as unverified or leave it out.
- Diagnostic language must communicate probability, not certainty, unless the evidence genuinely supports certainty.
- Safety warnings are required where a diagnostic step can involve fuel, heat, electricity, moving parts, lifting, or other physical hazards.

## 4. Architecture — preserve this separation

The diagnostic system follows:

**DATA → RULES → ENGINE → UI**

Conceptually:

Vehicle → Problem → DiagnosticDefinition → Question → Option → Result → Causes / Checks / Next Action

Keep diagnostic definitions independent from UI components. Reusable diagnostic behavior belongs in the engine, not in individual pages.

Do not create special-case routing logic for individual problems when the shared diagnostic engine can handle it.

## 5. Current diagnostic architecture

Relevant files include:

- `data/diagnostics/types.ts`
- `data/diagnostics/index.ts`
- `data/diagnostics/engine.ts`
- `data/diagnostics/validate.ts`
- `data/diagnostics/no-arranca.ts`
- `data/diagnostics/results.ts`
- `data/diagnostics/problems.ts`
- `app/diagnostico/preguntas/page.tsx`
- `app/diagnostico/resultado/page.tsx`

The reusable engine should remain generic enough for future diagnostic problems.

Current real diagnostic coverage is primarily **No arranca / no enciende**. Future problems must use the same architecture rather than introducing parallel implementations.

## 6. Validation and quality

The project must maintain automated checks. After relevant changes, run the appropriate checks and report their actual results:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run check` when practical; it runs lint + typecheck + build.

Never claim a check passed unless it was actually executed.

If a check cannot be executed, state that explicitly.

When changing diagnostic definitions, validate:

- duplicate IDs
- blank IDs/text
- invalid option destinations
- invalid result destinations
- missing start questions
- unreachable questions
- cycles where they are not intentionally supported
- invalid result IDs

Prefer automated tests/validation over manual assumptions.

## 7. Changes and refactoring

Significant refactors are allowed when they materially improve architecture or speed, but they must:

1. Preserve existing working behavior.
2. Have a clear reason.
3. Be limited to the relevant area.
4. Be followed by automated validation.
5. Be easy to review from the Git diff.

Do not add dependencies unless they solve a real project need and their trade-offs are understood.

Do not introduce authentication, database, AI, analytics, ads, affiliate systems, or other large subsystems merely to make a current task work. Add them deliberately according to the roadmap.

## 8. AI policy

AI-assisted diagnosis is a future capability, not the current diagnostic engine.

Do not replace deterministic diagnostic rules with an LLM. Future AI should consume structured vehicle data, problem data, user answers, technical information, and diagnostic candidates, and complement—not override—the deterministic system.

## 9. Technical information policy

Automotive data is safety-relevant. When adding technical content:

- Prefer manufacturer documentation, service information, reputable technical references, or other verifiable sources.
- Keep vehicle applicability explicit: make, model, generation, year, engine, fuel, transmission, and market when relevant.
- Do not generalize information from one vehicle to another without verification.
- Do not fabricate images or diagrams and present them as technical references.

## 10. UI/UX rules

- Mobile-first and responsive.
- Large touch targets.
- Clear hierarchy and readable language.
- Avoid unnecessary technical jargon; explain it when needed.
- Diagnosis should not be interrupted by aggressive advertising.
- Reusable UI components are preferred over duplicated page-specific markup.
- Preserve accessibility basics: semantic HTML, labels, keyboard navigation, visible focus, useful error states, and sufficient contrast.

## 11. Security rules

- Never trust browser-provided IDs for authorization.
- Server/database must determine ownership, permissions, and admin status.
- Never commit secrets, tokens, credentials, or real environment values.
- Use `.env.example` for variable names only.
- Treat community content as untrusted user-generated content.
- User-generated community content must never automatically become official technical information.

## 12. Community rules

Public users may read community content. Authenticated users will eventually be able to publish, answer, and interact according to permissions.

Community content must remain separate from official technical data and should support moderation/reporting.

## 13. Codex working style

When starting a task:

1. Inspect the repository and relevant files first.
2. Understand the existing architecture before editing.
3. State the implementation plan briefly.
4. Make the smallest coherent set of changes that completes the task.
5. Run relevant checks.
6. Review the diff for accidental changes.
7. Report files changed, checks run, results, and any remaining risk.

Do not stop after writing code if a practical automated validation can be run.

## 14. Definition of done

A task is not considered complete merely because the code compiles conceptually. It is complete when:

- requested behavior is implemented;
- existing relevant behavior remains intact;
- code follows the project architecture;
- relevant validation has been executed;
- no known errors are left unexplained;
- the diff is focused and reviewable;
- technical/safety claims are verified or clearly qualified.

## 15. Current priority

The immediate engineering priority is to stabilize and test the reusable diagnostic architecture before expanding the number of diagnostic problems. Do not jump ahead to authentication, monetization, or AI until the current foundation is reliable.
