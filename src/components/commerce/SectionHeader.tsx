interface SectionHeaderProps {
  overline?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  overline,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {overline && (
        <p className="text-overline text-[#4a7c8a] mb-3">{overline}</p>
      )}
      <h2 className="text-h2 text-[#1a1a1a]">{title}</h2>
      {description && (
        <p className="text-body-lg text-[#555555] mt-4 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
