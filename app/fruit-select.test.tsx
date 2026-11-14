import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createAgent } from "@ui-sdk/react/agent";
import { expect, test } from "vitest";
import { FruitSelect } from "./fruit-select";

const agent = createAgent();

test("the fruit select is named and opens from the trigger", async () => {
  const user = userEvent.setup();
  render(<FruitSelect />);

  const trigger = screen.getByRole("combobox", { name: "Fruit" });
  expect(trigger).toHaveAttribute("aria-expanded", "false");

  await user.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("option", { name: "Banana" })).toBeTruthy();
});

test("an agent can find and change Fruit", async () => {
  render(<FruitSelect />);

  const components = agent
    .snapshot()
    .filter((entry) => !entry.offPage && entry.component !== "more");
  for (const entry of components) {
    expect(
      entry.label,
      `${entry.component} ${entry.ref} has no name`,
    ).toBeTruthy();
  }
  const labels = components.map((entry) => entry.label);
  expect(labels, "Fruit is missing from the snapshot").toContain("Fruit");

  const fruit = components.find((entry) => entry.label === "Fruit");
  const banana = fruit?.items?.find((item) => item.label === "Banana");
  expect(banana, "Banana is missing from Fruit items").toBeTruthy();

  const result = await agent.act({
    steps: [{ ref: "Fruit", action: "setValue", args: [banana!.value] }],
  });
  expect(result.ok, result.error?.message).toBe(true);
  expect(screen.getByRole("combobox", { name: "Fruit" })).toHaveTextContent(
    "Banana",
  );
});
