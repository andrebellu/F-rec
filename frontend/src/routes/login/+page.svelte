<script>
	import { goto, invalidate } from '$app/navigation';
	let username = '';
	let password = '';
	async function handleLogin() {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		});
		if (response.status === 200) {
			await invalidate('app:auth');
			await goto('/dashboard');
		} else {
			console.log(response);
			alert('Invalid credentials');
		}
	}
</script>

<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />

<div class="flex flex-col justify-center items-center h-screen w-screen bg-waves bg-cover">
	<form class="bg-black rounded-lg z-10 w-30 md:w-96 mx-10" on:submit|preventDefault={handleLogin}>
		<h1 class="text-5xl text-white text-left p-0 mt-8 mx-5">
			<strong>Face</strong>
			<i
				class="bx bx-glasses-alt bx-flip-horizontal text-5xl align-text-bottom"
				style="color:#ffffff"
			/>
		</h1>
		<h1 class="text-5xl text-white text-left p-0 mb-6 mx-5 leading-[0.5] font-thin">Recognition</h1>

		<div class="flex flex-col">
			<h1 class="text-white text-2xl mx-5"><strong>Login</strong></h1>
			<label for="username" class="text-white mx-5">Username</label>
			<input
				type="text"
				bind:value={username}
				class="border-2 border-white rounded-md p-2 mx-5 my-2"
			/>
			<label for="password" class="text-white mx-5">Password</label>
			<input
				type="password"
				bind:value={password}
				class="border-2 border-white rounded-md p-2 mx-5 my-2"
			/>
			<div class="flex justify-end">
				<button
					class="bg-white text-black rounded-md p-2 mx-5 my-2 mb-6 w-32 hover:bg-black hover:text-white transition duration-300 ease-in-out"
					>Login</button
				>
			</div>
		</div>
	</form>
</div>
