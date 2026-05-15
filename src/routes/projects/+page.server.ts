import type { PageServerLoad } from './$types';

import db from "../../lib/db.server"

export const prerender = true;

// This will bake the project records into the page
export const load: PageServerLoad = async ({ params }) => {
	return {
		records: db.prepare('SELECT * FROM projects').all()
	};
};