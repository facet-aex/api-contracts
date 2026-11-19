import type {
  ActorFacetMetadata,
  AgentFacetMetadata,
  FacetPricing,
  FacetPricingOption,
  FacetType,
} from "./actor-and-agent.js";
import type { ApiMeta } from "./api-authoring.js";

export interface PublicFacet {
  provider: string;
  facetName: string;
  facetDisplayName: string;
  version: string;
  facetType: FacetType;
  summary?: string;
  description: string;
  category: string;
  tags: string[];
  method: string;
  inputSchema: unknown;
  outputSchema: unknown;
  pricing?: FacetPricing;
  pricingOptions?: FacetPricingOption[];
  apiMeta?: ApiMeta;
  actorMeta?: ActorFacetMetadata;
  agentMeta?: AgentFacetMetadata;
  publishedAt: string;
}

export interface PublicFacetV016 extends Omit<
  PublicFacet,
  "pricing" | "pricingOptions"
> {
  pricing: FacetPricingOption;
  pricingOptions: FacetPricingOption[];
}

export interface ListPublicFacetsResponse {
  facets: PublicFacet[];
}

export interface GetPublicFacetResponse {
  facet: PublicFacet;
}

export interface ListPublicFacetsResponseV016 {
  facets: PublicFacetV016[];
}

export interface GetPublicFacetResponseV016 {
  facet: PublicFacetV016;
}
