<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { page } from '$app/stores';
	export let data;
</script>

<main class="fixed top-0 left-0 h-hack w-screen layout-grid">
	<div class="h-[calc(calc(100*var(--vh))-5rem)] md:h-screen" style="grid-area: content">
		<slot />
	</div>
	{#if $page.url.pathname !== '/login'}
		<div style="grid-area: sidebar;">
			<NavBar user={data.user} />
		</div>
	{/if}
</main>