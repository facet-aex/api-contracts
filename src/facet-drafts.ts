export const SIDE_EFFECT_CLASSES = [
  "READ_ONLY",
  "IDEMPOTENT_WRITE",
  "NON_IDEMPOTENT_WRITE",
  "UNKNOWN",
] as const;

export type SideEffectClass = (typeof SIDE_EFFECT_CLASSES)[number];

export interface CreateFacetDraftSelection {
  operationCandidateId: string;
  slug: string;
  name: string;
  summary?: string;
  description?: string;
  category: string;
  tags: string[];
  sideEffectClass: SideEffectClass;
}

export interface CreateFacetDraftsRequest {
  providerId: string;
  importJobId: string;
  selections: CreateFacetDraftSelection[];
}

export interface FacetDraftVersion {
  id: string;
  displayVersion: string;
  status: "DRAFT";
  sourceVersionId: string;
  sourceOperationPointer: string;
  contentHash: string;
  version: number;
  validation: {
    status: "PENDING";
    errors: unknown[];
    warnings: unknown[];
  };
}

export interface FacetDraft {
  id: string;
  providerId: string;
  slug: string;
  type: "EXTERNAL_HTTP_API";
  status: "DRAFT";
  visibility: "PRIVATE";
  version: number;
  createdAt: string;
  draftVersion: FacetDraftVersion;
}

export interface CreateFacetDraftsResponse {
  facets: FacetDraft[];
}
