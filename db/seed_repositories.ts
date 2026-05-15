import { Frameworks, Langauages, ProjectTypes, Stack, Technologies, Tools } from '../src/lib/enums';

import { readFile } from 'node:fs/promises';
import { Database } from "bun:sqlite";
import { TOML } from "bun";

const db = new Database('./db/data.db', { strict: true });

async function seedProjects(){
    const insert = db.prepare(
        `INSERT INTO projects (title, description, type, image_uri, repository_url, demo_url, tags)
        VALUES (:title, :description, :type, :image_uri, :repository_url, :demo_url, :tags)`
    );

    const insertRepos = db.transaction(repos => {
        for (const repo of repos){
            // Hide repos that are not finished
            // Indicated by a lack of a description
            if(repo["description"] == "")
                continue

            // Prevent processing github main repo
            if(import.meta.env.GITHUB_USERNAME.toLowerCase() == repo["name"].toLowerCase())
                continue
            
            const record: Record<string, any> = {
                "title": repo["name"],
                "description": repo["description"],
                "repository_url": (repo["url"] != "")? repo["url"]:null,
                "demo_url": repo["homepageUrl"] ?? null,
                "image_uri": null //TODO: add images
            }

            const projectType: Array<typeof ProjectTypes> = []
            const projectTags: Array<Stack> = []

            for(const {name: tag} of repo["repositoryTopics"] || []){
                // Check for project type tags
                // @ts-ignore
                if(ProjectTypes[tag]){
                    projectType.push(tag)
                    continue
                }

                // Check if the tag is supported
                for(const group of [Langauages, Technologies, Frameworks, Tools]){
                    // @ts-ignore
                    if(group[tag]){
                        projectTags.push(tag)
                        break
                    }
                }
            }

            record["type"] = JSON.stringify(projectType)
            record["tags"] = JSON.stringify(projectTags)
            
            insert.run(record);
        }

        return repos.length
    });

    const json = await readFile('./db/repos.json', 'utf8').then((raw: string) => JSON.parse(raw));

    insertRepos(json);
}

function seedFeaturedProjects(){
    const raw = import.meta?.env?.FEATURED_PROJECTS || ""
    const data = TOML.parse(raw);

    const insert = db.prepare(
        `INSERT INTO featured_projects (project_id, caption, theme)
        VALUES (:project_id, :caption, :theme)`
    );

    const insertRecords = db.transaction((data) => {
        for(const [repo_name, details] of Object.entries(data)){
            const id = db.query(
                `SELECT id FROM projects
                WHERE title = ?
                LIMIT 1`
            ).get(repo_name)["id"]

            insert.run({
                project_id: id,
                caption: details["caption"],
                theme: details["theme"]
            })
        }
    })

    insertRecords(data)
}

await seedProjects()
seedFeaturedProjects()