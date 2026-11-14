const panel =
  "box-border flex w-[22rem] min-w-[22rem] max-w-[22rem] flex-col gap-0 overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-0 shadow-2xl outline-none dark:border-zinc-700 dark:bg-zinc-900";

const trigger =
  "inline-flex size-10 h-10 w-10 min-h-10 min-w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-white p-0 text-lg leading-none shadow-sm outline-none transition-[border-color,box-shadow,background-color] duration-150 hover:bg-zinc-50 focus-visible:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-400/40 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800";

const searchWrap = "p-3 pb-2";

const search =
  "flex h-10 min-h-10 items-center gap-2 overflow-hidden rounded-2xl border border-zinc-300 bg-white px-3 shadow-none focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/80 dark:border-zinc-600 dark:bg-zinc-950";

const searchField =
  "h-auto min-h-0 min-w-0 flex-1 border-0 bg-transparent px-0 py-0 text-sm leading-none shadow-none outline-none ring-0 placeholder:text-zinc-400 dark:placeholder:text-zinc-500";

const searchWave = "shrink-0 text-base leading-none";

const grid =
  "flex max-h-[17.5rem] flex-col gap-0 overflow-y-auto px-2 pb-2";

const row = "grid grid-cols-6 gap-0.5";

const cell =
  "flex size-10 h-10 w-10 min-h-10 min-w-10 items-center justify-center rounded-2xl p-0 text-[1.4rem] leading-none outline-none transition-colors hover:bg-zinc-200 aria-selected:bg-zinc-300 data-highlighted:bg-zinc-200 data-selected:bg-zinc-300 dark:hover:bg-zinc-700 dark:aria-selected:bg-zinc-600 dark:data-highlighted:bg-zinc-700 dark:data-selected:bg-zinc-600";

const categoryBar =
  "flex w-full flex-nowrap items-center justify-start gap-1 overflow-x-auto overscroll-x-contain border-t border-zinc-200 p-0 px-2.5 py-2 [-ms-overflow-style:none] [scrollbar-width:none] dark:border-zinc-700 [&::-webkit-scrollbar]:hidden";

const category =
  "relative m-0 flex size-8 h-8 w-8 min-h-8 min-w-8 shrink-0 items-center justify-center rounded-2xl border-0 bg-transparent p-0 text-[1.125rem] leading-none opacity-80 outline-none hover:bg-zinc-200/80 hover:opacity-100 data-pressed:bg-zinc-200 data-pressed:opacity-100 dark:hover:bg-zinc-800 dark:data-pressed:bg-zinc-700";

const empty = "px-2 py-8 text-center text-sm text-zinc-500";

export {
  category,
  categoryBar,
  cell,
  empty,
  grid,
  panel,
  row,
  search,
  searchField,
  searchWave,
  searchWrap,
  trigger,
};