import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import {
  ACTOR_PREVIEW_REQUEST_V014_SCHEMA_ID,
  ACTOR_PREVIEW_RESPONSE_V014_SCHEMA_ID,
  ACTOR_PUBLISH_STATUS_RESPONSE_V014_SCHEMA_ID,
  CONTRACT_VERSION,
  CREATE_ACTOR_PENDING_RESPONSE_V014_SCHEMA_ID,
  CREATE_ACTOR_REQUEST_SCHEMA_ID,
  CREATE_ACTOR_REQUEST_V014_SCHEMA_ID,
  CREATE_ACTOR_RESPONSE_SCHEMA_ID,
  CREATE_AGENT_FACET_REQUEST_SCHEMA_ID,
  CREATE_AGENT_FACET_RESPONSE_SCHEMA_ID,
  EXECUTOR_RUN_REQUEST_SCHEMA_ID,
  EXECUTOR_RUN_RESPONSE_SCHEMA_ID,
  FACET_TYPES,
  INVOKE_FACET_PENDING_SCHEMA_ID,
  INVOKE_FACET_PENDING_V014_SCHEMA_ID,
  INVOKE_FACET_REQUEST_SCHEMA_ID,
  INVOKE_FACET_RESPONSE_SCHEMA_ID,
  INVOKE_FACET_RESPONSE_V013_SCHEMA_ID,
  INVOKE_FACET_RESPONSE_V014_SCHEMA_ID,
  PUBLIC_CATALOG_DETAIL_SCHEMA_ID,
  PUBLIC_CATALOG_DETAIL_V013_SCHEMA_ID,
  PUBLIC_CATALOG_DETAIL_V014_SCHEMA_ID,
  PUBLIC_CATALOG_LIST_SCHEMA_ID,
  PUBLIC_CATALOG_LIST_V013_SCHEMA_ID,
  PUBLIC_CATALOG_LIST_V014_SCHEMA_ID,
  PUBLIC_FACET_V013_SCHEMA_ID,
  PUBLIC_FACET_V014_SCHEMA_ID,
  WALLET_LINK_CHALLENGE_REQUEST_V014_SCHEMA_ID,
  WALLET_LINK_CHALLENGE_RESPONSE_V014_SCHEMA_ID,
  WALLET_LINK_REQUEST_V014_SCHEMA_ID,
  WALLET_LINK_RESPONSE_V014_SCHEMA_ID,
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
  type ActorPreviewRequest,
  type ActorPreviewResponse,
  type ActorPublishStatusResponse,
  type CreateActorPendingResponse,
  type CreateActorRequestV014,
  type GetPublicFacetResponse,
  type InvokeFacetPendingResponseV014,
  type InvokeFacetResponseV014,
  type ListPublicFacetsResponse,
  type PublicFacet,
  type WalletLinkChallengeRequest,
  type WalletLinkChallengeResponse,
  type WalletLinkRequest,
  type WalletLinkResponse,
} from "../src/index.js";
import {
  validateAgainstSchema,
  type JsonSchemaNode,
} from "./schema-validator.js";

async function readSchema(
  name: string,
): Promise<JsonSchemaNode & Record<string, unknown>> {
  const url = new URL(`../schemas/${name}`, import.meta.url);
  return JSON.parse(await readFile(url, "utf8")) as JsonSchemaNode &
    Record<string, unknown>;
}

