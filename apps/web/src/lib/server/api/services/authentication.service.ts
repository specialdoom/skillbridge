import { inject, injectable } from 'tsyringe';
import { DrizzleService } from './drizzle.service';
import { LuciaService } from './lucia.service';
import { BadRequest } from '../common/exceptions';
import { Scrypt } from 'lucia';
import { UsersRepository } from '../repositories/users.repository';

@injectable()
export class AuthenticationService {
	constructor(
		@inject(DrizzleService) private readonly drizzleService: DrizzleService,
		@inject(LuciaService) private readonly luciaService: LuciaService,
		@inject(UsersRepository) private readonly usersRepository: UsersRepository
	) {}

	async login(email: string, password: string) {
		const existingUser = await this.usersRepository.findOneByEmail(email);

		if (!existingUser || !existingUser?.hashedPassword) {
			throw BadRequest('Invalid email or password');
		}

		const validPassword = await new Scrypt().verify(existingUser.hashedPassword, password);

		if (!validPassword) {
			throw BadRequest('Invalid email or password');
		}

		const session = await this.luciaService.lucia.createSession(existingUser.id, {});
		const sessionCookie = this.luciaService.lucia.createSessionCookie(session.id);

		return sessionCookie;
	}

	async register(email: string, password: string) {
		const existingUser = await this.usersRepository.findOneByEmail(email);

		if (existingUser) {
			throw BadRequest('User already exists');
		}

		const hashedPassword = await new Scrypt().hash(password);

		const user = await this.usersRepository.create({
			email,
			hashedPassword
		});

		return user;
	}

	async logout(sessionId: string) {
		this.luciaService.lucia.invalidateSession(sessionId);
	}
}
