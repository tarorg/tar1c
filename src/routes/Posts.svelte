<script lang="ts">
	import { onMount } from 'svelte';

	export let posts = [];

	onMount(async () => {
		const response = await fetch('https://tar-tarframework.turso.io/v2/pipeline', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzkzNjU2MDMsImlkIjoiYjI1ODNhYTctNTQwOS00OTAyLWIxMWUtMzBkZjk5N2Q0NjIzIn0.NiBtHi7YN77BBMtCkUzpehRNYMKN_RG__tYgpw8q9uk5DkPTSRDFgpyA8yVFxg2Xqeucoqxl-y0DE8yeNNiVAA',
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				requests: [
					{
						type: 'execute',
						stmt: {
							sql: 'SELECT * FROM posts;'
						}
					}
				]
			})
		});

		const data = await response.json();
		const rows = data.results[0].response.result.rows;

		posts = rows.map(row => ({
			id: row[0].value,
			title: row[1].value,
			content: row[2].value
		}));
	});
</script>

<style>
	.post {
		border-bottom: 1px solid #eaeaea;
		padding: 1rem 0;
	}
	.post-title {
		font-size: 1.5rem;
		font-weight: bold;
	}
	.post-content {
		margin-top: 0.5rem;
	}
</style>

<div>
	{#each posts as post}
		<div class="post">
			<div class="post-title">{post.title}</div>
			<div class="post-content">{post.content}</div>
		</div>
	{/each}
</div>
