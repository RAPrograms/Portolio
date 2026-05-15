import { Frameworks, Langauages, ProjectTypes, Stack, Technologies, Tools } from '../src/lib/enums';

import { readFile } from 'node:fs/promises';
import { Database } from "bun:sqlite";


const db = new Database('./db/data.db', { strict: true });

const insert = db.prepare(
    `INSERT INTO projects (title, description, type, image_uri, repository_url, demo_url, tags)
    VALUES (:title, :description, :type, :image_uri, :repository_url, :demo_url, :tags)`
);

const insertRepos = db.transaction(repos => {
    for (const repo of repos){
        const record: Record<string, any> = {
            "title": repo["name"],
            "description": repo["name"],
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
        
        console.log(record)
        insert.run(record);
    }

    return repos.length
});

const json = await readFile('./db/repos.json', 'utf8').then((raw: string) => JSON.parse(raw));

insertRepos(json);