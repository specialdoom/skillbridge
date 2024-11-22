import { inject, injectable } from "tsyringe";
import { OrganizationsRepository } from "../repositories/organization.repository";

@injectable()
export class OrganizationsService {
	constructor(
		@inject(OrganizationsRepository)
		private readonly organizationsRepository: OrganizationsRepository
	) {}

	async findByUserId(userId: string) {
		return this.organizationsRepository.findByUserId(userId);
	}

}
