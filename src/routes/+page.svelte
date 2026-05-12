<script lang="ts">
    import HighlightCard from "../component/highlight-card.svelte";
    import Hero from "../component/hero.svelte";

    import ContactSection from "$sections/contact.svelte"
    
    import { get_project_avalibility } from "$lib";
</script>

<Hero flavor_text="Sleep && Eat && Game && Code" cycling_text={[
        "Software Developer",
        "Programmer",
        "Gamer",
        "Coder"
    ]}
    availability_notice={get_project_avalibility()}
    return_btn={false}>
    Passionate about creating digital software with expertise in <span>web development</span>, <span>back-end systems</span>, and <span>application development</span>.
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
            <HighlightCard icon="users" title="Collaboration Award">
                College Values Award for Collaboration & Innovation 2024.
            </HighlightCard>
            <HighlightCard icon="code" title="19,000+ Lines of code">
                Contributed across Python, JavaScript, Java, HTML & CSS projects.
            </HighlightCard>
            <HighlightCard icon="code" title="Student of the Year">
                Recognised as Student of the Year 2024 for excellence.
            </HighlightCard>
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
