interface SpecTableProps {
  specifications: Record<string, string>;
}

export function SpecTable({ specifications }: SpecTableProps) {
  return (
    <div className="border border-[#e0ddd8] rounded-[0.5rem] overflow-hidden">
      {Object.entries(specifications).map(([key, value], index) => (
        <div
          key={key}
          className={`flex flex-col sm:flex-row sm:items-center ${
            index !== 0 ? "border-t border-[#e0ddd8]" : ""
          }`}
        >
          <div className="sm:w-1/3 px-5 py-3.5 bg-[#f3f1ee]">
            <span className="text-body-sm font-medium text-[#1a1a1a]">
              {key}
            </span>
          </div>
          <div className="sm:w-2/3 px-5 py-3.5">
            <span className="text-body-sm text-[#555555]">{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
