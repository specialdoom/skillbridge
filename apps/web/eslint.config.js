import skillbridgeEslintConfig from '@skillbridge/eslint-config';

export default [
	...skillbridgeEslintConfig,
	{
		ignores: [
			'node_modules',
			'./build',
			'.svelte-kit/*',
			'./package',
			'.env',
			'.env.*',
			'!.env.example',
			'pnpm-lock.yaml'
		]
	}
];
