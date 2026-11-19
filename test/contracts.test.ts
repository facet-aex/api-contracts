import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import {
  ACTOR_PREVIEW_REQUEST_V015_SCHEMA_ID,
  ACTOR_PREVIEW_RESPONSE_V015_SCHEMA_ID,
  ACTOR_PUBLISH_STATUS_RESPONSE_V015_SCHEMA_ID,
  API_PREVIEW_REQUEST_V016_SCHEMA_ID,
  API_PREVIEW_RESPONSE_V016_SCHEMA_ID,
  CONTRACT_VERSION,
  CREATE_ACTOR_PENDING_RESPONSE_V015_SCHEMA_ID,
  CREATE_ACTOR_REQUEST_V015_SCHEMA_ID,
  CREATE_ACTOR_REQUEST_V016_SCHEMA_ID,
  CREATE_ACTOR_RESPONSE_V015_SCHEMA_ID,
  CREATE_AGENT_FACET_REQUEST_V015_SCHEMA_ID,
  CREATE_AGENT_FACET_RESPONSE_V015_SCHEMA_ID,
  CREATE_API_FACET_PENDING_RESPONSE_V016_SCHEMA_ID,
  CREATE_API_FACET_REQUEST_V016_SCHEMA_ID,
  CREATE_FACET_DRAFTS_REQUEST_V015_SCHEMA_ID,
  CREATE_FACET_DRAFTS_RESPONSE_V015_SCHEMA_ID,
  CREATE_SECRET_REQUEST_SCHEMA_ID,
  ENDPOINT_CONFIG_REQUEST_V015_SCHEMA_ID,
  ENDPOINT_CONFIG_REQUEST_V016_SCHEMA_ID,
  ENDPOINT_CONFIG_RESPONSE_V015_SCHEMA_ID,
  ENDPOINT_CONFIG_RESPONSE_V016_SCHEMA_ID,
  ERROR_SCHEMA_ID,
  EXECUTOR_RUN_REQUEST_V015_SCHEMA_ID,
  EXECUTOR_RUN_RESPONSE_V015_SCHEMA_ID,
  FACET_MANIFEST_SCHEMA_ID,
  FACET_NAME_PATTERN,
  FACET_TYPES,
  FAUCET_CLAIM_REQUEST_V016_SCHEMA_ID,
  FAUCET_CLAIM_RESPONSE_V016_SCHEMA_ID,
  HEALTH_SCHEMA_ID,
  HTTP_METHODS,
  IMPORTER_PARSE_REQUEST_SCHEMA_ID,
  IMPORTER_PARSE_RESPONSE_SCHEMA_ID,
  INVOKE_FACET_PENDING_V015_SCHEMA_ID,
  INVOKE_FACET_REQUEST_SCHEMA_ID,
  INVOKE_FACET_REQUEST_V016_SCHEMA_ID,
  INVOKE_FACET_RESPONSE_V015_SCHEMA_ID,
  INVOKE_FACET_RESPONSE_V016_SCHEMA_ID,
  PRICING_OPTION_V016_SCHEMA_ID,
  PUBLIC_CATALOG_DETAIL_V015_SCHEMA_ID,
  PUBLIC_CATALOG_DETAIL_V016_SCHEMA_ID,
  PUBLIC_CATALOG_LIST_V015_SCHEMA_ID,
  PUBLIC_CATALOG_LIST_V016_SCHEMA_ID,
  PUBLIC_FACET_V015_SCHEMA_ID,
  PUBLIC_FACET_V016_SCHEMA_ID,
  PUBLIC_PROVIDER_V015_SCHEMA_ID,
  PUBLISH_FACET_VERSION_REQUEST_V015_SCHEMA_ID,
  PUBLISH_FACET_VERSION_RESPONSE_V015_SCHEMA_ID,
  ROTATE_SECRET_REQUEST_SCHEMA_ID,
  SECRET_KINDS,
  SECRET_REF_RESPONSE_SCHEMA_ID,
  SEMVER_PATTERN,
  USERNAME_PATTERN,
  VALIDATE_FACET_VERSION_REQUEST_V015_SCHEMA_ID,
  VALIDATE_FACET_VERSION_RESPONSE_V015_SCHEMA_ID,
  VALIDATE_FACET_VERSION_RESPONSE_V016_SCHEMA_ID,
  WALLET_LINK_CHALLENGE_REQUEST_SCHEMA_ID,
  WALLET_LINK_CHALLENGE_RESPONSE_SCHEMA_ID,
  WALLET_LINK_REQUEST_SCHEMA_ID,
  WALLET_LINK_RESPONSE_SCHEMA_ID,
  bumpPatchSemver,
  compareSemver,
  isValidFacetName,
  isValidSemver,
  isValidUsername,
  suggestFacetName,
  type ActorPreviewRequest,
  type ActorPreviewResponse,
  type ActorPublishStatusResponse,
  type ApiPreviewRequest,
  type ApiPreviewResponse,
  type CreateActorPendingResponse,
  type CreateActorRequest,
  type CreateActorRequestV016,
  type CreateActorResponse,
  type CreateAgentFacetRequest,
  type CreateAgentFacetResponse,
  type CreateApiFacetPendingResponse,
  type CreateApiFacetRequest,
  type EndpointConfigRequest,
  type EndpointConfigRequestV016,
  type ExecutorRunRequest,
  type FacetPricingOption,
  type FaucetClaimRequest,
  type FaucetClaimResponse,
  type GetPublicFacetResponse,
  type GetPublicFacetResponseV016,
  type InvokeFacetPendingResponse,
  type InvokeFacetRequestV016,
  type InvokeFacetResponse,
  type InvokeFacetResponseV016,
  type ListPublicFacetsResponse,
  type ListPublicFacetsResponseV016,
  type PublicFacet,
  type PublicFacetV016,
  type PublicProvider,
  type ValidateFacetVersionResponseV016,
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

describe("v0.15.0 canonical Option B contracts", () => {
  it("pins CONTRACT_VERSION at 0.16.0 and uppercase FACET_TYPES API | ACTOR | AGENT", () => {
    expect(CONTRACT_VERSION).toBe("0.16.0");
    expect(FACET_TYPES).toEqual(["API", "ACTOR", "AGENT"]);
    expect(HTTP_METHODS).toEqual(["GET", "POST", "PUT", "PATCH", "DELETE"]);
    expect(SECRET_KINDS).toEqual(["API_KEY", "BEARER_TOKEN", "BASIC_AUTH"]);
    expect(USERNAME_PATTERN).toBe("^[a-z0-9]+(?:-[a-z0-9]+)*$");
    expect(FACET_NAME_PATTERN).toBe("^[a-z0-9]+(?:-[a-z0-9]+)*$");
    expect(SEMVER_PATTERN).toBe(
      "^(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)$",
    );
  });

  it("enforces hyphenated kebab-case lengths for username/provider (8-16), facetName (4-32), and strict SemVer", () => {
    // user username (also used as Facet provider handle): 8-16 lowercase hyphenated kebab-case
    expect(isValidUsername("tai-hung")).toBe(true); // 8 chars
    expect(isValidUsername("facet-demo-user1")).toBe(true); // 16 chars
    expect(isValidUsername("tai-hu1")).toBe(false); // 7 chars
    expect(isValidUsername("this-username-is17")).toBe(false); // 18 chars
    expect(isValidUsername("tai_hung")).toBe(false); // underscore forbidden
    expect(isValidUsername("Tai-Hung")).toBe(false); // uppercase forbidden
    expect(isValidUsername("tai--hung")).toBe(false); // double hyphen forbidden
    expect(isValidUsername("-tai-hung")).toBe(false);
    expect(isValidUsername("tai-hung-")).toBe(false);

    // facetName: 4-32 lowercase hyphenated kebab-case
    expect(isValidFacetName("gold")).toBe(true); // 4 chars
    expect(isValidFacetName("vn-gold-fx-normalizer-actor-v1")).toBe(true); // 30 chars
    expect(isValidFacetName("api")).toBe(false); // 3 chars
    expect(isValidFacetName("a".repeat(33))).toBe(false); // 33 chars
    expect(isValidFacetName("vn_gold_fx")).toBe(false);
    expect(isValidFacetName("VN-Gold-FX")).toBe(false);

    // SemVer MAJOR.MINOR.PATCH
    expect(isValidSemver("0.1.0")).toBe(true);
    expect(isValidSemver("1.0.0")).toBe(true);
    expect(isValidSemver("12.34.56")).toBe(true);
    expect(isValidSemver("v1.0.0")).toBe(false);
    expect(isValidSemver("v1")).toBe(false);
    expect(isValidSemver("1.0")).toBe(false);
    expect(isValidSemver("01.0.0")).toBe(false);
    expect(isValidSemver("1.0.0-alpha")).toBe(false);

    expect(compareSemver("1.10.0", "1.2.9")).toBeGreaterThan(0);
    expect(compareSemver("2.0.0", "1.99.99")).toBeGreaterThan(0);
    expect(compareSemver("1.0.0", "1.0.0")).toBe(0);
    expect(bumpPatchSemver("1.0.0")).toBe("1.0.1");
    expect(bumpPatchSemver("1.2.9")).toBe("1.2.10");

    expect(suggestFacetName("VN Gold & FX Normalizer")).toBe(
      "vn-gold-fx-normalizer",
    );
    expect(suggestFacetName("Định giá vàng Việt Nam!")).toBe(
      "dinh-gia-vang-viet-nam",
    );
    expect(suggestFacetName("AI")).toBe("ai-facet");
    expect(
      isValidFacetName(suggestFacetName("Very Long " + "Word ".repeat(12))),
    ).toBe(true);
  });

  it("registers all v0.15.0 and shared utility schema identifiers without legacy enum or slug leaks", async () => {
    const schemas = [
      ["error-envelope.v0.1.json", ERROR_SCHEMA_ID],
      ["health-status.v0.1.json", HEALTH_SCHEMA_ID],
      ["importer-parse-request.v0.6.json", IMPORTER_PARSE_REQUEST_SCHEMA_ID],
      ["importer-parse-response.v0.6.json", IMPORTER_PARSE_RESPONSE_SCHEMA_ID],
      ["create-secret-request.v0.7.json", CREATE_SECRET_REQUEST_SCHEMA_ID],
      ["rotate-secret-request.v0.7.json", ROTATE_SECRET_REQUEST_SCHEMA_ID],
      ["secret-ref-response.v0.7.json", SECRET_REF_RESPONSE_SCHEMA_ID],
      ["invoke-facet-request.v0.11.json", INVOKE_FACET_REQUEST_SCHEMA_ID],
      [
        "wallet-link-challenge-request.v0.14.json",
        WALLET_LINK_CHALLENGE_REQUEST_SCHEMA_ID,
      ],
      [
        "wallet-link-challenge-response.v0.14.json",
        WALLET_LINK_CHALLENGE_RESPONSE_SCHEMA_ID,
      ],
      ["wallet-link-request.v0.14.json", WALLET_LINK_REQUEST_SCHEMA_ID],
      ["wallet-link-response.v0.14.json", WALLET_LINK_RESPONSE_SCHEMA_ID],
      ["facet-manifest.v1.json", FACET_MANIFEST_SCHEMA_ID],
      ["public-provider.v0.15.json", PUBLIC_PROVIDER_V015_SCHEMA_ID],
      [
        "create-facet-drafts-request.v0.15.json",
        CREATE_FACET_DRAFTS_REQUEST_V015_SCHEMA_ID,
      ],
      [
        "create-facet-drafts-response.v0.15.json",
        CREATE_FACET_DRAFTS_RESPONSE_V015_SCHEMA_ID,
      ],
      [
        "endpoint-config-request.v0.15.json",
        ENDPOINT_CONFIG_REQUEST_V015_SCHEMA_ID,
      ],
      [
        "endpoint-config-response.v0.15.json",
        ENDPOINT_CONFIG_RESPONSE_V015_SCHEMA_ID,
      ],
      [
        "validate-facet-version-request.v0.15.json",
        VALIDATE_FACET_VERSION_REQUEST_V015_SCHEMA_ID,
      ],
      [
        "validate-facet-version-response.v0.15.json",
        VALIDATE_FACET_VERSION_RESPONSE_V015_SCHEMA_ID,
      ],
      [
        "publish-facet-version-request.v0.15.json",
        PUBLISH_FACET_VERSION_REQUEST_V015_SCHEMA_ID,
      ],
      [
        "publish-facet-version-response.v0.15.json",
        PUBLISH_FACET_VERSION_RESPONSE_V015_SCHEMA_ID,
      ],
      [
        "actor-preview-request.v0.15.json",
        ACTOR_PREVIEW_REQUEST_V015_SCHEMA_ID,
      ],
      [
        "actor-preview-response.v0.15.json",
        ACTOR_PREVIEW_RESPONSE_V015_SCHEMA_ID,
      ],
      ["create-actor-request.v0.15.json", CREATE_ACTOR_REQUEST_V015_SCHEMA_ID],
      [
        "create-actor-pending-response.v0.15.json",
        CREATE_ACTOR_PENDING_RESPONSE_V015_SCHEMA_ID,
      ],
      [
        "create-actor-response.v0.15.json",
        CREATE_ACTOR_RESPONSE_V015_SCHEMA_ID,
      ],
      [
        "actor-publish-status-response.v0.15.json",
        ACTOR_PUBLISH_STATUS_RESPONSE_V015_SCHEMA_ID,
      ],
      [
        "create-agent-facet-request.v0.15.json",
        CREATE_AGENT_FACET_REQUEST_V015_SCHEMA_ID,
      ],
      [
        "create-agent-facet-response.v0.15.json",
        CREATE_AGENT_FACET_RESPONSE_V015_SCHEMA_ID,
      ],
      ["executor-run-request.v0.15.json", EXECUTOR_RUN_REQUEST_V015_SCHEMA_ID],
      [
        "executor-run-response.v0.15.json",
        EXECUTOR_RUN_RESPONSE_V015_SCHEMA_ID,
      ],
      ["public-facet.v0.15.json", PUBLIC_FACET_V015_SCHEMA_ID],
      ["public-catalog-list.v0.15.json", PUBLIC_CATALOG_LIST_V015_SCHEMA_ID],
      [
        "public-catalog-detail.v0.15.json",
        PUBLIC_CATALOG_DETAIL_V015_SCHEMA_ID,
      ],
      [
        "invoke-facet-response.v0.15.json",
        INVOKE_FACET_RESPONSE_V015_SCHEMA_ID,
      ],
      ["invoke-facet-pending.v0.15.json", INVOKE_FACET_PENDING_V015_SCHEMA_ID],
    ] as const;

    for (const [filename, expectedId] of schemas) {
      const schema = await readSchema(filename);
      expect(schema.$id).toBe(expectedId);
      const text = JSON.stringify(schema);
      expect(text).not.toMatch(
        /EXTERNAL_HTTP_API|HOSTED_ACTOR|AUTONOMOUS_AGENT|facetSlug|facetFullName|displayVersion|\bfullName\b|\bcreator\b|creatorPayTo/u,
      );
      if (
        filename !== "facet-manifest.v1.json" &&
        filename !== "executor-run-request.v0.15.json"
      ) {
        expect(text).not.toMatch(/\b(facetId|versionId|facetVersionId)\b/u);
      }
    }
  });

  it("validates wallet-link challenge and confirmation contracts", async () => {
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
      expiresAt: "2026-11-18T12:05:00Z",
    };
    const linkReq: WalletLinkRequest = {
      challengeId: "01a1e97a-90e0-7030-b565-91c9abc3857b",
      address: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
      signature: "0x" + "ab".repeat(65),
    };
    const linkRes: WalletLinkResponse = {
      walletAddress: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
      verifiedAt: "2026-11-18T12:01:00Z",
    };

    expect(validateAgainstSchema(challengeReqSchema, challengeReq)).toEqual([]);
    expect(validateAgainstSchema(challengeResSchema, challengeRes)).toEqual([]);
    expect(validateAgainstSchema(linkReqSchema, linkReq)).toEqual([]);
    expect(validateAgainstSchema(linkResSchema, linkRes)).toEqual([]);
  });

  it("validates v0.15.0 Option B Actor, Agent, Preview, and Executor contracts", async () => {
    const previewReqSchema = await readSchema(
      "actor-preview-request.v0.15.json",
    );
    const previewResSchema = await readSchema(
      "actor-preview-response.v0.15.json",
    );
    const createActorReqSchema = await readSchema(
      "create-actor-request.v0.15.json",
    );
    const createActorPendingSchema = await readSchema(
      "create-actor-pending-response.v0.15.json",
    );
    const createActorResSchema = await readSchema(
      "create-actor-response.v0.15.json",
    );
    const publishStatusSchema = await readSchema(
      "actor-publish-status-response.v0.15.json",
    );
    const createAgentReqSchema = await readSchema(
      "create-agent-facet-request.v0.15.json",
    );
    const createAgentResSchema = await readSchema(
      "create-agent-facet-response.v0.15.json",
    );
    const executorReqSchema = await readSchema(
      "executor-run-request.v0.15.json",
    );

    const previewReq: ActorPreviewRequest = {
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
    expect(validateAgainstSchema(previewReqSchema, previewReq)).toEqual([]);
    expect(validateAgainstSchema(previewResSchema, previewRes)).toEqual([]);

    const createActorReq: CreateActorRequest = {
      facetName: "echo-transform",
      facetDisplayName: "Echo Transform Actor",
      version: "1.0.0",
      description: "Transforms caller input deterministically.",
      category: "utilities",
      inputSchema: previewReq.inputSchema,
      code: previewReq.code,
      pricingModel: "PAY_PER_RUN",
      priceAtomic: "1000",
      payTo: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
    };
    expect(validateAgainstSchema(createActorReqSchema, createActorReq)).toEqual(
      [],
    );

    // Reject invalid facetName, underscore, short name, and non-SemVer versions
    expect(
      validateAgainstSchema(createActorReqSchema, {
        ...createActorReq,
        facetName: "api",
      }),
    ).not.toEqual([]);
    expect(
      validateAgainstSchema(createActorReqSchema, {
        ...createActorReq,
        facetName: "echo_transform",
      }),
    ).not.toEqual([]);
    expect(
      validateAgainstSchema(createActorReqSchema, {
        ...createActorReq,
        version: "v1.0.0",
      }),
    ).not.toEqual([]);
    expect(
      validateAgainstSchema(createActorReqSchema, {
        ...createActorReq,
        version: "1.0",
      }),
    ).not.toEqual([]);

    const pendingRes: CreateActorPendingResponse = {
      facet: {
        provider: "tai-hung-dev",
        facetName: "echo-transform",
        facetDisplayName: "Echo Transform Actor",
        version: "1.0.0",
        facetType: "ACTOR",
        status: "REGISTRATION_PENDING",
        visibility: "PRIVATE",
        imageDigest: "sha256:" + "b".repeat(64),
      },
    };
    const publishedRes: CreateActorResponse = {
      facet: {
        provider: "tai-hung-dev",
        facetName: "echo-transform",
        facetDisplayName: "Echo Transform Actor",
        version: "1.0.0",
        facetType: "ACTOR",
        imageDigest: "sha256:" + "b".repeat(64),
        status: "PUBLISHED",
        visibility: "PUBLIC",
        publishedAt: "2026-11-18T12:00:00Z",
      },
    };
    const statusRes: ActorPublishStatusResponse = {
      provider: "tai-hung-dev",
      facetName: "echo-transform",
      version: "1.0.0",
      status: "PUBLISHED",
      registryTxHash: "0x" + "1".repeat(64),
    };
    expect(validateAgainstSchema(createActorPendingSchema, pendingRes)).toEqual(
      [],
    );
    expect(validateAgainstSchema(createActorResSchema, publishedRes)).toEqual(
      [],
    );
    expect(validateAgainstSchema(publishStatusSchema, statusRes)).toEqual([]);

    const createAgentReq: CreateAgentFacetRequest = {
      facetName: "vn-market-agent",
      facetDisplayName: "VN Market Analyst Agent",
      version: "1.0.0",
      description: "ERC-8004 autonomous analyst agent.",
      category: "a2a-agents",
      erc8004TokenId: "304",
      taskKind: "vn-market-analysis",
      inputSchema: { type: "object", properties: {} },
    };
    const createAgentRes: CreateAgentFacetResponse = {
      facet: {
        provider: "facet-demo-org",
        facetName: "vn-market-agent",
        facetDisplayName: "VN Market Analyst Agent",
        version: "1.0.0",
        facetType: "AGENT",
        erc8004TokenId: "304",
        erc8004Registry: "0x8004A818BFB912233c491871b3d84c89A494BD9e",
        status: "PUBLISHED",
        visibility: "PUBLIC",
        publishedAt: "2026-11-18T12:00:00Z",
      },
    };
    expect(validateAgainstSchema(createAgentReqSchema, createAgentReq)).toEqual(
      [],
    );
    expect(validateAgainstSchema(createAgentResSchema, createAgentRes)).toEqual(
      [],
    );

    const execReq: ExecutorRunRequest = {
      runId: "01a1e97a-90e0-7030-b565-91c9abc3857b",
      facetId: "01a1e97a-90e0-7030-b565-91c9abc3857c",
      facetType: "ACTOR",
      input: { text: "hello" },
      timeoutMs: 15000,
      actorBundle: {
        code: previewReq.code,
        imageDigest: "sha256:" + "b".repeat(64),
      },
    };
    expect(validateAgainstSchema(executorReqSchema, execReq)).toEqual([]);
    expect(
      validateAgainstSchema(executorReqSchema, {
        ...execReq,
        facetType: "HOSTED_ACTOR",
      }),
    ).not.toEqual([]);
  });

  it("validates public catalog, public provider, and invocation contracts without UUIDs or slugs", async () => {
    const publicFacetSchema = await readSchema("public-facet.v0.15.json");
    const listSchema = await readSchema("public-catalog-list.v0.15.json");
    const detailSchema = await readSchema("public-catalog-detail.v0.15.json");
    const providerSchema = await readSchema("public-provider.v0.15.json");
    const invokeSuccessSchema = await readSchema(
      "invoke-facet-response.v0.15.json",
    );
    const invokePendingSchema = await readSchema(
      "invoke-facet-pending.v0.15.json",
    );
    const registry = new Map<string, JsonSchemaNode>([
      [PUBLIC_FACET_V015_SCHEMA_ID, publicFacetSchema],
    ]);

    const actorSample: PublicFacet = {
      provider: "facet-demo-org",
      facetName: "vn-gold-fx-actor",
      facetDisplayName: "VN Gold & FX Normalizer",
      version: "1.0.0",
      facetType: "ACTOR",
      description: "Normalizes Vietnamese gold and FX quotes.",
      category: "vietnamese-data",
      tags: ["vietnam", "gold", "fx"],
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
        registryVerified: true,
      },
      publishedAt: "2026-11-18T12:00:00Z",
    };

    const { actorMeta: _ignoredActorMeta, ...actorBase } = actorSample;
    void _ignoredActorMeta;
    const agentSample: PublicFacet = {
      ...actorBase,
      facetName: "vn-market-agent",
      facetDisplayName: "VN Market Analyst Agent",
      facetType: "AGENT",
      agentMeta: {
        erc8004ChainId: 43113,
        erc8004Registry: "0x8004A818BFB912233c491871b3d84c89A494BD9e",
        erc8004TokenId: "304",
        taskKind: "vn-market-analysis",
        registryVerified: true,
        registryTxHash:
          "0x16144b34bd02b10a28124dd5b811da1855c666585b0fa9c0ea1b8b1ed7cd1916",
      },
    };

    const apiSample: PublicFacet = {
      provider: "facet-demo-org",
      facetName: "coingecko-btc",
      facetDisplayName: "CoinGecko BTC Historical Price",
      version: "1.0.0",
      facetType: "API",
      description: "Read-only historical price endpoint.",
      category: "market-data",
      tags: ["btc", "price"],
      method: "GET",
      inputSchema: { type: "object", properties: { date: { type: "string" } } },
      outputSchema: { type: "object" },
      ...(actorSample.pricing ? { pricing: actorSample.pricing } : {}),
      publishedAt: "2026-11-18T12:00:00Z",
    };

    const listBody: ListPublicFacetsResponse = {
      facets: [actorSample, agentSample, apiSample],
    };
    const detailBody: GetPublicFacetResponse = { facet: actorSample };

    expect(validateAgainstSchema(listSchema, listBody, registry)).toEqual([]);
    expect(validateAgainstSchema(detailSchema, detailBody, registry)).toEqual(
      [],
    );

    const providerSample: PublicProvider = {
      provider: "tai-hung-dev",
      walletAddress: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
      walletVerifiedAt: "2026-11-18T12:00:00Z",
      status: "active",
      createdAt: "2026-11-18T12:00:00Z",
      updatedAt: "2026-11-18T12:00:00Z",
    };
    expect(validateAgainstSchema(providerSchema, providerSample)).toEqual([]);

    const endpointReqSchema = await readSchema(
      "endpoint-config-request.v0.15.json",
    );
    const endpointReq: EndpointConfigRequest = {
      revision: 1,
      baseUrl: "https://api.example.com",
      auth: { kind: "NONE" },
      timeoutMs: 5000,
      maxResponseBytes: 65536,
      redirectPolicy: "DENY",
    };
    expect(validateAgainstSchema(endpointReqSchema, endpointReq)).toEqual([]);

    const paidSuccess: InvokeFacetResponse = {
      runId: "b55dcf50-5e15-42df-9cf6-a480efd5157d",
      provider: "tai-hung-dev",
      facetName: "vn-gold-fx-actor",
      facetDisplayName: "VN Gold & FX Normalizer",
      version: "1.0.0",
      facetType: "ACTOR",
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
        providerPayTo: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
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

    const pending: InvokeFacetPendingResponse = {
      runId: "b55dcf50-5e15-42df-9cf6-a480efd5157d",
      provider: "tai-hung-dev",
      facetName: "vn-gold-fx-actor",
      version: "1.0.0",
      payment: {
        status: "settlement_pending",
        transaction: "0x" + "4".repeat(64),
      },
    };
    expect(validateAgainstSchema(invokePendingSchema, pending)).toEqual([]);
  });

  it("validates v0.16.0 multi-pricing, TaskEscrow, full HTTP API authoring, validation, and Faucet schemas", async () => {
    const v016Schemas = [
      ["pricing-option.v0.16.json", PRICING_OPTION_V016_SCHEMA_ID],
      ["public-facet.v0.16.json", PUBLIC_FACET_V016_SCHEMA_ID],
      ["public-catalog-list.v0.16.json", PUBLIC_CATALOG_LIST_V016_SCHEMA_ID],
      [
        "public-catalog-detail.v0.16.json",
        PUBLIC_CATALOG_DETAIL_V016_SCHEMA_ID,
      ],
      ["create-actor-request.v0.16.json", CREATE_ACTOR_REQUEST_V016_SCHEMA_ID],
      ["invoke-facet-request.v0.16.json", INVOKE_FACET_REQUEST_V016_SCHEMA_ID],
      [
        "invoke-facet-response.v0.16.json",
        INVOKE_FACET_RESPONSE_V016_SCHEMA_ID,
      ],
      ["api-preview-request.v0.16.json", API_PREVIEW_REQUEST_V016_SCHEMA_ID],
      ["api-preview-response.v0.16.json", API_PREVIEW_RESPONSE_V016_SCHEMA_ID],
      [
        "create-api-facet-request.v0.16.json",
        CREATE_API_FACET_REQUEST_V016_SCHEMA_ID,
      ],
      [
        "create-api-facet-pending-response.v0.16.json",
        CREATE_API_FACET_PENDING_RESPONSE_V016_SCHEMA_ID,
      ],
      [
        "endpoint-config-request.v0.16.json",
        ENDPOINT_CONFIG_REQUEST_V016_SCHEMA_ID,
      ],
      [
        "endpoint-config-response.v0.16.json",
        ENDPOINT_CONFIG_RESPONSE_V016_SCHEMA_ID,
      ],
      [
        "validate-facet-version-response.v0.16.json",
        VALIDATE_FACET_VERSION_RESPONSE_V016_SCHEMA_ID,
      ],
      ["faucet-claim-request.v0.16.json", FAUCET_CLAIM_REQUEST_V016_SCHEMA_ID],
      [
        "faucet-claim-response.v0.16.json",
        FAUCET_CLAIM_RESPONSE_V016_SCHEMA_ID,
      ],
    ] as const;

    const registry = new Map<string, JsonSchemaNode>();
    for (const [filename, expectedId] of v016Schemas) {
      const schema = await readSchema(filename);
      expect(schema.$id).toBe(expectedId);
      const text = JSON.stringify(schema);
      expect(text).not.toMatch(
        /EXTERNAL_HTTP_API|HOSTED_ACTOR|AUTONOMOUS_AGENT|facetSlug|facetFullName|displayVersion|\bfullName\b|\bcreator\b|creatorPayTo|\b(facetId|versionId|facetVersionId)\b/u,
      );
      registry.set(expectedId, schema);
    }

    const payPerRunOption: FacetPricingOption = {
      model: "PAY_PER_RUN",
      priceAtomic: "1000",
      maxAmountAtomic: "1000",
      assetAddress: "0xe7082a54a456dc4dfe0ceadcd0d0dce7d8ba176f",
      chainId: 43113,
      payTo: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
      isPrimary: true,
    };
    const payPerResultOption: FacetPricingOption = {
      model: "PAY_PER_RESULT",
      priceAtomic: "500",
      maxItemsCap: 15,
      maxAmountAtomic: "7500",
      assetAddress: "0xe7082a54a456dc4dfe0ceadcd0d0dce7d8ba176f",
      chainId: 43113,
      payTo: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
      isPrimary: false,
    };

    const publicFacet016: PublicFacetV016 = {
      provider: "tai-hung-dev",
      facetName: "vn-news-api",
      facetDisplayName: "VN News Feed API",
      version: "1.0.0",
      facetType: "API",
      summary: "Structured Vietnam tech news",
      description: "Returns normalized Vietnam tech articles.",
      category: "data",
      tags: ["vietnam", "news"],
      method: "GET",
      inputSchema: { type: "object", properties: {} },
      outputSchema: { type: "object" },
      pricing: payPerRunOption,
      pricingOptions: [payPerRunOption, payPerResultOption],
      apiMeta: {
        method: "GET",
        pathTemplate: "/v1/articles",
        datasetPath: "data.items",
        staticHeaderNames: ["X-Api-Version"],
        registryTxHash: "0x" + "a".repeat(64),
        registryVerified: true,
      },
      publishedAt: "2026-11-20T01:00:00Z",
    };

    expect(
      validateAgainstSchema(
        registry.get(PUBLIC_FACET_V016_SCHEMA_ID)!,
        publicFacet016,
        registry,
      ),
    ).toEqual([]);
    expect(
      validateAgainstSchema(
        registry.get(PUBLIC_CATALOG_LIST_V016_SCHEMA_ID)!,
        { facets: [publicFacet016] } satisfies ListPublicFacetsResponseV016,
        registry,
      ),
    ).toEqual([]);
    expect(
      validateAgainstSchema(
        registry.get(PUBLIC_CATALOG_DETAIL_V016_SCHEMA_ID)!,
        { facet: publicFacet016 } satisfies GetPublicFacetResponseV016,
        registry,
      ),
    ).toEqual([]);
    expect(
      validateAgainstSchema(
        registry.get(PUBLIC_FACET_V016_SCHEMA_ID)!,
        {
          ...publicFacet016,
          pricingOptions: [],
        },
        registry,
      ),
    ).not.toEqual([]);

    const createActor016Schema = registry.get(
      CREATE_ACTOR_REQUEST_V016_SCHEMA_ID,
    )!;
    const validActor016: CreateActorRequestV016 = {
      facetName: "news-scraper",
      facetDisplayName: "News Scraper",
      version: "1.0.0",
      description: "Scrapes news cleanly.",
      category: "web-scraping",
      inputSchema: { type: "object", properties: {} },
      code: "export default async function run() { return [{ ok: true }]; }",
      pricingOptions: [
        { model: "PAY_PER_RUN", priceAtomic: "1000", isPrimary: true },
        {
          model: "PAY_PER_RESULT",
          priceAtomic: "500",
          maxItemsCap: 15,
          isPrimary: false,
        },
      ],
    };
    expect(validateAgainstSchema(createActor016Schema, validActor016)).toEqual(
      [],
    );
    expect(
      validateAgainstSchema(createActor016Schema, {
        ...validActor016,
        pricingOptions: [{ model: "PAY_PER_RUN", priceAtomic: "0" }],
      }),
    ).not.toEqual([]);
    expect(
      validateAgainstSchema(createActor016Schema, {
        ...validActor016,
        pricingOptions: [
          { model: "PAY_PER_RESULT", priceAtomic: "500", maxItemsCap: 0 },
        ],
      }),
    ).not.toEqual([]);
    expect(
      validateAgainstSchema(createActor016Schema, {
        ...validActor016,
        pricingOptions: [
          { model: "PAY_PER_RESULT", priceAtomic: "500", maxItemsCap: 1001 },
        ],
      }),
    ).not.toEqual([]);

    const invokeReq016Schema = registry.get(
      INVOKE_FACET_REQUEST_V016_SCHEMA_ID,
    )!;
    const validInvokeReq: InvokeFacetRequestV016 = {
      input: { q: "avalanche" },
      pricingModel: "PAY_PER_RESULT",
    };
    expect(validateAgainstSchema(invokeReq016Schema, validInvokeReq)).toEqual(
      [],
    );
    expect(
      validateAgainstSchema(invokeReq016Schema, {
        input: {},
        pricingModel: "PAY_PER_EVENT",
      }),
    ).not.toEqual([]);

    const invokeRes016: InvokeFacetResponseV016 = {
      runId: "b55dcf50-5e15-42df-9cf6-a480efd5157d",
      provider: "tai-hung-dev",
      facetName: "vn-news-api",
      facetDisplayName: "VN News Feed API",
      version: "1.0.0",
      facetType: "API",
      result: { data: { items: [{ title: "hi" }] } },
      dataset: [{ title: "hi" }],
      usage: {
        itemCount: 1,
        durationMs: 88,
        outputHash: "sha256:" + "d".repeat(64),
        runnerSignature: "0x" + "ef".repeat(65),
      },
      replayed: false,
      payment: {
        transaction: "0x" + "2".repeat(64),
        network: "eip155:43113",
        pricingModel: "PAY_PER_RESULT",
        amountAtomic: "500",
        unitPriceAtomic: "500",
        maxItemsCap: 15,
        depositedAmountAtomic: "7500",
        refundAmountAtomic: "7000",
        depositTxHash: "0x" + "1".repeat(64),
        payer: "0xFA8cCB3C5145fca08f22675ea740e89B1D3a317f",
        providerPayTo: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
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
    expect(
      validateAgainstSchema(
        registry.get(INVOKE_FACET_RESPONSE_V016_SCHEMA_ID)!,
        invokeRes016,
      ),
    ).toEqual([]);

    const apiPreviewReq: ApiPreviewRequest = {
      method: "POST",
      baseUrl: "https://api.example.com",
      pathTemplate: "/v1/items",
      auth: { kind: "BASIC", secretValue: "user:pass", secretLabel: "basic" },
      staticHeaders: { "X-Env": "staging" },
      requestBodyMediaType: "application/json",
      datasetPath: "data.items",
      inputSchema: { type: "object", properties: {} },
      input: { body: { hello: "world" } },
    };
    const apiPreviewRes: ApiPreviewResponse = {
      ok: true,
      statusCode: 201,
      latencyMs: 95,
      contentType: "application/json",
      result: { data: { items: [{ id: 1 }] } },
      dataset: [{ id: 1 }],
      itemCount: 1,
      checks: {
        httpsValid: true,
        ssrfPassed: true,
        authConfigured: true,
        upstreamReachable: true,
        jsonValid: true,
        datasetExtracted: true,
      },
    };
    expect(
      validateAgainstSchema(
        registry.get(API_PREVIEW_REQUEST_V016_SCHEMA_ID)!,
        apiPreviewReq,
      ),
    ).toEqual([]);
    expect(
      validateAgainstSchema(
        registry.get(API_PREVIEW_RESPONSE_V016_SCHEMA_ID)!,
        apiPreviewRes,
      ),
    ).toEqual([]);

    const createApiReq: CreateApiFacetRequest = {
      facetName: "webhook-echo",
      facetDisplayName: "Webhook Echo API",
      version: "1.0.0",
      description: "Posts JSON payloads safely.",
      category: "developer-tools",
      method: "POST",
      baseUrl: "https://api.example.com",
      pathTemplate: "/v1/echo",
      auth: { kind: "NONE" },
      staticHeaders: { "X-Source": "facet" },
      requestBodyMediaType: "application/json",
      datasetPath: "items",
      inputSchema: { type: "object", properties: {} },
      pricingOptions: [
        { model: "PAY_PER_RUN", priceAtomic: "1000", isPrimary: true },
      ],
    };
    const createApiPending: CreateApiFacetPendingResponse = {
      facet: {
        provider: "tai-hung-dev",
        facetName: "webhook-echo",
        facetDisplayName: "Webhook Echo API",
        version: "1.0.0",
        facetType: "API",
        status: "REGISTRATION_PENDING",
        visibility: "PRIVATE",
        contentHash: "sha256:" + "c".repeat(64),
      },
    };
    expect(
      validateAgainstSchema(
        registry.get(CREATE_API_FACET_REQUEST_V016_SCHEMA_ID)!,
        createApiReq,
      ),
    ).toEqual([]);
    expect(
      validateAgainstSchema(
        registry.get(CREATE_API_FACET_PENDING_RESPONSE_V016_SCHEMA_ID)!,
        createApiPending,
      ),
    ).toEqual([]);

    const endpointReq016: EndpointConfigRequestV016 = {
      revision: 1,
      baseUrl: "https://api.example.com",
      auth: {
        kind: "BASIC",
        secretRefId: "01a1e97a-90e0-7030-b565-91c9abc3857b",
      },
      staticHeaders: { "X-Api-Version": "2026-11" },
      requestBodyMediaType: "application/json",
      datasetPath: "data.items",
      timeoutMs: 10000,
      maxResponseBytes: 1048576,
      redirectPolicy: "SAME_ORIGIN",
    };
    expect(
      validateAgainstSchema(
        registry.get(ENDPOINT_CONFIG_REQUEST_V016_SCHEMA_ID)!,
        endpointReq016,
      ),
    ).toEqual([]);

    const validateRes016: ValidateFacetVersionResponseV016 = {
      facetVersion: {
        provider: "tai-hung-dev",
        facetName: "webhook-echo",
        version: "1.0.0",
        status: "VALID",
        revision: 2,
        validation: { status: "VALID", errors: [], warnings: [] },
        warningAcknowledgements: [],
      },
    };
    expect(
      validateAgainstSchema(
        registry.get(VALIDATE_FACET_VERSION_RESPONSE_V016_SCHEMA_ID)!,
        validateRes016,
      ),
    ).toEqual([]);

    const faucetReq: FaucetClaimRequest = {
      address: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
    };
    const faucetRes: FaucetClaimResponse = {
      address: "0x9265c1c87fC5fb3C72Dc68b4D3A005dE1E22C3cf",
      amountAtomic: "1000000",
      balanceAtomic: "2000000",
      txHash: "0x" + "f".repeat(64),
      explorerUrl: "https://testnet.snowtrace.io/tx/" + "f".repeat(64),
      nextClaimAt: "2026-11-21T01:00:00Z",
    };
    expect(
      validateAgainstSchema(
        registry.get(FAUCET_CLAIM_REQUEST_V016_SCHEMA_ID)!,
        faucetReq,
      ),
    ).toEqual([]);
    expect(
      validateAgainstSchema(
        registry.get(FAUCET_CLAIM_RESPONSE_V016_SCHEMA_ID)!,
        faucetRes,
      ),
    ).toEqual([]);
  });
});
