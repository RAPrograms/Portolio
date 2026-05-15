import type { PageServerLoad } from './$types';

import db from "../lib/db.server"

export const prerender = true;

// This will bake the project records into the page
export const load: PageServerLoad = async ({ params }) => {
    return {
        featuredProjects: db.prepare(`
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
    };
};