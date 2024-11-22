import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../repositories/users.repository";
import type { UserRole } from "$lib/shared/models/role";

@injectable()
export class UsersService {
	constructor(@inject(UsersRepository) private readonly usersRepository: UsersRepository) {}

	findOneById(id: string) {
		return this.usersRepository.findOneByIdOrThrow(id);
	}

	findOneByEmail(email: string) {
		return this.usersRepository.findOneByEmail(email);
	}

	findNewUsers(role: UserRole) {
		return this.usersRepository.findNew(role);
	}

	update(userId: string, firstName: string, lastName: string) {
		return this.usersRepository.update(userId, { firstName, lastName });
	}
}
