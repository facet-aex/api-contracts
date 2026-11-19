import type {
  ExecutorRunUsage,
  FacetType,
  PricingModel,
} from "./actor-and-agent.js";

export interface InvokeFacetRequest {
  input: Record<string, unknown>;
}

export interface InvokeFacetRequestV016 {
  input: Record<string, unknown>;
  pricingModel?: PricingModel;
}

export interface InvokeFacetPayment {
  transaction: string;
  network: "eip155:43113";
  amountAtomic: string;
  payer: string;
  providerPayTo: string;
  payTo?: string;
}

export interface InvokeFacetPaymentV016 extends InvokeFacetPayment {
  pricingModel: PricingModel;
  unitPriceAtomic?: string;
  maxItemsCap?: number;
  depositedAmountAtomic?: string;
  refundAmountAtomic?: string;
  depositTxHash?: string;
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

export interface InvokeFacetResponseV016 extends Omit<
  InvokeFacetResponse,
  "payment"
> {
  payment: InvokeFacetPaymentV016;
}

export interface InvokeFacetRefundedErrorResponse {
  error: {
    code: string;
    message?: string;
  };
  runId: string;
  payment?: {
    status: "refunded";
    transaction: string;
    refundAmountAtomic: string;
  };
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
