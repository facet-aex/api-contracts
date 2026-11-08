# FACET Contracts instructions

- This is a standalone repository and the source of truth for versioned FACET interface artifacts.
- Use npm only. Commit this repository's `package-lock.json`; do not join a parent workspace.
- Prefer JSON Schema 2020-12 for FACET-native schemas; OpenAPI 3.0/3.1 are import boundaries.
- Keep generated artifacts reproducible and versioned deliberately.
- Publish artifacts through an explicit package/release version; never require consumers to use a sibling filesystem link.
- No service implementation or business logic belongs here.
- A breaking change requires explicit versioning and compatibility evidence.
