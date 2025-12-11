import { useMemo } from "react";

const GithubGraph = ({
  username,
  selectedYear,
  contributionTotal,
  contributionWeeks,
  isSample,
  copy = {
    locale: "en-US",
    weekdays: ["Mon", "Wed", "Fri"],
    less: "Less",
    more: "More",
    sampleLabel: "Sample contributions shown",
    contributionsLabel: "contributions",
    inLabel: "in",
    sampleTag: "sample",
    unknownDate: "N/A",
  },
}) => {
  const cellSize = 12;
  const cellGap = 4;
  const labelOffset = 32;
  const {
    locale,
    weekdays,
    less,
    more,
    sampleLabel,
    contributionsLabel,
    inLabel,
    sampleTag,
    unknownDate,
  } = copy;

  const sampleWeeks = Array.from({ length: 53 }).map(() =>
    Array.from({ length: 7 }).map(() => {
      const rand = Math.random();
      if (rand > 0.8) return { count: 4 };
      if (rand > 0.6) return { count: 3 };
      if (rand > 0.4) return { count: 2 };
      if (rand > 0.2) return { count: 1 };
      return { count: 0 };
    })
  );

  const weeks = contributionWeeks
    ? contributionWeeks.map((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          color: day.color,
        }))
      )
    : sampleWeeks;

  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = "";
    weeks.forEach((week, idx) => {
      const firstDate = week.find((day) => day.date)?.date;
      if (!firstDate) return;
      const dateObj = new Date(firstDate);
      const month = dateObj.toLocaleString(locale, { month: "short" });
      if (month !== lastMonth && dateObj.getDate() <= 7) {
        labels.push({ month, index: idx });
        lastMonth = month;
      }
    });
    return labels;
  }, [weeks]);

  const computedTotal = useMemo(
    () =>
      contributionTotal ??
      weeks.reduce(
        (sum, week) =>
          sum + week.reduce((inner, day) => inner + (day.count || 0), 0),
        0
      ),
    [weeks, contributionTotal]
  );

  const getLevelColor = (level) => {
    switch (level) {
      case 0:
        return "bg-[#161b22]";
      case 1:
        return "bg-[#0e4429]";
      case 2:
        return "bg-[#006d32]";
      case 3:
        return "bg-[#26a641]";
      case 4:
        return "bg-[#39d353]";
      default:
        return "bg-[#161b22]";
    }
  };

  return (
    <div className="w-full border border-blue-500/30 rounded-xl p-3 md:p-5 bg-gray-900/30 shadow-md overflow-x-auto">
      <div className="relative min-w-max">
        <div
          className="pl-10 pb-2 relative"
          style={{ marginLeft: `${labelOffset - 24}px` }}
        >
          <div className="relative h-4">
            {monthLabels.map((label) => (
              <span
                key={`${label.month}-${label.index}`}
                className="absolute text-[11px] text-gray-400"
                style={{ left: label.index * (cellSize + cellGap) }}
              >
                {label.month}
              </span>
            ))}
          </div>
        </div>

        <div className="flex">
          <div
            className="flex flex-col justify-between text-[10px] text-gray-500 pr-2 py-0.5"
            style={{ width: `${labelOffset}px` }}
          >
            <span>{weekdays?.[0] || "Mon"}</span>
            <span>{weekdays?.[1] || "Wed"}</span>
            <span>{weekdays?.[2] || "Fri"}</span>
          </div>
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, ${cellSize}px)`,
              gridTemplateRows: `repeat(7, ${cellSize}px)`,
              gap: `${cellGap}px`,
            }}
          >
            {weeks.map((week, weekIndex) =>
              week.map((day, dayIndex) => {
                const level = day.count ?? 0;
                return (
                  <div
                    key={`${day.date || "d"}-${weekIndex}-${dayIndex}`}
                    className={`rounded-sm ${
                      day.color ? "" : getLevelColor(level)
                    } border border-white/5 hover:border-white/20 transition-colors`}
                    style={{
                      backgroundColor:
                        day.color == "#ebedf0"
                          ? "#161b22"
                          : day.color || "none",
                      width: `${cellSize}px`,
                      height: `${cellSize}px`,
                      gridColumn: weekIndex + 1,
                      gridRow: dayIndex + 1,
                    }}
                    title={`${
                      day.date || unknownDate
                    }: ${level} ${contributionsLabel}`}
                  />
                );
              })
            )}
          </div>
        </div>

        <div
          className="flex items-center justify-between text-xs text-gray-400 mt-3 pr-1"
          style={{ paddingLeft: `${labelOffset}px` }}
        >
          <span>
            {computedTotal
              ? `${computedTotal.toLocaleString(
                  locale
                )} ${contributionsLabel} ${inLabel} ${selectedYear}`
              : sampleLabel}
            {username ? ` • @${username}` : ""}
            {isSample ? ` • ${sampleTag}` : ""}
          </span>
          <div className="flex items-center gap-1">
            <span>{less}</span>
            <div className="w-2 h-2 bg-[#161b22] rounded-sm"></div>
            <div className="w-2 h-2 bg-[#0e4429] rounded-sm"></div>
            <div className="w-2 h-2 bg-[#006d32] rounded-sm"></div>
            <div className="w-2 h-2 bg-[#26a641] rounded-sm"></div>
            <div className="w-2 h-2 bg-[#39d353] rounded-sm"></div>
            <span>{more}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubGraph;
