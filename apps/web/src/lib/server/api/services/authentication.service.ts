import { inject, injectable } from "tsyringe";
import { LuciaService } from "./lucia.service";
import { BadRequest } from "../common/exceptions";
import { Scrypt } from "lucia";
import { UsersRepository } from "../repositories/users.repository";
import { VolunteersRepository } from "../repositories/volunteers.repository";
import { LoggerService } from "./logger.service";

@injectable()
export class AuthenticationService {
	constructor(
		@inject(LuciaService) private readonly luciaService: LuciaService,
		@inject(UsersRepository) private readonly usersRepository: UsersRepository,
		@inject(VolunteersRepository) private readonly volunteersRepository: VolunteersRepository,
		@inject(LoggerService) private readonly loggerService: LoggerService
	) {}

	async login(email: string, password: string) {
		this.loggerService.info("Logging in user", { email });
		const existingUser = await this.usersRepository.findOneByEmail(email);

		if (!existingUser || !existingUser?.hashedPassword) {
			this.loggerService.error("Invalid email or password", { email });

			throw BadRequest("Invalid email or password");
		}

		const validPassword = await new Scrypt().verify(existingUser.hashedPassword, password);

		if (!validPassword) {
			this.loggerService.error("Invalid email or password", { email });

			throw BadRequest("Invalid email or password");
		}

		const session = await this.luciaService.lucia.createSession(existingUser.id, {});

		this.loggerService.info("Session cookie created", { email });

		return session;
	}

	async register(email: string, password: string) {
		const existingUser = await this.usersRepository.findOneByEmail(email);

		if (existingUser) {
			throw BadRequest("User already exists");
		}

		const hashedPassword = await new Scrypt().hash(password);

		const user = await this.usersRepository.create({
			email,
			hashedPassword
		});

		return user;
	}

	async registerVolunteer(email: string, password: string) {
		const existingUser = await this.usersRepository.findOneByEmail(email);

		if (existingUser) {
			throw BadRequest("User already exists");
		}

		const hashedPassword = await new Scrypt().hash(password);

		const user = await this.usersRepository.create({
			email,
			hashedPassword
		});

		const volunteer = await this.volunteersRepository.create({
			userId: user.id
		});

		return { user, volunteer };
	}

	async logout(sessionId: string) {
		await this.luciaService.lucia.invalidateSession(sessionId);
	}

	async verify(sessionId: string) {
		return await this.luciaService.lucia.validateSession(sessionId);
	}
}
