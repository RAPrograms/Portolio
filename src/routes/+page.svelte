<script>
    import Hero from "../component/hero.svelte";

</script>

<Hero/>

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