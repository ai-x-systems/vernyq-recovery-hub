import { type ImgHTMLAttributes, forwardRef } from "react";

interface NextImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number | string;
  unoptimized?: boolean;
  className?: string;
  style?: React.CSSProperties;
  loader?: (p: { src: string; width: number; quality?: number }) => string;
}

const Image = forwardRef<HTMLImageElement, NextImageProps>(function Image(
  { src, alt, width, height, fill, className, style, priority, ...props },
  ref
) {
  if (fill) {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt || ""}
        className={className}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style }}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      className={className}
      style={style}
      loading={priority ? "eager" : "lazy"}
    />
  );
});

export default Image;
