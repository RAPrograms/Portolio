import type { PageServerLoad } from './$types';

import featuredProjects from "../../data/featured_projects.json"
import projects from "../../data/projects.json"
import tech from "../../data/technologies.json"

export const prerender = true;

// This will bake the project records into the page
export const load: PageServerLoad = async ({ params }) => {
    const technologies = Object.entries(tech).map(([name, details]) => {
        return {
            "name": name,
            "icon": details["icon"] || name.toLowerCase().replace(" ", "-")
        }
    })

    const featured = featuredProjects.map(details => {
        // @ts-ignore
        details["project"] = projects[details["id"]]

        return details
    })

    return {
        featuredProjects: featured,
        technologies
    };
};