<script lang="ts">
    import Footer from "../components/layout/footer.svelte";
    import Navbar from "../components/layout/navbar.svelte";
	
	import "../styling/main.scss";

	let { children } = $props();

	const description = "Personal portfolio of Reece, a software developer passionate about hardware, back-end, front-end, cybersecurity, and creating innovative technology"
</script>

<svelte:head>
	<!-- Preconnect to custom fonts -->
	<link rel="preconnect" href="/fonts/spacegrotesk/spacegrotesk.woff2">
	<link rel="preconnect" href="/fonts/jetbrainsmono/jetbrainsmono.woff2">
	
	<!-- Primary Meta Tags -->
	<title>RAPrograms</title>
	
	<!-- Primary Meta Tags -->
	<meta name="title" content="RAPrograms" />
	<meta name="keywords" content="back-end, front-end, mechanics, cybersecurity, digital software, software, web development, systems, application development, development, web,">
    <meta name="description" content={description}>
	<meta name="author" content="Reece">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://raprograms.co.uk" />
	<meta property="og:title" content="RAPrograms" />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="/thumbnail.png" />

	<!-- X (Twitter) -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://raprograms.co.uk" />
	<meta property="twitter:title" content="RAPrograms" />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content="/thumbnail.png" />
</svelte:head>

<noscript>
	<!-- Hides elements which require javascript to function-->
	<style>
		.require-javascript{
			visibility: none !important;
			display: none !important;
		}
	</style>
</noscript>

<div>
	<Navbar/>

	<div>
		{@render children()}
	</div>

	<Footer/>
</div>

<style lang="scss">
	:global(body > div > div){
		min-height: 100vh;
		
		&, & > div{
			flex-direction: column;
			display: flex;
		}

		& > div{
			min-height: calc(100vh - var(--nav-height));
			align-items: center;
		}
	}
</style>