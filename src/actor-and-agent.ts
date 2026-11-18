export const FACET_TYPES = ["API", "ACTOR", "AGENT"] as const;
export type FacetType = (typeof FACET_TYPES)[number];

export const PRICING_MODELS = ["PAY_PER_RUN", "PAY_PER_RESULT"] as const;
export type PricingModel = (typeof PRICING_MODELS)[number];

export interface FacetPricing {
  model: PricingModel;
  priceAtomic: string;
  assetAddress: string;
  chainId: 43113;
  payTo: string;
}

export interface ActorFacetMetadata {
  runtime: string;
  imageDigest: string;
  runnerOciDigest?: string;
  registryTxHash?: string;
  registryVerified?: boolean;
}

export interface AgentFacetMetadata {
  erc8004ChainId: 43113;
  erc8004Registry: string;
  erc8004TokenId: string;
  taskKind: string;
  registryTxHash?: string;
  registryVerified?: boolean;
}

export interface CreateActorRequest {
  facetName: string;
  facetDisplayName: string;
  version?: string;
  summary?: string;
  description: string;
  category: string;
  tags?: string[];
  inputSchema: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;
  code: string;
  pricingModel?: "PAY_PER_RUN";
  priceAtomic?: string;
  payTo?: string;
  registryTxHash?: string;
}

export interface CreateActorPendingResponse {
  facet: {
    provider: string;
    facetName: string;
    facetDisplayName: string;
    version: string;
    facetType: "ACTOR";
    status: "REGISTRATION_PENDING";
    visibility: "PRIVATE";
    imageDigest: string;
  };
}

export interface CreateActorResponse {
  facet: {
    provider: string;
    facetName: string;
    facetDisplayName: string;
    version: string;
    facetType: "ACTOR";
    imageDigest: string;
    status: "PUBLISHED";
    visibility: "PUBLIC";
    publishedAt: string;
  };
}

export type ActorPublishStatus =
  "REGISTRATION_PENDING" | "PUBLISHED" | "REGISTRATION_FAILED";

export interface ActorPublishStatusResponse {
  provider: string;
  facetName: string;
  version: string;
  status: ActorPublishStatus;
  registryTxHash?: string;
  errorCode?: string;
}

export interface CreateAgentFacetRequest {
  facetName: string;
  facetDisplayName: string;
  version?: string;
  summary?: string;
  description: string;
  category: string;
  tags?: string[];
  erc8004TokenId: string;
  erc8004Registry?: string;
  taskKind: string;
  code?: string;
  inputSchema: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;
  pricingModel?: PricingModel;
  priceAtomic?: string;
  payTo?: string;
  registryTxHash?: string;
}

export interface CreateAgentFacetResponse {
  facet: {
    provider: string;
    facetName: string;
    facetDisplayName: string;
    version: string;
    facetType: "AGENT";
    erc8004TokenId: string;
    erc8004Registry: string;
    status: "PUBLISHED";
    visibility: "PUBLIC";
    publishedAt: string;
  };
}

export interface ExecutorRunUsage {
  itemCount: number;
  durationMs: number;
  outputHash: string;
  runnerSignature: string;
}

/**
 * Internal gateway-to-executor payload (keeps internal DB UUIDs for on-chain
 * EIP-191 usage signing, never exposed to public API or agent callers).
 */
export interface ExecutorRunRequest {
  runId: string;
  facetId: string;
  facetType: "ACTOR" | "AGENT";
  input: Record<string, unknown>;
  timeoutMs: number;
  actorBundle?: {
    code: string;
    imageDigest: string;
  };
  agentConfig?: {
    erc8004ChainId: 43113;
    erc8004Registry: string;
    erc8004TokenId: string;
    taskKind: string;
    code?: string;
  };
}

export interface ExecutorRunResponse {
  status: "SUCCEEDED" | "FAILED";
  result: unknown;
  dataset: Record<string, unknown>[];
  logs: string[];
  usage: ExecutorRunUsage;
}

export interface ActorPreviewRequest {
  code: string;
  inputSchema: Record<string, unknown>;
  input: Record<string, unknown>;
}

export interface ActorPreviewUsage {
  itemCount: number;
  durationMs: number;
  outputHash?: string;
  runnerSignature?: string;
}

export interface ActorPreviewResponse {
  result: unknown;
  dataset: Record<string, unknown>[];
  logs: string[];
  usage: ActorPreviewUsage;
}
