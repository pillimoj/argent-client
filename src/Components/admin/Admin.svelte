<script lang="ts">
    import { onMount } from 'svelte';
    import { client } from '../../api.js';
    import { closeModal } from '../modals';
    import { openAddUserModal } from '../modals/create';

    let users = [];

    const updateUsers = async () => {
        const data = await client('api/v1/admin/users');
        users = data;
    };
    const addUser = async (userName: string, email: string) => {
        await client('api/v1/admin/users', { body: { userName, email } });
    };
    onMount(updateUsers);

    const onAddUserClick = () => {
        openAddUserModal({
            updateCallback: () => {
                updateUsers();
                closeModal();
            },
            addFunction: addUser,
        });
    };
    const onRemoveUserClick = (userId: string) => async () => {
        await client(`api/v1/admin/users/${userId}`, { method: 'delete' });
        updateUsers();
    };

    let lists = [];
    let newListName = '';
</script>

<div class="container">
    <div class="users-grid">
        {#each users as user}
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div class="remove-user hoverable" on:click={onRemoveUserClick(user.id)}>
                x
            </div>
        {/each}
    </div>
    <div class="add-user hoverable" on:click={onAddUserClick}>
        <div class="link">+add user</div>
    </div>
</div>

<style>
    :global(a) {
        color: unset;
        text-decoration: unset;
    }
    .container {
        margin-top: 2rem;
    }

    .users-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1rem;
        grid-auto-rows: 2rem;
        align-items: center;
        padding-left: 0.5rem;
        cursor: pointer;
    }
    .add-user {
        display: flex;
        align-items: center;
        height: 2rem;
        padding-left: 0.5rem;
        column-span: all;
    }
    .remove-user {
        display: flex;
        justify-content: center;
    }
    .hoverable:hover {
        background-color: #fff;
        color: #000;
    }
</style>
