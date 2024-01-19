import { enqueueSnackbar } from 'notistack';

export const splitCamelCase = (word: string) => {
  const wordsArray     = word.split(/(?=[A-Z])/);
  const formattedWords = wordsArray.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return formattedWords.join(' ');
}

export const errorMessage = (error: any): string => {
  const { name, message } = error ?? {};

  if (!name && !message) return 'Something went wrong...';

  return `${name ? `${name}.` : ''} ${message ? `${message}.` : ''}`
};

export const commonErrorHandler = (error: any) => {
  enqueueSnackbar(errorMessage(error), { variant: 'error' });
}
