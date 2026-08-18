export function formatReleaseDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (!dateStr || Number.isNaN(date.getTime())) return "TBA";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
