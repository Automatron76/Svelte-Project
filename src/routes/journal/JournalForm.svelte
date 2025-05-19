<script lang="ts">
const candidateList = [
    {
      firstName: "Lisa",
      lastName: "Simpson",
      office: "President"
    },
    {
      firstName: "Maggie",
      lastName: "Simpson",
      office: "President"
    },
    {
      firstName: "Ned",
      lastName: "Flanders",
      office: "President"
    }
  ];

  import Coordinates from "$lib/ui/Coordinates.svelte";
  let lat = $state(52.160858);
  let lng = $state(-7.15242);

  let amount = $state(0);
  let selectedCandidate = $state("Simpson, Lisa");
  let transportMethods = ["bike", "walk", "bus"];
  let selectedMethod = $state("bike");

  async function journal() {
    console.log(`Submit: ${amount} to ${selectedCandidate} via ${selectedMethod} method`);
    console.log(`lat: ${lat}, lng: ${lng}`);
  }

</script>



<div>
  <div class="field">
    <label class="label" for="amount">Visit duration:</label>
    <input class="input" id="amount" name="amount" type="number" />
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
        {#each candidateList as candidate}
        <option>{candidate.lastName},{candidate.firstName}</option>
        {/each}
         </select>
    </div>
</div>
<label class="label"for="coordinates"> Select location </label>
    <Coordinates bind:lat bind:lng />
  <div class="field">
    <div class="control">
      <button onclick={() => journal()} class="button is-success is-fullwidth">Submit info</button>
    </div>
  </div>
</div>
