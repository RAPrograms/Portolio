<script lang="ts">
    import js_available from "$lib/availability.ts"
    import { onMount } from "svelte";

    const { lines } : { lines: Array<string> } = $props()

    let index = $state(0)

    onMount(() => {
        setInterval(() => {
            if(lines.length > index + 1)
                index += 1
            else
                index = 0
        }, 8000)
    })
</script>

<div class="typewriter">
  <div data-content={lines[index]}>
    <p class:looping={$js_available} style="animation-timing-function: steps({lines[index].length})">{lines[index]}</p>
  </div>
</div>

<style lang="scss">
    .typewriter {
        font-family: monospace;
        font-size: 1.5rem;
        display: inline-flex;
        padding: 0 5px;

        & > div{
            position: relative;

            &::after{
                content: attr(data-content);
                visibility: hidden;
                opacity: 0;
            }

            & >  p {
                animation: typing 4s;
                margin-inline: auto;
                white-space: nowrap;
                will-change: width;
                overflow: hidden;
                left: 0;

                &.looping{
                    border-right: 1px solid;
                    animation: typing 4s alternate infinite,
                        blink 1s 3s step-end infinite;
                }
            }
        }
    }

    @keyframes typing {
        0%, 10% {
            width: 0;
        }

        70%, 100% {
            width: 100%;
        }
    }

    @keyframes blink {
        50% {
            border-color: transparent;
        }
    }
</style>