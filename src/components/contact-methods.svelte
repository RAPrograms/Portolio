<script lang="ts">
    import { onMount } from "svelte";

    import RightArrowIcon from "$icons/right-line-arrow.svg?raw"
    import LocationIcon from "$icons/based-location.svg?raw"
    import LinkedInIcon from "$icons/linkedin.svg?raw"
    import GithubIcon from "$icons/github.svg?raw"
    import EmailIcon from "$icons/email.svg?raw"

    import {
        PUBLIC_CLOUDFLARE_SITE_KEY,

        PUBLIC_CONTACT_EMAIL,
        PUBLIC_GITHUB_USERNAME,
        PUBLIC_LINKEDIN_USERNAME,

        PUBLIC_LOCATION_TEXT,
        PUBLIC_LOCATION_URL
    } from '$env/static/public';

    let status: "unsent" | "processing" | "sent" = $state("unsent")
    let errors: Record<string, string> = $state({})
    let isValidTurnstile = $state(false)
    let jsEnabled = $state(false)
    let form: HTMLFormElement

    // svelte-ignore non_reactive_update
    let setCloudflareTurnstileLoaded: () => void
    let cloudflareTurnstileLoad = new Promise<void>(resolve => {
        setCloudflareTurnstileLoaded = resolve
    })

    let turnstileWidget: string


    onMount(async() => {
        jsEnabled = true
        
        // Prevents calling turnstile funtions before it has loaded
        await cloudflareTurnstileLoad

        // Loads Cloudflare Turnstile only when needed
        // Prevents errors in terminal, which is not good for SEO
        const observer = new IntersectionObserver(([{isIntersecting}]) => {
            if(!isIntersecting)
                return


            turnstileWidget = window.turnstile!.render("form .turnstile", {
                sitekey: PUBLIC_CLOUDFLARE_SITE_KEY,
                callback: function(token) {
                    delete errors["turnstile"]
                    isValidTurnstile = true
                },
            })

            observer.disconnect()
        }, {threshold: 0.01});

        observer.observe(form);
    })

    async function sendRequest(): Promise<undefined | [string, Record<string, string>]> {
        const contact_url = (import.meta.env.DEV)? 
            "http://localhost:8787" :
            `https://contact-api.${window.location.host}`

        const data = new FormData(form)

        try {
            const res = await fetch(contact_url, {
                method: "post",
                body: data
            }) 

            const json = await res.json()
            if(!json["success"])
                return [
                    json["message"],
                    json["details"]
                ]
            
        } catch (error) {
            return [
                "general-error",
                {"general": "Unable to submit. Please try directly via email"}
            ]
        }
    }

    async function submit(e: Event){
        e.preventDefault()

        errors = {}

        if(!isValidTurnstile){
            errors["turnstile"] = "Please try this capture again"
            return
        }

        // Disable form input whilst request is sent
        status = "processing"

        // Send request
        const error = await sendRequest()

        // Show success form if no errors happened
        if(!error){
            status = "sent"
            return
        }

        // Expand error details
        const [message, details] = error

        // Handle invalidated Turnstiles
        if(message == "Invalid Cloudflare Turnstile token"){
            errors["turnstile"] = "Please try this capture again"
               
            // Resets turnstile widget
            window.turnstile!.reset(turnstileWidget)

            status = "unsent"
            return
        }

        
        errors = details
        status = "unsent"
    }
</script>

{#snippet details_card(
    icon: string,
    link: string,
    title: string,
    value: string,
    accessibility_label: string
)}
	<li>
        <a href={link} aria-label={accessibility_label} target="_blank">
            {@html icon}
            <b>{title}</b>
            <div>{value}</div>
            {@html RightArrowIcon}
        </a>
    </li>
{/snippet}

<svelte:head>
    <script async defer onload={setCloudflareTurnstileLoaded} src="https://challenges.cloudflare.com/turnstile/v0/api.js"></script>
</svelte:head>


