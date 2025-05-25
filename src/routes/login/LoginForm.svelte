<script lang="ts">

    import Message from "$lib/ui/Message.svelte";
    import UserCredentials from "$lib/ui/UserCredentials.svelte";
    import { signIn } from "@auth/sveltekit/client"
  let message=""
  
  </script>
  
  <div class="box">
    {#if message}
      <Message {message} />
    {/if}
    <form method="POST" action="?/login"> 
      <UserCredentials />
      <button class="button is-success is-fullwidth">Log In</button>
      
    </form>
  </div>