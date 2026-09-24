const DATE_FORMATTER = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export function formatDate(isoDate: string): string {
  return DATE_FORMATTER.format(new Date(isoDate));
}
