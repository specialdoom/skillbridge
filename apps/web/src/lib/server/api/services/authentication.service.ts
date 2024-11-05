import { inject, injectable } from "tsyringe";
import { LuciaService } from "./lucia.service";
import { BadRequest } from "../common/exceptions";
import { Scrypt } from "lucia";
import { UsersRepository } from "../repositories/users.repository";
import { OrganizationsRepository } from "../repositories/organization.repository";
import { LoggerService } from "./logger.service";

@injectable()
export class AuthenticationService {
	constructor(
		@inject(LuciaService) private readonly luciaService: LuciaService,
		@inject(UsersRepository) private readonly usersRepository: UsersRepository,
		@inject(OrganizationsRepository)
		private readonly organizationsRepository: OrganizationsRepository,
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

	async register(
		email: string,
		password: string,
		role: "volunteer" | "manager",
		name: string = "",
		description: string = ""
	) {
		const existingUser = await this.usersRepository.findOneByEmail(email);

		if (existingUser) {
			throw BadRequest("User already exists");
		}

		const hashedPassword = await new Scrypt().hash(password);

		let organizationId: string | null = null;

		if (role === "manager") {
			const organization = await this.organizationsRepository.create({
				name,
				description
			});

			organizationId = organization.id;
		}

		const user = await this.usersRepository.create({
			email,
			hashedPassword,
			role,
			organizationId
		});

		return user;
	}

	async logout(sessionId: string) {
		await this.luciaService.lucia.invalidateSession(sessionId);
	}

	async verify(sessionId: string) {
		return await this.luciaService.lucia.validateSession(sessionId);
	}
}
