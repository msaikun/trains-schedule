import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Schedule } from "./schedule.model";
import { UpdateTrainScheduleDto, CreateTrainScheduleDto } from "./dto/create-train-schedule.dto";

@Injectable()
export class ScheduleService {
  constructor(@InjectModel(Schedule) private scheduleRepository: typeof Schedule) {};

  async getTrainsSchedule() {
    const trainsSchedules = await this.scheduleRepository.findAll();

    return trainsSchedules;
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
