import type { ExecutorRunUsage, FacetType } from "./actor-and-agent.js";

export interface InvokeFacetRequest {
  input: Record<string, unknown>;
}

export interface InvokeFacetPayment {
  transaction: string;
  network: "eip155:43113";
  amountAtomic: string;
  payer: string;
  providerPayTo: string;
  payTo?: string;
}

export interface RunReceiptMetadata {
  inputHash: string;
  outputHash: string;
  itemCount: number;
  paymentTxHash: string;
  receiptTxHash: string;
  runnerSignature: string;
}

export interface InvokeFacetResponse {
  runId: string;
  provider: string;
  facetName: string;
  facetDisplayName: string;
  version: string;
  facetType: FacetType;
  result: unknown;
  dataset?: Record<string, unknown>[];
  usage?: ExecutorRunUsage;
  replayed: boolean;
  payment: InvokeFacetPayment;
  receipt: RunReceiptMetadata;
}

export type InvokeFacetPendingStatus =
  | "settlement_pending"
  | "receipt_pending"
  | "escrow_pending"
  | "refund_pending";

export interface InvokeFacetPendingResponse {
  runId: string;
  provider: string;
  facetName: string;
  version: string;
  payment: {
    status: InvokeFacetPendingStatus;
    transaction?: string;
  };
}
