<script lang="ts">
	import "../styling/main.scss";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preload" href="/fonts/spacegrotesk/spacegrotesk.woff2" as="font" type="font/woff2">
	<link rel="preload" href="/fonts/spacegrotesk/spacegrotesk.woff" as="font" type="font/woff2">
</svelte:head>

{@render children()}