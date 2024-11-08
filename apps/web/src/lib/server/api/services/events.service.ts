import { inject, injectable } from "tsyringe";
import { EventsRepository } from "../repositories/events.repository";

@injectable()
export class EventsService {
	constructor(@inject(EventsRepository) private readonly eventsRepository: EventsRepository) {}

	async create(name: string, startDate: Date, endDate: Date, organizationId: string) {
		return this.eventsRepository.create({ name, startDate, endDate, organizationId });
	}

	async findAll() {
		return this.eventsRepository.findAll();
	}
}
