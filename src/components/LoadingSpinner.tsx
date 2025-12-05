import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

const LoadingSpinner = ({ size = "md", className, text }: LoadingSpinnerProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-amber-500/20" />
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 animate-spin" />
        {/* Inner glow */}
        <div className="absolute inset-1 rounded-full bg-amber-500/10 animate-pulse" />
      </div>
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
};

// Full page loading overlay
export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Logo */}
        <h1 className="text-3xl font-serif font-semibold tracking-tight animate-pulse">
          <span className="text-foreground">DEBU</span>
          <span className="text-gradient-gold">TIFY</span>
        </h1>

        {/* Animated loader */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-amber-500"
              style={{
                animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`,
              }}
            />
          ))}
        </div>

        <p className="text-sm text-muted-foreground">Loading premium experience...</p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

// Skeleton loading for cards
export const ProductCardSkeleton = () => {
  return (
    <div className="glass rounded-2xl overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-[3/4] bg-secondary/50" />

      {/* Content placeholder */}
      <div className="p-5 space-y-3">
        <div className="h-3 w-16 bg-secondary rounded" />
        <div className="h-4 w-3/4 bg-secondary rounded" />
        <div className="h-3 w-20 bg-secondary rounded" />
        <div className="h-5 w-24 bg-secondary rounded" />
      </div>
    </div>
  );
};

// Section loading skeleton
export const SectionSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header skeleton */}
      <div className="text-center mb-12 space-y-4 animate-pulse">
        <div className="h-3 w-20 bg-secondary rounded mx-auto" />
        <div className="h-8 w-64 bg-secondary rounded mx-auto" />
        <div className="h-4 w-96 bg-secondary rounded mx-auto" />
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

// Button loading state
export const ButtonLoader = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        className="animate-spin h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
