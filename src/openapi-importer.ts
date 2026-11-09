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

export interface ImporterOperationCandidate {
  candidateId: string;
  jsonPointer: string;
  method: string;
  path: string;
  operationId?: string;
  summary?: string;
  tags: string[];
}

export interface ImporterParseResponse {
  document: { openapi: string; title: string; version: string };
  candidates: ImporterOperationCandidate[];
  warnings: Array<{ code: string; message: string }>;
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
