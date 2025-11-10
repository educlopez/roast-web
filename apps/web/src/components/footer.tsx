import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mb-14 border-t px-4 py-8 md:mb-20">
      <div className="items-align-center mx-auto flex max-w-7xl flex-col items-center justify-center gap-1">
        <p className="text-sm text-zinc-600">
          Los roast son un micro servicio de
        </p>
        <a
          className="items-align-center group flex flex-row items-center justify-center gap-2 text-sm text-zinc-600"
          href="https://educalvolopez.com/"
          rel="noopener"
          target="_blank"
        >
          <div className="flex h-8 w-8 shrink-0 gap-2 rounded-full bg-white p-0.5 shadow-neutral-soft group-hover:shadow-neutral-soft-hover">
            <Image
              alt="avatar Edu"
              className="shrink-0 rounded-full"
              height={56}
              src="https://github.com/educlopez.png"
              width={56}
            />
          </div>
          <span className="group-hover:underline group-hover:underline-offset-2">
            Edu Calvo
          </span>
        </a>
      </div>
    </footer>
  );
}
