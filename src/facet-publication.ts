export type PublishedFacetVisibility = "UNLISTED" | "PUBLIC";

export interface PublishFacetVersionRequest {
  revision: number;
  visibility: PublishedFacetVisibility;
}

export interface PublishFacetVersionResponse {
  facet: {
    provider: string;
    facetName: string;
    facetDisplayName: string;
    facetType: "API" | "ACTOR" | "AGENT";
    status: "PUBLISHED";
    visibility: PublishedFacetVisibility;
    currentPublishedVersion: string;
    revision: number;
  };
  facetVersion: {
    provider: string;
    facetName: string;
    version: string;
    status: "PUBLISHED";
    visibility: PublishedFacetVisibility;
    contentHash: string;
    publishedAt: string;
    revision: number;
  };
}
