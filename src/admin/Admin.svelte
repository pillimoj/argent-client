<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { client } from '../api.js';
    import { user } from '../stores.js';
    let users = [];

    const updateUsers = async () => {
        const data = await client('api/v1/admin/users');
        users = data;
    };
    onMount(updateUsers);
</script>

<div class="container">
    <div class="users-grid">
        {#each users as user}
            <div>{user.name}</div>
            <div>{user.email}</div>
        {/each}
    </div>
</div>

<style>
    .container {
        margin-top: 2rem;
    }

    .users-grid {
        height: 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        padding-left: 0.5rem;
        cursor: pointer;
    }
</style>
