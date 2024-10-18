import { resolve } from 'jsr:@std/path'
import webcPlugin from 'npm:@11ty/eleventy-plugin-webc'
import vitePlugin from 'npm:@11ty/eleventy-plugin-vite'
import purgeCss from 'npm:@fullhuman/postcss-purgecss'

import { type UserConfig } from 'npm:@11ty/eleventy'

// import './dev.db.server.ts'

export const config = {
	templateFormats: ['html', 'md'],
	htmlTemplateEngine: 'webc',
	dir: {
		input: 'src',
		output: 'dist',
		layouts: '_includes/layouts',
	},
}

export default function (eleventyConfig: UserConfig) {
	// Stop logging every file that gets written
	eleventyConfig.setQuietMode(true)

	eleventyConfig.setWatchThrottleWaitTime(500)

	eleventyConfig.addPlugin(webcPlugin, {
		components: 'src/_includes/components/**/*.webc',
	})

	eleventyConfig.addPlugin(vitePlugin, {
		viteOptions: {
			clearScreen: true,
			publicDir: false,
			appType: 'mpa',
			css: {
				postcss: {
					plugins: [
						// @ts-ignore: purgeCss is not in the types
						purgeCss({
							content: [
								// for development
								'./dist/**/*.{html,webc}',
								// for production builds
								'./.11ty-vite/**/*.{html,webc}',
							],
							safelist: {
								deep: [
									/modal.*/,
									/accordion.*/,
									/card.*/,
									/dropdown.*/,
								],
							},
							// safelist: {
							// 	deep: [
							// 		/plyr.*/,
							// 		/is-active/,
							// 		/fa-robot/,
							// 		/has-background-info-light/,
							// 		/tag/,
							// 		/is-warning/,
							// 		/is-pulled-right/,
							// 		/is-fullwidth/,
							// 		/is-block/,
							// 		/has-glow.*/,
							// 		/has-gradient.*/,
							// 	],
							// },
						}),
					],
				},
			},
			build: {
				mode: 'production',
				target: 'esnext',
				// minify: true,
			},

			resolve: {
				alias: {
					'/assets': resolve('src/_includes/assets'),
					// '/custom.scss': resolve('.', 'src/_includes/assets/sass/custom.scss'),
					// '/node_modules': resolve('.', 'node_modules'),
				},
			},
		},
	})
}
