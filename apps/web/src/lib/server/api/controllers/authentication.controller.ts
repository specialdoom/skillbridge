import { inject, injectable } from "tsyringe";
import { AuthenticationService } from "../services/authentication.service";
import { Controler } from "../common/types/controller";
import { zValidator } from "@hono/zod-validator";
import { registerDto } from "../dtos/register.dto";
import { loginDto } from "../dtos/login.dto";
import { requireAuth } from "../middlewares/require-auth.middleware";
import { verifyDto } from "../dtos/verify.dto";
import { LoggerService } from "../services/logger.service";
import { setCookie } from "hono/cookie";
import { LuciaService } from "../services/lucia.service";
import { UsersService } from "../services/users.service";

@injectable()
export class AuthenticationController extends Controler {
	constructor(
		@inject(AuthenticationService) private authenticationService: AuthenticationService,
		@inject(LuciaService) private luciaService: LuciaService,
		@inject(LoggerService) private loggerService: LoggerService,
		@inject(UsersService) private usersService: UsersService
	) {
		super();
	}

	routes() {
		return this.controller
			.get("/me", requireAuth, async (c) => {
				this.loggerService.info("Getting user info");

				const user = c.var.user;

				const { email } = await this.usersService.findOneById(user.id);

				return c.json({ email });
			})
			.post("/login", zValidator("json", loginDto), async (c) => {
				const { email, password } = c.req.valid("json");

				const session = await this.authenticationService.login(email, password);
				const sessionCookie = this.luciaService.lucia.createSessionCookie(session.id);

				setCookie(c, sessionCookie.name, sessionCookie.value, {
					path: sessionCookie.attributes.path,
					maxAge: sessionCookie.attributes.maxAge,
					domain: sessionCookie.attributes.domain,
					sameSite: sessionCookie.attributes.sameSite as any,
					secure: sessionCookie.attributes.secure,
					httpOnly: sessionCookie.attributes.httpOnly,
					expires: sessionCookie.attributes.expires
				});

				return c.json({ message: "ok" });
			})
			.post("/register", zValidator("json", registerDto), async (c) => {
				const { email, password } = c.req.valid("json");
				const role = c.req.query("role") as "volunteer" | "manager";

				console.log("[auth controller] registering user with role", { role });
				const user = await this.authenticationService.register(email, password, role);

				return c.json({ user });
			})
			.post("/logout", requireAuth, async (c) => {
				const sessionId = c.var.session.id;

				await this.authenticationService.logout(sessionId);

				return c.json({ status: "success" });
			})
			.post("/verify", async (c) => {
				const sessionId = c.var.session?.id;

				if (!sessionId) {
					return c.json({ success: false });
				}

				const { user, session } = await this.authenticationService.verify(sessionId);

				if (!user && !session) return c.json({ success: false });

				return c.json({ success: true });
			});
	}
}
