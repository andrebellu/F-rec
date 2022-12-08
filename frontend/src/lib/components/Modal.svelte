<script>
	import { createEventDispatcher } from 'svelte';
	export let title = 'Modal';
	export let open = false;

	const dispatch = createEventDispatcher();
</script>

{#if open}
	<div class="fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 z-2">
		<!-- Overlay -->
		<div class="fixed w-full h-full bg-gray-800 opacity-25" />
		<!-- Main container -->
		<div
			class="bg-white w-fit lg:h-max lg:w-1/2  mx-auto rounded-lg shadow-xl z-50 overflow-y-auto"
		>
			<div
				class="flex justify-between items-center head bg-gray-100 py-5 px-8 text-2xl font-extrabold"
			>
				{title}
				<button
					class="p-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4"
					on:click={() => dispatch('close')}
				>
					<i class="bx bx-x" />
				</button>
			</div>
			<!-- Content -->
			<div class="content flex flex-col gap-y-2 justify-center items-center p-8 h-fit w-fit">
				<slot />
			</div>
		</div>
	</div>
{/if}
