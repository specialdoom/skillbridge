import { injectable } from "tsyringe";
import { createLogger, type Logger, transports } from "winston";

@injectable()
export class LoggerService {
	readonly logger: Logger;
	constructor() {
		this.logger = createLogger({
			transports: [new transports.Console()]
		});
	}

	log(message: string, metadata?: Object) {
		this.logger.log(message, { metadata });
	}

	info(message: string, metadata?: Object) {
		this.logger.info(message, { metadata });
	}

	error(message: string, metadata?: Object) {
		this.logger.error(message, { metadata });
	}

	warn(message: string, metadata?: Object) {
		this.logger.warn(message, { metadata });
	}

	debug(message: string, metadata?: Object) {
		this.logger.debug(message, { metadata });
	}

	verbose(message: string, metadata?: Object) {
		this.logger.verbose(message, { metadata });
	}
}
