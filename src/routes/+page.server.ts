import type { PageServerLoad } from './$types';

import db from "../lib/db.server"

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

    const featuredProjects = db.prepare(`
        SELECT 
            p.id, 
            p.title, 
            p.description, 
            p.type, 
            p.image_uri, 
            p.repository_url, 
            p.demo_url, 
            p.tags,
            f.caption,
            f.theme
        FROM featured_projects f
        INNER JOIN projects p ON p.id = f.project_id;
    `)
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

        return record
    })

    return {
        featuredProjects,
        technologies
    };
};