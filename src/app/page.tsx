import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">Half-Blood Coder</h1>
        <div className="flex gap-4">
          <a href="https://github.com/Jayant-Jeet" target="_blank" rel="noopener noreferrer">
            <Image src="/github-60.svg" alt="GitHub" width={24} height={24} />
          </a>
          <a href="https://linkedin.com/in/jjtomar" target="_blank" rel="noopener noreferrer">
            <Image src="/linkedin-100.svg" alt="LinkedIn" width={24} height={24} />
          </a>
        </div>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-xl">Coming soon.</p>
      </main>
    </div>
  );
}
