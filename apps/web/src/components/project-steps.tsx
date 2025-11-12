type Step = {
  title: string;
  description: string;
  accent: {
    from: string;
    to: string;
    border: string;
    shadow: string;
  };
  scene: "form" | "design" | "social";
};

const steps: Step[] = [
  {
    title: "Completa el formulario",
    description:
      "Compárteme tu web, objetivos y contexto. Pide el foco que quieras: copy, estrategia, UX… cuanto más preciso seas, más útil será el roast.",
    accent: {
      from: "#FFDFCC",
      to: "#FFFFFF",
      border: "rgba(255, 92, 22, 0.18)",
      shadow: "0 20px 45px rgba(255, 92, 22, 0.14)",
    },
    scene: "form",
  },
  {
    title: "Desarmo tu web a fondo",
    description:
      "Analizo tu sitio, comparo referentes y planteo mejoras. Tengo libertad total para reimaginar la UI si eso ayuda a comunicar mejor tu propuesta.",
    accent: {
      from: "#E5F4FF",
      to: "#FFFFFF",
      border: "rgba(13, 153, 255, 0.18)",
      shadow: "0 20px 45px rgba(13, 153, 255, 0.14)",
    },
    scene: "design",
  },
  {
    title: "Publico el roast",
    description:
      "Grabamos la sesión en vivo, resuelvo tus dudas y preparo un resumen con enlaces. Lo comparto en mis redes con un link solo lectura para que lo veas y compartas.",
    accent: {
      from: "#FFE0FC",
      to: "#FFFFFF",
      border: "rgba(255, 36, 189, 0.16)",
      shadow: "0 20px 45px rgba(255, 36, 189, 0.12)",
    },
    scene: "social",
  },
];

type StepIllustrationProps = {
  accent: Step["accent"];
  scene: Step["scene"];
};

function StepIllustration({ accent, scene }: StepIllustrationProps) {
  return (
    <div className="relative flex w-full justify-center">
      <div
        aria-hidden="true"
        className="absolute -top-10 right-12 h-28 w-28 rounded-full blur-3xl"
        style={{
          background: accent.from,
          opacity: 0.4,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-8 left-12 h-24 w-24 rounded-full blur-3xl"
        style={{
          background: accent.to,
          opacity: 0.4,
        }}
      />
      <div className="relative w-full max-w-[260px] overflow-hidden rounded-2xl border border-white/60 bg-white/85 p-4 shadow-lg ring-1 ring-white/40 backdrop-blur">
        {scene === "form" && (
          <div className="flex min-h-[220px] flex-col justify-between rounded-xl bg-white/95 p-3 shadow-sm ring-1 ring-slate-100">
            <div className="h-3 w-2/3 rounded-full bg-slate-200/90" />
            <div className="flex flex-col gap-2">
              <div className="h-9 rounded-lg border border-slate-200/90 bg-white/90 shadow-inner" />
              <div className="h-9 rounded-lg border border-slate-200/90 bg-white/90 shadow-inner" />
              <div className="h-9 rounded-lg border border-slate-200/90 bg-white/90 shadow-inner" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-16 rounded-full bg-slate-200/90" />
              <div className="h-3 w-12 rounded-full bg-slate-100/90" />
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <div className="h-8 rounded-lg border border-dashed border-[#FF5C16]/40 bg-[#FFDFCC]/25" />
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[#FFDFCC] via-white to-[#FFB996] text-slate-900 shadow-md">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 12l4 4 8-8" />
                </svg>
              </div>
            </div>
          </div>
        )}
        {scene === "design" && (
          <div className="relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-[#0D99FF]/15 bg-slate-50 p-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5C16]/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#0D99FF]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#009951]/70" />
              </div>
              <div className="h-2.5 w-12 rounded-full bg-slate-200/75" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 flex flex-col gap-2">
                <div className="h-16 rounded-xl bg-gradient-to-br from-[#E5F4FF] via-white to-[#C6E8FF] shadow-md" />
                <div className="flex gap-2">
                  <div className="h-4 flex-1 rounded-full bg-slate-200/85" />
                  <div className="h-4 w-10 rounded-full bg-slate-200/85" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-8 rounded-xl bg-white shadow" />
                <div className="h-8 rounded-xl bg-white shadow animate-bounce" />
                <div className="h-8 rounded-xl bg-white shadow" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-3 flex-1 rounded-full bg-slate-200/80" />
              <div className="h-3 w-14 rounded-full bg-slate-200/80" />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-dashed border-[#0D99FF]/25 bg-white/80 p-3">
              <div className="flex flex-col gap-1">
                <div className="h-2 w-16 rounded-full bg-slate-200/70" />
                <div className="h-2 w-24 rounded-full bg-slate-200/70" />
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#0D99FF]/10 text-[#0D99FF] shadow-sm">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 7h16M4 12h10M4 17h7" />
                </svg>
              </div>
            </div>
          </div>
        )}
        {scene === "social" && (
          <div className="flex min-h-[220px] flex-col justify-between rounded-2xl border border-[#FF24BD]/15 bg-white/95 p-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-[#FFE0FC] to-[#FFB5F1]">
                <div className="absolute inset-0 animate-[spin_6s_linear_infinite] bg-[radial-gradient(circle_at_30%_30%,rgba(255,36,189,0.6),transparent_60%)]" />
              </div>
              <div className="flex flex-col text-left">
                <div className="h-3 w-20 rounded-full bg-slate-200/85" />
                <div className="mt-1 h-2 w-14 rounded-full bg-slate-200/70" />
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 shadow-inner">
              <div className="h-20 rounded-lg bg-gradient-to-br from-[#FFE0FC] via-white to-[#EBEBFF]" />
              <div className="mt-3 flex flex-col gap-2">
                <div className="h-3 w-3/4 rounded-full bg-slate-200/85" />
                <div className="h-3 w-1/2 rounded-full bg-slate-200/85" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                <span className="h-6 w-6 rounded-full bg-gradient-to-br from-[#FFDFCC] to-[#FFB996]" />
                <span className="h-6 w-6 rounded-full bg-gradient-to-br from-[#E5F4FF] to-[#BBDFFF]" />
                <span className="h-6 w-6 rounded-full bg-gradient-to-br from-[#FFE0FC] to-[#FFB5F1]" />
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[#FF24BD]/25 bg-[#FF24BD]/10 px-3 py-1 text-xs font-semibold text-[#C7008A] shadow-sm">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#FF24BD] text-white animate-bounce">
                  ♥
                </span>
                Guardado
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectSteps() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24">
      <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Cómo funciona
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-[40px]">
            El proceso es simple, pero pensado para darte claridad.
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Te guiamos en cada paso para que llegues a la sesión con todo lo
            necesario y te lleves feedback accionable desde el minuto uno.
          </p>
        </div>
        <div className="grid w-full gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white/75 px-6 pb-10 pt-8 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/5 sm:px-7 md:px-8"
              style={{
                borderColor: step.accent.border,
                boxShadow: step.accent.shadow,
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 z-[0] opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, transparent 0, transparent 24px, rgba(15,23,42,0.05) 25px), linear-gradient(transparent 0, transparent 24px, rgba(15,23,42,0.05) 25px)",
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="relative z-[2] flex flex-1 flex-col gap-6">
                <StepIllustration accent={step.accent} scene={step.scene} />
                <div className="flex flex-1 flex-col items-center gap-3 text-center">
                  <span
                    className="text-2xl font-semibold"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, ${step.accent.from}, ${step.accent.to})`,
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 z-[1] h-28"
                style={{
                  backgroundImage: `linear-gradient(to top, ${step.accent.from}, transparent)`,
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

