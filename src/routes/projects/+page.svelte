<script lang="ts">
    import { ProjectTypes } from "../../lib/enums";
    import { browser } from "$app/environment";

    import ProjectCard from "../../components/project-cards/basic.svelte";
    import Hero from "../../components/layout/hero.svelte";

    import GithubIcon from "$icons/github.svg?raw"
    import SearchIcon from "$icons/search.svg?raw"
    import EyeIcon from "$icons/eye.svg?raw"
    import NoscriptWarning from "../../components/noscript-warning.svelte";

    let { data }:{ data: { records: Array<Project>, validIcons: Set<string> } } = $props();

    const url_filter = (() => {
        if(!browser)
            return

        const perams = new URLSearchParams(window.location.search)

        const value = perams.get("tech")
        if(value == undefined || value == "")
            return

        const newProjects = []
            for(const project of data["records"]){
                if(!project["languages"].includes(value) && !project["tags"].includes(value))
                continue
            
            newProjects.push(project)
        }
    
        // Permently filter the projects
        data["records"] = newProjects
    
        return value
    })()
    

    let type_filter = $state("")
    let query_filter = $state("")

    let [matches, exclusions] = $derived.by(() => {
		let records: Project[] = data["records"]

        const queryReg = new RegExp(query_filter, "i")

        let pass: Project[] = []
        let fail: Project[] = []


        for(const project of records){
            // Filters based on type
            if(type_filter != "" && !project["type"].includes(type_filter)){
                fail.push(project)
                continue
            }

            // Filters based on search query
            if(query_filter != "" && project["title"].match(queryReg) == null){
                fail.push(project)
                continue
            }

            pass.push(project)
        }

        return [pass, fail]
	});
</script>

<svelte:head>
    <title>Projects | RAPrograms</title>
</svelte:head>

<!-- Reduces page size by using svg clones -->
<svg style="display: none;">
    {#each [GithubIcon, EyeIcon] as raw}
        {@html raw.replaceAll("svg", "symbol")}
    {/each}
</svg>

<Hero title="Projects" flavorText="Think && Design && Create && Repeat" backURL="/">
    <p>I may or may not have a project creation problem XD</p>
</Hero>

<main id="main">
    <NoscriptWarning icon={true}>This page requires JavaScript enabled to filter projects</NoscriptWarning>

    <header class="require-javascript">
        <label>
            {@html SearchIcon}
            <input type="search" placeholder="Search" bind:value={query_filter}>
        </label>

        <select name="project-type" bind:value={type_filter}>
            <option value="" selected>All Projects</option>

            {#each Object.entries(ProjectTypes) as [key, value]}
                <option value={key}>{value}</option>
            {/each}
        </select>
    </header>

    {#if url_filter}
        <h2 class="technology-filter-title">{url_filter} Projects</h2>
    {/if}

    <section class="projects">
        {#if data["records"].length <= 0}
            <p class="massage">No projects avalible</p>
        {/if}

        {#each matches as projectData}
            <ProjectCard validIcons={data["validIcons"]} data={projectData} ghosted={false}/>
        {/each}
        {#each exclusions as projectData}
            <ProjectCard validIcons={data["validIcons"]} data={projectData} ghosted={true}/>
        {/each}
    </section>
</main>

<style lang="scss">
    :global(noscript){
        margin-bottom: 20px !important;
    }

    main{
        min-height: calc(100vh - var(--nav-height));
        flex-direction: column;
        display: flex;
        width: 100%;
    }

    h2.technology-filter-title{
        text-transform: capitalize;
        text-align: center;
        margin-bottom: 20px;
    }

    header{
        border-bottom: 1px solid var(--secondary-border-colour);
        max-width: var(--max-content-width);
        justify-content: space-between;
        margin: 100px auto 20px auto;
        padding-bottom: 20px;
        display: flex;
        width: 95%;

        & > label, 
        & > select{
            border: 1px solid var(--primary-border-colour);
            background-color: rgba(117, 117, 117, 0.42);
            border-radius: 15px;
            height: 40px;
        }

        & > select,
        & > label input{
            padding: 10px;
        }

        & > select:focus,
        & > label:has(input:focus){
            border-color: var(--primary-colour);
        }

        & > label{
            align-items: center;
            padding-left: 10px;
            display: flex;
            width: 30%;
            gap: 5px;

            input{
                background: none;
                outline: none;
                height: 100%;
                flex-grow: 1;
                border: none;
            }
        }
    }

    .projects{
        display: grid;
        gap: 20px;  
        
        &:not(:has(.massage:only-child)){
            grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
        }

        &:has(.massage:only-child){
            justify-content: center;
            align-items: center;
            flex-grow: 1;
        }

        .massage{
            font-size: clamp(10px, 5vw, 2rem);
            width: max-content;
        }

        // Defines width of cards (for 2 or less) to prevent layout shifts
        & > :global(article:only-child),
        &:has(:global(article:nth-child(2):last-child)) > :global(article) {
            width: 460px;
        }
      
        & > :global(article){
            margin: auto;
            height: 100%;
            width: 100%;
            max-width: 98vw;
        }
    }
</style>