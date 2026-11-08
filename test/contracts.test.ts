import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import {
  CONTRACT_VERSION,
  ERROR_SCHEMA_ID,
  HEALTH_SCHEMA_ID,
} from "../src/index.js";

async function readSchema(name: string): Promise<Record<string, unknown>> {
  const url = new URL(`../schemas/${name}`, import.meta.url);
  return JSON.parse(await readFile(url, "utf8")) as Record<string, unknown>;
}

describe("public contracts", () => {
  it("keeps the package and schema identifiers explicitly versioned", async () => {
    const errorSchema = await readSchema("error-envelope.v0.1.json");
    const healthSchema = await readSchema("health-status.v0.1.json");

    expect(CONTRACT_VERSION).toBe("0.1.0");
    expect(errorSchema.$id).toBe(ERROR_SCHEMA_ID);
    expect(healthSchema.$id).toBe(HEALTH_SCHEMA_ID);
  });
});
