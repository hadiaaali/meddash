import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[11px] font-normal text-ash uppercase tracking-[0.08em]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full bg-paper-white border border-ash/40 rounded-none px-0 py-4 text-[18px] font-normal text-carbon placeholder:text-smoke border-x-0 border-t-0 focus:border-b-carbon ${className}`}
          {...props}
        />
        {hint && !error && (
          <span className="text-[16px] text-ash leading-[1.58]">{hint}</span>
        )}
        {error && <span className="text-[16px] text-carbon">{error}</span>}
      </div>
    )
  },
)

Input.displayName = 'Input'
