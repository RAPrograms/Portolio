<script lang="ts">
    import type { Themes as PreviewThemes } from "../components/featured-project-card.svelte";
    import type { ProjectType, Stack } from "../lib/enums";

    import ProjectCard from "../components/featured-project-card.svelte";

    import projects from "../featured_projects.json"
</script>

<section id="featured-projects">
    <header>
        <h2>Featured Projects</h2>
        <p>Here are some of my favorite projects</p>
    </header>

    <div>
        {#each projects as project}
            <ProjectCard
                title={project["title"]}
                caption={project["caption"]}
                repo_url={project["repo_url"]}
                demo_url={project["demo_url"]}
                preview_size={project["preview_size"] as "desktop" || "mobile"}
                preview_img={project["preview_img"]}
                preview_theme={project["preview_theme"] as PreviewThemes}
                tags={project["tags"] as Array<Stack | ProjectType>}
            >{project["description"]}</ProjectCard>
        {/each}
    </div>
</section>

<style lang="scss">
    section > div{
        flex-direction: column;
        display: flex;
        gap: 20px;
    }
</style>