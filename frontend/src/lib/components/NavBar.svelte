<script>
	import { page } from '$app/stores';
	import { active } from '$lib/../store.js';
	export let user;
	let routes = [
		{
			name: 'Dashboard',
			href: '/dashboard',
			icon: 'bxs-dashboard'
		},
		{
			name: 'Employees',
			href: '/dashboard/employees',
			icon: 'bxs-user-detail'
		},
		{
			name: 'Add Employee',
			href: '/dashboard/add-employee',
			icon: 'bxs-message-square-add'
		}
	];
	if (user) {
		routes.push({
			name: 'Logout',
			href: '/logout',
			icon: 'bxs-log-out'
		});
	} else {
		routes.push({
			name: 'Login',
			href: '/login',
			icon: 'bxs-log-in'
		});
	}

	function toggle() {
		active.update((n) => !n);
	}
</script>

<!-- Desktop -->
<div
	class="h-screen w-0 md:w-20 md:[&.active]:w-60 invisible md:visible transition-all ease-in-out"
	class:active={$active}
>
	<div class="w-20 relative text-white [&.active]:w-60" class:active={$active}>
		<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
		<div
			class="sidebar fixed top-0 left-0 h-full w-20 rounded-r-lg bg-black px-2 py-2 transition-all ease-in-out delay-400 [&.active]:w-60 [&.active]:mr-5"
			id="sidebar"
			class:active={$active}
		>
			<div id="logo_content">
				<div class="flex align-middle h-12 w-full items-center pointer-events-none" id="logo">
					<i
						class="bx bx-glasses-alt bx-flip-horizontal min-w-[50px] text-5xl mx-1.5"
						class:active={$active}
						style="color:#ffffff"
					/>
					<div
						class="logo_name text-xl font-semibold opacity-0 [&.active]:opacity-100 transition-none ease-in-out delay-100 [&.active]:transition-all"
						class:active={$active}
					>
						FaceRecognition
					</div>
				</div>
				<button on:click={toggle}
					><i
						class="bx bxs-chevron-right-circle solid absolute left-20 top-10 text-4xl text-center leading-10 -translate-x-2/4 [&.active]:left-60 [&.active]:rotate-180 transition-all ease-in-out  [&.active]:scale-x-[1] bg-black rounded-full"
						style="color:#ffffff"
						class:active={$active}
					/></button
				>
			</div>

			<ul class="nav_list mr-3">
				{#each routes as route}
					<li class="group relative h-12 w-full my-0 mx-1.5 leading-10">
						{#if $page.url.pathname === route.href}
							<span
								class="absolute leading-8 top-1 -translate-x-3.5 rounded-r-md h-10 w-1.5 bg-white opacity-100 mr-1.5"
							/>
						{/if}
						<a
							href={route.href}
							class="flex items-center text-center text-lg hover:bg-white hover:text-black rounded-xl transition-all ease-in-out delay-400 whitespace-nowrap"
						>
							<i class="bx {route.icon} h-12 min-w-[50px] rounded-xl translate-y-4" />
							<span
								class="links_name opacity-0 pointer-events-none [&.active]:opacity-100 [&.active]:pointer-events-auto transition-none ease-in-out delay-100 [&.active]:transition-all"
								class:active={$active}>{route.name}</span
							>
						</a>
						<span
							class="text-black absolute text-center leading-8 left-32 border-2 border-black top-0 -translate-y-2/4 -translate-x-2/4 rounded-md h-9 w-28 bg-white shadow-lg transition-none opacity-0 pointer-events-none group-hover:top-[50%] group-hover:transition-all group-hover:ease-in-out group-hover:delay-500 group-hover:opacity-100 block [&.active]:hidden"
							class:active={$active}>{route.name}</span
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<!-- Mobile -->
<div
	class="grid justify-items-center border-4 border-black w-screen h-20 rounded-t-3xl fixed inset-x-0 bottom-0 bg-black text-white md:invisible md:h-0"
>
	<ul class="text-center">
		{#each routes as route}
			<li class="inline-block">
				<a href={route.href}>
					{#if $page.url.pathname === route.href}
						<i
							class="bx {route.icon} h-12 min-w-[50px] text-4xl translate-y-5 mx-1 sm:mx-4 text-white"
						/>
					{:else}
						<i
							class="bx {route.icon} h-12 min-w-[50px] text-4xl translate-y-5 mx-1 sm:mx-4 text-grey-icon"
						/>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</div>