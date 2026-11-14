import { Field, FieldLabel } from "@ui-sdk/react/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectTrigger,
  SelectValue,
} from "@ui-sdk/react/select";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "pear", label: "Pear" },
];

export function FruitSelect() {
  return (
    <Field className="gap-2">
      <FieldLabel className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Fruit
      </FieldLabel>
      <Select items={fruits} placeholder="Choose a fruit" name="fruit">
        <SelectTrigger className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm shadow-sm outline-none transition-[border-color,box-shadow,background-color] duration-150 hover:bg-zinc-50 focus-visible:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-400/40 data-open:border-zinc-400 data-open:ring-2 data-open:ring-zinc-400/40 data-placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:focus-visible:border-zinc-500 dark:data-open:border-zinc-500 dark:data-placeholder:text-zinc-500">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="origin-(--transform-origin) min-w-(--anchor-width) rounded-xl border border-zinc-200 bg-white p-1 shadow-lg outline-none transition-[opacity,scale] duration-150 ease-out data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 motion-reduce:transition-none dark:border-zinc-700 dark:bg-zinc-900">
          {fruits.map((fruit) => (
            <SelectItem
              key={fruit.value}
              value={fruit.value}
              className="flex cursor-default items-center gap-2 rounded-lg px-2.5 py-2 text-sm outline-none transition-colors data-highlighted:bg-zinc-100 data-selected:font-medium dark:data-highlighted:bg-zinc-800"
            >
              {fruit.label}
              <SelectItemIndicator className="ms-auto" />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}
