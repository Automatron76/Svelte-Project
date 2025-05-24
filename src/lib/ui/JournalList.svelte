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
            
            {journal.candidate.lastName}, {journal.candidate.firstName} 
          </td>
          <td>
            {journal.donor.firstName},  {journal.donor.lastName}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  