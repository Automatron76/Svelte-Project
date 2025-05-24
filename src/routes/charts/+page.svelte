<script lang="ts">
  
    import {  currentDataSets } from "$lib/runes.svelte";
    
    
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import Card from "$lib/ui/Card.svelte";
    import type { PageProps } from "../$types";
    
    import { refreshJournalState } from "$lib/services/journal-utils";

    let { data }: PageProps = $props();
    refreshJournalState(data.journals, data.candidates);

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
  