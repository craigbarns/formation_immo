import { cn } from "@/lib/utils";

type SkeletonVariant = "card" | "text" | "avatar" | "stat" | "list" | "banner";

interface SkeletonLoaderProps {
  variant?: SkeletonVariant;
  className?: string;
  count?: number;
}

function SkeletonItem({ variant, className }: { variant: SkeletonVariant; className?: string }) {
  const base = "animate-pulse rounded-2xl bg-zinc-100/80";

  switch (variant) {
    case "card":
      return <div className={cn(base, "h-40", className)} />;
    case "text":
      return (
        <div className={cn("space-y-2", className)}>
          <div className={cn(base, "h-4 w-3/4")} />
          <div className={cn(base, "h-4 w-1/2")} />
        </div>
      );
    case "avatar":
      return (
        <div className={cn("flex items-center gap-3", className)}>
          <div className={cn(base, "h-10 w-10 rounded-full")} />
          <div className="flex-1 space-y-2">
            <div className={cn(base, "h-3 w-24")} />
            <div className={cn(base, "h-2.5 w-16")} />
          </div>
        </div>
      );
    case "stat":
      return (
        <div className={cn("space-y-3 rounded-2xl border border-zinc-100 bg-white p-5", className)}>
          <div className={cn(base, "h-4 w-20")} />
          <div className={cn(base, "h-8 w-16")} />
        </div>
      );
    case "list":
      return (
        <div className={cn("space-y-3", className)}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={cn(base, "h-12")} />
          ))}
        </div>
      );
    case "banner":
      return <div className={cn(base, "h-48", className)} />;
    default:
      return <div className={cn(base, "h-20", className)} />;
  }
}

export function SkeletonLoader({ variant = "card", className, count = 1 }: SkeletonLoaderProps) {
  if (count <= 1) {
    return <SkeletonItem variant={variant} className={className} />;
  }

  return (
    <div className={cn("grid gap-4", variant === "stat" && "grid-cols-2 md:grid-cols-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonItem key={i} variant={variant} />
      ))}
    </div>
  );
}
