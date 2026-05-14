<script lang="ts">
    import type { PageProps } from "../$types";

    import ProjectCard from "../../components/project-cards/basic.svelte";
    import Hero from "../../components/layout/hero.svelte";

    import GithubIcon from "$icons/github.svg?raw"
    import EyeIcon from "$icons/eye.svg?raw"

    let { data }: PageProps = $props();
</script>

<!-- Reduces page size by using svg clones -->
<svg style="display: none;">
    {#each [GithubIcon, EyeIcon] as raw}
        {@html raw.replaceAll("svg", "symbol")}
    {/each}
</svg>

<Hero title="Skills & Tech" flavorText="Think && Design && Create && Repeat" backURL="/">
    <p>You can never have enough technology</p>
</Hero>

<main id="main">
    {#each (data as {records: Project[]})["records"] as projectData}
        <ProjectCard data={projectData}/>
    {/each}
</main>

<style lang="scss">
    main{
        grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
        display: grid;
        gap: 20px;  
    }
</style>