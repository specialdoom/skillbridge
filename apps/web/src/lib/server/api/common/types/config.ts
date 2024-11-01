export interface Config {
	isProduction: boolean;
	api: ApiConfig;
}

interface ApiConfig {
	origin: string;
}
