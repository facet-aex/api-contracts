import type {
  CreatePricingOptionInput,
  PricingModel,
} from "./actor-and-agent.js";

export const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
export type HttpMethod = (typeof HTTP_METHODS)[number];

export type ApiUpstreamAuthConfig =
  | { kind: "NONE" }
  | {
      kind: "BEARER" | "BASIC";
      secretRefId?: string;
      secretValue?: string;
      secretLabel?: string;
    }
  | {
      kind: "API_KEY_HEADER" | "API_KEY_QUERY";
      parameterName: string;
      secretRefId?: string;
      secretValue?: string;
      secretLabel?: string;
    };

export interface ApiMeta {
  method: HttpMethod;
  pathTemplate: string;
  datasetPath?: string;
  staticHeaderNames?: string[];
  registryTxHash?: string;
  registryVerified?: boolean;
}

export interface ApiPreviewRequest {
  method: HttpMethod;
  baseUrl: string;
  pathTemplate: string;
  auth: ApiUpstreamAuthConfig;
  staticHeaders?: Record<string, string>;
  requestBodyMediaType?: string;
  datasetPath?: string;
  timeoutMs?: number;
  maxResponseBytes?: number;
  redirectPolicy?: "DENY" | "SAME_ORIGIN";
  inputSchema: Record<string, unknown>;
  input: Record<string, unknown>;
}

export interface ApiPreviewChecks {
  httpsValid: boolean;
  ssrfPassed: boolean;
  authConfigured: boolean;
  upstreamReachable: boolean;
  jsonValid: boolean;
  datasetExtracted: boolean;
}

export interface ApiPreviewResponse {
  ok: boolean;
  statusCode: number;
  latencyMs: number;
  contentType?: string;
  result: unknown;
  dataset: Record<string, unknown>[];
  itemCount: number;
  checks: ApiPreviewChecks;
}

export interface CreateApiFacetRequest {
  facetName: string;
  facetDisplayName: string;
  version?: string;
  summary?: string;
  description: string;
  category: string;
  tags?: string[];
  method: HttpMethod;
  baseUrl: string;
  pathTemplate: string;
  sideEffectClass?: "READ_ONLY" | "IDEMPOTENT_WRITE" | "NON_IDEMPOTENT_WRITE";
  auth: ApiUpstreamAuthConfig;
  staticHeaders?: Record<string, string>;
  requestBodyMediaType?: string;
  datasetPath?: string;
  timeoutMs?: number;
  maxResponseBytes?: number;
  redirectPolicy?: "DENY" | "SAME_ORIGIN";
  inputSchema: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;
  pricingOptions: CreatePricingOptionInput[];
  payTo?: string;
  visibility?: "PUBLIC" | "UNLISTED";
}

export interface CreateApiFacetPendingResponse {
  facet: {
    provider: string;
    facetName: string;
    facetDisplayName: string;
    version: string;
    facetType: "API";
    status: "REGISTRATION_PENDING";
    visibility: "PRIVATE";
    contentHash: string;
  };
}

export interface X402AcceptsExtra {
  name: "FACET USD";
  version: "2";
  pricingModel: PricingModel;
  unitPriceAtomic: string;
  maxItemsCap?: number;
  providerPayTo: string;
}
