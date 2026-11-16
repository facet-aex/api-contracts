# `api-contracts` instructions (JSON Schema & TypeScript HTTP Contracts)

**Owner in Wave 0:** Antigravity  
**Package:** `@facet/api-contracts` (renamed from `@facet/contracts`)  
**Current Version:** `0.13.0`  
**Active architectural authority:** `../docs/architecture/decisions/ADR-0015-actorbazaar-docker-and-a2a-mvp.md`

## Role

This standalone npm repository owns FACET's versioned JSON Schemas (`schemas/`) and generated/exported TypeScript HTTP interfaces (`src/`).
- **Important:** Solidity smart contracts live in `../contracts` (`@facet/contracts`). This repository (`api-contracts`) holds only HTTP/JSON Schema/manifest contracts and contains no database access, business rules, secrets, or chain logic.

## Version `0.13.0` Scope

- Multi-modal `FacetType`: `"EXTERNAL_HTTP_API" | "HOSTED_ACTOR" | "AUTONOMOUS_AGENT"`
- `PricingModel`: `"PAY_PER_RUN" | "PAY_PER_RESULT"`
- Minimalist 1-step Actor creation (`create-actor-request.v0.13.json`, `create-actor-response.v0.13.json`)
- Minimalist 1-step A2A Agent Facet creation (`create-agent-facet-request.v0.13.json`, `create-agent-facet-response.v0.13.json`)
- Internal `gateway` ↔ `executor` execution contract (`executor-run-request.v0.13.json`, `executor-run-response.v0.13.json`)
- Multi-modal Public Catalog (`public-facet.v0.13.json`, `public-catalog-list.v0.13.json`, `public-catalog-detail.v0.13.json`)
- Multi-modal Invocation Response (`invoke-facet-response.v0.13.json` with `dataset`, `usage`, `payment`, and `receipt`).
