export type FacetEnvironment = "local" | "preview" | "production";

export interface HealthStatus {
  service: string;
  status: "ok" | "degraded";
  environment: FacetEnvironment;
  timestamp: string;
}

export interface FacetApiError {
  error: {
    code: string;
    message: string;
    requestId: string;
    details?: Readonly<Record<string, unknown>>;
  };
}

export type {
  CreateProviderRequest,
  ProviderStatus,
  PublicProvider,
  UpdateProviderRequest,
} from "./provider.js";

export const CONTRACT_VERSION = "0.2.0" as const;
export const ERROR_SCHEMA_ID =
  "https://facet.local/schemas/error-envelope.v0.1.json" as const;
export const HEALTH_SCHEMA_ID =
  "https://facet.local/schemas/health-status.v0.1.json" as const;
export const PUBLIC_PROVIDER_SCHEMA_ID =
  "https://facet.local/schemas/public-provider.v0.2.json" as const;
