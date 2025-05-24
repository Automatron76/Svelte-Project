<script lang="ts">
  import { browser } from "$app/environment";
  import { loggedInUser } from "$lib/runes.svelte";
  import { JournalService } from "$lib/services/journal-service";
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";
  import { onMount } from "svelte";
  
  onMount(async () => {
    await JournalService.restoreSession();
  });
</script>

<div class="container">
  {#if loggedInUser.email}
    <Menu />
    <Heading />
  {/if}
  <slot />
</div>
