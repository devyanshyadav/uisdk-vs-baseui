import { render, screen } from "@testing-library/react";
import { createAgent } from "@ui-sdk/react/agent";
import { expect, test } from "vitest";
import { EmojiPicker } from "./emoji-picker";

const agent = createAgent();

function isQueryError(
  result: Awaited<ReturnType<typeof agent.query>>,
): result is { error: string } {
  return "error" in result;
}

test("agent query finds Fire within Reaction", async () => {
  render(<EmojiPicker />);

  const result = await agent.query({ within: "Reaction", text: "Fire" });
  expect(isQueryError(result), isQueryError(result) ? result.error : "").toBe(
    false,
  );
  if (isQueryError(result)) return;

  const reaction = result.find((entry) => entry.label === "Reaction");
  expect(reaction, "Reaction is missing from query").toBeTruthy();

  const fire = reaction?.items?.find((item) => item.label === "Fire");
  expect(fire?.value, "Fire emoji is missing from query items").toBe("🔥");
});

test("an agent can query Fire and setValue on Reaction", async () => {
  render(<EmojiPicker />);

  const queryResult = await agent.query({ within: "Reaction", text: "Fire" });
  expect(
    isQueryError(queryResult),
    isQueryError(queryResult) ? queryResult.error : "",
  ).toBe(false);
  if (isQueryError(queryResult)) return;

  const [reaction] = queryResult;
  const fire = reaction.items?.find((item) => item.label === "Fire");
  expect(fire?.value).toBe("🔥");

  const actResult = await agent.act({
    steps: [{ ref: "Reaction", action: "setValue", args: [fire!.value] }],
  });
  expect(actResult.ok, actResult.error?.message).toBe(true);

  expect(screen.getByRole("button", { name: "Add emoji" })).toHaveTextContent(
    "🔥",
  );
});