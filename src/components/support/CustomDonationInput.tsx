interface CustomDonationInputProps {
  value: string
  onChange: (value: string) => void
  error: string | null
  describedById: string
}

export default function CustomDonationInput({
  value,
  onChange,
  error,
  describedById,
}: CustomDonationInputProps) {
  return (
    <div className="mt-5">
      <label htmlFor="custom-donation-amount" className="text-sm font-medium text-text-main">
        Custom donation amount
      </label>
      <div className="relative mt-2 max-w-xs">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
          $
        </span>
        <input
          id="custom-donation-amount"
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? describedById : undefined}
          className="min-h-[48px] w-full rounded-xl border border-white/10 bg-bg-main/50 py-3 pl-8 pr-4 text-sm text-text-main"
          placeholder="0.00"
        />
      </div>
      {error && (
        <p id={describedById} className="mt-2 text-sm text-fire-orange" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
