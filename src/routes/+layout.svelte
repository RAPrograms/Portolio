<script lang="ts">
    import Footer from "../component/footer.svelte";
    import Navbar from "../component/navbar.svelte";
	import "../styling/main.scss";

	let { children } = $props();
</script>

<svelte:head>
	<meta name="author" content="Reece">

	<link rel="preconnect" href="/fonts/spacegrotesk/spacegrotesk.woff2">
	<link rel="preconnect" href="/fonts/jetbrainsmono/jetbrainsmono.woff2">
</svelte:head>

<div>
	<Navbar/>

	<div>
		{@render children()}
	</div>

	<Footer/>
</div>

<style lang="scss">
	:global(body > div){
		flex-direction: column;
		min-height: 100vh;
		display: flex;

		& > div{
			min-height: calc(100vh - var(--nav-height));
		}
	}
</style>