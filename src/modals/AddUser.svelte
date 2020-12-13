<script lang="ts">
    import SmallInput from '../shared/SmallInput.svelte';
    import { closeModal } from './';

    export let updateCallback: () => void;
    export let addFunction: (userName: string, email: string) => Promise<void>;

    let userName = '';
    let email = '';
    $: disabled = !userName || !email;

    const onAddUserSubmit = async () => {
        await addFunction(userName, email);
        updateCallback();
    };
</script>

<div class="container">
    <h2>Share List</h2>
    <form on:submit|preventDefault={onAddUserSubmit}>
        <div class="input">
            <SmallInput placeholder="Username" bind:value={userName} />
        </div>
        <div class="input">
            <SmallInput placeholder="Email" bind:value={email} />
        </div>
        <div class="button-section">
            <button {disabled} class:disabled type="submit">Add User</button>
            <button on:click|preventDefault={closeModal}>Cancel</button>
        </div>
    </form>
</div>

<style>
    h2 {
        margin: 0;
    }
    button {
        font-family: inherit;
        font-size: inherit;
        height: 2rem;
        width: 5rem;
        box-sizing: border-box;
        background: #fff;
        color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: none;
    }
    button.disabled {
        background: #888;
    }
    .container {
        padding: 2rem;
    }
    .button-section {
        display: flex;
        justify-content: space-between;
    }
    .input {
        margin-bottom: 0.5rem;
        max-width: 18rem;
    }
</style>
