import Image from "next/image";
import Link from "next/link";

type CardLinkProps = {
  href: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  subtitle: string;
  target?: string;
  rel?: string;
};

export function CardLink({
  href,
  imgSrc,
  imgAlt,
  title,
  subtitle,
  target = "_self",
  rel,
}: CardLinkProps) {
  return (
    <div className="relative z-inherit transform-none">
      <Link
        className="flex items-center gap-3 rounded-lg border border-white bg-light-background-secondary p-1 pr-3 text-light-primary text-sm shadow-neutral-soft transition-all hover:shadow-neutral-soft-hover"
        href={href}
        rel={rel}
        target={target}
      >
        <Image
          alt={imgAlt}
          className="rounded-[4px] object-cover shadow-neutral-soft"
          height={44}
          loading="lazy"
          src={imgSrc}
          width={64}
        />
        <span className="flex flex-col text-left text-xs">
          <span className="text-light-primary">{title}</span>
          <span className="text-light-secondary">{subtitle}</span>
        </span>
      </Link>
    </div>
  );
}
