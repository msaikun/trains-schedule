import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Schedule } from "./schedule.model";
import { UpdateTrainScheduleDto, CreateTrainScheduleDto } from "./dto/create-train-schedule.dto";

export const removeUndefinedFields = <T>(obj: T): Partial<T> => {
  const filteredEntries = Object.entries(obj as Record<string, unknown>)
    .filter(([, value]) => value !== undefined && value !== null);

  const filteredObject = Object.fromEntries(filteredEntries) as Partial<T>;

  return filteredObject;
};

@Injectable()
export class ScheduleService {
  constructor(@InjectModel(Schedule) private scheduleRepository: typeof Schedule) {};

  async getTrainsSchedule({ page, limit, ...where }) {
    const offset = (page - 1) * limit;

    const items = await this.scheduleRepository.findAll({
      offset,
      limit,
      where,
    });

    const totalItems = await this.scheduleRepository.count({ where });

    console.log('page limit', page, limit, totalItems, items);

    return {
      items,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  };
  
  async changeTrainDetails(train: UpdateTrainScheduleDto, id: number) {
    // if (!isAdmin) {
    //   throw new UnauthorizedException({ message: 'You do not have the necessary privileges' });
    // }

    const existingTrain = await this.scheduleRepository.findOne({ where: { id } });
    if (!existingTrain) {
      throw new NotFoundException({ message: 'Train not found' });
    }

    await existingTrain.update(train as any);

    return existingTrain;
  };

  async deleteTrainFromSchedule(id: number) {
    // if (!isAdmin) {
    //   throw new UnauthorizedException({ message: 'You do not have the necessary privileges' });
    // }

    const existingTrain = await this.scheduleRepository.findOne({ where: { id } })
    if (!existingTrain) {
      throw new NotFoundException({ message: 'Train not found' });
    }

    await existingTrain.destroy();
  };

  async addTrainToSchedule(train: CreateTrainScheduleDto) {
    // if (!isAdmin) {
    //   throw new UnauthorizedException({ message: 'You do not have the necessary privileges' });
    // }

    const createdTrain = await this.scheduleRepository.create(train);

    return createdTrain;
  };
};
