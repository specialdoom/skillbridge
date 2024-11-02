export interface Config {
	isProduction: boolean;
	api: ApiConfig;
}

interface ApiConfig {
	origin: string;
	postgres: {
		url: string;
	};
}
