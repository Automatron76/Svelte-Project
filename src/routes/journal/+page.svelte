<script lang="ts">
    import { currentDataSets, loggedInUser, subTitle, currentCandidates, currentJournals } from "$lib/runes.svelte";
    import type { ActionResult } from "@sveltejs/kit";
    import Card from "$lib/ui/Card.svelte";
    import JournalForm from "./JournalForm.svelte";
     // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import JournalList from "$lib/ui/JournalList.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import type { Journal } from "$lib/types/journal-types";
    import { onMount } from "svelte";
    import { refreshJournalMap, refreshJournalState } from "$lib/services/journal-utils";
    import type { PageProps } from "../$types";
    
    
    subTitle.text = "Journal";
    let { data }: PageProps = $props();
    let message = $state("Enter a new journal page")

    const handleJournalSuccess = () => {
    return async ({ result }: { result: ActionResult }) => {
      if (result.type === "success") {
        const journal = result.data as Journal;
        currentJournals.journals.push(journal);
        map.addMarker(journal.lat, journal.lng, "");
        map.moveTo(journal.lat, journal.lng);
        refreshJournalState(currentJournals.journals, currentCandidates.candidates);
        if (typeof journal.candidate !=="string"){
        message = `Thanks! You created a new page. Visit duration: ${journal.amount} min. ${journal.candidate.firstName} ${journal.candidate.lastName} will also be there`;
      }}
    };
  };



    let map: LeafletMap;
 

  onMount(async () => {
    
    await refreshJournalState(data.journals, data.candidates);
    await refreshJournalMap(map);
  });
  

  </script>
<div class="columns">
  <div class="column">
    <Card title="Journals to Date">
      <LeafletMap height={30} bind:this={map}/>
    </Card>
  </div>
  <div class="column">
    <Card title="Add a journal">
      <JournalForm candidateList={currentCandidates.candidates} enhanceFn={handleJournalSuccess} {message}/>
    </Card>
  </div>
</div>
<div class="columns">
  <div class="column">
    <Card title="Total visit in minutes to Date">
      <Chart data={currentDataSets.journalsByCandidate} type="bar" />
    </Card>
  </div>
  <div class="column">
  <Card title="Add your journal">
    <JournalList  />
  </Card>
</div>
</div>
