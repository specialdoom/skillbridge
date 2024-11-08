import { Hono } from 'hono';
import type { HonoTypes } from './hono';
import type { BlankSchema } from 'hono/types';

export abstract class Controller {
	protected readonly controller: Hono<HonoTypes, BlankSchema, '/'>;
	constructor() {
		this.controller = new Hono();
	}
	abstract routes(): Hono<HonoTypes, BlankSchema, '/'>;
}
