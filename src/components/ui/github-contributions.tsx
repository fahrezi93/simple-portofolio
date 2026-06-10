"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import type { Activity } from "@/components/ui/contribution-graph"
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/ui/contribution-graph"

export function GitHubContributions({
  username,
  githubProfileUrl,
  className,
}: {
  username: string
  githubProfileUrl: string
  className?: string
}) {
  const [data, setData] = useState<Activity[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(r => {
        if (!r.ok) throw new Error("Failed to fetch")
        return r.json()
      })
      .then(d => setData(d.contributions))
      .catch(e => setError(e.message))
  }, [username])

  if (error) {
    return <div className="text-red-500 text-sm">Failed to load GitHub activity: {error}</div>
  }

  if (!data) {
    return <GitHubContributionsFallback />
  }

  return (
    <TooltipProvider>
      <ContributionGraph
        className={cn("mx-auto py-2", className)}
        data={data}
        blockSize={11}
        blockMargin={3}
        blockRadius={2}
      >
        <ContributionGraphCalendar
          className="no-scrollbar px-2"
          title="GitHub Contributions"
        >
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <g>
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                  />
                </g>
              </TooltipTrigger>
              <TooltipContent className="font-sans">
                <p>
                  {activity.count} contribution{activity.count > 1 || activity.count === 0 ? "s" : null}{" "}
                  on {format(new Date(activity.date), "dd.MM.yyyy")}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="px-2">
          <ContributionGraphTotalCount>
            {({ totalCount, year }) => (
              <div className="text-muted-foreground text-sm">
                {totalCount.toLocaleString("en")} contributions in the last year on{" "}
                <a
                  className="text-foreground hover:underline font-medium"
                  href={githubProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                .
              </div>
            )}
          </ContributionGraphTotalCount>

          <ContributionGraphLegend />
        </ContributionGraphFooter>
      </ContributionGraph>
    </TooltipProvider>
  )
}

export function GitHubContributionsFallback() {
  return (
    <div className="flex h-40 w-full items-center justify-center">
      <Spinner className="text-muted-foreground" />
    </div>
  )
}
