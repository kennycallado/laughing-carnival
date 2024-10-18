import Surreal from 'npm:surrealdb'
import { surrealdbWasmEngines } from 'npm:@surrealdb/wasm'

// @ts-ignore: TODO
if (true) {
	const db = new Surreal({
		engines: surrealdbWasmEngines(),
	})

	await db.connect('mem://')
}
