import { X } from "lucide-react";

function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
}) {
  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className={`
          relative
          w-full
          ${sizes[size]}
          rounded-modal
          border
          border-slate-200
          bg-white
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-6
            py-4
          "
        >
          <h2 className="text-xl font-semibold text-text-primary">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-full
              p-2
              text-text-secondary
              transition
              hover:bg-slate-100
              hover:text-text-primary
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className="
              flex
              justify-end
              gap-3
              border-t
              border-slate-200
              px-6
              py-4
            "
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;