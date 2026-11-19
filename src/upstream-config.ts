export const SECRET_KINDS = ["API_KEY", "BEARER_TOKEN", "BASIC_AUTH"] as const;
export type SecretKind = (typeof SECRET_KINDS)[number];

export interface CreateSecretRequest {
  kind: SecretKind;
  label: string;
  value: string;
}

export interface RotateSecretRequest {
  value: string;
}

export interface SecretRefMetadata {
  id: string;
  providerId: string;
  kind: SecretKind;
  label: string;
  status: "ACTIVE" | "REVOKED";
  usageCount: number;
  createdAt: string;
  rotatedAt: string | null;
}

export interface SecretRefResponse {
  secret: SecretRefMetadata;
}

export type EndpointAuthKind =
  "NONE" | "API_KEY_HEADER" | "API_KEY_QUERY" | "BEARER" | "BASIC";

export interface EndpointConfigRequest {
  revision: number;
  baseUrl: string;
  auth: {
    kind: EndpointAuthKind;
    secretRefId?: string;
    parameterName?: string;
  };
  timeoutMs: number;
  maxResponseBytes: number;
  redirectPolicy: "DENY" | "SAME_ORIGIN";
}

export interface EndpointConfigRequestV016 extends EndpointConfigRequest {
  staticHeaders?: Record<string, string>;
  requestBodyMediaType?: string;
  datasetPath?: string;
}

export interface EndpointConfigMetadata {
  provider: string;
  facetName: string;
  version: string;
  facetVersionRevision: number;
  baseUrlConfigured: true;
  method: string;
  pathTemplate: string;
  authKind: EndpointAuthKind;
  secretConfigured: boolean;
  staticHeaderNames?: string[];
  requestBodyMediaType?: string;
  datasetPath?: string;
  timeoutMs: number;
  maxResponseBytes: number;
  redirectPolicy: "DENY" | "SAME_ORIGIN";
  revision: number;
  createdAt: string;
  updatedAt: string;
}

export interface EndpointConfigResponse {
  endpointConfig: EndpointConfigMetadata;
}
