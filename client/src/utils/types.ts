export enum ETrainArrival {
  OnTime  = 'On Time',
  Delayed = 'Delayed',
}

export enum ECarriage {
  Compartment = 'Compartment',
  SecondClass = 'Second Class',
  Luxe        = 'Luxe',
}

export interface IDestination {
  id            : string;
  from          : string;
  to            : string;
  status        : ETrainArrival;
  departureTime : string;
  arrivalTime   : string;
  price         : number;
  carriageType  : ECarriage;
}

export interface ISignInUserInfo {
  email    : string;
  password : string;
}

export interface ISignUpUserInfo extends ISignInUserInfo {
  userName : string;
  isAdmin  : boolean;
}

export interface IScheduleDataWithPagination {
  items       : IDestination[];
  currentPage : string;
  totalItems  : number;
  totalPages  : number;
}