<script>
    import HighlightCard from "../component/highlight-card.svelte";
    import Hero from "../component/hero.svelte";
</script>

<Hero flavor_text="Sleep && Eat && Game && Code" cycling_text={[
    "Software Developer",
    "Programmer",
    "Gamer",
    "Coder"
]}>
    Passionate about creating digital software with expertise in <span>web development</span>, <span>back-end systems</span>, and <span>application development</span>.
</Hero>

<main id="main">

    <section class="about">
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

    <section class="technology">
        <header>
            <h2>Skills & Tools</h2>
            <p>Can you tell that I love to experiment?</p>
        </header>
    </section>

</main>

<style lang="scss">
    @use "$styling/_variables.scss" as *;

    main{
        flex-direction: column;
        display: flex;
        gap: 50px;

        & > section{
            padding: 20px;
        }
    }



    section.about{
        @include center_content();

        flex-direction: column;
        align-items: center;
        text-align: center;
        display: flex;
        gap: 20px;

        & > p{
            font-size: 1.3rem;
            width: 80%;
        }

        & > .highlights{
            justify-content: center;
            align-items: center;
            margin-top: 40px;
            flex-wrap: wrap;
            display: flex;
            gap: 2rem;

            & > :global(article){
                max-width: 350px;
                height: 100%;
                flex-grow: 1;
            }
        }
    }

    section.technology{
        background-color: #1B1B1B;
        position: relative;
        margin: 70px 0;
        height: 500px;

        &::before, &::after{
            background-color: #1B1B1B;
            content: "";
            left: 0;
            width: 100%;
            position: absolute;
            height: 50px;
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
</style>