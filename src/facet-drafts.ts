export const SIDE_EFFECT_CLASSES = [
  "READ_ONLY",
  "IDEMPOTENT_WRITE",
  "NON_IDEMPOTENT_WRITE",
  "UNKNOWN",
] as const;

export type SideEffectClass = (typeof SIDE_EFFECT_CLASSES)[number];

export interface CreateFacetDraftSelection {
  operationCandidateId: string;
  facetName: string;
  facetDisplayName: string;
  version?: string;
  summary?: string;
  description?: string;
  category: string;
  tags: string[];
  sideEffectClass: SideEffectClass;
}

export interface CreateFacetDraftsRequest {
  importJobId: string;
  selections: CreateFacetDraftSelection[];
}

export interface FacetDraftVersion {
  version: string;
  status: "DRAFT";
  sourceVersionId: string;
  sourceOperationPointer: string;
  contentHash: string;
  revision: number;
  validation: {
    status: "PENDING";
    errors: unknown[];
    warnings: unknown[];
  };
}

export interface FacetDraft {
  creator: string;
  facetName: string;
  facetDisplayName: string;
  type: "API";
  status: "DRAFT";
  visibility: "PRIVATE";
  revision: number;
  createdAt: string;
  draftVersion: FacetDraftVersion;
}

export interface CreateFacetDraftsResponse {
  facets: FacetDraft[];
}
