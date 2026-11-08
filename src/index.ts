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

export const CONTRACT_VERSION = "0.1.0" as const;
export const ERROR_SCHEMA_ID =
  "https://facet.local/schemas/error-envelope.v0.1.json" as const;
export const HEALTH_SCHEMA_ID =
  "https://facet.local/schemas/health-status.v0.1.json" as const;
