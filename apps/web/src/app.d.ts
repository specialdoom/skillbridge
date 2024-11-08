import { ApiClient } from "$lib/server/api";
import { parseApiResponse } from "$lib/utils/api";
import type { User } from "lucia";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			api: ApiClient["api"];
			parseApiResponse: typeof parseApiResponse;
			getAuthedUser: () => Promise<Returned<User> | null>;
			getAuthedUserOrThrow: (redirectTo: string) => Promise<Returned<User>>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

declare module "@event-calendar/core";
declare module "@event-calendar/day-grid";
