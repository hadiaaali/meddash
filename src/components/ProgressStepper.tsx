import { ORDER_STAGES, STAGE_LABELS, type OrderStage } from '../types'

export function ProgressStepper({
  currentStage,
  dark,
}: {
  currentStage: OrderStage
  dark?: boolean
}) {
  const currentIndex = ORDER_STAGES.indexOf(currentStage)

  return (
    <div className="flex flex-col">
      {ORDER_STAGES.map((stage, index) => {
        const isComplete = index < currentIndex
        const isCurrent = index === currentIndex
        const isLast = index === ORDER_STAGES.length - 1

        return (
          <div key={stage} className="flex gap-6">
            <div className="flex flex-col items-center">
              <span
                className={`text-[11px] font-normal tabular-nums ${
                  isCurrent
                    ? dark
                      ? 'text-paper-white'
                      : 'text-ink-black'
                    : isComplete
                      ? dark
                        ? 'text-paper-white/60'
                        : 'text-ash'
                      : dark
                        ? 'text-paper-white/25'
                        : 'text-smoke'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              {!isLast && (
                <div
                  className={`w-px flex-1 min-h-[32px] my-2 ${
                    isComplete
                      ? dark
                        ? 'bg-paper-white/40'
                        : 'bg-carbon'
                      : dark
                        ? 'bg-paper-white/15'
                        : 'bg-ash/30'
                  }`}
                />
              )}
            </div>
            <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
              <p
                className={`text-[18px] leading-[1.36] ${
                  isCurrent
                    ? `font-normal ${dark ? 'text-paper-white' : 'text-carbon'}`
                    : isComplete
                      ? `font-normal ${dark ? 'text-paper-white/70' : 'text-ash'}`
                      : `font-light ${dark ? 'text-paper-white/30' : 'text-smoke'}`
                }`}
              >
                {STAGE_LABELS[stage]}
              </p>
              {isCurrent && (
                <p
                  className={`text-[11px] uppercase tracking-[0.12em] mt-2 ${
                    dark ? 'text-paper-white/50' : 'text-ash'
                  }`}
                >
                  In progress
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
