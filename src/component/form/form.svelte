<script lang="ts">
    import type { Snippet } from "svelte";

    import { PUBLIC_BOTPOISON_Key } from '$env/static/public';

    const { children, url } : { children: Snippet, url: string } = $props()
</script>

<svelte:head>
    <script src="https://unpkg.com/@botpoison/browser" async></script>
</svelte:head>

<form
    method="POST"
    action={url}
    data-botpoison-public-key={PUBLIC_BOTPOISON_Key}
>
    {@render children()}

    <!-- Honey Pot -->
    <label>
        <div>Don't fill this field out</div>
        <input type="text" name="additional_infomation" tabindex="-1" autocomplete="off">
    </label>

    <button type="submit">Submit</button>
</form>

<style lang="scss">
    @use "$styling/_variables.scss" as *;

    form{
        @include glass-card(15px);

        display: flex;
        flex-direction: column;
        gap: 20px;

        & > label{
            overflow: hidden;
            height: 0px
        }

        & > button[type=submit]{
            @include coloured-tag(var(--colour));

            --colour: rgb(0, 200, 0);

            transition: all ease-out 450ms;
            margin-top: 10px;

            &:hover{
                --colour: rgb(0, 116, 0);

                transition: all ease-in 250ms;
            }
        }
    }
</style>