import { inject, injectable } from "tsyringe";
import { RegistrationsRepository } from "../repositories/registrations.repository";
import { BadRequest } from "../common/exceptions";

@injectable()
export class RegistrationsService {
	constructor(
		@inject(RegistrationsRepository) private registrationsRepository: RegistrationsRepository
	) {}

	async create(userId: string, eventId: string) {
		if (await this.checkRegistration(userId, eventId)) {
			throw BadRequest("User already registered for this event");
		}

		return this.registrationsRepository.create({ userId, eventId });
	}

	private async checkRegistration(userId: string, eventId: string) {
		const registration = await this.registrationsRepository.findByUserIdAndEventId(userId, eventId);

		if (registration) {
			return true;
		}

		return false;
	}
}
