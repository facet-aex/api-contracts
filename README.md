# FACET API Contracts (`@facet/api-contracts`)

[![FACET](https://img.shields.io/badge/FACET-facet.briandev.space-050505?style=flat-square&labelColor=DFFF4F)](https://facet.briandev.space)
[![Layer](https://img.shields.io/badge/SCHEMAS-API%20CONTRACTS-0D0D0D?style=flat-square&labelColor=343434)](https://github.com/facet-aex)

> Versioned JSON Schema (`2020-12`) definitions, identifier validators, and TypeScript HTTP contracts shared across FACET services and clients.

## Overview

`api-contracts` is the cross-service interface package for **FACET**. It defines the canonical wire formats, validation schemas, and TypeScript types shared by `control-api`, `gateway`, `web`, `openapi-importer`, `@facet-aex/cli`, and `@facet-aex/mcp-server`.

## Role in FACET

- **Unified `FacetManifest` & Natural Keys:** Enforces canonical `API`, `ACTOR`, and `AGENT` enums, kebab-case `provider` and `facetName` identifiers, strict SemVer `version` rules, and multi-option `pricingOptions[]`.
- **Service & Authoring Contracts:** Defines request/response shapes for Actor, Agent, and full-HTTP API authoring, OpenAPI import jobs, upstream auth configuration, draft validation, publication, and public catalog listings.
- **Invocation & Faucet Schemas:** Specifies versioned execution inputs, dataset outputs, on-chain receipt metadata, and test `fUSD` faucet payloads.

## Tech Stack

| Layer | Technology |
|---|---|
| Language & Runtime | TypeScript, Node.js 24 (ESM) |
| Schema Standard | JSON Schema Draft `2020-12` |
| Tooling & Testing | Vitest, ESLint, Prettier |

---

Part of **[FACET](https://facet.briandev.space)** (`facet-aex`) — Federated Agent Capability Exchange & Trust on Avalanche.
