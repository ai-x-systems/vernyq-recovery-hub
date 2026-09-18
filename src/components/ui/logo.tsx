interface LogoProps {
  className?: string;
  variant?: "full" | "icon" | "wordmark";
  color?: "dark" | "light";
}

/**
 * VERNYQ mark — a downward chevron "vessel" with a frozen ice layer across the
 * top of a recessed inner face.
 *
 * color="light" = for dark backgrounds (white/silver wordmark, white-topped icon).
 * color="dark"  = for light backgrounds (near-black wordmark, steel-topped icon
 *                 so the top edge doesn't disappear against white).
 */

// The icon is drawn in a 64x48 space — the mark is wider than it is tall.
const ICON_VIEWBOX = "0 0 64 48";

const OUTER_PATH = "M2.24 2.4 L61.76 2.4 L32 46.08 Z";
const INNER_PATH = "M18.75 7.2 L45.25 7.2 L32 35.76 Z";
const BEVEL_PATH = "M18.75 7.2 L22.27 7.2 L33.28 35.76 L32 35.76 Z";
const ICE_PATH =
  "M18.75 7.2 H45.25 V8.35 " +
  "C41.9 10.5, 38.5 6.8, 35.1 8.75 " +
  "C31.7 10.7, 28.3 7.1, 24.9 9.0 " +
  "C22.6 10.3, 20.6 9.5, 18.75 8.8 Z";

function IconDefs({ uid, color }: { uid: string; color: "dark" | "light" }) {
  const onLight = color === "dark";
  return (
    <defs>
      <linearGradient
        id={`${uid}-outer`}
        x1="32"
        y1="0"
        x2="32"
        y2="48"
        gradientUnits="userSpaceOnUse"
      >
        {onLight ? (
          <>
            <stop offset="0%" stopColor="#768EA6" />
            <stop offset="10%" stopColor="#7C98B2" />
            <stop offset="22%" stopColor="#6EA0C8" />
            <stop offset="38%" stopColor="#2896D7" />
            <stop offset="56%" stopColor="#008CDC" />
            <stop offset="100%" stopColor="#0064AF" />
          </>
        ) : (
          <>
            <stop offset="0%" stopColor="#FAFCFF" />
            <stop offset="10%" stopColor="#FAFCFF" />
            <stop offset="20%" stopColor="#B0BAC4" />
            <stop offset="34%" stopColor="#8CC8F0" />
            <stop offset="52%" stopColor="#008CDC" />
            <stop offset="100%" stopColor="#006EBE" />
          </>
        )}
      </linearGradient>

      <linearGradient
        id={`${uid}-inner`}
        x1="32"
        y1="0"
        x2="32"
        y2="48"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#043A68" />
        <stop offset="30%" stopColor="#043A68" />
        <stop offset="62%" stopColor="#03264C" />
        <stop offset="100%" stopColor="#021E3E" />
      </linearGradient>

      <linearGradient
        id={`${uid}-ice`}
        x1="32"
        y1="0"
        x2="32"
        y2="48"
        gradientUnits="userSpaceOnUse"
      >
        {onLight ? (
          <>
            <stop offset="0%" stopColor="#EEF6FC" />
            <stop offset="16%" stopColor="#E8F2FA" />
            <stop offset="24%" stopColor="#CDE2F2" />
            <stop offset="100%" stopColor="#B2CEE6" />
          </>
        ) : (
          <>
            <stop offset="0%" stopColor="#FAFCFF" />
            <stop offset="16%" stopColor="#FAFCFF" />
            <stop offset="24%" stopColor="#D7E8F5" />
            <stop offset="100%" stopColor="#B9D4EB" />
          </>
        )}
      </linearGradient>

      <clipPath id={`${uid}-clip`}>
        <path d={INNER_PATH} />
      </clipPath>
    </defs>
  );
}

function IconShapes({ uid }: { uid: string }) {
  return (
    <>
      <path d={OUTER_PATH} fill={`url(#${uid}-outer)`} />
      <path d={INNER_PATH} fill={`url(#${uid}-inner)`} />
      <g clipPath={`url(#${uid}-clip)`}>
        <path d={BEVEL_PATH} fill="#5A96C8" opacity="0.16" />
        <path d={ICE_PATH} fill={`url(#${uid}-ice)`} />
      </g>
    </>
  );
}

export function VernyqLogo({
  className = "",
  variant = "full",
  color = "dark",
}: LogoProps) {
  // Unique gradient ids per variant/colour so header and footer marks don't collide.
  const uid = `vernyq-${variant}-${color}`;
  const textPrimary = color === "dark" ? "#0B1119" : "#F2F6FA";
  const textGradient =
    color === "dark"
      ? "linear-gradient(180deg, #111821 0%, #0B1119 55%, #05090F 100%)"
      : "linear-gradient(180deg, #FFFFFF 0%, #F2F6FA 45%, #C4D0DC 100%)";

  if (variant === "icon") {
    return (
      <svg
        className={className}
        viewBox={ICON_VIEWBOX}
        fill="none"
        role="img"
        aria-label="VERNYQ"
        xmlns="http://www.w3.org/2000/svg"
      >
        <IconDefs uid={uid} color={color} />
        <IconShapes uid={uid} />
      </svg>
    );
  }

  if (variant === "wordmark") {
    return (
      <svg
        className={className}
        viewBox="0 0 200 40"
        fill="none"
        role="img"
        aria-label="VERNYQ"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="0"
          y="30"
          fontFamily="Poppins, Inter, sans-serif"
          fontSize="28"
          fontWeight="500"
          letterSpacing="0.11em"
          fill={textPrimary}
        >
          VERNYQ
        </text>
      </svg>
    );
  }

  // Full lockup: chevron icon + wordmark, side by side.
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Sized to the reference lockup ratio: icon height ~1.34x the wordmark
          font size, and the mark is 4:3, so width = height * 4/3. */}
      <svg
        className="h-[1.7rem] w-[2.27rem] lg:h-[1.8rem] lg:w-[2.4rem] shrink-0"
        viewBox={ICON_VIEWBOX}
        fill="none"
        role="img"
        aria-label="VERNYQ"
        xmlns="http://www.w3.org/2000/svg"
      >
        <IconDefs uid={uid} color={color} />
        <IconShapes uid={uid} />
      </svg>
      <span
        className="text-xl lg:text-[1.35rem] font-medium tracking-[0.11em] leading-none"
        style={{
          fontFamily: "Poppins, Inter, sans-serif",
          color: textPrimary,
          backgroundImage: textGradient,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        VERNYQ
      </span>
    </div>
  );
}
