<script>
    import Hero from "../component/hero.svelte";

</script>

<Hero flavor_text="Sleep && Eat && Game && Code">
    Passionate about creating digital software with expertise in <span>web development</span>, <span>back-end systems</span>, and <span>application development</span>.
</Hero>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<style lang="scss">
    p{
        color: blue;

        & > a{
            color: red;
        }
    }
</style>