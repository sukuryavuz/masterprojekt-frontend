export interface Error {
  readonly code: string;
  readonly message: string;
  readonly location?: string;
}

export const ERROR_MESSAGES = {
  403: 'Ihre Anfrage kann nicht verarbeitet werden, da Sie nicht die erforderliche Berechtigung besitzen.',
  503: 'Ein temporärer Fehler ist aufgetreten. Bitte versuchen Sie es später erneut',
  unexpected: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut'
} as const;

export const isExpectedStatus = (
  status: keyof typeof ERROR_MESSAGES | number
): status is keyof typeof ERROR_MESSAGES => status in ERROR_MESSAGES;
