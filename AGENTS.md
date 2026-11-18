# `api-contracts` instructions (JSON Schema & TypeScript HTTP Contracts)

**Owner (Session B):** `api-contracts/`
**Package:** `@facet/api-contracts` (renamed from `@facet/contracts`)
**Current Version:** `0.15.0`
**Active architectural authority:** `../docs/architecture/decisions/ADR-0018-canonical-identities-semver-and-clerk-webhooks.md` (with `ADR-0017` and `ADR-0015`)

## Role

This standalone npm repository owns FACET's versioned JSON Schemas (`schemas/`) and generated/exported TypeScript HTTP interfaces (`src/`).

- **Important:** Solidity smart contracts live in `../contracts` (`@facet/contracts`). This repository (`api-contracts`) holds only HTTP/JSON Schema/manifest contracts and contains no database access, business rules, secrets, or chain logic.

## Version `0.15.0` Canonical Rules (ADR-0018 + `provider` Convergence)

- System-wide uppercase `FACET_TYPES`: `["API", "ACTOR", "AGENT"]`.
- Option B public identity (zero exposed `facetId`, `versionId`, `slug`, `facetSlug`, `fullName`, `facetFullName`, `displayVersion`):
  - Single account model (`users` only, zero `providers` or `provider_memberships` tables): a Facet's `provider` field (`PublicFacet.provider`, `PublicProvider.provider`, `:provider`) is directly the owning User's `username` (`8–16` chars lowercase hyphenated kebab-case, validated via `USERNAME_*` / `isValidUsername`).
  - `facetName`: lowercase hyphenated kebab-case, `4–32` characters (`FACET_NAME_*`, `isValidFacetName`).
  - `facetDisplayName`: human title (`1–120` chars).
  - `version`: strict SemVer `MAJOR.MINOR.PATCH` (`SEMVER_*`, `isValidSemver`, `compareSemver`, `bumpPatchSemver`). Optimistic concurrency uses `revision: integer >= 1` (including `endpoint-config-request.v0.15.json`).
- Payment recipient naming: public wire responses (`InvokeFacetPayment` / `invoke-facet-response.v0.15.json`) expose `providerPayTo` (and optional `payTo`); on-chain deployed `FacetFeeSplitAndEscrow.sol` (`FeeSplitSettled`) and internal `x402-facilitator` retain `creatorPayTo` untouched.
