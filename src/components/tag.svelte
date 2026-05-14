<script lang="ts">
    // Used to identify if any icon overrides are present
    // EG: Sveltekit [svelte] = Name: Sveltekit & Icon: svelte
    const regex = /\s\[.*\]/

    const {
        value,
        size = "normal",
        isProjectsLink
    }:{
        value: string,
        size: "normal" | "small"
        isProjectsLink: boolean
    } = $props()

    const [name, icon] = (() => {
        const matches = value.match(regex)
        if(matches == null)
            return [value, value.toLowerCase().replace(" ", "_")]

        const name = value.replace(regex, "")
        const icon = matches[0].slice(2, -1)

        return [name, icon]
    })()
</script>

<svelte:element
    class="tag"
    this={isProjectsLink? "a":"div"}
    href={isProjectsLink? `/projects?tech=${name}#main`:undefined}
>
    {#if icon != ""}
        <img src="/tag-icons/{icon}.svg" height="15" aria-hidden="true" alt="">
    {/if}
    {name}
</svelte:element>

<style lang="scss">
    .tag{
        outline: 1px solid rgba(117, 117, 117, .45);
        background: rgba(242, 242, 242, .0471);
        transition: background-color 200ms ease;
        align-items: center;
        border-radius: 25px;
        height: max-content;
        width: max-content;
        color: white;
        padding: 10px;
        display: flex;
        gap: 10px;

        &:is(:active, :focus, :hover){
            background-color: rgba(255, 255, 255, 0.345);
        }
    }
</style>