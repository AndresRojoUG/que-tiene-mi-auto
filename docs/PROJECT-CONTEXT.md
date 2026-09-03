# ¿Qué tiene mi auto? — Project Context

> Documento de contexto operativo para Codex y cualquier desarrollador que trabaje en el repositorio.
> La fuente de verdad del comportamiento del proyecto es el código actual de `v1-development`; este documento explica la intención, arquitectura y prioridades.

## 1. Product vision

**¿Qué tiene mi auto?** is a web platform that helps vehicle owners understand and diagnose common automotive problems through a guided, structured experience.

The long-term product combines:

- vehicle catalog;
- guided diagnostics;
- technical information;
- fuses and relays;
- OBD and fault codes;
- maintenance information;
- common problems by vehicle;
- community questions and answers;
- user diagnostic history;
- SEO and analytics;
- advertising and premium features;
- affiliate products and workshop leads;
- future AI assistance.

The product should be useful to a non-expert owner while remaining technically responsible.

## 2. Current technology

- Next.js 16.3.3
- React 19
- TypeScript
- Tailwind CSS 4
- App Router
- Node.js 24
- npm 11
- PostgreSQL is planned but not yet the foundation of the current diagnostic flow.

Current package scripts include:

- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run check` (lint + typecheck + build)

## 3. Repository and branch

Repository:

`AndresRojoUG/que-tiene-mi-auto`

Primary development branch:

`v1-development`

`master` is not the active development branch. Do not make direct changes there unless explicitly requested.

## 4. Current application flow

The intended main experience is:

1. Select vehicle.
2. Select problem.
3. Answer guided questions.
4. Process answers through deterministic diagnostic rules.
5. Show the most likely result(s).
6. Show possible causes.
7. Show recommended checks.
8. Show the next useful action.
9. Offer relevant vehicle-specific technical information.

Known routes include:

- `/`
- `/seleccionar-vehiculo`
- `/vehiculo`
- `/diagnostico`
- `/diagnostico/problema`
- `/diagnostico/preguntas`
- `/diagnostico/resultado`
- `/informacion/fusibles`

## 5. Vehicle scope

The initial product focuses on Volkswagen and will later expand to other makes.

Representative development vehicles include:

- VW Jetta A4 / Classic 2009, 2.0 gasoline, manual
- VW Golf A4 2008, 2.0 gasoline, manual
- Nissan Sentra B16 2011, 2.0 gasoline, manual

These are product examples, not permission to invent technical data. Any vehicle-specific specification must be verified.

## 6. Diagnostic architecture

The project deliberately separates:

**DATA → RULES → ENGINE → UI**

Conceptual model:

```text
Vehicle
  ↓
Problem
  ↓
DiagnosticDefinition
  ↓
Question
  ↓
Option
  ├── nextQuestion
  └── result
           ↓
        Result
          ├── possible causes
          ├── recommended checks
          ├── difficulty
          └── next action
