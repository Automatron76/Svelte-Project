<script lang="ts">
    import {subTitle} from "$lib/runes.svelte";
    import Card from "$lib/ui/Card.svelte";
    import JournalList from "$lib/ui/JournalList.svelte";
    subTitle.text = "Journals to date";
  </script>
  <Card title="Journals">
  <JournalList />
  </Card>
  