<script lang="ts">
  import SignupForm from "./SignupForm.svelte";
  import SimpleMenu from "$lib/ui/SimpleMenu.svelte";
</script>
<SimpleMenu />
<section class="hero is-fullheight is-default is-bold">
  <div class="hero-head"></div>
  <div class="hero-body">
    <div class="container">
      <div class="columns is-vcentered">
        <div class="column is-5">
          <h1 class="title has-text-centered">Signup to create your journal</h1>
          <SignupForm />
        </div>
        <div class="column is-6 is-offset-1">
          <figure class="image is-4by3">
            <img class="object-fit" src="/3.jpg" alt="3" />
          </figure>
        </div>
      </div>
    </div>
  </div>
</section>
