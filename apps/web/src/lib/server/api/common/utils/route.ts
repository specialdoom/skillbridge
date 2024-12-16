export function isApiRoute(path: string | null): boolean {
	return path?.includes("/api") ?? false;
}

export function isAuthRoute(path: string | null): boolean {
	return path?.includes("(auth)") ?? false;
}

export function isDocsRoute(path: string | null): boolean {
	return path?.includes("(docs)") ?? false;
}

export function isAppRoute(path: string | null): boolean {
	return path?.includes("(app)") ?? false;
}
