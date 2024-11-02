import { inject, injectable } from 'tsyringe';
import { AuthenticationService } from '../services/authentication.service';
import { Controler } from '../common/types/controller';
import { zValidator } from '@hono/zod-validator';
import { registerDto } from '../dtos/register.dto';
import { loginDto } from '../dtos/login.dto';
import { requireAuth } from '../middlewares/require-auth.middleware';

@injectable()
export class AuthenticationController extends Controler {
	constructor(@inject(AuthenticationService) private authenticationService: AuthenticationService) {
		super();
	}

	routes() {
		return this.controller
			.get('/me', async (c) => {
				const user = c.var.user;
				return c.json({ user: user });
			})
			.post('/login', zValidator('json', loginDto), async (c) => {
				const { email, password } = c.req.valid('json');

				const sessionCookie = await this.authenticationService.login(email, password);

				return c.json({ sessionCookie });
			})
			.post('/register', zValidator('json', registerDto), async (c) => {
				const { email, password } = c.req.valid('json');

				const user = await this.authenticationService.register(email, password);

				return c.json({ user });
			})
			.post('/logout', requireAuth, async (c) => {
				const sessionId = c.var.session.id;
				await this.authenticationService.logout(sessionId);
				return c.json({ status: 'success' });
			});
	}
}