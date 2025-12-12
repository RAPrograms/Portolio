<script lang="ts">
    import type { HTMLInputTypeAttribute } from "svelte/elements";

    const {
        title,
        name,
        type = "text",
        kind = "input",
        required = true
    } : {
        title: string
        name: string,
        type: HTMLInputTypeAttribute,
        kind: "input"
        required: boolean
    } = $props()
</script>

<label>
    <div>{title}</div>
    {#if kind == "input"}
        <input {type} {required} name={name}>
    {:else if kind == "textarea"}
        <textarea name="{name}"></textarea>
    {/if}
</label>

<style lang="scss">
    @use "$styling/_variables.scss" as *;

    label{
        @include glass-card(
            20px,
            0px,
            var(--glow-colour, rgba(255, 255, 255, 0.961)),
            var(--glow-size, 10%),
        );

        &:has(:is(input, textarea):is(:focus, :focus-within, :active)){
            --glow-colour:  var(--primary-colour);
            --glow-size: 200%;
        }
    
        flex-direction: column;
        text-align: left;
        display: flex;

        & > :first-child{
            padding: 10px 0 0 15px;
            font-size: .9rem;
            opacity: .75;
        }

        & > input, & > textarea{
            padding: 5px 15px 10px 15px;
            outline: transparent;
            font-size: 1.2rem;
            background: none;
            border: none;
        }
        
        & > textarea{
            resize: vertical;
        }
    }
</style>