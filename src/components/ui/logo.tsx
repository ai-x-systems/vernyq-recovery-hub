interface LogoProps {
  className?: string;
  variant?: "full" | "icon" | "wordmark";
  color?: "dark" | "light";
}

export function VernyqLogo({
  className = "",
  variant = "full",
  color = "dark",
}: LogoProps) {
  const textPrimary = color === "dark" ? "#0A182E" : "#FFFFFF";

  if (variant === "icon") {
    return (
      <svg
        className={className}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="vgrad-icon" x1="24" y1="8" x2="24" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#3399FF" />
          </linearGradient>
        </defs>
        <path
          d="M10 12L24 38L38 12H31L24 28L17 12H10Z"
          fill="url(#vgrad-icon)"
        />
      </svg>
    );
  }

  if (variant === "wordmark") {
    return (
      <svg
        className={className}
        viewBox="0 0 200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="0"
          y="32"
          fontFamily="Inter, sans-serif"
          fontSize="30"
          fontWeight="700"
          letterSpacing="0.18em"
          fill={textPrimary}
        >
          VERNYQ
        </text>
      </svg>
    );
  }

  // Full logo: gradient V icon + wordmark
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        className="h-8 w-8 lg:h-9 lg:w-9 shrink-0"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="vgrad-full" x1="24" y1="8" x2="24" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#3399FF" />
          </linearGradient>
        </defs>
        <path
          d="M10 12L24 38L38 12H31L24 28L17 12H10Z"
          fill="url(#vgrad-full)"
        />
      </svg>
      <span
        className="text-xl lg:text-[1.35rem] font-bold tracking-[0.18em] leading-none"
        style={{ color: textPrimary, fontFamily: "Inter, sans-serif" }}
      >
        VERNYQ
      </span>
    </div>
  );
}
