<script lang="ts">
    import { onMount } from "svelte";
    import Hero from "../../components/layout/hero.svelte";

    const levels = Object.freeze({
        "master": "Has total command of the skill, invents new ways of working, and guides others.",
        "expert": "A highly skilled specialist who is called on to solve the toughest problems.",
        "proficient": "Has a deeper understanding and easily adapts when a situation gets complicated.",
        "competent": "Fully independent, manages daily work well, and fixes their own mistakes.",
        "advanced beginner": "Can handle simple, routine tasks smoothly on their own.",
        "novice": "A beginner who is focused on learning the basic rules and steps.",
    } as const)

    interface Technology {
        categories: string[],
        level: keyof typeof levels,
        icon?: string
    }

    let { data }: {
        data: {
            technologies: Record<string, Technology>,
            categories: Map<string, string>
        }
    } = $props();

    let jsEnabled = $state(false)

    onMount(() => {
        jsEnabled = true
    })
</script>


<Hero title="Technologies" flavorText="Find && Research && Impliment && Repeat" backURL="/">
    <p>You can never have enough technology</p>
</Hero>

<main id="id">
    <header>
        <label>
            <input type="radio" name="category" value="" checked>
            <div class="name">All</div>
        </label>

        {#each data["categories"] as [key, category]}
            <label>
                <input type="radio" name="category" value="{key}">
                <div class="name">{category}</div>
            </label>
        {/each}
    </header>

    <section class="entries">
        {#each Object.entries(data["technologies"]) as [name, details]}
            {@const categoryFilters = details["categories"].map(c => `filter-${c.toLowerCase().replace(" ", "-")}`).join(" ")}
        
            <svelte:element
                this={(jsEnabled)? "a" : "article"}
                href="/projects?tech={name.toLowerCase()}"
                class="technology {categoryFilters}"
            >

                <img src="/tag-icons/{details["icon"] || name.toLowerCase().replace(" ", "-")}.svg" width="50" aria-hidden="true" alt="{name} logo">
                <div class="name">{name}</div>
                <div
                    class="level"
                    title={levels[details["level"]?.toLowerCase()]}
                    data-level={details["level"]?.toLowerCase()}>
                    {details["level"]}
                </div>
            </svelte:element>
        {/each}
    </section>
</main>

<style lang="scss">
    @use "$styling/_variables.scss" as variables;

    main#id{
        max-width: min(var(--max-content-width), 80vw);
        flex-direction: column;
        align-items: center;
        display: flex;
        width: 100%;
        gap: 20px;
    }

    header{
        justify-content: center;
        flex-wrap: wrap;
        display: flex;
        gap: 10px;

        input[type=radio]{
            display: none;
        }

        label{
            @include variables.tag(var(--colour, grey));

            text-align: center;
            min-width: 50px;
            cursor: pointer;

            &:has(input[type=radio]:checked){
                --colour: red;
            }
        }
    }

    .entries{
        grid-template-columns: repeat(auto-fit, 290px);
        justify-content: center;
        display: grid;
        width: 100%;
        gap: 20px;  

        .technology{
            background-color: rgba(242, 242, 242, .0471);
            outline: 1px solid rgba(117, 117, 117, .45);
            border-radius: 20px;
            max-width: 290px;
            padding: 10px;
            width: 100%;
            gap: 20px;

            grid-template-columns: max-content 1fr; 
            grid-template-rows: 1fr 1fr; 
            grid-auto-columns: 1fr; 
            align-items: center;
            gap: 7px 15px; 
            display: grid; 
            grid-template-areas: 
                "Logo Name"
                "Logo Level"; 

            img{
                grid-area: Logo;
                aspect-ratio: 1/1;
            }

            .name{
                font-size: large;
                grid-area: Name;
                color: white;
            }

            .level{
                @include variables.tag(var(--colour));

                text-transform: capitalize;
                width: max-content;
                font-style: italic;
                padding: 5px 10px;
                font-size: small;


                &[data-level=master]{ --colour: #FBBF24; }
                &[data-level=expert]{ --colour: #A78BFA; }
                &[data-level=proficient]{ --colour: #34D399; }
                &[data-level=competent]{ --colour: #38BDF8; }
                &[data-level="advanced beginner"]{ --colour: #2DD4BF; }
                &[data-level=novice]{ --colour: #94A3B8; }
            }
        }
    }
</style>