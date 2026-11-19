export interface JsonSchemaNode {
  $id?: string;
  $ref?: string;
  type?: string | string[];
  const?: unknown;
  enum?: unknown[];
  required?: string[];
  additionalProperties?: boolean | JsonSchemaNode;
  properties?: Record<string, JsonSchemaNode>;
  items?: JsonSchemaNode;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
  minimum?: number;
  maximum?: number;
  format?: string;
  anyOf?: JsonSchemaNode[];
  oneOf?: JsonSchemaNode[];
}

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/iu;
const ISO_DATETIME_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/u;

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function validateFormat(format: string, value: string, path: string): string[] {
  if (format === "uuid" && !UUID_REGEX.test(value)) {
    return [`${path}: expected uuid format`];
  }
  if (
    format === "date-time" &&
    (!ISO_DATETIME_REGEX.test(value) || Number.isNaN(Date.parse(value)))
  ) {
    return [`${path}: expected date-time format`];
  }
  return [];
}

export function validateAgainstSchema(
  schema: JsonSchemaNode,
  value: unknown,
  registry: ReadonlyMap<string, JsonSchemaNode> = new Map(),
  path = "$",
): string[] {
  if (schema.$ref) {
    const target = registry.get(schema.$ref);
    if (!target) {
      return [`${path}: unresolved $ref ${schema.$ref}`];
    }
    return validateAgainstSchema(target, value, registry, path);
  }

  if (schema.anyOf) {
    const passes = schema.anyOf.some(
      (branch) =>
        validateAgainstSchema(branch, value, registry, path).length === 0,
    );
    return passes ? [] : [`${path}: did not match anyOf branches`];
  }

  if (schema.oneOf) {
    const matches = schema.oneOf.filter(
      (branch) =>
        validateAgainstSchema(branch, value, registry, path).length === 0,
    );
    return matches.length === 1
      ? []
      : [`${path}: expected exactly 1 oneOf match, got ${matches.length}`];
  }

  if (schema.const !== undefined && !deepEqual(value, schema.const)) {
    return [`${path}: expected const ${JSON.stringify(schema.const)}`];
  }

  if (
    schema.enum &&
    !schema.enum.some((candidate) => deepEqual(value, candidate))
  ) {
    return [`${path}: expected one of ${JSON.stringify(schema.enum)}`];
  }

  if (schema.type) {
    const allowed = Array.isArray(schema.type) ? schema.type : [schema.type];
    const actual =
      value === null
        ? "null"
        : Array.isArray(value)
          ? "array"
          : typeof value === "number" && Number.isInteger(value)
            ? "integer"
            : typeof value;
    const typeMatches = allowed.some(
      (expected) =>
        expected === actual || (expected === "number" && actual === "integer"),
    );
    if (!typeMatches) {
      return [`${path}: expected type ${allowed.join("|")}, got ${actual}`];
    }
  }

  if (typeof value === "string") {
    const errors: string[] = [];
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push(`${path}: string shorter than minLength ${schema.minLength}`);
    }
    if (schema.maxLength !== undefined && value.length > schema.maxLength) {
      errors.push(`${path}: string longer than maxLength ${schema.maxLength}`);
    }
    if (schema.pattern && !new RegExp(schema.pattern, "u").test(value)) {
      errors.push(`${path}: failed pattern ${schema.pattern}`);
    }
    if (schema.format) {
      errors.push(...validateFormat(schema.format, value, path));
    }
    return errors;
  }

  if (typeof value === "number") {
    if (schema.minimum !== undefined && value < schema.minimum) {
      return [`${path}: number below minimum ${schema.minimum}`];
    }
    if (schema.maximum !== undefined && value > schema.maximum) {
      return [`${path}: number above maximum ${schema.maximum}`];
    }
    return [];
  }

  if (Array.isArray(value)) {
    const errors: string[] = [];
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      errors.push(`${path}: array below minItems ${schema.minItems}`);
    }
    if (schema.maxItems !== undefined && value.length > schema.maxItems) {
      errors.push(`${path}: array exceeds maxItems ${schema.maxItems}`);
    }
    if (schema.items) {
      for (let i = 0; i < value.length; i += 1) {
        errors.push(
          ...validateAgainstSchema(
            schema.items,
            value[i],
            registry,
            `${path}[${i}]`,
          ),
        );
      }
    }
    return errors;
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const errors: string[] = [];
    for (const key of schema.required ?? []) {
      if (!(key in record) || record[key] === undefined) {
        errors.push(`${path}.${key}: missing required property`);
      }
    }
    const properties = schema.properties ?? {};
    for (const [key, propValue] of Object.entries(record)) {
      const propSchema = properties[key];
      if (!propSchema) {
        if (schema.additionalProperties === false) {
          errors.push(`${path}.${key}: unexpected additional property`);
        } else if (
          schema.additionalProperties &&
          typeof schema.additionalProperties === "object"
        ) {
          errors.push(
            ...validateAgainstSchema(
              schema.additionalProperties,
              propValue,
              registry,
              `${path}.${key}`,
            ),
          );
        }
        continue;
      }
      errors.push(
        ...validateAgainstSchema(
          propSchema,
          propValue,
          registry,
          `${path}.${key}`,
        ),
      );
    }
    return errors;
  }

  return [];
}
