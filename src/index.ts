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

export {
  FACET_NAME_MAX,
  FACET_NAME_MIN,
  FACET_NAME_PATTERN,
  FACET_NAME_REGEX,
  SEMVER_PATTERN,
  SEMVER_REGEX,
  USERNAME_MAX,
  USERNAME_MIN,
  USERNAME_PATTERN,
  USERNAME_REGEX,
  bumpPatchSemver,
  compareSemver,
  isValidFacetName,
  isValidSemver,
  isValidUsername,
  parseSemver,
  suggestFacetName,
  type SemVerParts,
} from "./identifiers.js";

export type {
  ClerkUserWebhookPayload,
  CurrentUser,
  PublicProvider,
  UserStatus,
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
  EndpointConfigRequestV016,
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
  ValidateFacetVersionResponseV016,
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
  PublicFacetV016,
  ListPublicFacetsResponse,
  ListPublicFacetsResponseV016,
  GetPublicFacetResponse,
  GetPublicFacetResponseV016,
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
  ActorFacetMetadata,
  ActorPreviewRequest,
  ActorPreviewResponse,
  ActorPreviewUsage,
  ActorPublishStatus,
  ActorPublishStatusResponse,
  AgentFacetMetadata,
  CreateActorPendingResponse,
  CreateActorRequest,
  CreateActorRequestV016,
  CreateActorResponse,
  CreateAgentFacetRequest,
  CreateAgentFacetResponse,
  CreatePricingOptionInput,
  ExecutorRunRequest,
  ExecutorRunResponse,
  ExecutorRunUsage,
  FacetPricing,
  FacetPricingOption,
  FacetType,
  PricingModel,
} from "./actor-and-agent.js";
export { FACET_TYPES, PRICING_MODELS } from "./actor-and-agent.js";
export type {
  InvokeFacetPayment,
  InvokeFacetPaymentV016,
  InvokeFacetPendingResponse,
  InvokeFacetPendingStatus,
  InvokeFacetRefundedErrorResponse,
  InvokeFacetRequest,
  InvokeFacetRequestV016,
  InvokeFacetResponse,
  InvokeFacetResponseV016,
  RunReceiptMetadata,
} from "./facet-invocation.js";
export type { FaucetClaimRequest, FaucetClaimResponse } from "./faucet.js";
export type {
  ApiMeta,
  ApiPreviewChecks,
  ApiPreviewRequest,
  ApiPreviewResponse,
  ApiUpstreamAuthConfig,
  CreateApiFacetPendingResponse,
  CreateApiFacetRequest,
  HttpMethod,
  X402AcceptsExtra,
} from "./api-authoring.js";
export { HTTP_METHODS } from "./api-authoring.js";

export const CONTRACT_VERSION = "0.16.0" as const;

export const WALLET_LINK_CHALLENGE_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/wallet-link-challenge-request.v0.14.json" as const;
export const WALLET_LINK_CHALLENGE_RESPONSE_SCHEMA_ID =
  "https://facet.local/schemas/wallet-link-challenge-response.v0.14.json" as const;
export const WALLET_LINK_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/wallet-link-request.v0.14.json" as const;
export const WALLET_LINK_RESPONSE_SCHEMA_ID =
  "https://facet.local/schemas/wallet-link-response.v0.14.json" as const;

export const PUBLIC_PROVIDER_V015_SCHEMA_ID =
  "https://facet.local/schemas/public-provider.v0.15.json" as const;
export const CREATE_FACET_DRAFTS_REQUEST_V015_SCHEMA_ID =
  "https://facet.local/schemas/create-facet-drafts-request.v0.15.json" as const;
export const CREATE_FACET_DRAFTS_RESPONSE_V015_SCHEMA_ID =
  "https://facet.local/schemas/create-facet-drafts-response.v0.15.json" as const;
export const ENDPOINT_CONFIG_REQUEST_V015_SCHEMA_ID =
  "https://facet.local/schemas/endpoint-config-request.v0.15.json" as const;
export const ENDPOINT_CONFIG_RESPONSE_V015_SCHEMA_ID =
  "https://facet.local/schemas/endpoint-config-response.v0.15.json" as const;
export const VALIDATE_FACET_VERSION_REQUEST_V015_SCHEMA_ID =
  "https://facet.local/schemas/validate-facet-version-request.v0.15.json" as const;
export const VALIDATE_FACET_VERSION_RESPONSE_V015_SCHEMA_ID =
  "https://facet.local/schemas/validate-facet-version-response.v0.15.json" as const;
export const PUBLISH_FACET_VERSION_REQUEST_V015_SCHEMA_ID =
  "https://facet.local/schemas/publish-facet-version-request.v0.15.json" as const;
export const PUBLISH_FACET_VERSION_RESPONSE_V015_SCHEMA_ID =
  "https://facet.local/schemas/publish-facet-version-response.v0.15.json" as const;
export const ACTOR_PREVIEW_REQUEST_V015_SCHEMA_ID =
  "https://facet.local/schemas/actor-preview-request.v0.15.json" as const;
export const ACTOR_PREVIEW_RESPONSE_V015_SCHEMA_ID =
  "https://facet.local/schemas/actor-preview-response.v0.15.json" as const;
export const CREATE_ACTOR_REQUEST_V015_SCHEMA_ID =
  "https://facet.local/schemas/create-actor-request.v0.15.json" as const;
export const CREATE_ACTOR_PENDING_RESPONSE_V015_SCHEMA_ID =
  "https://facet.local/schemas/create-actor-pending-response.v0.15.json" as const;
