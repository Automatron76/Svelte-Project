<script lang="ts">
 
import { currentJournals } from "$lib/runes.svelte";
  </script>
  
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Visit Duration</th>
        <th>Method</th>
        <th>Candidate</th>
        <th>Attendant</th>
      </tr>
    </thead>
    <tbody>
      {#each currentJournals.journals as journal}
        <tr>
          <td>
            {journal.amount}
          </td>
          <td>
            {journal.method}
          </td><td>
            {#if typeof journal.candidate !== "string"}
            {journal.candidate.lastName}, {journal.candidate.firstName} 
            {/if}
          </td>
          <td>
            {#if typeof journal.donor !== "string"}
            {journal.donor.firstName},  {journal.donor.lastName}
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  