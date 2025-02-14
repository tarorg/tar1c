<script lang="ts">
  import { onMount } from 'svelte';

  interface Sale {
    id: number;
    amount: number;
    date: string;
  }

  let sales: Sale[] = [];
  let loading = true;

  onMount(async () => {
    const response = await fetch('/api/sales');
    if (response.ok) {
      sales = await response.json();
      console.log('Sales fetched:', sales);
    } else {
      console.error('Failed to fetch sales:', response.statusText);
    }
    loading = false;
  });
</script>

<style>
  .table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    font-size: 1rem;
    text-align: left;
  }
  .table th, .table td {
    padding: 0.75rem;
    border-bottom: 1px solid #eaeaea;
  }
  .table th {
    background-color: #f9f9f9;
    font-weight: bold;
  }
  .table tr:hover {
    background-color: #f1f1f1;
  }
</style>

{#if loading}
  <p>Loading sales...</p>
{:else}
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {#each sales as sale}
        <tr>
          <td>{sale.id}</td>
          <td>{sale.amount}</td>
          <td>{sale.date}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
