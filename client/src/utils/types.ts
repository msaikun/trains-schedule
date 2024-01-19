export enum ETrainArrival {
  OnTime,
  Delayed,
  Canceled,
}

export enum ECarriage {
  Compartment,
  SecondClass,
  Luxe,
}

export interface IDestination {
  from          : string;
  to            : string;
  status        : ETrainArrival;
  departureTime : string;
  arrivalTime   : string;
  no            : number;
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
