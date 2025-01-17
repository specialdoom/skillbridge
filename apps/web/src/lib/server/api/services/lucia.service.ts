import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia, TimeSpan } from "lucia";
import { inject, injectable } from "tsyringe";
import { DrizzleService } from "./drizzle.service";
import { config } from "../common/config";

@injectable()
export class LuciaService {
	readonly lucia: Lucia;
	constructor(@inject(DrizzleService) private readonly drizzle: DrizzleService) {
		const adapter = new DrizzlePostgreSQLAdapter(
			this.drizzle.db,
			this.drizzle.schema.sessionsTable,
			this.drizzle.schema.usersTable
		);
		this.lucia = new Lucia(adapter, {
			sessionCookie: {
				attributes: {
					secure: config.isProduction
				},
				expires: true
			},
			sessionExpiresIn: new TimeSpan(30, "m"),
			getUserAttributes: (attributes) => {
				return {
					...attributes
				};
			}
		});
	}
}
