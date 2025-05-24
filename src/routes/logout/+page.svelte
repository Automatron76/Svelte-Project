<script lang="ts">
    import { goto } from "$app/navigation";
    import { JournalService } from "$lib/services/journal-service";
    
    JournalService.clearSession();
     goto("/");
  </script>
  