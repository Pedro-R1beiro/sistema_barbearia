import { twMerge } from "tailwind-merge";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export function Header({ children, className }: HeaderProps) {
  return (
    <header
      className={twMerge(
        "bg-accent-foreground/70 text-background relative flex max-w-full min-w-full items-center justify-end rounded-md px-2 py-3 shadow-xs backdrop-blur-sm",
        className,
      )}
    >
      <a
        href="#"
        className="bg-background absolute left-0 rounded-l-[0.40rem] rounded-r-[1.5rem] px-3 py-2"
      >
        <div className="bg-foreground rounded-full p-2 py-[0.8rem] font-bold">
          logo
        </div>
      </a>
      {children}
    </header>
  );
}
