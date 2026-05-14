<script lang="ts">
    import type { PageProps } from "../$types";

    import ProjectCard from "../../components/project-cards/basic.svelte";
    import Hero from "../../components/layout/hero.svelte";

    let { data }: PageProps = $props();
</script>

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