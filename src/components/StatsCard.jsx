import React from "react";

const clampPct = (n) => Math.max(0, Math.min(100, n));

const StatsCard = ({
  title,
  value,
  change,
  isPositive = true,
  color = "#3b82f6",

  dropdownValue,
  dropdownOptions = [],
  onDropdownChange,

  rows = [],
  footerText = "",
  showProgress = false,
  subtitle = "",
}) => {
  const hasRows = Array.isArray(rows) && rows.length > 0;
  const pct = clampPct(Math.abs(parseFloat(change)) || 0);

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 hover:shadow-md transition-all duration-200">
      {/* Left accent */}
      <div
        className="absolute left-0 top-0 h-full w-1.5"
        style={{ backgroundColor: color }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-gray-500 tracking-wide">
            {title}
          </h3>

          {subtitle && !hasRows && (
            <p className="mt-2 text-xs md:text-sm text-gray-500">{subtitle}</p>
          )}

          {dropdownOptions.length > 0 && (
            <select
              value={dropdownValue}
              onChange={(e) => onDropdownChange?.(e.target.value)}
              className="mt-3 w-full max-w-[210px] px-3 py-2 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 focus:outline-none focus:ring-2"
              style={{ outlineColor: color }}
            >
              {dropdownOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}18` }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>

      {/* Single big stat */}
      {!hasRows ? (
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1e293b]">
            {value}
          </h2>

          {change ? (
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  isPositive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {change}
              </span>
              <span className="text-xs text-gray-500">vs last period</span>
            </div>
          ) : (
            footerText && (
              <span className="text-xs md:text-sm text-gray-500">
                {footerText}
              </span>
            )
          )}
        </div>
      ) : (
        /* Multi-row card */
        <div className="space-y-4">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
            >
              <span className="text-sm text-gray-600">{r.label}</span>
              <span className="text-xl md:text-2xl font-bold text-[#1e293b]">
                {r.value}
              </span>
            </div>
          ))}

          {footerText && (
            <span className="block pt-1 text-xs md:text-sm text-gray-500">
              {footerText}
            </span>
          )}
        </div>
      )}

      {/* progress */}
      {showProgress && change && (
        <div className="mt-5 w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              backgroundColor: color,
              width: `${pct}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StatsCard;
