export type ProviderStatus = "active" | "disabled";
export type ProviderRole = "owner" | "admin" | "developer" | "viewer";

export interface PublicProvider {
  creator: string;
  displayName: string;
  description: string;
  websiteUrl: string | null;
  contact: string | null;
  walletAddress: string | null;
  walletVerifiedAt: string | null;
  status: ProviderStatus;
  revision: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProviderRequest {
  creator: string;
  displayName: string;
  description?: string;
  websiteUrl?: string;
  contact?: string;
  walletAddress?: string;
}

export interface UpdateProviderRequest {
  revision: number;
  displayName?: string;
  description?: string;
  websiteUrl?: string | null;
  contact?: string | null;
  walletAddress?: string | null;
}

export interface CurrentUser {
  clerkId: string;
  username: string;
  email: string | null;
  displayName: string | null;
}

export interface ProviderMembership {
  user: CurrentUser;
  role: ProviderRole;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProviderMembershipRequest {
  role: ProviderRole;
}

export interface ClerkUserWebhookPayload {
  type: "user.created" | "user.updated" | "user.deleted";
  data: {
    id: string;
    username?: string | null;
    email_addresses?: Array<{ id?: string; email_address?: string }>;
    primary_email_address_id?: string | null;
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
