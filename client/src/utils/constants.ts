import { generateOptions } from './commonFunctions';
import { ECarriage, ETrainArrival } from './types';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_SIZES = [1, 5, 10, 25, 50];

export const basicTableHeaders = [
  { label: 'ID' },
  { label: 'From' },
  { label: 'To' },
  { label: 'Departure Time' },
  { label: 'Arrival Time' },
  { label: 'Price' },
  { label: 'Carriage Type' },
  { label: 'Status' },
];

export const trainStatusOptions = generateOptions(ETrainArrival);
export const trainCarriageOptions = generateOptions(ECarriage);

