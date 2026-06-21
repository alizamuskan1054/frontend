function Card({
  children,
  title,
  subtitle,
  footer,
  icon,
  accentColor = "#7F77DD",
  iconBg = "#EEEDFE",
  iconColor = "#534AB7",
  hover = true,
  floatIcon = false,        // ← new prop
  onClick,
  bgColor = "bg-white",
  className = "",
  padding = "p-5",
}) {
  return (
    <div
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-xl
        ${bgColor} dark:bg-neutral-900
        border border-neutral-200/70 dark:border-neutral-700/60
        ${padding}
        transition-all duration-200
        ${hover ? "cursor-pointer hover:-translate-y-0.5 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-sm" : ""}
        ${className}
      `}
    >
      {/* Inject keyframes once */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        .icon-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Top accent line */}
      <div
        className="absolute left-0 top-0 h-0.5 w-full"
        style={{ background: accentColor }}
      />

      {/* Header */}
      {(title || subtitle || icon) && (
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            {title && (
              <h3 className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100 truncate">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-[13px] text-neutral-500 dark:text-neutral-400">
                {subtitle}
              </p>
            )}
          </div>

          {icon && (
            <div
              className={`
                flex-shrink-0 flex h-[38px] w-[38px] items-center justify-center
                rounded-lg text-[18px]
                ${floatIcon ? "icon-float" : "transition-transform duration-200 group-hover:scale-105"}
              `}
              style={{ background: iconBg, color: iconColor }}
            >
              {icon}
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div className="relative">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;