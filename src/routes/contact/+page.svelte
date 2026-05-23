<script lang="ts">
    import ContactMethods from "../../components/contact-methods.svelte"
    import Hero from "../../components/layout/hero.svelte"
</script>

<svelte:head>
    <title>Contact | RAPrograms</title>
</svelte:head>

<Hero title="Contact Me" flavorText="Idea && Talk && Create && Repeat" backURL="/">
    <p>Lets us create magic together!</p>
</Hero>

<main id="main">
    <ContactMethods/>
</main>

<style lang="scss">
    main{
        justify-content: center;
        display: flex;
        padding: 20px 0;
        width: 100%;
    }
</style>