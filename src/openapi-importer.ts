export interface OpenApiImportLimits {
  maxDocumentBytes: number;
  maxYamlAliases: number;
  maxRedirects: number;
  maxReferenceDepth: number;
  maxReferenceCount: number;
  maxOperationCount: number;
  timeoutMs: number;
}

export type ImporterParseRequest = {
  source:
    | { kind: "paste" | "upload"; content: string; filename?: string }
    | { kind: "url"; url: string };
  limits?: OpenApiImportLimits;
};

export type JsonSchema202012 = boolean | Record<string, unknown>;

export interface ImporterWarning {
  code: string;
  message: string;
}

export interface NormalizedServerTemplate {
  url: string;
  description?: string;
  variables: Record<string, string>;
}

export type NormalizedAuthScheme = {
  schemeName: string;
  kind: "API_KEY_HEADER" | "API_KEY_QUERY" | "BEARER" | "UNSUPPORTED";
  parameterName?: string;
  sourceType?: string;
};

export interface NormalizedAuthAlternative {
  schemes: NormalizedAuthScheme[];
}

export interface NormalizedOperation {
  description?: string;
  inputSchema: JsonSchema202012;
  outputSchema: JsonSchema202012;
  errorSchema: JsonSchema202012;
  servers: NormalizedServerTemplate[];
  authAlternatives: NormalizedAuthAlternative[];
  responseMetadata: {
    successStatusCode?: string;
    successMediaType?: string;
    errorStatusCodes: string[];
  };
}

export interface ImporterOperationCandidate {
  candidateId: string;
  jsonPointer: string;
  method: string;
  path: string;
  operationId?: string;
  summary?: string;
  tags: string[];
  normalized: NormalizedOperation;
  warnings: ImporterWarning[];
}

export interface ImporterParseResponse {
  document: { openapi: string; title: string; version: string };
  candidates: ImporterOperationCandidate[];
  warnings: ImporterWarning[];
  source: {
    kind: "paste" | "upload" | "url";
    sha256: string;
    byteLength: number;
    mediaType?: string;
    finalUrl?: string;
    redirectCount?: number;
  };
  snapshot: { content: string };
  limits: OpenApiImportLimits;
}
