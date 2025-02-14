<script lang="ts">
    import { onMount } from 'svelte';
  
    interface Product {
      id: number;
      core: string;
    }
  
    let products: Product[] = [];
    let loading = true;
  
    onMount(async () => {
      const response = await fetch('/api/products');
      if (response.ok) {
        products = await response.json();
        console.log('Products fetched:', products);
      } else {
        console.error('Failed to fetch products:', response.statusText);
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
    <p>Loading products...</p>
  {:else}
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Core</th>
        </tr>
      </thead>
      <tbody>
        {#each products as product}
          <tr>
            <td>{product.id}</td>
            <td>{product.core}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}