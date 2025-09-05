import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface CardSkeletonProps {
  portraitModeOnLg: boolean;
}

export function CardSkeleton({ portraitModeOnLg }: CardSkeletonProps) {
  return (
    <Card className="shadow-2xl lg:min-w-85">
      <CardHeader>
        <Skeleton
          className={cn(
            "h-9 w-60 max-w-full md:w-120",
            portraitModeOnLg ? "lg:w-60" : "lg:w-75",
          )}
        />
      </CardHeader>
      <div
        className={cn(
          "md:flex md:justify-between md:gap-6",
          portraitModeOnLg && "lg:flex-col",
        )}
      >
        <CardContent className="flex flex-col gap-6">
          <div className="flex h-full flex-col gap-6 md:justify-between">
            <div>
              <ul className="space-y-4">
                <li>
                  <Skeleton className="h-6 w-64" />
                </li>
                <li>
                  <Skeleton className="h-6 w-48" />
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-4 w-48" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-6 md:mt-0 md:w-1/2 lg:mt-6 lg:w-full">
          <div className="w-full max-w-full space-y-5 md:flex md:flex-col md:justify-between md:gap-6 lg:gap-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
