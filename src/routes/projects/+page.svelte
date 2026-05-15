<script lang="ts">
    import type { PageProps } from "../$types";

    import javascriptAvalible from "../../lib/availability"
    import { ProjectTypes } from "../../lib/enums";

    import ProjectCard from "../../components/project-cards/basic.svelte";
    import Hero from "../../components/layout/hero.svelte";

    import GithubIcon from "$icons/github.svg?raw"
    import EyeIcon from "$icons/eye.svg?raw"
    import SearchIcon from "$icons/search.svg?raw"

    let { data }: PageProps = $props();

    let type_filter = $state("")
    let query_filter = $state("")

    let [matches, exclusions] = $derived.by(() => {
        // @ts-ignore
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

<!-- Reduces page size by using svg clones -->
<svg style="display: none;">
    {#each [GithubIcon, EyeIcon] as raw}
        {@html raw.replaceAll("svg", "symbol")}
    {/each}
</svg>

<Hero title="Skills & Tech" flavorText="Think && Design && Create && Repeat" backURL="/">
    <p>You can never have enough technology</p>
</Hero>

{#if javascriptAvalible}
    <header>
        <label>
            {@html SearchIcon}
            <input type="search" bind:value={query_filter}>
        </label>

        <select name="project-type" bind:value={type_filter}>
            <option value="" selected>All Projects</option>

            {#each Object.entries(ProjectTypes) as [key, value]}
                <option value={key}>{value}</option>
            {/each}
        </select>
    </header>
{/if}

<main id="main">
    {#each matches as projectData}
        <ProjectCard data={projectData} ghosted={false}/>
    {/each}
    {#each exclusions as projectData}
        <ProjectCard data={projectData} ghosted={true}/>
    {/each}
</main>

<style lang="scss">
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
            display: flex;
            align-items: center;
            padding-left: 10px;
            width: 30%;
            gap: 5px;

            input{
                height: 100%;
                flex-grow: 1;
                border: none;
                outline: none;
                background: none;
            }
        }
    }

    main{
        grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
        display: grid;
        gap: 20px;  
    }
</style>