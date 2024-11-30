import { inject, injectable } from "tsyringe";
import { RegistrationsRepository } from "../repositories/registrations.repository";
import { BadRequest } from "../common/exceptions";
import type { RegistrationStatus } from "$lib/shared/models/registration";

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

	async findAllByEventId(eventId: string, filter?: RegistrationStatus) {
		if (filter && !["pending", "approved", "rejected", "target"].includes(filter)) {
			throw BadRequest("Invalid filter");
		}

		return await this.registrationsRepository.findAllByEventId(eventId, filter);
	}

	async update(registrationId: string, status: RegistrationStatus) {
		return await this.registrationsRepository.update(registrationId, { status });
	}

	async approve(registrationId: string) {
		return await this.registrationsRepository.update(registrationId, { status: "approved" });
	}

	async reject(registrationId: string) {
		return await this.registrationsRepository.update(registrationId, { status: "rejected" });
	}

	private async checkRegistration(userId: string, eventId: string) {
		const registration = await this.registrationsRepository.findByUserIdAndEventId(userId, eventId);

		if (registration) {
			return true;
		}

		return false;
	}
}
