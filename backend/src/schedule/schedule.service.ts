import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Schedule } from './schedule.model';
import { UpdateTrainScheduleDto, CreateTrainScheduleDto } from './dto/create-train-schedule.dto';
import sequelize from 'sequelize';

export const removeUndefinedFields = <T>(obj: T): Partial<T> => {
  const filteredEntries = Object.entries(obj as Record<string, unknown>)
    .filter(([, value]) => !!value);

  const filteredObject = Object.fromEntries(filteredEntries) as Partial<T>;

  return filteredObject;
}

@Injectable()
export class ScheduleService {
  constructor(@InjectModel(Schedule) private scheduleRepository: typeof Schedule) {};

  async getTrainsSchedule({ page, limit, order, orderBy, ...where }) {
    const offset = (page - 1) * limit;
    const whereQuery = removeUndefinedFields(where);

    const items = await this.scheduleRepository.findAll({
      offset,
      limit,
      where: whereQuery,
      order: [[sequelize.literal(`"${orderBy}"`), order]]
    });

    const totalItems = await this.scheduleRepository.count({ where: whereQuery });

    return {
      items,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  };
  
  async changeTrainDetails(train: UpdateTrainScheduleDto, id: number) {
    const existingTrain = await this.scheduleRepository.findOne({ where: { id } });
    if (!existingTrain) {
      throw new NotFoundException({ message: 'Train not found' });
    }

    await existingTrain.update(train as any);

    return existingTrain;
  };

  async deleteTrainFromSchedule(id: number) {
    const existingTrain = await this.scheduleRepository.findOne({ where: { id } })
    if (!existingTrain) {
      throw new NotFoundException({ message: 'Train not found' });
    }

    await existingTrain.destroy();
  };

  async addTrainToSchedule(train: CreateTrainScheduleDto) {
    const createdTrain = await this.scheduleRepository.create(train);

    return createdTrain;
  };
};
