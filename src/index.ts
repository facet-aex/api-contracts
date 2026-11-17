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
  CurrentUser,
  ProviderMembership,
  ProviderRole,
  ProviderStatus,
  PublicProvider,
  UpdateProviderMembershipRequest,
  UpdateProviderRequest,
  WalletLinkChallengeRequest,
  WalletLinkChallengeResponse,
  WalletLinkRequest,
  WalletLinkResponse,
} from "./provider.js";
export type {
  CreateFacetDraftSelection,
  CreateFacetDraftsRequest,
  CreateFacetDraftsResponse,
  FacetDraft,
  FacetDraftVersion,
  SideEffectClass,
} from "./facet-drafts.js";
export { SIDE_EFFECT_CLASSES } from "./facet-drafts.js";
export type {
  CreateSecretRequest,
  EndpointAuthKind,
  EndpointConfigMetadata,
  EndpointConfigRequest,
  EndpointConfigResponse,
  RotateSecretRequest,
  SecretKind,
  SecretRefMetadata,
  SecretRefResponse,
} from "./upstream-config.js";
export { SECRET_KINDS } from "./upstream-config.js";
export type {
  ValidateFacetVersionRequest,
  ValidateFacetVersionResponse,
  ValidationIssue,
  ValidationWarning,
  WarningAcknowledgement,
  WarningAcknowledgementInput,
} from "./facet-validation.js";
export type {
  PublishedFacetVisibility,
  PublishFacetVersionRequest,
  PublishFacetVersionResponse,
} from "./facet-publication.js";
export type {
  PublicFacet,
  ListPublicFacetsResponse,
  GetPublicFacetResponse,
} from "./public-catalog.js";
export type {
  ImporterOperationCandidate,
  ImporterParseRequest,
  ImporterParseResponse,
  ImporterWarning,
  JsonSchema202012,
  NormalizedAuthAlternative,
  NormalizedAuthScheme,
  NormalizedOperation,
  NormalizedServerTemplate,
  OpenApiImportLimits,
} from "./openapi-importer.js";
export type {
  ActorPreviewRequest,
  ActorPreviewResponse,
  ActorPreviewUsage,
  ActorPublishStatus,
  ActorPublishStatusResponse,
  AutonomousAgentMetadata,
  CreateActorPendingResponse,
  CreateActorRequest,
  CreateActorRequestV014,
  CreateActorResponse,
  CreateAgentFacetRequest,
  CreateAgentFacetResponse,
  ExecutorRunRequest,
  ExecutorRunResponse,
  ExecutorRunUsage,
  FacetPricing,
  FacetType,
  HostedActorMetadata,
  PricingModel,
} from "./actor-and-agent.js";
export { FACET_TYPES, PRICING_MODELS } from "./actor-and-agent.js";
export type {
  InvokeFacetPaymentV014,
  InvokeFacetPendingResponse,
  InvokeFacetPendingResponseV014,
  InvokeFacetPendingStatus,
  InvokeFacetRequest,
  InvokeFacetResponse,
  InvokeFacetResponseV014,
  RunReceiptMetadata,
  RunReceiptMetadataV014,
} from "./facet-invocation.js";

export const CONTRACT_VERSION = "0.14.0" as const;
export const WALLET_LINK_CHALLENGE_REQUEST_V014_SCHEMA_ID =
  "https://facet.local/schemas/wallet-link-challenge-request.v0.14.json" as const;
export const WALLET_LINK_CHALLENGE_RESPONSE_V014_SCHEMA_ID =
  "https://facet.local/schemas/wallet-link-challenge-response.v0.14.json" as const;
export const WALLET_LINK_REQUEST_V014_SCHEMA_ID =
  "https://facet.local/schemas/wallet-link-request.v0.14.json" as const;
export const WALLET_LINK_RESPONSE_V014_SCHEMA_ID =
  "https://facet.local/schemas/wallet-link-response.v0.14.json" as const;
export const ACTOR_PREVIEW_REQUEST_V014_SCHEMA_ID =
  "https://facet.local/schemas/actor-preview-request.v0.14.json" as const;
export const ACTOR_PREVIEW_RESPONSE_V014_SCHEMA_ID =
  "https://facet.local/schemas/actor-preview-response.v0.14.json" as const;
export const CREATE_ACTOR_REQUEST_V014_SCHEMA_ID =
  "https://facet.local/schemas/create-actor-request.v0.14.json" as const;
export const CREATE_ACTOR_PENDING_RESPONSE_V014_SCHEMA_ID =
  "https://facet.local/schemas/create-actor-pending-response.v0.14.json" as const;
export const ACTOR_PUBLISH_STATUS_RESPONSE_V014_SCHEMA_ID =
  "https://facet.local/schemas/actor-publish-status-response.v0.14.json" as const;
export const PUBLIC_FACET_V014_SCHEMA_ID =
  "https://facet.local/schemas/public-facet.v0.14.json" as const;
export const PUBLIC_CATALOG_LIST_V014_SCHEMA_ID =
  "https://facet.local/schemas/public-catalog-list.v0.14.json" as const;
