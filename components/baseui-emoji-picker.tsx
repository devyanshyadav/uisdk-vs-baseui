"use client";

import { Input } from "@base-ui/react/input";
import { Popover } from "@base-ui/react/popover";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { useMemo, useRef, useState } from "react";
import { categories, itemsFor, rowsOf } from "@/lib/emoji-catalog";
import { SearchIcon } from "./search-icon";
import {
  category as categoryClass,
  categoryBar,
  cell as cellClass,
  empty,
  grid,
  panel,
  row,
  search,
  searchField,
  searchWave,
  searchWrap,
  trigger,
} from "@/lib/picker-styles";

function BaseUiEmojiPicker({ columns = 6 }: { columns?: number }) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("smileys");
  const visibleItems = useMemo(
    () => itemsFor(category, query),
    [category, query],
  );

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label="Add emoji"
        className={`${trigger} data-popup-open:border-zinc-400 data-popup-open:ring-2 data-popup-open:ring-zinc-400/40`}
      >
        {value ?? "😀"}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup
            initialFocus={searchRef}
            className={`origin-[var(--transform-origin)] ${panel} transition-[opacity,scale] duration-150 ease-out data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 motion-reduce:transition-none`}
          >
            <Popover.Title className="sr-only">Emoji</Popover.Title>
            <div className={searchWrap}>
              <label className={search}>
                <SearchIcon />
                <Input
                  ref={searchRef}
                  id="baseui-emoji-search"
                  type="search"
                  aria-label="Search emoji"
                  placeholder="Search emoji..."
                  value={query}
                  onValueChange={setQuery}
                  className={searchField}
                />
                <span aria-hidden="true" className={searchWave}>
                  👋
                </span>
              </label>
            </div>
            <div role="grid" aria-label="Emoji" className={grid}>
              {visibleItems.length === 0 ? (
                <p className={empty}>No emoji match that search.</p>
              ) : (
                rowsOf(visibleItems, columns).map((items) => {
                  const first = items[0];
                  if (!first) return null;
                  return (
                    <div key={first.value} role="row" className={row}>
                      {items.map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          role="gridcell"
                          aria-label={item.label}
                          aria-selected={value === item.value}
                          className={cellClass}
                          onClick={() => {
                            setValue(item.value);
                            setOpen(false);
                          }}
                        >
                          {item.value}
                        </button>
                      ))}
                    </div>
                  );
                })
              )}
            </div>
            <ToggleGroup
              value={[category]}
              aria-label="Emoji categories"
              className={categoryBar}
              onValueChange={(next) => {
                const selected = next[0];
                if (selected) {
                  setCategory(selected);
                  setQuery("");
                }
              }}
            >
              {categories.map((entry) => (
                <Toggle
                  key={entry.value}
                  value={entry.value}
                  aria-label={entry.label}
                  className={categoryClass}
                >
                  {entry.icon}
                </Toggle>
              ))}
            </ToggleGroup>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

export { BaseUiEmojiPicker };