export type UserStatus = "active" | "disabled";

/** Public view of a User acting as a Facet provider (`provider` = `users.username`). */
export interface PublicProvider {
  provider: string;
  walletAddress: string | null;
  walletVerifiedAt: string | null;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CurrentUser {
  clerkId: string;
  username: string;
  walletAddress: string | null;
  walletVerifiedAt: string | null;
  status: UserStatus;
}

export interface ClerkUserWebhookPayload {
  type: "user.created" | "user.updated" | "user.deleted";
  data: {
    id: string;
    username?: string | null;
    deleted?: boolean;
  };
}

export type WalletLinkChallengeRequest = Record<string, never>;

export interface WalletLinkChallengeResponse {
  challengeId: string;
  message: string;
  expiresAt: string;
}

export interface WalletLinkRequest {
  challengeId: string;
  address: string;
  signature: string;
}

export interface WalletLinkResponse {
  walletAddress: string;
  verifiedAt: string;
}
