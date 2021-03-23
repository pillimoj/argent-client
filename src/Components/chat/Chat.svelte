<script lang="ts">
    import { onMount } from 'svelte';

    import { user } from '../../auth/store';

    import { chatStore } from '../../chatStore';
    import { pageTitle } from '../../stores';
    import ChatMessage from './ChatMessage.svelte';

    let newChatText = '';
    const sendChat = () => {
        chatStore.sendMessage(newChatText);
        newChatText = '';
    };
    onMount(() => pageTitle.set('Chat'));
</script>

<div class="messages">
    {#each $chatStore.messages as message (message.id)}
        <ChatMessage {message} userId={$user.id} />
    {/each}
</div>
<form on:submit|preventDefault={sendChat}>
    <input id="chatInput" type="text" bind:value={newChatText} />
</form>
Users:
{#each $chatStore.activeUsers as activeUser}
    <div>{activeUser}</div>
{/each}

<style>
    .messages {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
</style>
