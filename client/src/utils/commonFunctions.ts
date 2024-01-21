import { enqueueSnackbar } from 'notistack';
import { ETrainArrival, IDestination } from './types';
import { TDataTableRow } from '../components/DataTable';
import dayjs from 'dayjs';

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

export const generateOptions = (enumObject: Record<string, string>) => {
  return Object.entries(enumObject).map(([key, value]) => ({ value: key, label: value }));
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
      { value: destination.status === ETrainArrival.OnTime ? 'On Time' : 'Delayed' },
    ],
  }),
);
