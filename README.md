# FACET Contracts

Versioned FACET interface contracts: JSON Schema, OpenAPI descriptions, error envelopes and generated TypeScript types.

**Phase:** 1 — active.
**Important:** “contracts” means service/data contracts, not smart contracts.
**Boundary:** Contains no database access, business rules, provider secrets or chain logic.

This repository is the standalone source of versioned public interface artifacts. Consumers use a published package or pinned release; they must not reference this repository through a sibling filesystem path. Breaking changes require a new contract version, compatibility tests and a documented producer/consumer migration order.
