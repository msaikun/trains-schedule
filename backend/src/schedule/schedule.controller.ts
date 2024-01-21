import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ScheduleService } from './schedule.service';
import { Schedule } from './schedule.model';
import { CreateTrainScheduleDto, UpdateTrainScheduleDto } from './dto/create-train-schedule.dto';

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @ApiOperation({ summary: 'Get all trains schedule' })
  @ApiResponse({ status: 200, type: [Schedule] })
  @ApiQuery({ name: 'from', required: true })
  @ApiQuery({ name: 'to', required: true })
  @ApiQuery({ name: 'page', required: true })
  @ApiQuery({ name: 'limit', required: true })
  // @ApiQuery({ name: 'departureTime', required: true })
  // @ApiQuery({ name: 'arrivalTime', required: false })
  @Get()
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('from') from: string,
    @Query('to') to: string,
    // @Query('departureTime') departureTime: string,
    // @Query('arrivalTime') arrivalTime?: string,
  ) {
    return this.scheduleService.getTrainsSchedule({ page, limit, from, to });
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
