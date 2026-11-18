export const FACET_TYPES = [
  "EXTERNAL_HTTP_API",
  "HOSTED_ACTOR",
  "AUTONOMOUS_AGENT",
] as const;
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

export interface HostedActorMetadata {
  runtime: string;
  imageDigest: string;
  runnerOciDigest?: string;
  registryTxHash?: string;
  registryVerified?: boolean;
}

export interface AutonomousAgentMetadata {
  erc8004ChainId: 43113;
  erc8004Registry: string;
  erc8004TokenId: string;
  taskKind: string;
  registryTxHash?: string;
  registryVerified?: boolean;
}

export interface CreateActorRequest {
  providerId: string;
  name: string;
  slug: string;
  displayVersion?: string;
  summary?: string;
  description: string;
  category: string;
  tags?: string[];
  inputSchema: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;
  code: string;
  pricingModel?: PricingModel;
  priceAtomic?: string;
  payTo?: string;
  registryTxHash?: string;
}

export interface CreateActorResponse {
  facet: {
    id: string;
    versionId: string;
    slug: string;
    facetType: "HOSTED_ACTOR";
    imageDigest: string;
    status: "PUBLISHED";
    visibility: "PUBLIC";
    publishedAt: string;
  };
}

export interface CreateAgentFacetRequest {
  providerId: string;
  name: string;
  slug: string;
  displayVersion?: string;
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
    id: string;
    versionId: string;
    slug: string;
    facetType: "AUTONOMOUS_AGENT";
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

export interface ExecutorRunRequest {
  runId: string;
  facetId: string;
  facetVersionId: string;
  facetType: "HOSTED_ACTOR" | "AUTONOMOUS_AGENT";
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
  providerId: string;
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

export interface CreateActorRequestV014 {
  id?: string;
  providerId: string;
  name: string;
  slug: string;
  displayVersion?: string;
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
}

export interface CreateActorPendingResponse {
  facet: {
    id: string;
    versionId: string;
    slug?: string;
    fullName?: string;
    displayVersion?: string;
    facetType?: "HOSTED_ACTOR";
    status: "REGISTRATION_PENDING";
    visibility: "PRIVATE";
    imageDigest: string;
  };
}

export type ActorPublishStatus =
  "REGISTRATION_PENDING" | "PUBLISHED" | "REGISTRATION_FAILED";

export interface ActorPublishStatusResponse {
  facetId: string;
  versionId: string;
  fullName?: string;
  displayVersion?: string;
  status: ActorPublishStatus;
  registryTxHash?: string;
  errorCode?: string;
}
