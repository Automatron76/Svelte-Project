<script lang="ts">
    import { currentCandidates, subTitle } from "$lib/runes.svelte";
    import { onMount } from "svelte";
    import { currentJournals, currentDataSets } from "$lib/runes.svelte";
   import { JournalService } from "$lib/services/journal-service";
    import type { Session } from "$lib/types/journal-types";
    
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import Card from "$lib/ui/Card.svelte";

    
  </script>
  
  <div class="columns">
  <div class="column">
    <Card title="Visit duration By transport Method">
      <Chart  data={currentDataSets.journalsByMethod} type="bar" />
    </Card>
  </div>
  <div class="column has-text-centered">
    <Card title="Visit duration By Candidate">
      <Chart data={currentDataSets.journalsByCandidate} type="pie" />
    </Card>
  </div>
</div>
  