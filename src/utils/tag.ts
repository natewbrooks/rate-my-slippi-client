
export const validateTag = (tag: string): string | null => {
  if (!tag) return null;

  const normalized = tag.trim().replace("-", "#");

  const regex = /^[A-Za-z]{1,7}#[0-9]+$/;
  if (!regex.test(normalized)) return null;
  return normalized;
};

export const normalizeTagInput = (raw: string): string => {
  const v = raw.replace("-", "#").toUpperCase();

  let result = "";
  let hasHash = false;

  for (const ch of v) {
    if (result.length >= 8) break;

    if (/[A-Z]/.test(ch)) {
      if (!hasHash) {
        result += ch;
      }
    } else if (ch === "#") {
      if (!hasHash && result.length > 0) {
        result += "#";
        hasHash = true;
      }
    } else if (/[0-9]/.test(ch)) {
      if (!hasHash && result.length > 0) {
        result += "#";
        hasHash = true;
        if (result.length >= 8) break;
      }

      if (hasHash) {
        result += ch;
      }
    }
  }

  return result;
};
