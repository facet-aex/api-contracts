import type {
  ActorFacetMetadata,
  AgentFacetMetadata,
  FacetPricing,
  FacetType,
} from "./actor-and-agent.js";

export interface PublicFacet {
  creator: string;
  facetName: string;
  facetDisplayName: string;
  version: string;
  facetType: FacetType;
  description: string;
  category: string;
  tags: string[];
  method: string;
  inputSchema: unknown;
  outputSchema: unknown;
  pricing?: FacetPricing;
  actorMeta?: ActorFacetMetadata;
  agentMeta?: AgentFacetMetadata;
  publishedAt: string;
}

export interface ListPublicFacetsResponse {
  facets: PublicFacet[];
}

export interface GetPublicFacetResponse {
  facet: PublicFacet;
}
