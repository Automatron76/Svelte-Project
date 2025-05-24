<script lang="ts">
    
    import Card from "$lib/ui/Card.svelte";
    import JournalList from "$lib/ui/JournalList.svelte";
    import { subTitle } from "$lib/runes.svelte";

    subTitle.text = "Journals to date";
  </script>

  <Card title="Journals">
  <JournalList />
  </Card>
  