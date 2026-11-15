import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import {
  CONTRACT_VERSION,
  INVOKE_FACET_REQUEST_SCHEMA_ID,
  INVOKE_FACET_RESPONSE_SCHEMA_ID,
  INVOKE_FACET_PENDING_SCHEMA_ID,
  PUBLIC_CATALOG_LIST_SCHEMA_ID,
  PUBLIC_CATALOG_DETAIL_SCHEMA_ID,
  CREATE_FACET_DRAFTS_REQUEST_SCHEMA_ID,
  CREATE_FACET_DRAFTS_RESPONSE_SCHEMA_ID,
  CREATE_SECRET_REQUEST_SCHEMA_ID,
  ERROR_SCHEMA_ID,
  HEALTH_SCHEMA_ID,
  IMPORTER_PARSE_REQUEST_SCHEMA_ID,
  IMPORTER_PARSE_RESPONSE_SCHEMA_ID,
  ENDPOINT_CONFIG_REQUEST_SCHEMA_ID,
  FACET_MANIFEST_SCHEMA_ID,
  PROVIDER_MEMBERSHIP_SCHEMA_ID,
  PUBLISH_FACET_VERSION_REQUEST_SCHEMA_ID,
  PUBLISH_FACET_VERSION_RESPONSE_SCHEMA_ID,
  PUBLIC_PROVIDER_SCHEMA_ID,
  ROTATE_SECRET_REQUEST_SCHEMA_ID,
  SECRET_REF_RESPONSE_SCHEMA_ID,
  VALIDATE_FACET_VERSION_REQUEST_SCHEMA_ID,
  VALIDATE_FACET_VERSION_RESPONSE_SCHEMA_ID,
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
      "importer-parse-request.v0.6.json",
    );
    const importerResponseSchema = await readSchema(
      "importer-parse-response.v0.6.json",
    );
    const createFacetDraftsRequestSchema = await readSchema(
      "create-facet-drafts-request.v0.5.json",
    );
    const createFacetDraftsResponseSchema = await readSchema(
      "create-facet-drafts-response.v0.5.json",
    );
    const createSecretSchema = await readSchema(
      "create-secret-request.v0.7.json",
    );
    const rotateSecretSchema = await readSchema(
      "rotate-secret-request.v0.7.json",
    );
    const secretResponseSchema = await readSchema(
      "secret-ref-response.v0.7.json",
    );
    const endpointConfigSchema = await readSchema(
      "endpoint-config-request.v0.7.json",
    );
    const manifestSchema = await readSchema("facet-manifest.v1.json");
    const validateRequestSchema = await readSchema(
      "validate-facet-version-request.v0.8.json",
    );
    const validateResponseSchema = await readSchema(
      "validate-facet-version-response.v0.8.json",
    );
    const publishRequestSchema = await readSchema(
      "publish-facet-version-request.v0.9.json",
    );
    const publishResponseSchema = await readSchema(
      "publish-facet-version-response.v0.9.json",
    );

    expect(CONTRACT_VERSION).toBe("0.12.0");
    expect((await readSchema("invoke-facet-request.v0.11.json")).$id).toBe(
      INVOKE_FACET_REQUEST_SCHEMA_ID,
    );
    expect((await readSchema("invoke-facet-response.v0.12.json")).$id).toBe(
      INVOKE_FACET_RESPONSE_SCHEMA_ID,
    );
    expect((await readSchema("invoke-facet-pending.v0.12.json")).$id).toBe(
      INVOKE_FACET_PENDING_SCHEMA_ID,
    );
    expect((await readSchema("public-catalog-list.v0.10.json")).$id).toBe(
      PUBLIC_CATALOG_LIST_SCHEMA_ID,
    );
    expect((await readSchema("public-catalog-detail.v0.10.json")).$id).toBe(
      PUBLIC_CATALOG_DETAIL_SCHEMA_ID,
    );
    expect(errorSchema.$id).toBe(ERROR_SCHEMA_ID);
    expect(healthSchema.$id).toBe(HEALTH_SCHEMA_ID);
    expect(providerSchema.$id).toBe(PUBLIC_PROVIDER_SCHEMA_ID);
    expect(membershipSchema.$id).toBe(PROVIDER_MEMBERSHIP_SCHEMA_ID);
    expect(importerRequestSchema.$id).toBe(IMPORTER_PARSE_REQUEST_SCHEMA_ID);
    expect(importerResponseSchema.$id).toBe(IMPORTER_PARSE_RESPONSE_SCHEMA_ID);
    expect(createFacetDraftsRequestSchema.$id).toBe(
      CREATE_FACET_DRAFTS_REQUEST_SCHEMA_ID,
    );
    expect(createFacetDraftsResponseSchema.$id).toBe(
      CREATE_FACET_DRAFTS_RESPONSE_SCHEMA_ID,
    );
    expect(createSecretSchema.$id).toBe(CREATE_SECRET_REQUEST_SCHEMA_ID);
    expect(rotateSecretSchema.$id).toBe(ROTATE_SECRET_REQUEST_SCHEMA_ID);
    expect(secretResponseSchema.$id).toBe(SECRET_REF_RESPONSE_SCHEMA_ID);
    expect(endpointConfigSchema.$id).toBe(ENDPOINT_CONFIG_REQUEST_SCHEMA_ID);
    expect(manifestSchema.$id).toBe(FACET_MANIFEST_SCHEMA_ID);
    expect(validateRequestSchema.$id).toBe(
      VALIDATE_FACET_VERSION_REQUEST_SCHEMA_ID,
    );
    expect(validateResponseSchema.$id).toBe(
      VALIDATE_FACET_VERSION_RESPONSE_SCHEMA_ID,
    );
    expect(publishRequestSchema.$id).toBe(
      PUBLISH_FACET_VERSION_REQUEST_SCHEMA_ID,
    );
    expect(publishResponseSchema.$id).toBe(
      PUBLISH_FACET_VERSION_RESPONSE_SCHEMA_ID,
    );
  });

  it("defines optimistic immutable publication without private endpoint data", async () => {
    const request = await readSchema("publish-facet-version-request.v0.9.json");
    const response = await readSchema(
      "publish-facet-version-response.v0.9.json",
    );
    const serialized = JSON.stringify(response);

    expect(request.required).toEqual(["version", "visibility"]);
    expect(JSON.stringify(request)).toContain("PUBLIC");
    expect(serialized).toContain("PUBLISHED");
    expect(serialized).toContain("currentPublishedVersionId");
    expect(serialized).toContain("publishedAt");
    expect(serialized).not.toMatch(
      /protectedBaseUrl|vaultReference|secretRefId|secretValue|credentialValue/iu,
    );
  });

  it("defines stable warning acknowledgement and safe manifest validation contracts", async () => {
    const request = await readSchema(
      "validate-facet-version-request.v0.8.json",
    );
    const response = await readSchema(
      "validate-facet-version-response.v0.8.json",
    );
    const manifest = await readSchema("facet-manifest.v1.json");
    const serialized = JSON.stringify({ request, response, manifest });

    expect(request.required).toEqual(["version", "warningAcknowledgements"]);
    expect(serialized).toContain("warningId");
    expect(serialized).toContain("acknowledged");
    expect(serialized).toContain("facet.manifest/v1");
    expect(serialized).not.toMatch(
      /protectedBaseUrl|vaultReference|secretValue|credentialValue/iu,
    );
  });

  it("defines write-only secret and protected endpoint configuration contracts", async () => {
    const createSecret = await readSchema("create-secret-request.v0.7.json");
    const rotateSecret = await readSchema("rotate-secret-request.v0.7.json");
    const secretResponse = await readSchema("secret-ref-response.v0.7.json");
    const endpointConfig = await readSchema(
      "endpoint-config-request.v0.7.json",
    );

    expect(createSecret.required).toEqual(["kind", "label", "value"]);
    expect(rotateSecret.required).toEqual(["value"]);
    expect(JSON.stringify(createSecret)).toContain("BEARER_TOKEN");
    expect(JSON.stringify(endpointConfig)).toContain("API_KEY_QUERY");
    expect(JSON.stringify(endpointConfig)).toContain("secretRefId");
    expect(JSON.stringify(endpointConfig)).toContain("oneOf");
    expect(JSON.stringify(secretResponse)).not.toContain('"value"');
    expect(JSON.stringify(secretResponse)).not.toMatch(
      /vaultReference|filesystem|path/iu,
    );
  });

  it("defines normalized operation candidates without provider secret values", async () => {
    const responseSchema = await readSchema(
      "importer-parse-response.v0.6.json",
    );
    const candidate = (
      responseSchema.properties as {
        candidates: { items: { required: string[]; properties: unknown } };
      }
    ).candidates.items;
    const serialized = JSON.stringify(responseSchema);

    expect(candidate.required).toEqual([
      "candidateId",
      "jsonPointer",
      "method",
      "path",
      "tags",
      "normalized",
      "warnings",
    ]);
    expect(serialized).toContain("inputSchema");
    expect(serialized).toContain("outputSchema");
    expect(serialized).toContain("errorSchema");
    expect(serialized).toContain("authAlternatives");
    expect(serialized).toContain("API_KEY_HEADER");
    expect(serialized).toContain("BEARER");
    expect(serialized).not.toMatch(
      /secretValue|credentialValue|apiKeyValue|bearerToken/iu,
    );
  });

  it("defines an atomic operation-selection batch without credential fields", async () => {
    const requestSchema = await readSchema(
      "create-facet-drafts-request.v0.5.json",
    );
    const responseSchema = await readSchema(
      "create-facet-drafts-response.v0.5.json",
    );
    const requestText = JSON.stringify(requestSchema);
    const responseText = JSON.stringify(responseSchema);

    expect(requestSchema.required).toEqual([
      "providerId",
      "importJobId",
      "selections",
    ]);
    expect(requestText).toContain("operationCandidateId");
    expect(requestText).toContain("sideEffectClass");
    expect(responseText).toContain("sourceOperationPointer");
    expect(responseText).toContain("contentHash");
    expect(`${requestText}${responseText}`).not.toMatch(
      /baseUrl|secretRef|credential|apiKey|bearerToken/iu,
    );
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
