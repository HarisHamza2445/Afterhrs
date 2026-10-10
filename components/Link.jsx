import NextLink from "next/link";
import { toHref } from "@/lib/navigation";

export function Link({ to, children, ...rest }) {
  return (
    <NextLink href={toHref(to)} {...rest}>
      {children}
    </NextLink>
  );
}
