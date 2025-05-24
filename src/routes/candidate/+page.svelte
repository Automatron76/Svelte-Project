<script lang="ts">
    import Card from "$lib/ui/Card.svelte";
    import CandidateJournals from "$lib/ui/CandidateJournals.svelte";
    import { subTitle } from "$lib/runes.svelte";
  
    let { data }: any = $props();
    subTitle.text = `Journals to Date for ${data.candidate.firstName} ${data.candidate.lastName}`;
  </script>
  
  <Card title="Donations">
    <CandidateJournals journals={data.journals} />
  </Card>
  