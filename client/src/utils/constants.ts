import { generateOptions }          from './common';
import { ECarriage, ETrainArrival } from './types';

export const DEFAULT_PAGE          = 1;
export const DEFAULT_PAGE_SIZE     = 5;
export const DEFAULT_PAGE_SIZES    = [5, 10, 25, 50];
export const DEBOUNCE_DEFAULT_TIME = 500;

export const basicTableHeaders = [
  { label: 'No' },
  { label: 'From' },
  { label: 'To' },
  { label: 'Departure Time' },
  { label: 'Arrival Time' },
  { label: 'Price' },
  { label: 'Carriage Type' },
  { label: 'Status' },
];

export const trainStatusOptions   = generateOptions(ETrainArrival);
export const trainCarriageOptions = generateOptions(ECarriage);

