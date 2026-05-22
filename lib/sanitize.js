export function sanitizeInput(text) {
  if (!text) return "";
  
  return text
    .replace(/(ignore\s+previous\s+instruction|system\s+override|prompt\s+injection)/gi, "[REDACTED_SYSTEM_OVERRIDE_ATTEMPT]")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Neutralize dangerous HTML tags
    .trim();
}
