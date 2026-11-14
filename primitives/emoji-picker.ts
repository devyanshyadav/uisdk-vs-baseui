import {
  createChange,
  createRovingFocus,
  createTypeahead,
  definePrimitive,
  isTypeaheadKey,
  selects,
  type ChangeDetails,
} from "@ui-sdk/core";

type EmojiItem = { value: string; label: string };

type EmojiPickerReason = "item-press" | "list-navigation" | "trigger-press";

type EmojiPickerOptions = {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (
    value: string | null,
    details: ChangeDetails<EmojiPickerReason>,
  ) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, details: ChangeDetails<string>) => void;
  items?: EmojiItem[];
  columns?: number;
};

type EmojiPickerState = {
  value: string | null;
  open: boolean;
  focused: string | null;
  items: EmojiItem[];
  columns: number;
};

const emojiPicker = definePrimitive({
  name: "emoji-picker",
  options: {
    value: "value",
    defaultValue: "value",
    onValueChange: "callback",
    open: "boolean",
    defaultOpen: "boolean",
    onOpenChange: "callback",
    items: "value",
    columns: "number",
  },
  controlled: ["value", "open"],
  state: (options: EmojiPickerOptions): EmojiPickerState => ({
    value: options.value ?? options.defaultValue ?? null,
    open: options.open ?? options.defaultOpen ?? false,
    focused: null,
    items: options.items ?? [],
    columns: options.columns ?? 6,
  }),
  sync: (options) => ({
    ...(options.value === undefined ? {} : { value: options.value }),
    ...(options.open === undefined ? {} : { open: options.open }),
    ...(options.items === undefined ? {} : { items: options.items }),
    ...(options.columns === undefined ? {} : { columns: options.columns }),
  }),
  api: (context) => {
    const change = createChange(context);
    const typeahead = createTypeahead();
    const roving = createRovingFocus<EmojiPickerState, { value: string }>(
      context,
      {
        slot: "cell",
        key: "focused",
        claims: (state, cell) =>
          state.value ? cell.key === state.value : true,
        preferred: (cell) => cell.key === context.store.get().value,
        move: (event, { from, items, rtl }) => {
          const columns = context.store.get().columns;
          const index = items.findIndex((item) => item.key === from.key);
          if (index < 0) return undefined;
          const last = items.length - 1;
          const col = index % columns;
          const start = index - col;
          const end = Math.min(start + columns - 1, last);
          const corner = event.ctrlKey || event.metaKey;
          const step = rtl ? -1 : 1;
          switch (event.key) {
            case "ArrowRight":
              return items[index + step]?.key ?? from.key;
            case "ArrowLeft":
              return items[index - step]?.key ?? from.key;
            case "ArrowDown": {
              const next = index + columns;
              return next <= last ? items[next].key : items[last].key;
            }
            case "ArrowUp": {
              const next = index - columns;
              return next >= 0 ? items[next].key : from.key;
            }
            case "Home":
              return items[corner ? 0 : start]?.key ?? from.key;
            case "End":
              return items[corner ? last : end]?.key ?? from.key;
            default:
              return undefined;
          }
        },
      },
    );

    function setValue(value: string | null, event?: Event) {
      const ok = change("value", value, {
        reason: "item-press",
        event,
      });
      if (ok && value != null) {
        change("open", false, { reason: "item-press", event });
      }
    }

    return {
      roving,
      allItems: () => context.store.get().items,
      setOpen(
        open: boolean,
        details: {
          reason: string;
          event?: Event;
          source?: ChangeDetails["source"];
        },
      ) {
        change("open", open, details);
      },
      setValue,
      pick(value: string, event?: Event) {
        setValue(value, event);
      },
      navigate(event: KeyboardEvent, el: HTMLElement) {
        if (isTypeaheadKey(event)) {
          const cells = roving.items();
          const labels = cells.map((cell) => {
            const item = context.store
              .get()
              .items.find((entry) => entry.value === cell.key);
            return item?.label ?? cell.key;
          });
          const current = cells.findIndex(
            (cell) => cell.key === context.store.get().focused,
          );
          const index = typeahead(event.key, labels, current);
          if (index !== -1) {
            roving.focus(cells[index].key);
            event.preventDefault();
          }
          return;
        }
        roving.keydown(event, el);
      },
    };
  },
  slots: (slot) => ({
    root: slot<
      {},
      {
        open: boolean;
        value: string | null;
        items: EmojiItem[];
        columns: number;
      }
    >({
      attrs: () => ({ "aria-label": "Reaction" }),
      state: (state) => ({
        open: state.open,
        value: state.value,
        items: state.items,
        columns: state.columns,
      }),
    }),
    grid: slot({
      role: "grid",
      keys: { none: "Focused cells handle arrows, typeahead, Enter and Space." },
      attrs: () => ({ "aria-label": "Emoji" }),
    }),
    row: slot<{ value: string }>({
      props: { value: "string" },
      role: "row",
      keys: { none: "Cells in the row handle movement and activation." },
    }),
    cell: slot<{ value: string; label: string }>({
      props: { value: "string", label: "string" },
      role: "gridcell",
      focus: "roving",
      selects: selects({ focused: ({ key }) => [key, null] }),
      attrs: (state, part) => ({
        type: "button",
        tabindex: part.api.roving.tabIndex(state, part),
        "aria-label": part.props.label,
        "aria-selected": String(state.value === part.props.value),
        "data-selected": state.value === part.props.value ? "" : undefined,
        "data-highlighted":
          state.focused === part.props.value ||
          (state.focused == null && state.value === part.props.value)
            ? ""
            : undefined,
      }),
      press: ({ api, props }, event) => api.pick(props.value, event),
      on: {
        keydown: (event, { el, api }) => {
          if (el) {
            api.navigate(event, el);
          }
        },
      },
      bind: (el, part) => part.api.roving.bind(el, part),
    }),
  }),
  agent: {
    actions: ["setValue", "setOpen"],
    closed: true,
    items: (api) => api.allItems(),
  },
});

export { emojiPicker, type EmojiItem, type EmojiPickerOptions };
