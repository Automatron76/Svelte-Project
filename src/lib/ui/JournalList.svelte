<script lang="ts">
    export let journals = [
      {
        amount: 40,
        method: "bike",
        donor: "bart@simpson.com",
        candidate: { lastName: "Simpson", firstName: "Lisa" },
        lat: "52.161290",
        lng: "-7.51540"
      },
      {
        amount: 60,
        method: "walk",
        donor: "marge@simpson.com",
        candidate: { lastName: "Simpson", firstName: "maggie" },
        lat: "52.261290",
        lng: "-7.231540"
      },
      {
        amount: 30,
        method: "bus",
        donor: "homer@simpson.com",
        candidate: { lastName: "Flanders", firstName: "Ned" },
        lat: "52.361290",
        lng: "-7.241540"
      }
    ];
  </script>
  
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Visit Duration</th>
        <th>Method</th>
        <th>Candidate</th>
        <th>User</th>
      </tr>
    </thead>
    <tbody>
      {#each journals as journal}
        <tr>
          <td>
            {journal.amount}
          </td>
          <td>
            {journal.method}
          </td><td>
            {journal.candidate.lastName}, {journal.candidate.firstName}
          </td>
          <td>
            {journal.donor}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  