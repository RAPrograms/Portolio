<script lang="ts">
    import type { Snippet } from "svelte";

    const { children }:{ children: Snippet } = $props()
</script>

<section class="infinate-scroll">
    <div class="wrapper">
        {@render children()}
        
        {@render children()}
    </div>
</section>

<style lang="scss">
    /* ---- Source: https://developershaurya.com/how-to-create-a-beautiful-horizontal-infinite-scroll-animation-with-pure-css/ ---- */
    section {
        position: relative;
        overflow: hidden;
        width: 80%;

        /* Gradient mask for fading edges */
        mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);

        &:hover > div {
            animation-play-state: paused;
        }

        & > div {
            /* Fit content ensures the container spans the true width of all items + gaps */
            width: max-content; 
            display: flex;
            gap: 30px;
            /* Padding-right equals the gap size so the loop doesn't snap/jerk */
            padding-right: 30px; 
            animation: scroll 60s linear infinite;
        }
    }

    @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
</style>