<script lang="ts">
   import type { Candidate } from "$lib/types/journal-types";
   import { loggedInUser, currentCandidates } from "$lib/runes.svelte"; 
   import { JournalService } from "$lib/services/journal-service";
   import type { Journal } from "$lib/types/journal-types";
   import Coordinates from "$lib/ui/Coordinates.svelte";
 
    
   let { journalEvent = null } = $props();
  let lat = $state(52.160858);
  let lng = $state(-7.15242);

  let amount = $state(0);
  let selectedCandidate = $state("Simpson, Lisa");
  let transportMethods = ["bike", "walk", "bus"];
  let selectedMethod = $state("bike");
  let message = $state(" Add a journal entry");

  async function journal() {
    if (selectedCandidate && amount && selectedMethod) {
      const candidate = currentCandidates.candidates.find((candidate ) => candidate._id === selectedCandidate);
      console.log("Selected candidate:", selectedCandidate)
      if (candidate)  {
        const journal: Journal = {
          amount: amount,
          method: selectedMethod,
          
          candidate: selectedCandidate,
          lat: lat,
          lng: lng,
          donor: loggedInUser._id
        };
        
        const success = await JournalService.journal(journal, loggedInUser.token);
        if(!success) {
          message = "Journal not completed - some error occurred";
          return;
        }
        if (journalEvent) journalEvent(journal);
        message = `Thanks for submitting a new page of your journal. It will last ${amount} and ${candidate.firstName} ${candidate.lastName} will be there.`;
      }
      else {
        message = "Please select time of visit, method and candidate";
      }
    }
  }

</script>



<div>
  <div class="field">
    <label class="label" for="amount">Visit duration:</label>
    <input bind:value={amount} class="input" id="amount" name="amount" type="number" />
  </div>
  <div class="field">
    <div class="control">
      <label class="label" for="amount">Select transport method</label>
      {#each transportMethods as method}
      <input bind:group={selectedMethod} class="radio" type="radio" value={method}/> {method}
      {/each}
    </div>
  </div>
  <div class="field">
    <label class="label" for="amount">Select Candidate:</label>
    <div class="select">
      <select bind:value={selectedCandidate}>
        {#each currentCandidates.candidates as candidate}
        <option value={candidate._id}>{candidate.lastName},{candidate.firstName}</option>
        {/each}
         </select>
    </div>
</div>
<label class="label"for="coordinates"> Select location </label>
    <Coordinates bind:lat bind:lng />
  <div class="field">
    <div class="control">
      <button onclick={() => journal()} class="button is-success is-fullwidth">{message}</button>
    </div>
  </div>
</div>
