import { Skeleton } from "./ui/skeleton";

export function AppointmentDialogSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-5.5 w-40" />
        <Skeleton className="h-5.5 w-60" />
      </div>
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-5.5 w-40" />
        <Skeleton className="h-5.5 w-60" />
      </div>
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-5.5 w-40" />
        <Skeleton className="h-5.5 w-60" />
      </div>
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-5.5 w-40" />
        <Skeleton className="h-5.5 w-60" />
      </div>
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-5.5 w-40" />
        <Skeleton className="h-5.5 w-60" />
      </div>
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-5.5 w-40" />
        <Skeleton className="h-5.5 w-60" />
      </div>
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-5.5 w-40" />
        <Skeleton className="h-5.5 w-60" />
      </div>
    </div>
  );
}
