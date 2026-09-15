import { getContributionCalendar, type ContributionLevel } from "./data";

//Guthub already sorted each day into one of the five buckets, this is just a look up table
const LEVEL_CLASS: Record<ContributionLevel, string> = {
  NONE: "bg-border",
  FIRST_QUARTILE: "bg-foreground/30",
  SECOND_QUARTILE: "bg-foreground/50",
  THIRD_QUARTILE: "bg-foreground/75",
  FOURTH_QUARTILE: "bg-foreground",
};

// This reused the same table above to create the color legend
const LEVELS = Object.keys(LEVEL_CLASS) as ContributionLevel[];

// Dates are plain "YYYY-MM-DD" strings; pin to UTC so they don't shift a day.
function toDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function formatDay(date: string) {
  return toDate(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

async function GithubActivity() {
  // If getContributionCalendar fails, the github section doesn't render
  const calendar = await getContributionCalendar();
  if (!calendar) return null;

  //GitHub return weeks[] containing up to 7 days (contributionDays[]) sunday - saturday
  const { weeks, totalContributions } = calendar;

  // Label a column when its week starts a new month, skipping labels too close to the previous one.
  const monthLabels: (string | null)[] = [];
  let lastMonth = -1;
  let lastLabelIndex = -Infinity;
  for (const [i, week] of weeks.entries()) {
    const start = toDate(week.contributionDays[0].date);
    const month = start.getUTCMonth();
    const show = month !== lastMonth && i - lastLabelIndex >= 2;
    monthLabels.push(
      show
        ? start.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })
        : null,
    );
    if (month !== lastMonth) lastMonth = month;
    if (show) lastLabelIndex = i;
  }

  return (
    <section
      className="content flex flex-col gap-6 mb-8"
      aria-labelledby="github-heading"
    >
      <h2
        id="github-heading"
        className="font-sans text-sm font-medium tracking-widest text-muted dark:text-faint"
      >
        GITHUB ACTIVITY
      </h2>

      <figure className="flex flex-col gap-3">
        {/* dir="rtl" starts the scroll at the right edge, so phones see recent weeks first */}
        <div dir="rtl" className="overflow-x-auto scrollbar-none">
          <div dir="ltr" className="inline-flex flex-col gap-2">
            <div className="flex gap-0.75 text-xs text-fg-faint" aria-hidden>
              {weeks.map((week, i) => (
                <span
                  key={week.contributionDays[0].date}
                  className="w-2.5 shrink-0 whitespace-nowrap sm:w-3"
                >
                  {monthLabels[i]}
                </span>
              ))}
            </div>

            <div
              role="img"
              aria-label={`${totalContributions} GitHub contributions in the last year`}
              className="flex gap-0.75"
            >
              {weeks.map((week, i) => (
                <div
                  key={week.contributionDays[0].date}
                  // The first week is usually partial; push its days to the bottom rows.
                  className={`flex flex-col gap-0.75 ${i === 0 ? "justify-end" : ""}`}
                >
                  {week.contributionDays.map((day) => (
                    <span
                      key={day.date}
                      title={`${day.contributionCount} contribution${
                        day.contributionCount === 1 ? "" : "s"
                      } on ${formatDay(day.date)}`}
                      className={`size-2.5 rounded-xs sm:size-3 ${LEVEL_CLASS[day.contributionLevel]}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <figcaption className="flex flex-wrap items-center justify-between gap-2 text-xs text-fg-muted">
          <span className="tabular-nums">
            {totalContributions.toLocaleString("en-US")} contributions in the
            last year
          </span>
          <span className="flex items-center gap-1" aria-hidden>
            Less
            {LEVELS.map((level) => (
              <span
                key={level}
                className={`size-2.5 rounded-xs sm:size-3 ${LEVEL_CLASS[level]}`}
              />
            ))}
            More
          </span>
        </figcaption>
      </figure>
    </section>
  );
}

export default GithubActivity;
