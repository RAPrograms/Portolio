import type { PageServerLoad } from './$types';

import tech from "../../../data/technologies.json"

export const prerender = true;

// This will bake the technology records into the page
export const load: PageServerLoad = async ({ params }) => {
    const uniqueCategories = new Map()
    const technologies: Record<string, Record<string, any>> = {}

    for(const [name, details] of Object.entries(tech)){
        technologies[name] = {
            // @ts-ignore
            "icon": details["icon"],
            "level": details["level"],
            "categories": []
        }

        // Checks if the catgory is a string (single catgory)
        const isSingleCategory = !Array.isArray(details["categories"])

        // Loop though all categories
        for(const category of (isSingleCategory? [details["categories"]] : details["categories"]) as string[]){
            const key = category.toLowerCase()
            
            if(!uniqueCategories.has(key))
                uniqueCategories.set(key, category)

            technologies[name]["categories"].push(key)
        }
    }

    return {
        technologies,
        categories: uniqueCategories
    };
};