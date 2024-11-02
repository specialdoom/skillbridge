export function isApiRoute(path: string | null): boolean {
	return path?.includes('/api') ?? false;
}

export function isAuthRoute(path: string | null): boolean {
	return path?.includes('(auth)') ?? false;
}
