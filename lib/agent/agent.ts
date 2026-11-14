"use client";

import { createAgent, registerTools } from "@ui-sdk/react/agent";

const agent = createAgent();

registerTools(agent, { allow: () => true });

if (process.env.NODE_ENV === "development") {
  Object.assign(globalThis, { agent });
}

export { agent };