export interface PublicFacet {
  id: string;
  versionId: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  provider: { id: string; name: string; slug: string };
  displayVersion: string;
  method: string;
  inputSchema: unknown;
  outputSchema: unknown;
  publishedAt: string;
}

export interface ListPublicFacetsResponse {
  facets: PublicFacet[];
}
export interface GetPublicFacetResponse {
  facet: PublicFacet;
}
