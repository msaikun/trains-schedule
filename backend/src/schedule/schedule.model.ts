import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty }                    from '@nestjs/swagger';

export enum ETrainArrivalStatus {
  OnTime  = 'OnTime',
  Delayed = 'Delayed',
}

export enum ECarriageType {
  Compartment = 'Compartment',
  SecondClass = 'SecondClass',
  Luxe        = 'Luxe',
}

export interface ITrainSchedule {
  id            : number;
  status        : ETrainArrivalStatus;
  departureTime : string;
  arrivalTime   : string;
  from          : string;
  to            : string;
  price         : number;
  carriageType  : ECarriageType;
}


@Table({ tableName: 'schedule' })
export class Schedule extends Model<Schedule, ITrainSchedule> {
  @ApiProperty({ example: 1, description: 'Unique train id' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: '2022-12-12 20:12:12', description: 'Departure Time' })
  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  departureTime: Date;

  @ApiProperty({ example: '2025-11-11 22:12:11', description: 'Arrival Time' })
  @Column({ type: DataType.DATE, allowNull: true })
  arrivalTime: Date;

  @ApiProperty({ example: ETrainArrivalStatus.OnTime, description: 'Arrival Status' })
  @Column({ type: DataType.ENUM(...Object.values(ETrainArrivalStatus)), defaultValue: ETrainArrivalStatus.OnTime })
  status: ETrainArrivalStatus;

  @ApiProperty({ example: 'Lviv', description: 'From' })
  @Column({ type: DataType.STRING })
  from: string;

  @ApiProperty({ example: 'Kyiv', description: 'To' })
  @Column({ type: DataType.STRING })
  to: string;

  @ApiProperty({ example: 29.3, description: 'Price' })
  @Column({ type: DataType.FLOAT })
  price: number;

  @ApiProperty({ example: ECarriageType.Compartment, description: 'Carriage Type' })
  @Column({ type: DataType.ENUM(...Object.values(ECarriageType)), defaultValue: ECarriageType.Compartment })
  carriageType: ECarriageType;
}
