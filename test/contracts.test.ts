import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import {
  CONTRACT_VERSION,
  ERROR_SCHEMA_ID,
  HEALTH_SCHEMA_ID,
  IMPORTER_PARSE_REQUEST_SCHEMA_ID,
  IMPORTER_PARSE_RESPONSE_SCHEMA_ID,
  PROVIDER_MEMBERSHIP_SCHEMA_ID,
  PUBLIC_PROVIDER_SCHEMA_ID,
} from "../src/index.js";

async function readSchema(name: string): Promise<Record<string, unknown>> {
  const url = new URL(`../schemas/${name}`, import.meta.url);
  return JSON.parse(await readFile(url, "utf8")) as Record<string, unknown>;
}

describe("public contracts", () => {
  it("keeps the package and schema identifiers explicitly versioned", async () => {
    const errorSchema = await readSchema("error-envelope.v0.1.json");
    const healthSchema = await readSchema("health-status.v0.1.json");
    const providerSchema = await readSchema("public-provider.v0.2.json");
    const membershipSchema = await readSchema("provider-membership.v0.3.json");
    const importerRequestSchema = await readSchema(
      "importer-parse-request.v0.4.json",
    );
    const importerResponseSchema = await readSchema(
      "importer-parse-response.v0.4.json",
    );

    expect(CONTRACT_VERSION).toBe("0.4.0");
    expect(errorSchema.$id).toBe(ERROR_SCHEMA_ID);
    expect(healthSchema.$id).toBe(HEALTH_SCHEMA_ID);
    expect(providerSchema.$id).toBe(PUBLIC_PROVIDER_SCHEMA_ID);
    expect(membershipSchema.$id).toBe(PROVIDER_MEMBERSHIP_SCHEMA_ID);
    expect(importerRequestSchema.$id).toBe(IMPORTER_PARSE_REQUEST_SCHEMA_ID);
    expect(importerResponseSchema.$id).toBe(IMPORTER_PARSE_RESPONSE_SCHEMA_ID);
  });

  it("keeps authentication and membership data out of the public provider", async () => {
    const providerSchema = await readSchema("public-provider.v0.2.json");
    const properties = providerSchema.properties as Record<string, unknown>;

    expect(properties).not.toHaveProperty("externalSubject");
    expect(properties).not.toHaveProperty("role");
    expect(properties).not.toHaveProperty("credentials");
  });

  it("keeps external authentication subjects out of membership responses", async () => {
    const membershipSchema = await readSchema("provider-membership.v0.3.json");
    const serialized = JSON.stringify(membershipSchema);

    expect(serialized).not.toContain("externalSubject");
    expect(serialized).not.toContain("authSubject");
  });
});