<div class="contact-methods">
    <form bind:this={form} onsubmit={submit} action="mailto:your-email@example.com?subject=Inquiry" method="post" enctype="text/plain">
        <noscript>Without JavaScript enabled, this form will attempt to open your email client on submit</noscript>
        {#if status != "sent"}
            <div>
                <label>
                    <div>Name</div>
                    <input readonly={status != "unsent"} type="text" name="name" required>
                </label>
                {#if errors["name"]}<div class="error">{errors["name"]}</div>{/if}
            </div>

            {#if jsEnabled}
                <div>
                    <label>
                        <div>Email</div>
                        <input
                            readonly={status != "unsent"} type="email" name="email" required>
                    </label>
                    {#if errors["email"]}<div class="error">{errors["email"]}</div>{/if}
                </div>

                <div>
                    <label>
                        <div>Subject</div>
                        <input minlength="5" readonly={status != "unsent"} type="text" name="subject" required>
                    </label>
                    {#if errors["subject"]}<div class="error">{errors["subject"]}</div>{/if}
                </div>
            {/if}
        
            <div>
                <label>
                    <div>What's on your mind?</div>
                    <textarea minlength="5" readonly={status != "unsent"} id="message" name="message" required></textarea>
                </label>
                {#if errors["message"]}<div class="error">{errors["message"]}</div>{/if}
            </div>
            
            {#if jsEnabled}
                {#await cloudflareTurnstileLoad}
                    <p>Loading Capture</p>
                {:then _} 
                    <div class="turnstile"></div>
                    {#if errors["turnstile"]}<div class="error">{errors["turnstile"]}</div>{/if}
                {/await}
            {/if}

            <button type="submit" disabled={status != "unsent" || (jsEnabled && !isValidTurnstile)}>
                {#if jsEnabled}
                    {#if status == "unsent"}
                        Send
                    {:else}
                        <span class="loader"></span>
                    {/if}
                {:else}
                    Open email client
                {/if}
            </button>
        {:else}
            <div class="conformation-message">
                <div class="icon">{@html EmailIcon}</div>
                <h3>Submitted</h3>
            </div>
        {/if}
    </form>

    <aside>
        <ul>
            {@render details_card(EmailIcon, `mailto:${PUBLIC_CONTACT_EMAIL}`, "Email", PUBLIC_CONTACT_EMAIL, "Email Link")}
            {@render details_card(GithubIcon, `https://github.com/${PUBLIC_GITHUB_USERNAME}`, "Github", PUBLIC_GITHUB_USERNAME, "Github Link")}
            
            {#if PUBLIC_LINKEDIN_USERNAME != "" && PUBLIC_LINKEDIN_USERNAME != undefined}
                {@render details_card(LinkedInIcon, `https://www.linkedin.com/in/${PUBLIC_LINKEDIN_USERNAME}`, "Linked In", PUBLIC_LINKEDIN_USERNAME, "Linkedin Link")}
            {/if}
            
            {#if PUBLIC_LOCATION_TEXT != "" && PUBLIC_LOCATION_URL != ""}
                {@render details_card(LocationIcon, PUBLIC_LOCATION_URL, "Located", PUBLIC_LOCATION_TEXT, `Located in ${PUBLIC_LOCATION_TEXT}`)}
            {/if}
        </ul>
    </aside>
</div>

<style lang="scss">
    @use "$styling/_variables.scss" as variables;

    div.contact-methods{
        justify-content: center;
        max-width: 98vw;
        display: flex;
        width: 80%;
        gap: 30px;
        
        @media (width >= 840px) {
            flex-direction: row-reverse;
        }

        @media (width < 840px) {
            flex-direction: column;
        }

        & > :global(form){
            flex: 2;
        }

        form{
            @include variables.glass-card(15px);

            display: flex;
            flex-direction: column;
            gap: 20px;

            label{
                overflow: hidden;
           
                @include variables.glass-card(
                    10px,
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
                    min-height: 150px;
                    resize: vertical;
                }

                & > :is(input, textarea):read-only{
                    opacity: 0.45;
                    cursor:progress;
                }
            }

            label ~ .error,
            .turnstile ~ error{
                @include variables.coloured-tag(red);

                border-radius: 10px;
                margin-top: 5px;
                font-size: small;
            }

            & > button[type=submit]{
                @include variables.coloured-tag(var(--colour));

                --colour: rgb(0, 200, 0);

                transition: all ease-out 450ms;
                margin-top: 10px;
            }

            &:not(:has(:is(input, textarea):invalid))> button[type=submit]:not(:disabled):hover{
                --colour: rgb(0, 116, 0);

                transition: all ease-in 250ms;
            }

            &:has(:is(input, textarea):invalid) > button[type=submit],
            & > button[type=submit]:disabled{
                --colour: grey;

                cursor: unset !important;
            }

            noscript{
                @include variables.coloured-tag(rgb(255, 70, 70));
            }

            &:has(.conformation-message){
                justify-content: center;
                align-items: center;
            }

            .conformation-message{
                & > .icon{
                    @include variables.coloured-tag(green);
                    
                    border-radius: 100%;
                    place-items: center;
                    aspect-ratio: 1/1;
                    display: grid;

                    & > :global(svg){
                        width: 70%;
                        height: 70%;
                    }
                }

                & > h3{
                    font-size: x-large;
                    margin-top: 20px;
                }
            }
        }

        & > aside {
            width: 100%;
            flex: 1;

            & > ul{
                flex-direction: column;
                display: flex;
                position: sticky;
                top: calc(var(--nav-height) + 10px);
                left: 0;
                gap: 20px;

                & > li > a{
                    @include variables.glass-card(15px);

                    grid-template-columns: max-content 1fr max-content; 
                    color: var(--primary-text-colour);
                    grid-template-rows: 1fr 1fr; 
                    align-items: center;
                    text-align: left;
                    display: grid;
                    gap: 3px 10px;
                    grid-template-areas: 
                        "Icon Name Arrow"
                        "Icon Value Arrow";

                    & > :global(svg):first-child{
                        aspect-ratio: 1/1;
                        width: 100%;
                        grid-area: Icon;
                    }

                    & > b{
                        grid-area: Name;
                    }

                    & > div{
                        grid-area: Value;
                    }

                    & > :global(svg):last-child{
                        aspect-ratio: 1/1;
                        grid-area: Arrow;
                        width: 24px;
                    }
                }
            }
        }


        .loader{
            display: block;
            translate: 0 -100%;
            margin: auto;
        }

        /* Styling code avalible from https://cssloaders.github.io/ */
        .loader, .loader:before, .loader:after {
            border-radius: 50%;
            width: 2.5em;
            height: 2.5em;
            animation-fill-mode: both;
            animation: bblFadInOut 1.8s infinite ease-in-out;
        }
        .loader {
            color: #FFF;
            font-size: 7px;
            position: relative;
            text-indent: -9999em;
            transform: translateZ(0);
            animation-delay: -0.16s;
        }
        .loader:before,
        .loader:after {
        content: '';
            position: absolute;
            top: 0;
        }
        .loader:before {
            left: -3.5em;
            animation-delay: -0.32s;
        }
        .loader:after {
            left: 3.5em;
        }

        @keyframes bblFadInOut {
            0%, 80%, 100% { box-shadow: 0 2.5em 0 -1.3em }
            40% { box-shadow: 0 2.5em 0 0 }
        }
                
    }
</style>