export const CREATE_ACTOR_RESPONSE_V015_SCHEMA_ID =
  "https://facet.local/schemas/create-actor-response.v0.15.json" as const;
export const ACTOR_PUBLISH_STATUS_RESPONSE_V015_SCHEMA_ID =
  "https://facet.local/schemas/actor-publish-status-response.v0.15.json" as const;
export const CREATE_AGENT_FACET_REQUEST_V015_SCHEMA_ID =
  "https://facet.local/schemas/create-agent-facet-request.v0.15.json" as const;
export const CREATE_AGENT_FACET_RESPONSE_V015_SCHEMA_ID =
  "https://facet.local/schemas/create-agent-facet-response.v0.15.json" as const;
export const EXECUTOR_RUN_REQUEST_V015_SCHEMA_ID =
  "https://facet.local/schemas/executor-run-request.v0.15.json" as const;
export const EXECUTOR_RUN_RESPONSE_V015_SCHEMA_ID =
  "https://facet.local/schemas/executor-run-response.v0.15.json" as const;
export const PUBLIC_FACET_V015_SCHEMA_ID =
  "https://facet.local/schemas/public-facet.v0.15.json" as const;
export const PUBLIC_CATALOG_LIST_V015_SCHEMA_ID =
  "https://facet.local/schemas/public-catalog-list.v0.15.json" as const;
export const PUBLIC_CATALOG_DETAIL_V015_SCHEMA_ID =
  "https://facet.local/schemas/public-catalog-detail.v0.15.json" as const;
export const INVOKE_FACET_RESPONSE_V015_SCHEMA_ID =
  "https://facet.local/schemas/invoke-facet-response.v0.15.json" as const;
export const INVOKE_FACET_PENDING_V015_SCHEMA_ID =
  "https://facet.local/schemas/invoke-facet-pending.v0.15.json" as const;

export const INVOKE_FACET_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/invoke-facet-request.v0.11.json" as const;
export const ERROR_SCHEMA_ID =
  "https://facet.local/schemas/error-envelope.v0.1.json" as const;
export const HEALTH_SCHEMA_ID =
  "https://facet.local/schemas/health-status.v0.1.json" as const;
export const IMPORTER_PARSE_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/importer-parse-request.v0.6.json" as const;
export const IMPORTER_PARSE_RESPONSE_SCHEMA_ID =
  "https://facet.local/schemas/importer-parse-response.v0.6.json" as const;
export const CREATE_SECRET_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/create-secret-request.v0.7.json" as const;
export const ROTATE_SECRET_REQUEST_SCHEMA_ID =
  "https://facet.local/schemas/rotate-secret-request.v0.7.json" as const;
export const SECRET_REF_RESPONSE_SCHEMA_ID =
  "https://facet.local/schemas/secret-ref-response.v0.7.json" as const;
export const FACET_MANIFEST_SCHEMA_ID =
  "https://facet.local/schemas/facet-manifest.v1.json" as const;

export const PRICING_OPTION_V016_SCHEMA_ID =
  "https://facet.local/schemas/pricing-option.v0.16.json" as const;
export const PUBLIC_FACET_V016_SCHEMA_ID =
  "https://facet.local/schemas/public-facet.v0.16.json" as const;
export const PUBLIC_CATALOG_LIST_V016_SCHEMA_ID =
  "https://facet.local/schemas/public-catalog-list.v0.16.json" as const;
export const PUBLIC_CATALOG_DETAIL_V016_SCHEMA_ID =
  "https://facet.local/schemas/public-catalog-detail.v0.16.json" as const;
export const CREATE_ACTOR_REQUEST_V016_SCHEMA_ID =
  "https://facet.local/schemas/create-actor-request.v0.16.json" as const;
export const INVOKE_FACET_REQUEST_V016_SCHEMA_ID =
  "https://facet.local/schemas/invoke-facet-request.v0.16.json" as const;
export const INVOKE_FACET_RESPONSE_V016_SCHEMA_ID =
  "https://facet.local/schemas/invoke-facet-response.v0.16.json" as const;
export const API_PREVIEW_REQUEST_V016_SCHEMA_ID =
  "https://facet.local/schemas/api-preview-request.v0.16.json" as const;
export const API_PREVIEW_RESPONSE_V016_SCHEMA_ID =
  "https://facet.local/schemas/api-preview-response.v0.16.json" as const;
export const CREATE_API_FACET_REQUEST_V016_SCHEMA_ID =
  "https://facet.local/schemas/create-api-facet-request.v0.16.json" as const;
export const CREATE_API_FACET_PENDING_RESPONSE_V016_SCHEMA_ID =
  "https://facet.local/schemas/create-api-facet-pending-response.v0.16.json" as const;
export const ENDPOINT_CONFIG_REQUEST_V016_SCHEMA_ID =
  "https://facet.local/schemas/endpoint-config-request.v0.16.json" as const;
export const ENDPOINT_CONFIG_RESPONSE_V016_SCHEMA_ID =
  "https://facet.local/schemas/endpoint-config-response.v0.16.json" as const;
export const VALIDATE_FACET_VERSION_RESPONSE_V016_SCHEMA_ID =
  "https://facet.local/schemas/validate-facet-version-response.v0.16.json" as const;
export const FAUCET_CLAIM_REQUEST_V016_SCHEMA_ID =
  "https://facet.local/schemas/faucet-claim-request.v0.16.json" as const;
export const FAUCET_CLAIM_RESPONSE_V016_SCHEMA_ID =
  "https://facet.local/schemas/faucet-claim-response.v0.16.json" as const;
