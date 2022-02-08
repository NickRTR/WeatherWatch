import adapter from "@sveltejs/adapter-static";

const dev = process.env.NODE_ENV == "development"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: true
		}),

		vite: {
			compilerOptions: { dev },
            define: {
                'process.env': process.env,
            },
        },
	}
};

export default config;
