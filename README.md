# FACET API Contracts (`@facet/api-contracts`)

Versioned JSON Schema (`2020-12`) and TypeScript HTTP interface contracts for FACET services and clients under [ADR-0018](../docs/architecture/decisions/ADR-0018-canonical-identities-semver-and-clerk-webhooks.md).

- **Current version:** `0.15.0`
- **Canonical capabilities:** `API`, `ACTOR`, `AGENT` keyed publicly by `{ provider, facetName, facetDisplayName, version }` (SemVer) and `providerPayTo`.
- **Note:** Avalanche Solidity smart contracts live in `../contracts` (`@facet/contracts`).

## Verification

```bash
npm ci
npm run verify
```
