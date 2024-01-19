import { ApiProperty }                        from '@nestjs/swagger';
import { ECarriageType, ETrainArrivalStatus } from '../schedule.model';

export class CreateTrainScheduleDto {
  @ApiProperty({ example: '2022-12-12 22:12:11', description: 'Departure Time' })
  departureTime: string;

  @ApiProperty({ example: '2022-12-12 20:12:12', description: 'Arrival Time' })
  arrivalTime: string;

  @ApiProperty({ example: ETrainArrivalStatus.OnTime, description: 'Arrival Status' })
  status: ETrainArrivalStatus;

  @ApiProperty({ example: 'Lviv', description: 'From' })
  from: string;

  @ApiProperty({ example: 'Kyiv', description: 'To' })
  to: string;

  @ApiProperty({ example: 29.3, description: 'Price' })
  price: number;

  @ApiProperty({ example: ECarriageType.Compartment, description: 'Carriage Type' })
  carriageType: ECarriageType;
}

export class UpdateTrainScheduleDto extends CreateTrainScheduleDto {
  @ApiProperty({ example: 1, description: 'Train id' })
  id: number;
}

