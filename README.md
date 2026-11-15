# FACET Contracts

Versioned FACET interface contracts: JSON Schema, OpenAPI descriptions, error envelopes and generated TypeScript types. Version 0.6 enriches the importer response with manifest-ready input/output/error schemas, private server templates, auth alternatives and per-operation warnings. The v0.5 atomic Facet-draft command remains unchanged.

**Phase:** Demo Track active; Phase 1 backlog unfinished.
**Important:** “contracts” means service/data contracts, not smart contracts.
**Boundary:** Contains no database access, business rules, provider secrets or chain logic.

This standalone npm repository owns its `package-lock.json` and versioned public interface artifacts. Consumers use a published package or pinned release; they must not reference this repository through a sibling filesystem path. Breaking changes require a new contract version, compatibility tests and a documented producer/consumer migration order.

Contract `0.7.0` adds write-only API-key/Bearer secret commands plus protected draft endpoint-configuration request/metadata schemas. Secret responses intentionally exclude the value and vault/storage reference; endpoint responses intentionally exclude the protected base URL.

Contract `0.8.0` adds the Facet Manifest v1 schema and draft-validation request/response. Warning acknowledgements use a deterministic hash of warning code plus message, so acknowledgement scope is exact rather than code-wide.

Contract `0.10.0` adds public catalog list/detail; `0.11.0` adds the local invocation request/free response; `0.12.0` adds an optional Fuji payment transaction to the invocation response and a settlement-pending response. The x402 v2 `PAYMENT-REQUIRED` and `PAYMENT-SIGNATURE` headers follow the pinned Foundation package rather than a FACET copy of the protocol schema. Producer/consumer order: `contracts` → `control-api` catalog → `web`/`gateway` → `mcp-server` → `x402-facilitator`.

## Local verification

```bash
npm ci
npm run verify
```

The package is currently pre-release infrastructure. Do not publish it until the first producer/consumer compatibility review is complete.
