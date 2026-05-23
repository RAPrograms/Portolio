import type { PageServerLoad } from './$types';

import tech from "../../../data/technologies.json"

export const prerender = true;

// This will bake the project records into the page
export const load: PageServerLoad = async ({ params }) => {
    const uniqueCategories = new Map()

    for(const [name, details] of Object.entries(tech)){
        if(!Array.isArray(details["categories"]))
            details["categories"] = [details["categories"]]

        for(const category of details["categories"]){
            uniqueCategories.set(category.toLowerCase(), category)
        }
    }

    return {
        technologies: tech,
        categories: uniqueCategories
    };
};