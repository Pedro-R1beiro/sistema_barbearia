import { ArrowDown } from "lucide-react";

export function SeparationArrow() {
  return (
    <div className="flex items-center gap-6">
      <div className="bg-muted-foreground h-0.5 w-full" />
      <span className="rounded-full bg-[#303030] p-3 shadow-2xl md:p-5">
        <ArrowDown className="md:text-40 text-background dark:text-foreground" />
      </span>
      <div className="bg-muted-foreground h-0.5 w-full" />
    </div>
  );
}
