<script lang="ts">
    import RightArrowIcon from "$icons/right-line-arrow.svg?raw"
</script>

<a href="">
    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
    <div class="icon">{@html RightArrowIcon}</div>
    <img data-preview-type=desktop src="/featured_projects/one.png" alt="">
</a>

<style lang="scss">
    a{
        background: linear-gradient(188deg,rgba(8, 57, 38, 1) 30%, rgba(5, 150, 105, 1) 68%, rgba(52, 211, 153, 1) 90%, rgba(249, 215, 147, 1) 100%);
        grid-template-columns: 1fr min-content; 
        grid-template-rows: max-content 1fr; 
        container-type: inline-size;
        box-sizing: border-box;
        grid-auto-columns: 1fr; 
        aspect-ratio: 16 / 10;
        border-radius: 25px;
        position: relative;
        overflow: hidden;
        padding: 20px;
        display: grid; 
        gap: 20px 5px; 
        grid-template-areas: 
            "Caption Icon"
            "Preview Preview"; 


        // Glass like boarder
        border: 10px solid rgba(242, 242, 242, .0471);
        outline: 1px solid rgba(117, 117, 117, .45);
        background-clip: padding-box;
        

        width: 500px;

        & > span{
            color: #00D492;
            grid-area: Caption;
            font-size: 4cqw;
            padding-left: 1.8cqw;
            text-align: left;
        }
        
        & > .icon{
            color: #00D492;
            display: grid;
            place-items: center;
            margin-right: 4cqw;

            & > :global(svg){
                height: 4cqw;
            }
        }
        
        // Preview styling
        & > img{
            transition: 200ms ease-in all;
            grid-area: Preview;
            margin: auto;

            &[data-preview-type=desktop]{ width: 95%; }
            &[data-preview-type=mobile]{ width: 23%; }
        }

        // Preview image positioning
        &:not(:is(:focus, :focus-within, :hover)) > img{
            rotate: -5.9deg;
            translate: 0 20%;
            opacity: .8;
        }
    }
</style>