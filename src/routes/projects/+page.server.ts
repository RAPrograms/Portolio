import type { PageServerLoad } from './$types';

import db from "../../lib/db.server"

export const prerender = true;

// This will bake the project records into the page
export const load: PageServerLoad = async ({ params }) => {
	return {
		records: db.prepare('SELECT * FROM projects')
			.all()
			.map((record: Record<string, any>) => {
				// Load tags from JSON string
				record["tags"] = JSON.parse(record["tags"])

				// Load project type
				try {
					record["type"] = JSON.parse(record["type"])
				} catch (error) {
					record["type"] = [record["type"]]
				}

				// Load project langauges
            	record["languages"] = JSON.parse(record["languages"])
				
				return record
			})
	};
};