import { scrollToTop } from "@/utils/scroll-to-top";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export function Header({ children, className }: HeaderProps) {
  return (
    <header
      className={twMerge(
        "bg-accent-foreground/70 text-background relative flex max-w-[1152px] min-w-full items-center justify-end rounded-md px-4 py-3 shadow-xs backdrop-blur-sm",
        className,
      )}
    >
      <button
        onClick={scrollToTop}
        className="bg-background absolute left-0 h-full rounded-l-[0.25rem] rounded-r-[1.5rem] px-3 py-2"
      >
        <div className="bg-foreground rounded-full p-2 py-[0.8rem] font-bold">
          logo
        </div>
      </button>
      {children}
    </header>
  );
}
