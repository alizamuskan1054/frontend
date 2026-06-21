function Table({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No data found.",
  className = "",
  bgColor = "bg-white",
}) {
  if (loading) {
    return (
      <div className="rounded-card border border-slate-200 bg-surface p-8 text-center">
        <p className="text-text-secondary">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`
        overflow-hidden
        rounded-card
        border
        border-slate-200
        ${bgColor}
        shadow-soft
        ${className}
      `}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="
                    border-b
                    border-slate-200
                    px-5
                    py-4
                    text-left
                    text-sm
                    font-semibold
                    text-text-primary
                  "
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="
                    px-5
                    py-10
                    text-center
                    text-text-secondary
                  "
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={index}
                  className="
                    transition-colors
                    hover:bg-slate-50
                  "
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="
                        border-b
                        border-slate-100
                        px-5
                        py-4
                        text-sm
                        text-text-secondary
                      "
                    >
                      {column.render
                        ? column.render(row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;