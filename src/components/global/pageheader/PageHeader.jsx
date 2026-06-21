import {
  ChevronRight,
} from "lucide-react";

function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  action,
  className = "",
}) {
  return (
    <div
      className={`
        flex
        flex-col
        gap-4
        rounded-card
        border
        border-slate-200
        bg-gradient-to-r
        from-white
        via-slate-50
        to-blue-50
        p-6
        shadow-soft

        md:flex-row
        md:items-center
        md:justify-between

        ${className}
      `}
    >
      <div>
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <div
            className="
              mb-3
              flex
              flex-wrap
              items-center
              gap-2
              text-sm
              text-text-secondary
            "
          >
            {breadcrumbs.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span>
                    {item}
                  </span>

                  {index !==
                    breadcrumbs.length -
                      1 && (
                    <ChevronRight
                      size={14}
                    />
                  )}
                </div>
              )
            )}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold text-text-primary">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-2 text-text-secondary">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Actions */}
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
}

export default PageHeader;