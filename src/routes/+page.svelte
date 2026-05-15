<script lang="ts">
    import type { PageProps } from "./$types";

    import ProjectCard from "../components/project-cards/featured.svelte";
    import Typewritertext from "../components/typewritertext.svelte";
    import HighlightCard from "../components/highlight-card.svelte";
    import Hero from "../components/layout/hero.svelte";

    import ContactSection from "../sections/contact.svelte"
    
    import { get_project_avalibility } from "$lib";

    let { data }: PageProps = $props();
</script>

{#snippet avalibilityNotice()}
    {#if get_project_avalibility()}
        <div class="hero-availability-tag">Available for projects</div>
    {/if}
{/snippet}

<Hero title="whoami" flavorText="Sleep && Eat && Game && Code" notice={avalibilityNotice}>
    <div class="hero-attributes">
        <Typewritertext lines={[
            "Software Developer",
            "Programmer",
            "Gamer",
            "Coder"
        ]}/>
    </div>

    <p class="hero-description">
        Passionate about creating digital software with expertise in <span>web development</span>, <span>back-end systems</span>, and <span>application development</span>.
    </p>
</Hero>

<main id="main">

    <section id="about">
        <h2>About Me</h2>
        <p>
            Hi there, my name is Reece.
            I am a software developer with a deep passion to create and use all forms of technology,
            from hardware, back-end, front-end, mechanics, cybersecurity and so much more.
        </p>

        <div class="highlights">
            {#each [
                {"icon": "users", "title": "Collaboration Award", "content": "College Values Award for Collaboration & Innovation 2024."},
                {"icon": "code", "title": "19,000+ Lines of code", "content": "Contributed across Python, JavaScript, Java, HTML & CSS projects."},
                {"icon": "award", "title": "Student of the Year", "content": "Recognised as Student of the Year 2024 for excellence."},
            ] as {icon, title, content}}
                <HighlightCard icon={icon as any} {title}>{content}</HighlightCard>
            {/each}
        </div>
    </section>

    <div class="section-shape-wrapper">
        <section id="knowlege">
            <header>
                <h2>Skills & Tools</h2>
                <p>Can you tell I love to experement</p>
            </header>

            <div>
                <!-- TODO -->
            </div>
        </section>
    </div>

    <section id="featured-projects">
        <header>
            <h2>Featured Projects</h2>
            <p>Here are some of my favorite projects</p>
        </header>

        <div>
            {#each data["featuredProjects"] as details}
                <ProjectCard
                    data={details}
                    theme={details["theme"]}
                    caption={details["caption"]}
                />
            {/each}
        </div>
    </section>

    <div class="section-shape-wrapper">
        <ContactSection/>
    </div>
</main>

<style lang="scss">
    @use "$styling/_variables.scss" as *;

    main{
        flex-direction: column;
        text-align: center;
        display: flex;
        gap: 50px;
        
        // Disable global styling
        max-width: none !important;
        padding: 0 !important;

        & > div.section-shape-wrapper{
            $background-colour: #1B1B1B;

            background-color: $background-colour;
            position: relative;
            padding: 20px 0;
            margin: 70px 0;

            &::before, &::after{
                background-color: $background-colour;
                position: absolute;
                height: 50px;
                width: 100%;
                content: "";
                left: 0;
            }

            &::before{
                clip-path: polygon(0 0, 100% 100%, 0 100%);
                bottom: 100%;
            }

            &::after{
                clip-path: polygon(0 0, 100% 0, 100% 100%);
                top: 100%;
            }
        }

        & > :global(section), & > div.section-shape-wrapper > :global(section){
            @include center_content();

            scroll-margin-top: calc(var(--nav-height) + 20px);
            gap: 20px;

            &, & > :global(header){
                flex-direction: column;
                align-items: center;
                display: flex;
            }

            & > :global(header){
                gap: 15px;
            }

            & :global(p){
                font-size: 1.3rem;
            }
        }

        section{
            width: 100%;
        }
    }

    /* Additional Hero Styling */
    .hero-description{
        font-size: clamp(0.9rem,3vw,1.3rem);
        color: var(--secondary-text-colour);
        margin-top: 30px;
    }

    .hero-availability-tag{
        @include coloured-tag(var(--primary-colour));
    }

    section#featured-projects > div{
        flex-direction: column;
        padding-top: 40px;
        display: flex;
        width: 100%;
        gap: 40px;
    }

    section#about{
        & > p{
            width: 80%;
        }

        & > .highlights{
            justify-content: center;
            align-items: stretch;
            margin-top: 40px;
            flex-wrap: wrap;
            display: flex;
            gap: 2rem;

            & > :global(article){
                max-width: 350px;
                flex-grow: 1;
            }
        }
    }
</style>
