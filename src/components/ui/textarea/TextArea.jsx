function Textarea({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  error,
  helperText,
  disabled = false,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      {label && (
        <label
          className="
            text-sm
            font-medium
            text-text-primary
          "
        >
          {label}

          {required && (
            <span className="ml-1 text-danger">
              *
            </span>
          )}
        </label>
      )}

      {/* Textarea */}
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          w-full
          rounded-input
          border
          bg-white
          px-4
          py-3
          text-text-primary
          placeholder:text-text-muted
          transition-all
          duration-200
          outline-none
          resize-none

          ${
            error
              ? "border-danger focus:ring-2 focus:ring-danger/20"
              : `
                border-slate-300
                focus:border-brand-primary
                focus:ring-2
                focus:ring-brand-primary/20
              `
          }

          ${
            disabled
              ? "cursor-not-allowed bg-slate-100 opacity-60"
              : ""
          }

          ${className}
        `}
        {...props}
      />

      {/* Error */}
      {error && (
        <p className="text-sm text-danger">
          {error}
        </p>
      )}

      {/* Helper */}
      {!error && helperText && (
        <p className="text-sm text-text-secondary">
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Textarea;