```

Important rule: diagnostic definitions must not depend on page components.

The reusable engine decides what the current state is. UI components render that state and collect answers.

## 7. Diagnostic files

Important files:

- `data/diagnostics/types.ts` — shared diagnostic types.
- `data/diagnostics/index.ts` — central diagnostic registry.
- `data/diagnostics/engine.ts` — reusable diagnostic execution engine.
- `data/diagnostics/validate.ts` — diagnostic definition validation.
- `data/diagnostics/no-arranca.ts` — current real diagnostic definition.
- `data/diagnostics/problems.ts` — available problem definitions.
- `data/diagnostics/results.ts` — diagnostic result definitions.
- `app/diagnostico/preguntas/page.tsx` — diagnostic question UI and engine integration.
- `app/diagnostico/resultado/page.tsx` — result UI.

## 8. Current diagnostic coverage

The only substantially implemented diagnostic tree is **No arranca / no enciende**.

Its current questions cover branches such as:

- whether the engine turns;
- what sound is heard;
- whether it does not turn;
- whether it turns but does not start;
- fuse/fuel-related checks;
- Check Engine state;
- RPM signal while starting;
- continuing toward fuel/spark investigation.

Existing result IDs include examples such as:

- `posible-arranque-clic`
- `posible-alimentacion-arranque`
- `posible-bateria`
- `revisar-fusible-bomba`
- `investigar-senal-rpm`
- `continuar-diagnostico-combustible-chispa`
- `continuar-sin-escaner`

Future problems must use the same engine and registry.

## 9. Diagnostic result philosophy

The application must not pretend to know more than the evidence supports.

Prefer wording such as:

- "Causa más probable"
- "Posible problema"
- "Conviene comprobar"
- "Información insuficiente"

Avoid presenting a remote diagnosis as certain when several causes remain possible.

## 10. Immediate engineering priority

Before expanding to many diagnostic problems, stabilize the diagnostic foundation.

Priority order:

1. Ensure the shared diagnostic engine is correct and reusable.
2. Strengthen diagnostic validation.
3. Add automated coverage for engine/validation behavior.
4. Clean up question/result route integration.
5. Make the first diagnostic tree robust.
6. Build a second real diagnostic using the same engine.
7. Only then scale the diagnostic catalog.

Do not jump prematurely to AI, monetization, or a large backend.

## 11. Known technical follow-ups

The current question page has areas that should be reviewed during stabilization:

- navigation is currently performed in some render paths and should be moved to an appropriate effect or cleaner state transition;
- raw problem IDs should eventually be presented using friendly problem metadata;
- session storage parsing should remain defensive;
- old answer formats may need migration or explicit clearing;
- result IDs should be validated against the result registry;
- validator should eventually cover graph reachability/cycles and invalid result references.

These are priorities for review, not a command to rewrite unrelated code immediately.

## 12. Planned diagnostic catalog

Initial public MVP problems:

1. No arranca / no enciende
2. Se apaga
3. Tironea / da jalones
4. Pierde potencia
5. Se calienta
6. Luz de tablero
7. Hace un ruido extraño
8. Tiene una fuga
9. Problema eléctrico

Each should eventually have a verified diagnostic tree appropriate to the vehicle context.

## 13. Technical information

Planned technical areas:

- fuses;
- relays;
- OBD;
- fault codes;
- maintenance;
- common problems;
- verified specifications.

Fuse information should eventually have a visual/interactive presentation rather than only a plain table.

Technical content must be separated from community content.

## 14. Community

Planned structure:

Make → Model → Year → Engine → Question → Answers

Question concepts include:

- author;
- vehicle;
- problem;
- title;
- body;
- moderation status.

Answers include:

- author;
- question;
- body;
- moderation status.

Reading should be public. Publishing and answering require authentication. Ownership and admin permissions must be enforced server-side/database-side.

Community content is user-generated and must never automatically become official technical information.

## 15. Authentication and database

Authentication and PostgreSQL/Supabase integration are planned, not part of the current diagnostic foundation.

When introduced:

1. design schema and relations;
2. define permissions and ownership;
3. define RLS/server authorization where applicable;
4. configure environment variables safely;
5. integrate the auth provider;
6. test authorization boundaries.

Never add authentication just to solve an unrelated UI or diagnostic task.

## 16. Security

Never trust browser-provided IDs for authorization.

Never commit:

- passwords;
- API keys;
- access tokens;
- database credentials;
- real production environment secrets.

Use `.env.example` with variable names only.

Treat community input as untrusted data.

## 17. Safety

Automotive diagnosis can involve physical risk. User-facing instructions must include appropriate warnings when a step involves:

- fuel;
- hot engine/cooling systems;
- electrical systems;
- moving belts/fans;
- lifting a vehicle;
- rotating components;
- battery connections;
- other hazardous operations.

Do not encourage unsafe testing procedures.

## 18. UX principles

Mobile-first because the user may be next to the vehicle.

Priorities:

- large touch targets;
- simple wording;
- clear progress;
- obvious next step;
- readable cards/results;
- responsive phone/tablet/desktop layouts;
- accessible controls;
- minimal friction.

Ads should not interrupt or obscure diagnosis.

## 19. Monetization roadmap

Planned from the product architecture level:

- ads;
- premium features;
- affiliate products;
- workshop directory/leads.

Monetization must not compromise trust or diagnostic usability.

Potential premium capabilities include expanded diagnostics, history, advanced technical content, and future AI assistance.

## 20. AI roadmap

AI is intentionally postponed.

When introduced, AI should receive structured inputs such as:

- vehicle;
- problem;
- user answers;
- deterministic diagnostic candidates;
- OBD information;
- verified technical information.

AI should complement the deterministic engine and must not invent technical facts or silently override verified rules.

## 21. Quality gate

For relevant code changes, execute and report:

```text
npm run lint
npm run typecheck
npm run build
```

or, when practical:

```text
npm run check
```

A green result must be based on an actual execution, not assumption.

After significant changes, inspect the final diff and test the affected browser flow.

## 22. Working agreement

The project owner is not a professional programmer and uses the AI as a technical guide. Explanations should therefore be clear and concrete when communicating with the owner.

Codex, however, should operate as the implementation engineer: inspect first, make coherent changes, validate them, and clearly report what changed.

Large coherent refactors are acceptable when they materially improve the project, but they must remain focused, tested, and reviewable.

## 23. Definition of done

A task is done when:

- the requested behavior works;
- relevant existing behavior still works;
- architecture remains coherent;
- validation has been run;
- no known errors are hidden;
- technical claims are verified or appropriately qualified;
- the diff is focused;
- the result is ready for review.
