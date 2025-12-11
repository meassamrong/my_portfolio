import { useCallback, useEffect, useMemo, useState } from "react";
import { GitBranch, Github, Globe } from "lucide-react";
import GithubGraph from "./GithubGraph";

const defaultCopy = {
  title: "GitHub Contributions",
  subtitle: (username) => `Live data from GitHub GraphQL API • ${username}`,
  contributionMessages: {
    loading: "Loading contributions...",
    sampleFallback: "Showing sample data.",
    success: "Live contributions fetched successfully.",
  },
  statsMessages: {
    loading: "Loading GitHub stats...",
    fallback: "Showing default stats.",
    success: "Live GitHub stats loaded.",
  },
  statLabels: {
    followers: "Followers",
    following: "Following",
    repositories: "Repositories",
    commits: "Commits",
  },
  graphCopy: {
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
};

const GithubSection = ({ stats, copy }) => {
  const resolvedCopy = useMemo(
    () => ({
      ...defaultCopy,
      ...copy,
      contributionMessages: { ...defaultCopy.contributionMessages, ...(copy?.contributionMessages || {}) },
      statsMessages: { ...defaultCopy.statsMessages, ...(copy?.statsMessages || {}) },
      statLabels: { ...defaultCopy.statLabels, ...(copy?.statLabels || {}) },
      graphCopy: { ...defaultCopy.graphCopy, ...(copy?.graphCopy || {}) },
    }),
    [copy]
  );
  const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
  const username = (
    import.meta.env.VITE_GITHUB_USERNAME || "meassamrong"
  ).trim();
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, idx) => currentYear - idx);
  }, []);

  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [yearData, setYearData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statsLoading, setStatsLoading] = useState(false);
  const [liveStats, setLiveStats] = useState(null);
  const [statsError, setStatsError] = useState("");

  const fetchContributions = useCallback(
    async (year) => {
      if (!githubToken) {
        setYearData((prev) => ({
          ...prev,
          [year]: { weeks: null, total: null, isSample: true },
        }));
        setError("Add VITE_GITHUB_TOKEN to load live GitHub contributions.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const from = new Date(Date.UTC(year, 0, 1)).toISOString();
        const to = new Date(Date.UTC(year + 1, 0, 1)).toISOString();

        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${githubToken}`,
          },
          body: JSON.stringify({
            query: `
              query ($login: String!, $from: DateTime!, $to: DateTime!) {
                user(login: $login) {
                  contributionsCollection(from: $from, to: $to) {
                    contributionCalendar {
                      totalContributions
                      weeks {
                        firstDay
                        contributionDays {
                          color
                          date
                          contributionCount
                        }
                      }
                    }
                  }
                }
              }
            `,
            variables: { login: username, from, to },
          }),
        });

        if (!response.ok) {
          throw new Error(
            `GitHub API error (${response.status}): ${response.statusText}`
          );
        }

        const payload = await response.json();

        if (payload.errors?.length) {
          throw new Error(
            payload.errors[0].message || "GitHub API returned an error."
          );
        }

        const calendar =
          payload?.data?.user?.contributionsCollection?.contributionCalendar;

        if (!calendar) {
          throw new Error("No contribution data returned for this year.");
        }

        setYearData((prev) => ({
          ...prev,
          [year]: {
            weeks: calendar.weeks,
            total: calendar.totalContributions,
            isSample: false,
          },
        }));
      } catch (err) {
        setError(err.message || "Unable to load contributions.");
        setYearData((prev) => ({
          ...prev,
          [year]: { weeks: null, total: null, isSample: true },
        }));
      } finally {
        setLoading(false);
      }
    },
    [githubToken, username]
  );

  const fetchProfileStats = useCallback(async () => {
    if (!githubToken) {
      setLiveStats(null);
      setStatsError("Add VITE_GITHUB_TOKEN to load live GitHub stats.");
      return;
    }

    setStatsLoading(true);
    setStatsError("");

    try {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${githubToken}`,
        },
        body: JSON.stringify({
          query: `
            query ($login: String!) {
              user(login: $login) {
                followers { totalCount }
                following { totalCount }
                repositories(privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false) {
                  totalCount
                }
                contributionsCollection(from: "2008-01-01T00:00:00Z") {
                  totalCommitContributions
                  restrictedContributionsCount
                }
              }
            }
          `,
          variables: { login: username },
        }),
      });

      if (!response.ok) {
        throw new Error(`GitHub API error (${response.status})`);
      }

      const payload = await response.json();

      if (payload.errors?.length) {
        throw new Error(
          payload.errors[0].message || "GitHub API returned an error."
        );
      }

      const user = payload?.data?.user;
      if (!user) {
        throw new Error("GitHub user not found.");
      }

      const commits = "4000+/Year";

      setLiveStats([
        {
          label: resolvedCopy.statLabels.followers,
          value: user.followers?.totalCount ?? "—",
          icon: <Github className="w-5 h-5 text-blue-400" />,
        },
        {
          label: resolvedCopy.statLabels.following,
          value: user.following?.totalCount ?? "—",
          icon: <Github className="w-5 h-5 text-blue-400" />,
        },
        {
          label: resolvedCopy.statLabels.repositories,
          value: user.repositories?.totalCount ?? "—",
          icon: <GitBranch className="w-5 h-5 text-pink-400" />,
          valColor: "text-pink-400",
        },
        {
          label: resolvedCopy.statLabels.commits,
          value: commits.toLocaleString(resolvedCopy.graphCopy.locale),
          icon: <Globe className="w-5 h-5 text-blue-400" />,
        },
      ]);
    } catch (err) {
      setStatsError(err.message || "Unable to load GitHub stats.");
      setLiveStats(null);
    } finally {
      setStatsLoading(false);
    }
  }, [githubToken, username, resolvedCopy.graphCopy.locale, resolvedCopy.statLabels]);

  useEffect(() => {
    const data = yearData[selectedYear];
    const shouldRetrySampleWithToken = data?.isSample && !!githubToken;
    if (data && !shouldRetrySampleWithToken) return;

    fetchContributions(selectedYear);
  }, [selectedYear, yearData, fetchContributions, githubToken]);

  useEffect(() => {
    fetchProfileStats();
  }, [fetchProfileStats]);

  const activeYearData = yearData[selectedYear] || {};
  const displayStats = liveStats || stats;

  return (
    <section>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-linear-to-br from-gray-700/50 to-gray-600/50 rounded-xl border border-gray-600/30">
            <Github className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white py-2">{resolvedCopy.title}</h2>
            <p className="text-gray-400 text-sm mt-1">{resolvedCopy.subtitle(username)}</p>
          </div>
        </div>
        <div className="h-px bg-linear-to-r from-gray-500/50 to-transparent w-full" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:items-start">
        <div className="flex-1 space-y-3">
          <GithubGraph
            username={username}
            selectedYear={selectedYear}
            contributionTotal={activeYearData.total}
            contributionWeeks={activeYearData.weeks}
            isSample={activeYearData.isSample}
            copy={resolvedCopy.graphCopy}
          />

          <div className="text-xs text-gray-400 flex items-center gap-2">
            <span>
              {loading && resolvedCopy.contributionMessages.loading}
              {!loading && error && `${resolvedCopy.contributionMessages.sampleFallback} ${error}`}
              {!loading && !error && resolvedCopy.contributionMessages.success}
            </span>
          </div>
        </div>

        <div className="flex md:flex-col gap-2 md:min-w-24">
          {years.map((year) => {
            const isActive = year === selectedYear;
            return (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg border text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30"
                    : "bg-gray-900/40 text-gray-200 border-gray-700 hover:border-blue-400/60"
                }`}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-[90%] lg:w-[80%] xl:w-[78%] mx-auto mt-8">
        {displayStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-900/30 border border-blue-500/20 hover:bg-gray-800/50 transition-all duration-300 flex flex-col items-center justify-center p-4 rounded-lg text-center h-[85px]"
          >
            <div className="mb-1">{stat.icon}</div>
            <p className="text-xs font-medium text-gray-400">{stat.label}</p>
            <p className={`text-sm font-bold ${stat.valColor || "text-white"}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-400 flex items-center gap-2 mt-3">
        <span>
          {statsLoading && resolvedCopy.statsMessages.loading}
          {!statsLoading && statsError && `${resolvedCopy.statsMessages.fallback} ${statsError}`}
          {!statsLoading && !statsError && resolvedCopy.statsMessages.success}
        </span>
      </div>
    </section>
  );
};

export const githubDefaultStats = (statLabels = defaultCopy.statLabels) => [
  {
    label: statLabels.followers,
    value: "10+",
    icon: <Github className="w-5 h-5 text-blue-400" />,
  },
  {
    label: statLabels.following,
    value: "5+",
    icon: <Github className="w-5 h-5 text-blue-400" />,
  },
  {
    label: statLabels.repositories,
    value: "15+",
    icon: <GitBranch className="w-5 h-5 text-pink-400" />,
    valColor: "text-pink-400",
  },
  {
    label: statLabels.commits,
    value: "500+",
    icon: <Globe className="w-5 h-5 text-blue-400" />,
  },
];

export default GithubSection;
