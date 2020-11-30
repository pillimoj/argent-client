<script lang="ts">
    import { client } from './api.js';
    export let listId;
    let listUsers = [];

    const fetchListUsers = async (id) => {
        const data = await client(`api/v1/checklists/${id}/users`);
        listUsers = data;
    };
    $: fetchListUsers(listId);
</script>

<div class="container">
    <div class="row header">
        <div class="gray">User</div>
        <div class="gray">Is Owner</div>
    </div>
    {#each listUsers as user}
        <div class="row">
            <div>{user.name}</div>
            <div class="gray">
                {#if user.checklistAccessType === 'Owner'}Yes{:else}No{/if}
            </div>
        </div>
    {/each}
</div>

<style>
    .container {
        margin-top: 2rem;
    }
    .row {
        padding-left: 1rem;
        display: grid;
        grid-template-columns: 9rem 6rem;
        height: 2rem;
    }
    .header {
        margin-bottom: 1rem;
    }
    .gray {
        color: gray;
    }
</style>
