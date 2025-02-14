<script lang="ts">
	import { writable } from 'svelte/store';

	let input = '';
	const messages = writable<{ user: string; text: string }[]>([]);

	function sendMessage() {
		if (input.trim()) {
			messages.update((msgs) => [...msgs, { user: 'user', text: input }]);
			input = '';
			// Simulate bot response
			setTimeout(() => {
				messages.update((msgs) => [...msgs, { user: 'bot', text: 'This is a simulated response.' }]);
			}, 1000);
		}
	}
</script>

<style>
	.toolbar {
		display: flex;
		justify-content: space-between;
		background-color: white; /* Changed background to white */
		border-radius: 0px;
		margin-bottom: 1rem; /* Added bottom margin */
	}
	.toolbar .icon {
		color: rgb(0, 7, 15);
		font-size: 1.5rem;
		cursor: pointer;
	}
	.input-container {
		background-color: white;
		width: 100%; /* Set to full width */
		padding: 0; /* Removed padding */
		margin-bottom: 1rem; /* Added bottom margin */
	}
	.input-container input {
		flex: 1;
		height: 3rem; /* Adjusted height */
		border-radius: 0px;
		font-size: 1rem;
		background-color: #f8f8f8;
		width: 100%; /* Set to full width */
		padding: 0.5rem; /* Added small padding */
	}
</style>

<div class="toolbar">
	<div class="icon">+</div>
	<div class="icon">#</div>
</div>
<div class="input-container">
	<input type="text" bind:value={input} placeholder="Type a message..." />
</div>