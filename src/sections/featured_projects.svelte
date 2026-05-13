<script lang="ts">
    import type { ProjectType, Stack } from "../lib/enums";

    import ProjectCard from "../components/featured-project-card.svelte";

    import projects from "../featured_projects.json"
</script>

<section id="featured-projects">
    <header>
        <h2>Featured Projects</h2>
        <p>Here are some of my favorite projects</p>
    </header>

    <br>

    <div>
        {#each projects as project}
            <ProjectCard
                title={project["title"]}
                caption={project["caption"]}
                repo_url={project["repo_url"]}
                demo_url={project["demo_url"]}
                preview_size={project["preview_size"] as "desktop" || "mobile"}
                preview_img={project["preview_img"]}
                tags={project["tags"] as Array<Stack | ProjectType>}
            >{project["description"]}</ProjectCard>
        {/each}
    </div>
</section>