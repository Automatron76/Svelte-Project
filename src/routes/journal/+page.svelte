<script lang="ts">
    import { currentDataSets, loggedInUser, subTitle } from "$lib/runes.svelte";
    import Card from "$lib/ui/Card.svelte";
    import JournalForm from "./JournalForm.svelte";
     // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import JournalList from "$lib/ui/JournalList.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import type { Journal } from "$lib/types/journal-types";
    import { onMount } from "svelte";
    import { refreshJournalMap } from "$lib/services/journal-utils";

    subTitle.text = "Journal";
  
    let map: LeafletMap;

    function journalMade(journal:Journal) {
    map.addMarker(journal.lat, journal.lng, "");
    map.moveTo(journal.lat, journal.lng);
  }

    onMount(async () => {
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
      <JournalForm journalEvent={journalMade} />
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
