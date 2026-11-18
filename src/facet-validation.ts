export interface WarningAcknowledgementInput {
  warningId: string;
  reason?: string;
}

export interface ValidateFacetVersionRequest {
  revision: number;
  warningAcknowledgements: WarningAcknowledgementInput[];
}

export interface ValidationIssue {
  code: string;
  message: string;
  path?: string;
}

export interface ValidationWarning extends ValidationIssue {
  warningId: string;
  acknowledged: boolean;
}

export interface WarningAcknowledgement {
  warningId: string;
  reason?: string;
  acknowledgedAt: string;
  acknowledgedBy: string;
}

export interface ValidateFacetVersionResponse {
  facetVersion: {
    version: string;
    status: "DRAFT" | "VALID";
    revision: number;
    validation: {
      status: "INVALID" | "VALID";
      errors: ValidationIssue[];
      warnings: ValidationWarning[];
    };
    warningAcknowledgements: WarningAcknowledgement[];
  };
}
