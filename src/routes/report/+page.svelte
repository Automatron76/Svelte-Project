<script lang="ts">
    
    import Card from "$lib/ui/Card.svelte";
    import JournalList from "$lib/ui/JournalList.svelte";
    import {loggedInUser, subTitle} from "$lib/runes.svelte";
    import {JournalService} from "$lib/services/journal-service";
    import { onMount } from "svelte";
    import type { Journal } from "$lib/types/journal-types";


    subTitle.text = "Journals to date";

    let journals: Journal[] = [];
    onMount(async () => {
      journals = await JournalService.getJournals(loggedInUser.token)
    });
  </script>

  <Card title="Journals">
  <JournalList {journals}/>
  </Card>
  