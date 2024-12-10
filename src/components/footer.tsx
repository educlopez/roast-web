import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t mb-14 md:mb-20">
      <div className="max-w-7xl mx-auto justify-center items-center gap-1 flex flex-col items-align-center">
        <p className="text-sm text-zinc-600">
          Los roast son un micro servicio de
        </p>
        <a
          href="https://educalvolopez.com/"
          target="_blank"
          className="text-sm text-zinc-600 justify-center items-center gap-2 flex flex-row items-align-center group"
        >
          <div className="shrink-0 flex gap-2 p-0.5 shadow-neutral-soft bg-white rounded-full h-8 w-8 group-hover:shadow-neutral-soft-hover">
            <Image
              src="/pixel-edu-calvo.png"
              alt="avatar Edu"
              width={56}
              height={56}
              className="shrink-0 rounded-full "
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
