<script lang="ts">
    export let lat: number;
    export let lng: number;
  </script>
  
  <div class="box field is-horizontal">
    <div class="field-label is-normal">
      <label for="lat" class="label">Lat</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <input id="lat" class="input" name="lat" type="number" step="0.0001" bind:value={lat} />
        </p>
      </div>
      <div class="field-label is-normal">
        <label for="lng" class="label">Lng</label>
      </div>
      <div class="field">
        <p class="control is-expanded">
          <input id="lng" class="input" name="lng" type="number" step="0.0001" bind:value={lng} />
        </p>
      </div>
    </div>
  </div>
  