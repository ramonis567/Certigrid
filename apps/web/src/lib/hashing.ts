import { createHash } from "node:crypto";

type JsonPrimitive = boolean | number | string | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export function canonicalizeJson(value: JsonValue): string {
  if (Array.isArray(value)) {
    return `[${value.map((entry) => canonicalizeJson(entry)).join(",")}]`;
  }

  if (value !== null && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalizeJson(value[key] as JsonValue)}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}

export function sha256Hash(value: JsonValue): string {
  return `sha256:${createHash("sha256").update(canonicalizeJson(value)).digest("hex")}`;
}

export function normalizeHashText(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}
