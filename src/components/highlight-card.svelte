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
    @use "$styling/_variables.scss" as *;

    article {
        @extend %acent-card;

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