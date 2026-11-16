import type { ExecutorRunUsage, FacetType } from "./actor-and-agent.js";

export interface InvokeFacetRequest {
  input: Record<string, unknown>;
}

export interface RunReceiptMetadata {
  inputHash: string;
  outputHash: string;
  itemCount: number;
  paymentTxHash: string;
  receiptTxHash?: string;
  runnerSignature: string;
}

export interface InvokeFacetResponse {
  runId: string;
  facetVersionId: string;
  facetType?: FacetType;
  result: unknown;
  dataset?: Record<string, unknown>[];
  usage?: ExecutorRunUsage;
  replayed: boolean;
  payment?: {
    transaction: string;
    network: "eip155:43113";
    amountAtomic?: string;
    payTo?: string;
  };
  receipt?: RunReceiptMetadata;
}

export interface InvokeFacetPendingResponse {
  runId: string;
  payment: { status: "settlement_pending" };
}
