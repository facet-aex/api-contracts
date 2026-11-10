export type PublishedFacetVisibility = "UNLISTED" | "PUBLIC";

export interface PublishFacetVersionRequest {
  version: number;
  visibility: PublishedFacetVisibility;
}

export interface PublishFacetVersionResponse {
  facet: {
    id: string;
    status: "PUBLISHED";
    visibility: PublishedFacetVisibility;
    currentPublishedVersionId: string;
    version: number;
  };
  facetVersion: {
    id: string;
    facetId: string;
    displayVersion: string;
    status: "PUBLISHED";
    visibility: PublishedFacetVisibility;
    contentHash: string;
    publishedAt: string;
    version: number;
  };
}
