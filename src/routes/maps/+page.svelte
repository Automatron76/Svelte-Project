<script lang="ts">
    
    import {  subTitle } from "$lib/runes.svelte";
    import Card from "$lib/ui/Card.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import type { PageProps } from "../$types";
    import { onMount } from "svelte";
    import { refreshJournalMap, refreshJournalState } from "$lib/services/journal-utils";
    
    
    subTitle.text = "Journals Geo Data";
    let map: LeafletMap
    let { data }: PageProps = $props();

    onMount(async () => {
    await refreshJournalState(data.journals, data.candidates);
    await refreshJournalMap(map);
  });
  
  </script>
  
  <Card title="Trip Locations">
      <LeafletMap height={60} bind:this={map}/>
  </Card>
  