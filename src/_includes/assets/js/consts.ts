// @ts-ignore: env field comes from vite
const DB_URL = import.meta.env.MODE === 'development'
	? 'http://localhost:8000'
	: 'http://db.lab.kennycallado.dev'

export const DB = {
	url: DB_URL,
	config: {
		namespace: 'lab',
		database: 'prom',
		AC: 'user',
	},
}
