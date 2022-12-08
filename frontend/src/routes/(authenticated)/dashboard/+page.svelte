<script>
	import AccessLog from '$lib/components/AccessLog.svelte';
	import { debug } from 'svelte/internal';

	export let data;
	let user_id;
	let timestamp;
	let { logs, count } = data;
	$: user = logs.find((x) => x.user[0]._id == user_id);
	$: enteredToday = logs.filter((x) => {
		return new Date(x.timestamp * 1000).getDay() == new Date().getDay();
	}).length;

	let page = 1;

	function handleMessage(event) {
		if (window.innerWidth > 860) {
			user_id = event.detail.user_id;
			timestamp = event.detail.timestamp;
		}
	}

	async function loadMore() {
		const res = await fetch(`/api/load-more-logs?page=${page}`);
		const data = await res.json();
		logs = [...logs, ...data.logs];
		page++;
	}
</script>

<div class="dashboard-grid overflow-hidden h-full p-5">
	<h1 class="text-4xl font-bold" style="grid-area: dashboard">Dashboard</h1>

	<div class="overflow-y-scroll left rounded-lg bg-azzurro px-3" style="grid-area: access-log">
		<h1 class="text-4xl font-semibold py-3">Log List</h1>
		<div class="">
			{#each [...logs] as log}
				<AccessLog
					user_id={log.user[0]._id}
					name={log.user[0].name}
					timestamp={log.timestamp}
					on:message={handleMessage}
				/>
			{/each}
			{#if page !== count}
				<button
					on:click={loadMore}
					class="bg-black p-3 rounded-2xl mb-3 text-white w-full hover:bg-white hover:text-black group transition-all ease-in-out duration-300 cursor-pointer"
				>
					<p class="font-semibold font-white">Load more</p>
				</button>
			{/if}
		</div>
	</div>

	<div class="hidden md:block bg-azzurro rounded-lg p-5" style="grid-area: info-card">
		{#if user != null && user_id != '0'}
			<h1 class="text-4xl font-bold">Informations</h1>
			<div class="flex flex-row justify-between">
				<img
					class="rounded-xl h-72 w-72 object-cover my-2 border-4 border-black"
					src={user.user[0].photo}
					alt={user.user[0].name}
				/>
				<h1 class="text-3xl font-extrabold text-right ">
					{new Date(timestamp * 1000).toLocaleTimeString('it-IT', {
						hour: '2-digit',
						minute: '2-digit'
					})}<br /><span class="font-light text-xl italic">Orario</span>
				</h1>
			</div>
			<div class="mb-5">
				<h1 class="font-light text-xl italic">Nominative</h1>
				<h1 class="text-3xl font-bold">{user.user[0].name}</h1>
			</div>

			<div>
				<h1 class="font-light text-xl italic">Role</h1>
				<h1 class="text-3xl font-bold">{user.user[0].role}</h1>
			</div>
		{/if}
	</div>

	<div class="hidden md:block bg-black rounded-lg text-4xl p-3" style="grid-area: number">
		<h1 class="text-white font-bold">Entered today {enteredToday}</h1>
	</div>
</div>
