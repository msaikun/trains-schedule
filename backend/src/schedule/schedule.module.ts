import { Module, forwardRef } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService }    from './schedule.service';
import { SequelizeModule }    from '@nestjs/sequelize';
import { Schedule }           from './schedule.model';

@Module({
  controllers : [ScheduleController],
  providers   : [ScheduleService],
  exports     : [ScheduleService],
  imports     : [
    SequelizeModule.forFeature([Schedule]),
    forwardRef(() => ScheduleModule),
  ],
})

export class ScheduleModule {}
