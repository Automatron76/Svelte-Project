<script lang="ts">
    
    import { loggedInUser, subTitle } from "$lib/runes.svelte";
    import { JournalService } from "$lib/services/journal-service";
    import type { Journal } from "$lib/types/journal-types";
    import Card from "$lib/ui/Card.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { popup } from "leaflet";
    import { onMount } from "svelte";
    import { refreshJournalMap } from "$lib/services/journal-utils";
    
    subTitle.text = "Journals Geo Data";
    let map: LeafletMap

    onMount(async () => {
    await refreshJournalMap(map);
  });
  
  </script>
  
  <Card title="Trip Locations">
      <LeafletMap height={60} bind:this={map}/>
  </Card>
  