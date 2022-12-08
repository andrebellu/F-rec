<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let _id;
	export let name;
	export let photo;
	export let role;

	function delete_card() {
		dispatch('message', {
			_id: _id
		});
		active = !active;
	}

	let active = false;
	function pop_up() {
		active = !active;
	}
</script>

<div
	class="flex flex-col justify-center border-black border-0 rounded-3xl shadow-xl bg-azzurro pl-3 w-full h-36 m-3 md:m-5 p-3 h-18 md:w-72 md:h-72"
>
	<div
		class="flex justify-between w-full rounded-lg text-center align-middle items-center text-white"
	>
		<img
			class="md:mx-5 border-2 border-black rounded-3xl w-8 h-8 md:!w-40 md:!h-40 object-cover md:mt-4"
			src={photo ? photo.photo : null}
			alt={name}
		/>
		<button
			on:click={pop_up}
			class="bx bx-trash text-black mx-5
			md:hover:text-red-500
			transition-all ease-in-out duration-300
			cursor-pointer !text-center !text-2xl"
		/>
	</div>

	{#if active}
		<div class="flex flex-col justify-between">
			<h2 class="md:mx-5 md:my-2 text-left font-semibold !text-lg">Are you sure?</h2>
			<div class="right w-28 md:w-full text-center flex flex-row gap-x-2 justify-center">
				<button
					on:click={delete_card}
					class="md:my-1.5 align-middle border-2 border-black rounded-xl px-2 md:hover:border-red-500 md:hover:text-red-500"
					>Yes</button
				>
				<button
					on:click={pop_up}
					class="md:my-1.5 align-middle border-2 border-black rounded-xl px-2 md:hover:border-red-500 md:hover:text-red-500"
					>Cancel</button
				>
			</div>
		</div>
	{:else}
		<div class="flex flex-col justify-between">
			<h2 class="md:mx-5 md:my-2 text-left font-semibold !text-lg">{name}</h2>
			<div class="right w-28 md:w-full">
				<p
					class="md:mx-5 md:my-2 text-left text-slate-grey align-middle w-full overflow-hidden whitespace-nowrap !text-ellipsis"
				>
					{role || 'No Role'}
				</p>
			</div>
		</div>
	{/if}
</div>
