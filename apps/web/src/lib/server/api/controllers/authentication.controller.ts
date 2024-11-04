import { inject, injectable } from 'tsyringe';
import { AuthenticationService } from '../services/authentication.service';
import { Controler } from '../common/types/controller';
import { zValidator } from '@hono/zod-validator';
import { registerDto } from '../dtos/register.dto';
import { loginDto } from '../dtos/login.dto';
import { requireAuth } from '../middlewares/require-auth.middleware';
import { verifyDto } from '../dtos/verify.dto';

@injectable()
export class AuthenticationController extends Controler {
	constructor(@inject(AuthenticationService) private authenticationService: AuthenticationService) {
		super();
	}

	routes() {
		return this.controller
			.get("/me", async (c) => {
				const user = c.var.user;
				return c.json({ user: user });
			})
			.post("/login", zValidator("json", loginDto), async (c) => {
				const { email, password } = c.req.valid("json");

				const sessionCookie = await this.authenticationService.login(email, password);

				return c.json({ sessionCookie });
			})
			.post("/register/volunteer", zValidator("json", registerDto), async (c) => {
				const { email, password } = c.req.valid("json");

				const user = await this.authenticationService.registerVolunteer(email, password);

				return c.json({ user });
			})

			.post("/logout", requireAuth, async (c) => {
				const sessionId = c.var.session.id;
				await this.authenticationService.logout(sessionId);
				return c.json({ status: 'success' });
			})
			.post('/verify', zValidator('json', verifyDto), async (c) => {
				const { sessionId } = c.req.valid('json');

				const { user, session } = await this.authenticationService.verify(sessionId);

				console.log('[auth controller]', { user, session });

				return c.json({ success: true });
			});
	}
}
