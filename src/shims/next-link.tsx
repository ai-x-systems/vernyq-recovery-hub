import { Link as RouterLink } from "react-router-dom";
import { type ComponentProps } from "react";

type NextLinkProps = ComponentProps<"a"> & { href: string; replace?: boolean; scroll?: boolean; prefetch?: boolean | null };

export default function Link({ href, children, className, onClick, ...props }: NextLinkProps) {
  return (
    <RouterLink to={href} className={className} onClick={onClick}>
      {children}
    </RouterLink>
  );
}
