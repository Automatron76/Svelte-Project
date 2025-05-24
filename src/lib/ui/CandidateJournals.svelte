<script lang="ts">
    let { journals } = $props();
  </script>
  
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Amount</th>
        <th>Method</th>
        <th>Donor</th>
      </tr>
    </thead>
    <tbody>
      {#each journals as journal}
        <tr>
          <td>
            {journal.amount}
          </td>
          <td>
            {journal.method}
          </td>
          <td>
            {#if typeof journal.donor !== "string"}
              {journal.donor.lastName}, {journal.donor.firstName}
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  