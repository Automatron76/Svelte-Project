<script lang="ts">
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
    import { clearJournalState } from "$lib/services/journal-utils";
    clearJournalState();
    if (browser) goto("/");
  </script>
  