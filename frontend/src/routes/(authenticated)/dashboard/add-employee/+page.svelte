<script>
	/** @type {import('./$types').PageData} */
	import Modal from '$lib/components/Modal.svelte';
	import Camera from '$lib/components/Camera.svelte';
	let files = [];
	let takenPhoto;
	// https://stackoverflow.com/a/57272491
	const toBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	async function handleSubmit(e) {
		const formData = new FormData(e.target);
		const base64 = takenPhoto ? takenPhoto : await toBase64(files[0]);
		// max 1mb
		if (base64.length > 1048576) {
			alert('Image is too large');
			return;
		}
		formData.set('photo', base64);
		const res = await fetch('', {
			method: 'POST',
			body: formData
		});
		if (res.status == 200) {
			const data = await res.json();
			if (data.type == 'success') {
				window.location.href = '/dashboard/employees';
				return;
			} else {
				const message = JSON.parse(data.data)[1];
				alert(message);
			}
		} else {
			alert("Errore nell'aggiunta dell'utente");
		}
	}
	let modalOpen = false;

	function toggleModal() {
		modalOpen = !modalOpen;
	}
	function handlePhoto(e) {
		takenPhoto = e.detail.image_data_url;
		toggleModal();
	}

	$: formEnabled = files.length > 0 || takenPhoto;
</script>

<div class="w-full flex flex-col gap-5 place-items-center">
	<h1 class="text-3xl font-bold pt-3">Add new employee</h1>
	<Modal open={modalOpen} title="Camera" on:close={toggleModal}>
		<Camera on:photo={handlePhoto} />
	</Modal>
	<form method="POST" on:submit|preventDefault={handleSubmit} class="flex flex-col gap-2">
		<input
			type="text"
			name="name"
			required
			placeholder="Name"
			class="w-80 h-10 border rounded-lg pl-3 hover:border-b-2 hover:drop-shadow-2xl shadow hover:shadow-black-900"
		/>
		<input
			type="text"
			name="role"
			required
			placeholder="Role"
			class="w-80 h-10 border rounded-lg pl-3 hover:border-b-2 hover:drop-shadow-2xl shadow hover:shadow-black-900"
		/>
		{#if !takenPhoto}
			<input
				type="file"
				bind:files
				class="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white file:cursor-pointer hover:file:bg-azzurro hover:file:text-black w-80 h-10 file:ease-in-out file:duration-300"
			/>
		{:else}
			<img alt="taken from camera" src={takenPhoto} class="w-80 h-80 object-cover rounded-lg" />
		{/if}

		<button
			type="button"
			on:click={toggleModal}
			class="cursor-pointer bg-black text-white rounded-2xl h-12 font-bold text-xl hover:bg-azzurro hover:text-black ease-in-out duration-300"
			>Take Photo</button
		>
		<input
			type="submit"
			class:enabled={formEnabled}
			enabled={formEnabled}
			value="Add Employee"
			name="sub"
			class="cursor-not-allowed [&.enabled]:cursor-pointer bg-black text-white rounded-2xl h-12 font-bold text-xl hover:bg-azzurro hover:text-black ease-in-out duration-300"
		/>
	</form>
</div>
