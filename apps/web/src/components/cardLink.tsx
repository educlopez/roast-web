import Link from "next/link";
import Image from "next/image";

interface CardLinkProps {
  href: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  subtitle: string;
  target?: string;
  rel?: string;
}

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
        href={href}
        target={target}
        rel={rel}
        className="transition-all hover:shadow-neutral-soft-hover text-sm text-zinc-950 shadow-neutral-soft p-1 pr-3 rounded-lg flex items-center gap-3 bg-zinc-100 border border-white"
      >
        <Image
          src={imgSrc}
          alt={imgAlt}
          loading="lazy"
          width={64}
          height={44}
          className="object-cover shadow-neutral-soft rounded-[4px]"
        />
        <span className="text-xs flex flex-col text-left">
          <span className="text-zinc-950">{title}</span>
          <span className="text-zinc-600">{subtitle}</span>
        </span>
      </Link>
    </div>
  );
}
