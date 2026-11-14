import { FruitSelect } from "./fruit-select";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-100 px-6 py-16 dark:bg-zinc-950">
      <main className="flex w-full max-w-sm flex-col gap-5 rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Choose a fruit
        </h1>
        <FruitSelect />
      </main>
    </div>
  );
}
