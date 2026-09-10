import Link from "next/link";

/** CTA jako pełne pole siatki w sygnale — jedno na ekran (dewiacja #5). */
export default function CtaPole({
  href = "/kontakt",
  label = "Umów rozmowę",
  className = "s-cta",
}: {
  href?: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link className={`cta ${className}`.trim()} href={href}>
      <span>{label}</span>
      <span aria-hidden="true">&gt;</span>
    </Link>
  );
}
