<script>
    import { createEventDispatcher } from "svelte";
	
	const dispatch = createEventDispatcher();

    export let user_id
    export let name
    export let timestamp

	const convertDate = (time) => {
		return new Date(time * 1000).toLocaleDateString('it-IT', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		});
	};
    function update() {
		dispatch('message', {
			user_id: user_id,
            timestamp: timestamp
		});
	}
</script>

<div on:click={update} on:keydown={update} class="bg-black p-3 rounded-2xl mb-3 text-white w-full hover:bg-white hover:text-black group transition-all ease-in-out duration-300 cursor-pointer">
    <p class="font-semibold font-white">{name}</p>
    <p class="text-gray-300 group-hover:text-gray-500">{convertDate(timestamp)}</p>
</div>