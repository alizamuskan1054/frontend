import React, { useId } from 'react';

/**
 * SELECT
 *
 * Use this for picking one value from a fixed list of choices —
 * Role, Class & Section, Status (Pending/Approved/Rejected), Exam Type, etc.
 * Works inside any role's dashboard (admin, teacher, student, parent).
 *
 * This uses a normal HTML <select> underneath (not a custom dropdown),
 * styled to look exactly like Input — keeps it simple, accessible, and
 * keyboard-friendly for free.
 *
 * Params you can pass:
 *  - label: text shown above the field, e.g. "Class"
 *  - options: array of choices → [{ value: '9a', label: 'Class 9 - Section A' }, ...]
 *  - placeholder: greyed-out first option, e.g. "Select a class" (no value selected)
 *  - error: error message string → when set, field turns red and shows this text below it
 *  - helperText: small grey hint text below the field (only shows if there's no error)
 *  - size: how big → "sm" | "md" | "lg"
 *  - tone: which role's color it should use → "brand" | "admin" | "teacher" | "student" | "parent"
 *  - fullWidth: true/false → stretch to fill container (true by default)
 *  - required: true/false → adds a red asterisk next to the label
 *  - plus normal select props: value, onChange, disabled, name, id
 * 
 * * Example:
 *   <Select label="Class" tone="admin"
 *     options={[{ value: '9a', label: 'Class 9 - A' }]}
 *     value={classId} onChange={(e) => setClassId(e.target.value)} />
 */

const SIZE_CLASSES = {
  sm: 'h-input-sm text-sm pl-3 pr-8',
  md: 'h-input-md text-base pl-3.5 pr-9',
  lg: 'h-input-lg text-lg pl-4 pr-10',
};

const CHEVRON_POSITION = {
  sm: 'right-2.5',
  md: 'right-3',
  lg: 'right-3.5',
};

const ICON_SIZE_CLASSES = {
  sm: 'w-icon-sm h-icon-sm',
  md: 'w-icon-sm h-icon-sm',
  lg: 'w-icon-md h-icon-md',
};

// Same reasoning as Button/Input: Tailwind needs literal class names,
// not a built string like `focus:ring-${tone}-primary`.
const TONE_FOCUS_RING = {
  brand: 'focus:ring-brand-primary focus:border-brand-primary',
  admin: 'focus:ring-admin-primary focus:border-admin-primary',
  teacher: 'focus:ring-teacher-primary focus:border-teacher-primary',
  student: 'focus:ring-student-primary focus:border-student-primary',
  parent: 'focus:ring-parent-primary focus:border-parent-primary',
};

function ChevronIcon({ size }) {
  return (
    <svg
      className={ICON_SIZE_CLASSES[size]}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const Select = React.forwardRef(function Select(
  {
    label,
    options = [],
    placeholder,
    error,
    helperText,
    size = 'md',
    tone = 'brand',
    fullWidth = true,
    required = false,
    disabled = false,
    className = '',
    id,
    name,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const selectId = id || name || generatedId;
  const hasError = Boolean(error);

  const wrapperClasses = fullWidth ? 'w-full' : '';

  const selectClasses = [
    'rounded-input border bg-surface appearance-none',
    'text-text-primary',
    'transition-colors duration-150',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:bg-surface-muted disabled:text-text-muted disabled:cursor-not-allowed',
    SIZE_CLASSES[size],
    fullWidth ? 'w-full' : '',
    hasError
      ? 'border-danger focus:ring-danger focus:border-danger'
      : `border-surface-muted ${TONE_FOCUS_RING[tone] || TONE_FOCUS_RING.brand}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          name={name}
          disabled={disabled}
          required={required}
          className={selectClasses}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span
          className={`absolute top-1/2 -translate-y-1/2 ${CHEVRON_POSITION[size]} text-text-muted pointer-events-none`}
        >
          <ChevronIcon size={size} />
        </span>
      </div>

      {hasError && (
        <p className="mt-1.5 text-sm text-danger-text">
          {error}
        </p>
      )}
      {!hasError && helperText && (
        <p className="mt-1.5 text-sm text-text-secondary">
          {helperText}
        </p>
      )}
    </div>
  );
});

export default Select;