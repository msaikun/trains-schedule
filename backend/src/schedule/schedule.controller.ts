import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ScheduleService } from './schedule.service';
import { Schedule } from './schedule.model';
import { CreateTrainScheduleDto, UpdateTrainScheduleDto } from './dto/create-train-schedule.dto';

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @ApiOperation({ summary: 'Get all trains schedule' })
  @ApiResponse({ status: 200, type: [Schedule] })
  @Get()
  getAll() {
    return this.scheduleService.getTrainsSchedule();
  }

  @ApiOperation({ summary: 'Create new train schedule' })
  @ApiResponse({ status: 200, type: Schedule })
  @Post()
  create(@Body() trainSchedule: CreateTrainScheduleDto) {
    return this.scheduleService.addTrainToSchedule(trainSchedule);
  }

  @ApiOperation({ summary: 'Delete train from schedule by ID' })
  @ApiResponse({ status: 200, type: Schedule })
  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.scheduleService.deleteTrainFromSchedule(id);
  }

  @ApiOperation({ summary: 'Update train schedule' })
  @ApiResponse({ status: 200, type: Schedule })
  @Patch(':id')
  editById(@Body() updatedTrainSchedule: UpdateTrainScheduleDto, @Param('id') id: number) {
    return this.scheduleService.changeTrainDetails(updatedTrainSchedule, id);
  }
};
