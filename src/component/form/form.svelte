<script lang="ts">
    import type { Snippet } from "svelte";

    const { children } : { children: Snippet } = $props()

    function submit(e){
        e.preventDefault()

        console.log(e.target)
    }
</script>

<form onsubmit={submit}>
    {@render children()}

    <button type="submit">Submit</button>
</form>

<style lang="scss">
    @use "$styling/_variables.scss" as *;

    form{
        @include glass-card();

        display: flex;
        flex-direction: column;
        gap: 10px;

        & > button[type=submit]{
            @include coloured-tag(rgb(0, 200, 0));

            margin-top: 10px;
        }
    }
</style>