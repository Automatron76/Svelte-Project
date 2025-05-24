<script lang="ts"> 
   import Coordinates from "$lib/ui/Coordinates.svelte";
   import { enhance } from "$app/forms";
    
   let { candidateList = [], enhanceFn, message = $bindable("") } = $props();

  let lat : number;
  let lng : number;
  let transportMethods = ["bike", "bus", "walk"];
  

</script>



<form method="POST" action="?/journal" use:enhance={enhanceFn}>
  <div class="field">
    <label class="label" for="amount">Enter Amount of time you will spend in minutes:</label>
    <input class="input" id="amount" name="amount" type="number" />
  </div>
  <div class="field">
    <div class="control">
      <label class="label" for="amount">Select Transport Method:</label>
      {#each transportMethods as method}
        <input class="radio" type="radio" value={method} name="method" /> {method}
      {/each}
    </div>
  </div>
  <div class="field">
    <label class="label" for="candidate">Select Candidate:</label>
    <div class="select">
      <select name="candidate">
        {#each candidateList as candidate}
          <option value={candidate._id}>{candidate.lastName},{candidate.firstName} </option>
        {/each}
      </select>
    </div>
  </div>
  <p>Lat: {lat}, lng : {lng}</p>
  <Coordinates bind:lat bind:lng />
  <input type="hidden" name="lat" value={lat} />

  <input type="hidden" name="lng" value={lng} />
  <div class="field">
    <div class="control">
      <button class="button is-success is-fullwidth">Add Journal</button>
    </div>
  </div>
</form>
<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>