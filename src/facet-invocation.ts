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

export interface InvokeFacetPaymentV014 {
  transaction: string;
  network: "eip155:43113";
  amountAtomic: string;
  payer: string;
  creatorPayTo: string;
  payTo?: string;
}

export interface RunReceiptMetadataV014 {
  inputHash: string;
  outputHash: string;
  itemCount: number;
  paymentTxHash: string;
  receiptTxHash: string;
  runnerSignature: string;
}

export interface InvokeFacetResponseV014 {
  runId: string;
  facetVersionId: string;
  facetType?: FacetType;
  result: unknown;
  dataset?: Record<string, unknown>[];
  usage?: ExecutorRunUsage;
  replayed: boolean;
  payment: InvokeFacetPaymentV014;
  receipt: RunReceiptMetadataV014;
}

export type InvokeFacetPendingStatus =
  | "settlement_pending"
  | "receipt_pending"
  | "escrow_pending"
  | "refund_pending";

export interface InvokeFacetPendingResponseV014 {
  runId: string;
  payment: {
    status: InvokeFacetPendingStatus;
    transaction?: string;
  };
}
