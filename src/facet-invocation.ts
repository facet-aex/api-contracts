export interface InvokeFacetRequest {
  input: Record<string, unknown>;
}
export interface InvokeFacetResponse {
  runId: string;
  facetVersionId: string;
  result: unknown;
  replayed: boolean;
  payment?: { transaction: string; network: "eip155:43113" };
}

export interface InvokeFacetPendingResponse {
  runId: string;
  payment: { status: "settlement_pending" };
}
