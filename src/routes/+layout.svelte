<script lang="ts">
	import '../app.css';
	import Chat from '$lib/Chat.svelte';
	import { writable } from 'svelte/store';
	import Products from './Products.svelte';
	let { children } = $props();
	const menuItems = [
		{ id: 1, label: 'Space', icon: '🌌' },
		{ id: 2, label: 'Sales', icon: '🎈' },
		{ id: 3, label: 'Products', icon: '📦' },
		{ id: 4, label: 'Posts', icon: '🥁' },
		{ id: 5, label: 'Links', icon: '🔗' },
		{ id: 6, label: 'Path', icon: '〰️' },
		{ id: 7, label: 'Analytics', icon: '📈' },
		{ id: 8, label: 'Settings', icon: '⚙️' }
	];
	const isOpen = writable(false);
	const selectedItem = writable(menuItems[0]);

	function toggleDropdown() {
		isOpen.update(n => !n);
	}

	function selectItem(item) {
		selectedItem.set(item);
		isOpen.set(false);
	}
</script>

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border-bottom: 1px solid #eaeaea;
	}
	.menu {
		position: relative;
	}
	.menu-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}
	.dropdown {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 1); /* Set background to 100% white */
		border: none;
		box-shadow: none;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		align-items: flex-start; /* Align items to the left */
		justify-content: center;
	}
	.dropdown-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		cursor: pointer;
		font-size: 1.5rem;
		width: 100%; /* Ensure the item takes full width */
		border-bottom: 0.2px solid lightgrey; /* Add a light grey divider */
	}
	.dropdown-item:hover {
		background: #f0f0f0;
	}
	.chat {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		border-top: 1px solid #eaeaea;
		padding: 1rem;
		background: #fff;
	}
</style>

<div class="navbar">
	<div class="menu">
		<button class="menu-button" onclick={toggleDropdown} aria-haspopup="true" aria-expanded={$isOpen}>
				<span>{$selectedItem.icon}</span>
			<span>{$selectedItem.label}</span>
		</button>
		{#if $isOpen}
			<div class="dropdown">
				{#each menuItems as item}
					<div class="dropdown-item" role="button" tabindex="0" onclick={() => selectItem(item)} onkeydown={(e) => e.key === 'Enter' && selectItem(item)}>
						<span>{item.icon}</span>
						<span>{item.label}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<div class="content" style="height: calc(100vh - 4rem);">
	{#if $selectedItem.label === 'Products'}
		<Products />
	{:else}
		{@render children()}
	{/if}
</div>

<div class="chat">
	<Chat />
</div>
