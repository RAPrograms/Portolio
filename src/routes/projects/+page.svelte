<script lang="ts">
    import ProjectCard from "../../components/project-cards/basic.svelte";
    import Hero from "../../components/hero.svelte";

</script>

<Hero title="Skills & Tech" flavorText="Think && Design && Create && Repeat" backURL="/">
    <p>You can never have enough technology</p>
</Hero>

<main id="main">
    <ProjectCard/>
    <ProjectCard/>
    <ProjectCard/>
    <ProjectCard/>
    <ProjectCard/>
</main>

<style lang="scss">
    main{
        grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
        display: grid;
        gap: 20px;  

        & > :global(article){
            max-width: none;
            width: 100%;
        }
    }
</style>