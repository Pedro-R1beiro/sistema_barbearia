import { cn } from "@/lib/utils";
import { scrollToTop } from "@/utils/scroll-to-top";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export function Header({ children, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "bg-sidebar-accent border-2 relative border-card rounded-md p-2",
        className,
      )}
    >
      <button
        onClick={scrollToTop}
        className="absolute top-1/2 bg-sidebar-accent -translate-y-1/2 -left-2.5 border-card border-10 p-2 py-3 rounded-full"
      >
        logo
      </button>
      {children}
    </header>
  );
}
