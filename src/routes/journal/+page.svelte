<script lang="ts">
    import { subTitle } from "$lib/runes.svelte";
    import Card from "$lib/ui/Card.svelte";
    import JournalForm from "./JournalForm.svelte";

    subTitle.text = "Journal";
  </script>
  <Card title="Add your journal">
  <JournalForm />
  </Card>