<script>
    import Hero from "../component/hero.svelte";
    import HighlightCard from "../component/highlight-card.svelte";

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

    <section>
        <h2>About Me</h2>
        <p>
            Hi there, my name is Reece.
            I am a software developer with a deep passion to create and use all forms of technology,
            from hardware, back-end, front-end, mechanics, cybersecurity and so much more.
        </p>

        <HighlightCard icon="code" title="19,000+ Lines of code">
            Contributed across Python, JavaScript, Java, HTML & CSS projects.
        </HighlightCard>
    </section>

</main>

<style lang="scss">
    @use "$styling/_variables.scss" as *;

    section{
        @include center_content();

        flex-direction: column;
        text-align: center;
        align-items: center;
        display: flex;
        gap: 20px;

        & > p{
            width: 70%;
        }
    }
</style>