import type { PageServerLoad } from './$types';

import projects from "../../../data/projects.json"

export const prerender = true;

// This will bake the project records into the page
export const load: PageServerLoad = async ({ params }) => {
	return {
		records: Object.values(projects)
	};
};