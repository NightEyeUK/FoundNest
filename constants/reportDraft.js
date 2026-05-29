/** In-memory draft between report page 1 and page 2 (same app session). */
let draft = null;

export function setReportDraft(data) {
  draft = data;
}

export function getReportDraft() {
  return draft;
}

export function clearReportDraft() {
  draft = null;
}
