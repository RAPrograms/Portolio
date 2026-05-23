<script lang="ts">
    import type { Snippet } from "svelte";

    import InfoIcon from "$icons/info.svg?raw"

    const { children, icon = false }:{ children: Snippet, icon: boolean } = $props()
</script>

<noscript>
    {#if icon}{@html InfoIcon}{/if}
    {@render children()}
</noscript>

<style lang="scss">
    @use "$styling/_variables.scss" as variables;

    noscript{
        @include variables.tag(red);

        width: min(100%, max-content);
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 5px;
        max-width: 95vw;
        flex-wrap: wrap;
        display: flex;
        margin: auto;
        gap: 10px;
    }
</style>