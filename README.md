# FACET Contracts

Versioned FACET interface contracts: JSON Schema, OpenAPI descriptions, error envelopes and generated TypeScript types. Version 0.6 enriches the importer response with manifest-ready input/output/error schemas, private server templates, auth alternatives and per-operation warnings. The v0.5 atomic Facet-draft command remains unchanged.

**Phase:** 1 — active.
**Important:** “contracts” means service/data contracts, not smart contracts.
**Boundary:** Contains no database access, business rules, provider secrets or chain logic.

This standalone npm repository owns its `package-lock.json` and versioned public interface artifacts. Consumers use a published package or pinned release; they must not reference this repository through a sibling filesystem path. Breaking changes require a new contract version, compatibility tests and a documented producer/consumer migration order.

## Local verification

```bash
npm ci
npm run verify
```

The package is currently pre-release infrastructure. Do not publish it until the first producer/consumer compatibility review is complete.