describe("public contracts", () => {
  it("keeps the package versioned at 0.14.0 while preserving v0.13.0 and earlier schema IDs", async () => {
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

    expect(CONTRACT_VERSION).toBe("0.14.0");
    expect(FACET_TYPES).toEqual([
      "EXTERNAL_HTTP_API",
      "HOSTED_ACTOR",
      "AUTONOMOUS_AGENT",
    ]);
    expect((await readSchema("create-actor-request.v0.13.json")).$id).toBe(
      CREATE_ACTOR_REQUEST_SCHEMA_ID,
    );
    expect((await readSchema("create-actor-response.v0.13.json")).$id).toBe(
      CREATE_ACTOR_RESPONSE_SCHEMA_ID,
    );
    expect(
      (await readSchema("create-agent-facet-request.v0.13.json")).$id,
    ).toBe(CREATE_AGENT_FACET_REQUEST_SCHEMA_ID);
    expect(
      (await readSchema("create-agent-facet-response.v0.13.json")).$id,
    ).toBe(CREATE_AGENT_FACET_RESPONSE_SCHEMA_ID);
    expect((await readSchema("executor-run-request.v0.13.json")).$id).toBe(
      EXECUTOR_RUN_REQUEST_SCHEMA_ID,
    );
    expect((await readSchema("executor-run-response.v0.13.json")).$id).toBe(
      EXECUTOR_RUN_RESPONSE_SCHEMA_ID,
    );
    expect((await readSchema("public-facet.v0.13.json")).$id).toBe(
      PUBLIC_FACET_V013_SCHEMA_ID,
    );
    expect((await readSchema("public-catalog-list.v0.13.json")).$id).toBe(
      PUBLIC_CATALOG_LIST_V013_SCHEMA_ID,
    );
    expect((await readSchema("public-catalog-detail.v0.13.json")).$id).toBe(
      PUBLIC_CATALOG_DETAIL_V013_SCHEMA_ID,
    );
    expect((await readSchema("invoke-facet-response.v0.13.json")).$id).toBe(
      INVOKE_FACET_RESPONSE_V013_SCHEMA_ID,
    );
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

  it("supports multi-modal ActorBazaar and ERC-8004 A2A contracts in v0.13.0", async () => {
    const manifest = await readSchema("facet-manifest.v1.json");
    const createActorReq = await readSchema("create-actor-request.v0.13.json");
    const createAgentReq = await readSchema(
      "create-agent-facet-request.v0.13.json",
    );
    const executorResp = await readSchema("executor-run-response.v0.13.json");
    const invokeResp = await readSchema("invoke-facet-response.v0.13.json");

    expect(JSON.stringify(manifest)).toContain("HOSTED_ACTOR");
    expect(JSON.stringify(manifest)).toContain("AUTONOMOUS_AGENT");
    expect(createActorReq.required).toEqual([
      "providerId",
      "name",
      "slug",
      "description",
      "category",
      "inputSchema",
      "code",
    ]);
    expect(createAgentReq.required).toEqual([
      "providerId",
      "name",
      "slug",
      "description",
      "category",
      "erc8004TokenId",
      "taskKind",
      "inputSchema",
    ]);
    expect(executorResp.required).toEqual([
      "status",
      "result",
      "dataset",
      "logs",
      "usage",
    ]);
    expect(JSON.stringify(invokeResp)).toContain("receiptTxHash");
    expect(JSON.stringify(invokeResp)).toContain("runnerSignature");
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

  it("versions all ADR-0017 v0.14.0 schema identifiers", async () => {
    expect(
      (await readSchema("wallet-link-challenge-request.v0.14.json")).$id,
    ).toBe(WALLET_LINK_CHALLENGE_REQUEST_V014_SCHEMA_ID);
    expect(
      (await readSchema("wallet-link-challenge-response.v0.14.json")).$id,
    ).toBe(WALLET_LINK_CHALLENGE_RESPONSE_V014_SCHEMA_ID);
    expect((await readSchema("wallet-link-request.v0.14.json")).$id).toBe(
      WALLET_LINK_REQUEST_V014_SCHEMA_ID,
    );
    expect((await readSchema("wallet-link-response.v0.14.json")).$id).toBe(
      WALLET_LINK_RESPONSE_V014_SCHEMA_ID,
    );
    expect((await readSchema("actor-preview-request.v0.14.json")).$id).toBe(
      ACTOR_PREVIEW_REQUEST_V014_SCHEMA_ID,
    );
    expect((await readSchema("actor-preview-response.v0.14.json")).$id).toBe(
      ACTOR_PREVIEW_RESPONSE_V014_SCHEMA_ID,
    );
    expect((await readSchema("create-actor-request.v0.14.json")).$id).toBe(
      CREATE_ACTOR_REQUEST_V014_SCHEMA_ID,
    );
    expect(
      (await readSchema("create-actor-pending-response.v0.14.json")).$id,
    ).toBe(CREATE_ACTOR_PENDING_RESPONSE_V014_SCHEMA_ID);
    expect(
      (await readSchema("actor-publish-status-response.v0.14.json")).$id,
    ).toBe(ACTOR_PUBLISH_STATUS_RESPONSE_V014_SCHEMA_ID);
    expect((await readSchema("public-facet.v0.14.json")).$id).toBe(
      PUBLIC_FACET_V014_SCHEMA_ID,
    );
    expect((await readSchema("public-catalog-list.v0.14.json")).$id).toBe(
      PUBLIC_CATALOG_LIST_V014_SCHEMA_ID,
    );
    expect((await readSchema("public-catalog-detail.v0.14.json")).$id).toBe(
      PUBLIC_CATALOG_DETAIL_V014_SCHEMA_ID,
    );
    expect((await readSchema("invoke-facet-response.v0.14.json")).$id).toBe(
      INVOKE_FACET_RESPONSE_V014_SCHEMA_ID,
    );
    expect((await readSchema("invoke-facet-pending.v0.14.json")).$id).toBe(
      INVOKE_FACET_PENDING_V014_SCHEMA_ID,
    );
  });

  it("validates wallet-link challenge and confirmation v0.14.0 contracts", async () => {
    const challengeReqSchema = await readSchema(
      "wallet-link-challenge-request.v0.14.json",
    );
    const challengeResSchema = await readSchema(
      "wallet-link-challenge-response.v0.14.json",
    );
    const linkReqSchema = await readSchema("wallet-link-request.v0.14.json");
    const linkResSchema = await readSchema("wallet-link-response.v0.14.json");

    const challengeReq: WalletLinkChallengeRequest = {};
    const challengeRes: WalletLinkChallengeResponse = {
      challengeId: "01a1e97a-90e0-7030-b565-91c9abc3857b",
      message:
        "facet.briandev.space wants you to link wallet\nChain ID: 43113\nNonce: abc",
      expiresAt: "2026-11-17T12:05:00Z",
    };
    const linkReq: WalletLinkRequest = {
      challengeId: "01a1e97a-90e0-7030-b565-91c9abc3857b",
      address: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
      signature: "0x" + "ab".repeat(65),
    };
    const linkRes: WalletLinkResponse = {
      walletAddress: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
      verifiedAt: "2026-11-17T12:01:00Z",
    };

    expect(validateAgainstSchema(challengeReqSchema, challengeReq)).toEqual([]);
    expect(validateAgainstSchema(challengeResSchema, challengeRes)).toEqual([]);
    expect(validateAgainstSchema(linkReqSchema, linkReq)).toEqual([]);
    expect(validateAgainstSchema(linkResSchema, linkRes)).toEqual([]);

    expect(
      validateAgainstSchema(challengeReqSchema, { unexpected: true }),
    ).not.toEqual([]);
    expect(
      validateAgainstSchema(linkReqSchema, {
        ...linkReq,
        address: "not-an-address",
      }),
    ).not.toEqual([]);
    expect(
      validateAgainstSchema(linkResSchema, {
        walletAddress: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
      }),
    ).not.toEqual([]);
  });

  it("validates Actor preview and pending-to-published Actor contracts in v0.14.0", async () => {
    const previewReqSchema = await readSchema(
      "actor-preview-request.v0.14.json",
    );
    const previewResSchema = await readSchema(
      "actor-preview-response.v0.14.json",
    );
    const createActorReqSchema = await readSchema(
      "create-actor-request.v0.14.json",
    );
    const createActorPendingSchema = await readSchema(
      "create-actor-pending-response.v0.14.json",
    );
    const publishStatusSchema = await readSchema(
      "actor-publish-status-response.v0.14.json",
    );

    const previewReq: ActorPreviewRequest = {
      providerId: "01a1e97a-90e0-7030-b565-91c9abc3857b",
      code: "export default async function run(input) { return [{ echo: input.text }]; }",
      inputSchema: {
        type: "object",
        required: ["text"],
        properties: { text: { type: "string" } },
      },
      input: { text: "hello fuji" },
    };
    const previewRes: ActorPreviewResponse = {
      result: { items: [{ echo: "hello fuji" }], count: 1 },
      dataset: [{ echo: "hello fuji" }],
      logs: ["[actor] echoed 1 item"],
      usage: {
        itemCount: 1,
        durationMs: 42,
        outputHash: "sha256:" + "a".repeat(64),
        runnerSignature: "0x" + "cd".repeat(65),
      },
    };
    const unsignedPreviewRes: ActorPreviewResponse = {
      result: [{ echo: "hello fuji" }],
      dataset: [{ echo: "hello fuji" }],
      logs: [],
      usage: { itemCount: 1, durationMs: 35 },
    };

    expect(validateAgainstSchema(previewReqSchema, previewReq)).toEqual([]);
    expect(validateAgainstSchema(previewResSchema, previewRes)).toEqual([]);
    expect(validateAgainstSchema(previewResSchema, unsignedPreviewRes)).toEqual(
      [],
    );
    expect(
      validateAgainstSchema(previewReqSchema, {
        ...previewReq,
        code: "short",
      }),
    ).not.toEqual([]);

    const createActorReq: CreateActorRequestV014 = {
      providerId: "01a1e97a-90e0-7030-b565-91c9abc3857b",
      name: "Echo Transform Actor",
      slug: "echo-transform-actor",
      displayVersion: "v1",
      description: "Transforms caller input deterministically.",
      category: "utilities",
      inputSchema: previewReq.inputSchema,
      code: previewReq.code,
      pricingModel: "PAY_PER_RUN",
      priceAtomic: "1000",
      payTo: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
    };
    const pendingRes: CreateActorPendingResponse = {
      facet: {
        id: "01a1e97b-a5d1-7c25-9a05-4e0e7405d445",
        versionId: "01a1e97b-a5d1-7c2d-a50a-7f231c809d73",
        slug: "echo-transform-actor",
        fullName: "taihung/echo-transform-actor",
        displayVersion: "v1",
        facetType: "HOSTED_ACTOR",
        status: "REGISTRATION_PENDING",
        visibility: "PRIVATE",
        imageDigest: "sha256:" + "b".repeat(64),
      },
    };
    const minimalPendingRes: CreateActorPendingResponse = {
      facet: {
        id: pendingRes.facet.id,
        versionId: pendingRes.facet.versionId,
        status: "REGISTRATION_PENDING",
        visibility: "PRIVATE",
        imageDigest: pendingRes.facet.imageDigest,
      },
    };
    const statusPending: ActorPublishStatusResponse = {
      facetId: pendingRes.facet.id,
      versionId: pendingRes.facet.versionId,
      status: "REGISTRATION_PENDING",
    };
    const statusPublished: ActorPublishStatusResponse = {
      facetId: pendingRes.facet.id,
      versionId: pendingRes.facet.versionId,
      status: "PUBLISHED",
      registryTxHash: "0x" + "1".repeat(64),
    };
    const statusFailed: ActorPublishStatusResponse = {
      facetId: pendingRes.facet.id,
      versionId: pendingRes.facet.versionId,
      status: "REGISTRATION_FAILED",
      errorCode: "REGISTRY_REVERTED",
    };

    expect(validateAgainstSchema(createActorReqSchema, createActorReq)).toEqual(
      [],
    );
    expect(validateAgainstSchema(createActorPendingSchema, pendingRes)).toEqual(
      [],
    );
    expect(
      validateAgainstSchema(createActorPendingSchema, minimalPendingRes),
    ).toEqual([]);
    expect(validateAgainstSchema(publishStatusSchema, statusPending)).toEqual(
      [],
    );
    expect(validateAgainstSchema(publishStatusSchema, statusPublished)).toEqual(
      [],
    );
    expect(validateAgainstSchema(publishStatusSchema, statusFailed)).toEqual(
      [],
    );

    expect(
      validateAgainstSchema(createActorReqSchema, {
        ...createActorReq,
        priceAtomic: "1000.5",
      }),
    ).not.toEqual([]);
    expect(
      validateAgainstSchema(createActorReqSchema, {
        ...createActorReq,
        priceAtomic: "0",
      }),
    ).not.toEqual([]);
    expect(
      validateAgainstSchema(createActorReqSchema, {
        ...createActorReq,
        pricingModel: "PAY_PER_RESULT",
      }),
    ).not.toEqual([]);
    expect(
      validateAgainstSchema(createActorPendingSchema, {
        facet: {
          ...pendingRes.facet,
          visibility: "PUBLIC",
        },
      }),
    ).not.toEqual([]);
  });

  it("maintains v0.13.0 sample compatibility in public-facet.v0.14.json and rejects invalid pricing", async () => {
    const publicFacetV14 = await readSchema("public-facet.v0.14.json");
    const listV14 = await readSchema("public-catalog-list.v0.14.json");
    const detailV14 = await readSchema("public-catalog-detail.v0.14.json");
    const registry = new Map<string, JsonSchemaNode>([
      [PUBLIC_FACET_V014_SCHEMA_ID, publicFacetV14],
    ]);

    const v013ActorSample: PublicFacet = {
      id: "01a1e97a-90e0-7030-b565-91c9abc3857b",
      versionId: "01a1e97a-90e0-7038-b9ff-4f8d2a599e04",
      slug: "vn-gold-fx-actor",
      name: "VN Gold & FX Normalizer",
      description: "Normalizes Vietnamese gold and FX quotes.",
      category: "vietnamese-data",
      tags: ["vietnam", "gold", "fx"],
      facetType: "HOSTED_ACTOR",
      provider: {
        id: "01a1e97a-0000-7000-8000-000000000001",
        name: "FACET Demo",
        slug: "facet-demo",
      },
      displayVersion: "1.0.0",
      method: "POST",
      inputSchema: { type: "object", properties: {} },
      outputSchema: { type: "array", items: { type: "object" } },
      pricing: {
        model: "PAY_PER_RUN",
        priceAtomic: "1000",
        assetAddress: "0xe7082a54a456dc4dfe0ceadcd0d0dce7d8ba176f",
        chainId: 43113,
        payTo: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
      },
      actorMeta: {
        runtime: "nodejs22-alpine-v1",
        imageDigest:
          "sha256:e3851e74e368a05b51d68f7e3923d905a4bc569ced2306cc397e161388c470dd",
        registryTxHash:
          "0x7c35e44145f1dc79c55a0da54080964f537be17ca15a5766013c91a73c1426f2",
      },
      publishedAt: "2026-11-16T12:00:00Z",
    };

    const v014VerifiedActorSample: PublicFacet = {
      ...v013ActorSample,
      actorMeta: {
        ...v013ActorSample.actorMeta!,
        registryVerified: true,
        runnerOciDigest: "sha256:" + "c".repeat(64),
      },
    };

    const v013AgentSample: PublicFacet = {
      id: "01a1e97c-61c5-769b-b1b4-cbe2ceaa5591",
      versionId: "01a1e97c-61c5-76a8-a715-94bef1a1eee0",
      slug: "vn-market-analyst-agent",
      name: "VN Market & Macro Analyst Agent",
      description: "ERC-8004 analyst agent.",
      category: "a2a-agents",
      tags: ["vietnam", "a2a"],
      facetType: "AUTONOMOUS_AGENT",
      provider: v013ActorSample.provider,
      displayVersion: "1.0.0",
      method: "POST",
      inputSchema: { type: "object", properties: {} },
      outputSchema: { type: "object" },
      pricing: v013ActorSample.pricing!,
      agentMeta: {
        erc8004ChainId: 43113,
        erc8004Registry: "0x8004A818BFB912233c491871b3d84c89A494BD9e",
        erc8004TokenId: "304",
        taskKind: "vn-market-analysis",
        registryVerified: true,
        registryTxHash:
          "0x16144b34bd02b10a28124dd5b811da1855c666585b0fa9c0ea1b8b1ed7cd1916",
      },
      publishedAt: "2026-11-16T12:00:00Z",
    };

    const v013ApiSample: PublicFacet = {
      id: "01a1e97d-1111-7000-8000-000000000002",
      versionId: "01a1e97d-2222-7000-8000-000000000003",
      slug: "coingecko-btc-history",
      name: "CoinGecko BTC Historical Price",
      description: "Read-only historical price endpoint.",
      category: "market-data",
      tags: ["btc", "price"],
      facetType: "EXTERNAL_HTTP_API",
      provider: v013ActorSample.provider,
      displayVersion: "1.0.0",
      method: "GET",
      inputSchema: { type: "object", properties: { date: { type: "string" } } },
      outputSchema: { type: "object" },
      pricing: v013ActorSample.pricing!,
      publishedAt: "2026-11-16T12:00:00Z",
    };

    const listBody: ListPublicFacetsResponse = {
      facets: [
        v013ActorSample,
        v014VerifiedActorSample,
        v013AgentSample,
        v013ApiSample,
      ],
    };
    const detailBody: GetPublicFacetResponse = {
      facet: v014VerifiedActorSample,
    };

    expect(validateAgainstSchema(listV14, listBody, registry)).toEqual([]);
    expect(validateAgainstSchema(detailV14, detailBody, registry)).toEqual([]);

    expect(
      validateAgainstSchema(publicFacetV14, {
        ...v014VerifiedActorSample,
        pricing: {
          ...v014VerifiedActorSample.pricing!,
          priceAtomic: "1000.25",
        },
      }),
    ).not.toEqual([]);
    expect(
      validateAgainstSchema(publicFacetV14, {
        ...v014VerifiedActorSample,
        pricing: {
          model: "PAY_PER_RUN",
          priceAtomic: "1000",
          assetAddress: "0xe7082a54a456dc4dfe0ceadcd0d0dce7d8ba176f",
          chainId: 43113,
        },
      }),
    ).not.toEqual([]);
  });

  it("enforces mandatory payer, creatorPayTo, amountAtomic and receiptTxHash on v0.14.0 invocation and explicit pending states", async () => {
    const invokeSuccessSchema = await readSchema(
      "invoke-facet-response.v0.14.json",
    );
    const invokePendingSchema = await readSchema(
      "invoke-facet-pending.v0.14.json",
    );

    const paidSuccess: InvokeFacetResponseV014 = {
      runId: "b55dcf50-5e15-42df-9cf6-a480efd5157d",
      facetVersionId: "01a1e97b-a5d1-7c2d-a50a-7f231c809d73",
      facetType: "HOSTED_ACTOR",
      result: { items: [{ ok: true }], count: 1 },
      dataset: [{ ok: true }],
      usage: {
        itemCount: 1,
        durationMs: 120,
        outputHash: "sha256:" + "d".repeat(64),
        runnerSignature: "0x" + "ef".repeat(65),
      },
      replayed: false,
      payment: {
        transaction: "0x" + "2".repeat(64),
        network: "eip155:43113",
        amountAtomic: "1000",
        payer: "0xFA8cCB3C5145fca08f22675ea740e89B1D3a317f",
        creatorPayTo: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
      },
      receipt: {
        inputHash: "sha256:" + "e".repeat(64),
        outputHash: "sha256:" + "d".repeat(64),
        itemCount: 1,
        paymentTxHash: "0x" + "2".repeat(64),
        receiptTxHash: "0x" + "3".repeat(64),
        runnerSignature: "0x" + "ef".repeat(65),
      },
    };

    expect(validateAgainstSchema(invokeSuccessSchema, paidSuccess)).toEqual([]);

    // Reject float string or numeric amountAtomic
    expect(
      validateAgainstSchema(invokeSuccessSchema, {
        ...paidSuccess,
        payment: { ...paidSuccess.payment, amountAtomic: "1000.5" },
      }),
    ).not.toEqual([]);
    expect(
      validateAgainstSchema(invokeSuccessSchema, {
        ...paidSuccess,
        payment: { ...paidSuccess.payment, amountAtomic: 1000 },
      }),
    ).not.toEqual([]);

    // Reject missing creatorPayTo, payer, or receiptTxHash
    const { creatorPayTo: _missingCreator, ...paymentWithoutCreator } =
      paidSuccess.payment;
    expect(_missingCreator).toBeDefined();
    expect(
      validateAgainstSchema(invokeSuccessSchema, {
        ...paidSuccess,
        payment: paymentWithoutCreator,
      }),
    ).not.toEqual([]);

    const { payer: _missingPayer, ...paymentWithoutPayer } =
      paidSuccess.payment;
    expect(_missingPayer).toBeDefined();
    expect(
      validateAgainstSchema(invokeSuccessSchema, {
        ...paidSuccess,
        payment: paymentWithoutPayer,
      }),
    ).not.toEqual([]);

    const { receiptTxHash: _missingReceiptTx, ...receiptWithoutTx } =
      paidSuccess.receipt;
    expect(_missingReceiptTx).toBeDefined();
    expect(
      validateAgainstSchema(invokeSuccessSchema, {
        ...paidSuccess,
        receipt: receiptWithoutTx,
      }),
    ).not.toEqual([]);

    const pendingSettlement: InvokeFacetPendingResponseV014 = {
      runId: "b55dcf50-5e15-42df-9cf6-a480efd5157d",
      payment: {
        status: "settlement_pending",
        transaction: "0x" + "4".repeat(64),
      },
    };
    const pendingReceipt: InvokeFacetPendingResponseV014 = {
      runId: "b55dcf50-5e15-42df-9cf6-a480efd5157d",
      payment: { status: "receipt_pending" },
    };

    expect(
      validateAgainstSchema(invokePendingSchema, pendingSettlement),
    ).toEqual([]);
    expect(validateAgainstSchema(invokePendingSchema, pendingReceipt)).toEqual(
      [],
    );
    expect(
      validateAgainstSchema(invokePendingSchema, {
        runId: pendingReceipt.runId,
        payment: { status: "settled" },
      }),
    ).not.toEqual([]);
  });
});
