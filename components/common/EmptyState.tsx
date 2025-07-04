import { cn } from "@/lib/utils";

const EmptyState = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <div
    className={cn(
      `flex flex-col items-center justify-center text-gray-400`,
      className
    )}
  >
    <svg
      className="w-16 h-16 mb-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M19 5H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2z"
        strokeLinecap="round"
      />
      <path d="M12 12h.01M8 12h.01M16 12h.01" strokeLinecap="round" />
    </svg>
    <p className="text-sm">{text}</p>
  </div>
);

export default EmptyState;
