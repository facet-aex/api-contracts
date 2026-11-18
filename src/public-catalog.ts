import type {
  AutonomousAgentMetadata,
  FacetPricing,
  FacetType,
  HostedActorMetadata,
} from "./actor-and-agent.js";

export interface PublicFacet {
  id: string;
  versionId: string;
  slug: string;
  fullName?: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  facetType?: FacetType;
  provider: { id: string; name: string; slug: string };
  displayVersion: string;
  method: string;
  inputSchema: unknown;
  outputSchema: unknown;
  pricing?: FacetPricing;
  actorMeta?: HostedActorMetadata;
  agentMeta?: AutonomousAgentMetadata;
  publishedAt: string;
}

export interface ListPublicFacetsResponse {
  facets: PublicFacet[];
}
export interface GetPublicFacetResponse {
  facet: PublicFacet;
}
