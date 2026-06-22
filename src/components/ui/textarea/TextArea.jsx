/*
======================================================
Reusable Textarea Component

Purpose:
- Provides a styled multiline text input.
- Supports labels, validation errors, helper text,
  disabled state, and custom styling.
- Commonly used in forms for descriptions, comments,
  feedback, complaints, notes, etc.

Props:
- label       : Text displayed above the textarea
- value       : Current textarea value
- onChange    : Function called when value changes
- placeholder : Placeholder text
- rows        : Number of visible rows
- error       : Error message to display
- helperText  : Additional guidance text
- disabled    : Disables the textarea
- required    : Shows required (*) indicator
- className   : Additional custom classes
- ...props    : Any other native textarea props

Examples:

1. Basic Usage
------------------------------------------------------
<Textarea
  label="Description"
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
/>

------------------------------------------------------

2. Required Field
------------------------------------------------------
<Textarea
  label="Complaint"
  required
  value={complaint}
  onChange={(e) =>
    setComplaint(e.target.value)
  }
/>

------------------------------------------------------

3. With Helper Text
------------------------------------------------------
<Textarea
  label="Remarks"
  helperText="Maximum 500 characters."
  value={remarks}
  onChange={(e) =>
    setRemarks(e.target.value)
  }
/>

------------------------------------------------------

4. Validation Error
------------------------------------------------------
<Textarea
  label="Feedback"
  error="Feedback is required."
  value={feedback}
  onChange={(e) =>
    setFeedback(e.target.value)
  }
/>

Features:
- Label support
- Required field indicator
- Error state styling
- Helper text support
- Disabled state
- Customizable row count
- Additional native textarea props support
======================================================
*/

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
    /*
    ======================================================
    Wrapper Container
    Provides spacing between label, input,
    and helper/error messages
    ======================================================
    */
    <div className="flex flex-col gap-2">
      {/* ==================================================
          Label
      ================================================== */}
      {label && (
        <label
          className="
            text-sm
            font-medium
            text-text-primary
          "
        >
          {label}

          {/* Required Indicator */}
          {required && (
            <span className="ml-1 text-danger">
              *
            </span>
          )}
        </label>
      )}

      {/* ==================================================
          Textarea Input
      ================================================== */}
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
              ? `
                border-danger
                focus:ring-2
                focus:ring-danger/20
              `
              : `
                border-slate-300
                focus:border-brand-primary
                focus:ring-2
                focus:ring-brand-primary/20
              `
          }

          ${
            disabled
              ? `
                cursor-not-allowed
                bg-slate-100
                opacity-60
              `
              : ""
          }

          ${className}
        `}
        {...props}
      />

      {/* ==================================================
          Error Message
      ================================================== */}
      {error && (
        <p className="text-sm text-danger">
          {error}
        </p>
      )}

      {/* ==================================================
          Helper Text
      ================================================== */}
      {!error && helperText && (
        <p className="text-sm text-text-secondary">
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Textarea;