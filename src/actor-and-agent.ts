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
  registryTxHash?: string;
}

export interface AutonomousAgentMetadata {
  erc8004ChainId: 43113;
  erc8004Registry: string;
  erc8004TokenId: string;
  taskKind: string;
  registryTxHash?: string;
}

export interface CreateActorRequest {
  providerId: string;
  name: string;
  slug: string;
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