export const PUBLIC_CATALOG_DETAIL_V014_SCHEMA_ID =
  "https://facet.local/schemas/public-catalog-detail.v0.14.json" as const;
export const INVOKE_FACET_RESPONSE_V014_SCHEMA_ID =
  "https://facet.local/schemas/invoke-facet-response.v0.14.json" as const;
export const INVOKE_FACET_PENDING_V014_SCHEMA_ID =
  "https://facet.local/schemas/invoke-facet-pending.v0.14.json" as const;
export const CREATE_ACTOR_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/create-actor-request.v0.13.json" as const;
export const CREATE_ACTOR_RESPONSE_SCHEMA_ID =
  "https://facet.local/schemas/create-actor-response.v0.13.json" as const;
export const CREATE_AGENT_FACET_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/create-agent-facet-request.v0.13.json" as const;
export const CREATE_AGENT_FACET_RESPONSE_SCHEMA_ID =
  "https://facet.local/schemas/create-agent-facet-response.v0.13.json" as const;
export const EXECUTOR_RUN_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/executor-run-request.v0.13.json" as const;
export const EXECUTOR_RUN_RESPONSE_SCHEMA_ID =
  "https://facet.local/schemas/executor-run-response.v0.13.json" as const;
export const PUBLIC_FACET_V013_SCHEMA_ID =
  "https://facet.local/schemas/public-facet.v0.13.json" as const;
export const PUBLIC_CATALOG_LIST_V013_SCHEMA_ID =
  "https://facet.local/schemas/public-catalog-list.v0.13.json" as const;
export const PUBLIC_CATALOG_DETAIL_V013_SCHEMA_ID =
  "https://facet.local/schemas/public-catalog-detail.v0.13.json" as const;
export const INVOKE_FACET_RESPONSE_V013_SCHEMA_ID =
  "https://facet.local/schemas/invoke-facet-response.v0.13.json" as const;

export const INVOKE_FACET_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/invoke-facet-request.v0.11.json" as const;
export const INVOKE_FACET_RESPONSE_SCHEMA_ID =
  "https://facet.local/schemas/invoke-facet-response.v0.12.json" as const;
export const INVOKE_FACET_PENDING_SCHEMA_ID =
  "https://facet.local/schemas/invoke-facet-pending.v0.12.json" as const;
export const PUBLIC_CATALOG_LIST_SCHEMA_ID =
  "https://facet.local/schemas/public-catalog-list.v0.10.json" as const;
export const PUBLIC_CATALOG_DETAIL_SCHEMA_ID =
  "https://facet.local/schemas/public-catalog-detail.v0.10.json" as const;
export const ERROR_SCHEMA_ID =
  "https://facet.local/schemas/error-envelope.v0.1.json" as const;
export const HEALTH_SCHEMA_ID =
  "https://facet.local/schemas/health-status.v0.1.json" as const;
export const PUBLIC_PROVIDER_SCHEMA_ID =
  "https://facet.local/schemas/public-provider.v0.2.json" as const;
export const PROVIDER_MEMBERSHIP_SCHEMA_ID =
  "https://facet.local/schemas/provider-membership.v0.3.json" as const;
export const IMPORTER_PARSE_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/importer-parse-request.v0.6.json" as const;
export const IMPORTER_PARSE_RESPONSE_SCHEMA_ID =
  "https://facet.local/schemas/importer-parse-response.v0.6.json" as const;
export const CREATE_FACET_DRAFTS_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/create-facet-drafts-request.v0.5.json" as const;
export const CREATE_FACET_DRAFTS_RESPONSE_SCHEMA_ID =
  "https://facet.local/schemas/create-facet-drafts-response.v0.5.json" as const;
export const CREATE_SECRET_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/create-secret-request.v0.7.json" as const;
export const ROTATE_SECRET_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/rotate-secret-request.v0.7.json" as const;
export const SECRET_REF_RESPONSE_SCHEMA_ID =
  "https://facet.local/schemas/secret-ref-response.v0.7.json" as const;
export const ENDPOINT_CONFIG_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/endpoint-config-request.v0.7.json" as const;
export const ENDPOINT_CONFIG_RESPONSE_SCHEMA_ID =
  "https://facet.local/schemas/endpoint-config-response.v0.7.json" as const;
export const FACET_MANIFEST_SCHEMA_ID =
  "https://facet.local/schemas/facet-manifest.v1.json" as const;
export const VALIDATE_FACET_VERSION_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/validate-facet-version-request.v0.8.json" as const;
export const VALIDATE_FACET_VERSION_RESPONSE_SCHEMA_ID =
  "https://facet.local/schemas/validate-facet-version-response.v0.8.json" as const;
export const PUBLISH_FACET_VERSION_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/publish-facet-version-request.v0.9.json" as const;
export const PUBLISH_FACET_VERSION_RESPONSE_SCHEMA_ID =
  "https://facet.local/schemas/publish-facet-version-response.v0.9.json" as const;
