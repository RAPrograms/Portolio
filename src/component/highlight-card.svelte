<script lang="ts">
    import CodeIcon from "$icons/code.svg?raw"
    import UsersIcon from "$icons/users.svg?raw"
    import AwardIcon from "$icons/award.svg?raw"

    import type { Snippet } from "svelte";

    type icons = "code" | "users" | "award"

    const icon_map: Record<icons, any> = {
        "code": CodeIcon,
        "users": UsersIcon,
        "award": AwardIcon
    }

    const {
        children,
        icon,
        title
    } : {
        children: Snippet,
        icon: icons,
        title: string
    } = $props()
</script>

<article>
    <div>{@html icon_map[icon]}</div>
    <h3>{title}</h3>
    {@render children()}
</article>

<style lang="scss">
    article {
        background: linear-gradient(-210deg, color-mix(in hsl shorter hue, var(--primary-colour) 60%, transparent), #242931 30%);
        color: var(--secondary-text-colour);
        flex-direction: column;
        border-radius: 12px;
        position: relative;
        isolation: isolate;
        text-align: left;
        display: flex;
        padding: 30px;
        gap: 15px;

        &::after{
            background-color: #242931;
            height: calc(100% - 4px);
            width: calc(100% - 4px);
            border-radius: inherit;
            position: absolute;
            z-index: -1;
            content: "";
            left: 2px;
            top: 2px;
        }

        & >  div{
            background-color: color-mix(in hsl shorter hue, var(--primary-colour) 20%, transparent);
            color: var(--primary-colour);
            border-radius: 10px;
            width: max-content;
            padding: 10px;

            & > :global(svg){
                color: var(--primary-colour);
            }
        }
        
        & > h3{
            color: var(--primary-text-colour)
        }
    }
</style>