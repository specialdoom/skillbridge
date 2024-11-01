import * as envs from '$env/static/private';
import type { Config } from './types/config';

export const config: Config = {
	isProduction: envs.NODE_ENV === 'production',
	api: {
		origin: envs.ORIGIN
	}
};
