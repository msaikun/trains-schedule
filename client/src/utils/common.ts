import dayjs               from 'dayjs';
import { enqueueSnackbar } from 'notistack';

import { ETrainArrival, IDestination } from './types';
import { TDataTableRow }               from '../components/DataTable';

type TDebouncedFunction = (...args: any[]) => void;

export const splitCamelCase = (word: string) => {
  const wordsArray     = word.split(/(?=[A-Z])/);
  const formattedWords = wordsArray.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return formattedWords.join(' ');
}

export const getErrorMessage = (errorObj: any): string => {
  const { error, message } = errorObj ?? {};

  if (!error && !message) return 'Something went wrong...';

  return `${error ? `${error}.` : ''} ${message ? `${message}.` : ''}`
};

export const commonErrorHandler = (error: any) => {
  enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
}

export const generateOptions = (enumObject: Record<string, string>) => {
  return Object.entries(enumObject)
    .map(([key, value]) => ({ value: key, label: value }));
};

export const transformToDataTableRows = (destinations: IDestination[]): { item: IDestination; tableRow: TDataTableRow }[] =>
  destinations.map((destination) => ({
    item: destination,
    tableRow: [
      { value: destination.id },
      { value: destination.from },
      { value: destination.to },
      { value: dayjs(destination.departureTime).format('MM/DD/YYYY HH:mm') },
      { value: dayjs(destination.arrivalTime).format('MM/DD/YYYY HH:mm') },
      { value: `$${destination.price}` },
      { value: destination.carriageType },
      { value: destination.status === ETrainArrival.Delayed ? 'Delayed' : 'On Time' },
    ],
  }),
);

export function debounce<F extends TDebouncedFunction>(func: F, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
