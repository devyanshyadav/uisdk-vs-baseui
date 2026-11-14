"use client";

import { Input, InputGroup } from "@ui-sdk/react/input";
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@ui-sdk/react/popover";
import { createParts, usePart, usePrimitive } from "@ui-sdk/react/primitive";
import { Toggle, ToggleGroup } from "@ui-sdk/react/toggle";
import { useMemo, useState } from "react";
import { categories, itemsFor, rowsOf } from "@/lib/emoji-catalog";
import {
  emojiPicker,
  type EmojiPickerOptions,
} from "../primitives/emoji-picker";
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
import { SearchIcon } from "./search-icon";

const parts = createParts(emojiPicker, {
  root: "div",
  grid: "div",
  row: "div",
  cell: "button",
});

function EmojiPicker({
  items,
  columns = 6,
  ...props
}: EmojiPickerOptions) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("smileys");
  const visibleItems = useMemo(
    () => items ?? itemsFor(category, query),
    [items, category, query],
  );
  const handle = usePrimitive(emojiPicker, {
    items: visibleItems,
    columns,
    ...props,
  });

  return usePart(
    handle,
    "root",
    {},
    {
      render: (rootProps, state) => (
        <div {...rootProps}>
          <Popover
            open={state.open}
            onOpenChange={(open, details) =>
              handle.api.setOpen(open, {
                reason: details.reason,
                event: details.event,
                source: details.source,
              })
            }
          >
            <PopoverTrigger
              aria-label="Add emoji"
              className={`${trigger} data-open:border-zinc-400 data-open:ring-2 data-open:ring-zinc-400/40`}
            >
              {state.value ?? "😀"}
            </PopoverTrigger>
            <PopoverContent
              sideOffset={8}
              initialFocus="#emoji-search"
              className={`origin-(--transform-origin) ${panel} transition-[opacity,scale] duration-150 ease-out data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 motion-reduce:transition-none`}
            >
              <PopoverTitle className="sr-only">Emoji</PopoverTitle>
              <div className={searchWrap}>
                <InputGroup className={search}>
                  <SearchIcon />
                  <Input
                    id="emoji-search"
                    type="search"
                    aria-label="Search emoji"
                    placeholder="Search emoji..."
                    value={query}
                    onValueChange={(value) => setQuery(value)}
                    className={searchField}
                  />
                  <span aria-hidden="true" className={searchWave}>
                    👋
                  </span>
                </InputGroup>
              </div>
              <parts.Grid className={grid}>
                {visibleItems.length === 0 ? (
                  <p className={empty}>No emoji match that search.</p>
                ) : (
                  rowsOf(state.items, state.columns).map((cells) => {
                    const first = cells[0];
                    if (!first) return null;
                    return (
                      <parts.Row
                        key={first.value}
                        value={first.value}
                        className={row}
                      >
                        {cells.map((item) => (
                          <parts.Cell
                            key={item.value}
                            value={item.value}
                            label={item.label}
                            className={cellClass}
                          >
                            {item.value}
                          </parts.Cell>
                        ))}
                      </parts.Row>
                    );
                  })
                )}
              </parts.Grid>
              <ToggleGroup
                value={[category]}
                deselectable={false}
                aria-label="Emoji categories"
                className={categoryBar}
                onValueChange={(value) => {
                  const next = value[0];
                  if (next) {
                    setCategory(next);
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
            </PopoverContent>
          </Popover>
        </div>
      ),
    },
    "div",
  );
}

export { EmojiPicker };