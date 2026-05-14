import type { PageServerLoad } from './$types';
import initSqlJs from 'sql.js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export const prerender = true;

// This will bake the project records into the page
export const load: PageServerLoad = async ({ params }) => {
	// Get the file content from the system
    const path = resolve('static/data.db');
    const fileBuffer = readFileSync(path);

	// Init database
	const SQL = await initSqlJs();
    const db = new SQL.Database(fileBuffer);
	
	// Query projects
    const results = db.exec("SELECT * FROM projects");

	// Convert query results into JSON objects
	const columns = results[0].columns;
    const records = results[0].values.map((row: string[]) => {
        const data = Object.fromEntries(row.map((val, i) => [columns[i], val]));

		// Parse JSON string array
		data["tags"] = JSON.parse(data["tags"])

		return data
    });

	return { records };
};