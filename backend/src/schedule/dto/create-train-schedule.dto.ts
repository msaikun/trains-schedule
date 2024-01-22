import { ApiProperty }                        from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ECarriageType, ETrainArrivalStatus } from '../schedule.model';

export class CreateTrainScheduleDto {
  @ApiProperty({ example: '2022-12-12 22:12:11', description: 'Departure Time' })
  @IsDateString()
  departureTime: string;

  @ApiProperty({ example: '2022-12-12 20:12:12', description: 'Arrival Time' })
  @IsDateString()
  arrivalTime: string;

  @ApiProperty({ example: ETrainArrivalStatus.OnTime, description: 'Arrival Status' })
  status: ETrainArrivalStatus;

  @ApiProperty({ example: 'Lviv', description: 'From' })
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiProperty({ example: 'Kyiv', description: 'To' })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ example: 29.3, description: 'Price' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: ECarriageType.Compartment, description: 'Carriage Type' })
  carriageType: ECarriageType;
}

export class UpdateTrainScheduleDto extends CreateTrainScheduleDto {
  @ApiProperty({ example: 1, description: 'Train id' })
  id: number;
}

