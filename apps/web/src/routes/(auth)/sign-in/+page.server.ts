import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	async default({ request }) {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		console.log('login trial', { email, password });
	}
};
