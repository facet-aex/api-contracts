export interface FaucetClaimRequest {
  address: string;
}

export interface FaucetClaimResponse {
  address: string;
  amountAtomic: string;
  balanceAtomic: string;
  txHash: string;
  explorerUrl: string;
  nextClaimAt: string;
}
