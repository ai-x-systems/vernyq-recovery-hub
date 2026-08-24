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
  const primary = color === "dark" ? "#0A182E" : "#FFFFFF";
  const accent = "#0084FF";
  const tagColor = color === "dark" ? "#0A182E" : "#FFFFFF";

  if (variant === "icon") {
    return (
      <svg
        className={className}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* V icon with water droplet accent */}
        <path
          d="M8 10L24 40L40 10H33L24 30L15 10H8Z"
          fill={primary}
        />
        {/* Water drop accent */}
        <path
          d="M24 8C24 8 21 13 21 15C21 16.6569 22.3431 18 24 18C25.6569 18 27 16.6569 27 15C27 13 24 8 24 8Z"
          fill={accent}
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
          fontWeight="600"
          letterSpacing="0.18em"
          fill={primary}
        >
          VERNYQ
        </text>
      </svg>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      {/* Icon + Wordmark */}
      <div className="flex items-center gap-3">
        {/* V Icon */}
        <svg
          className="h-8 w-8 lg:h-10 lg:w-10"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 10L24 40L40 10H33L24 30L15 10H8Z"
            fill={primary}
          />
          <path
            d="M24 8C24 8 21 13 21 15C21 16.6569 22.3431 18 24 18C25.6569 18 27 16.6569 27 15C27 13 24 8 24 8Z"
            fill={accent}
          />
        </svg>
        {/* Wordmark */}
        <span
          className="text-xl lg:text-2xl font-semibold tracking-[0.18em]"
          style={{ color: primary, fontFamily: "Inter, sans-serif" }}
        >
          VERNYQ
        </span>
      </div>
      {/* Tagline */}
      <span
        className="text-[0.5rem] lg:text-[0.6rem] tracking-[0.25em] uppercase font-medium"
        style={{ color: tagColor, opacity: 0.6, fontFamily: "Inter, sans-serif" }}
      >
        Cold. Clear. Powerful.
      </span>
    </div>
  );
}
