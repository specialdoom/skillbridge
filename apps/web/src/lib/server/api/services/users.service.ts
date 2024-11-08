import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../repositories/users.repository";

@injectable()
export class UsersService {
	constructor(@inject(UsersRepository) private readonly usersRepository: UsersRepository) {}

	findOneById(id: string) {
		return this.usersRepository.findOneByIdOrThrow(id);
	}

	findOneByEmail(email: string) {
		return this.usersRepository.findOneByEmail(email);
	}
}
