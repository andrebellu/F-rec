<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	let canvas;
	let video;
	let stream;
	let photoTaken = false;
	const dispatch = createEventDispatcher();
	async function getMedia() {
		const res = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				width: { max: 1280, ideal: 1280 },
				height: { max: 720, ideal: 720 }
			}
		});
		return res;
	}
	onMount(async () => {
		stream = await getMedia();
		canvas.width = await stream.getTracks()[0].getSettings().width;
		canvas.height = await stream.getTracks()[0].getSettings().height;
		video.srcObject = stream;
	});

	async function takePhoto() {
		canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
		stream.getTracks().forEach(function (track) {
			track.stop();
		});
		canvas.classList.remove('hidden');
		video.classList.add('hidden');
		let image_data_url = canvas.toDataURL('image/jpeg');
		dispatch('photo', { image_data_url });
	}
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video class="border-2 border-red-500 w-fit max-h-[30rem] h-fit" bind:this={video} autoplay />
<canvas class="hidden border-2 border-red-500 w-fit max-h-[30rem] h-fit" bind:this={canvas} />
<button
	on:click={takePhoto}
	class="cursor-pointer p-2 bg-black text-white rounded-2xl h-12 font-bold text-lg hover:bg-azzurro hover:text-black ease-in-out duration-300"
>
	Take photo
</button>

<!-- svelte-ignore a11y-media-has-caption -->
