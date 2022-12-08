<script>
	import UserCard from '$lib/components/UserCard.svelte';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	export let data;
	let photos;
	function openDialog(message) {
		return new Promise(function (resolve, reject) {
			let confirmed = confirm(message);

			resolve(confirmed);
		});
	}
	async function handleMessage(event) {
		const del_id = event.detail._id;
		const res = await fetch('/api/deleteUser', { method: 'POST', body: JSON.stringify(del_id) });
        if(res.status === 403) {
            alert("You don't have permission to delete this user");
            return;
        }
		invalidate('app:employees');
	}

	onMount(async () => {
		const callsTodo = Math.ceil(data.data.length / 10);
		let page = 0;
		for (let i = 0; i < callsTodo; i++) {
			const res = await fetch(`/api/get-photos?page=${page}`);
			const data = await res.json();
			if (photos) {
				photos = [...photos, ...data];
			} else {
				photos = data;
			}
			page++;
		}
	});
</script>

<div
	class="flex h-screen w-screen px-4 flex-col justify-start pb-20 items-center md:flex-wrap md:justify-start md:items-start md:flex-row md:pb-0 overflow-y-scroll overflow-x-hidden"
>
	{#each data.data as { _id, name, role }}
		<UserCard
			{_id}
			{name}
			photo={photos ? photos.find((p) => p._id === _id) : null}
			{role}
			on:message={handleMessage}
		/>
	{/each}
</div>
