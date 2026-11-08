export type ProviderStatus = "active" | "disabled";

export interface PublicProvider {
  id: string;
  slug: string;
  name: string;
  description: string;
  websiteUrl: string | null;
  contact: string | null;
  walletAddress: string | null;
  status: ProviderStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProviderRequest {
  slug: string;
  name: string;
  description?: string;
  websiteUrl?: string;
  contact?: string;
  walletAddress?: string;
}

export interface UpdateProviderRequest {
  version: number;
  name?: string;
  description?: string;
  websiteUrl?: string | null;
  contact?: string | null;
  walletAddress?: string | null;
}
