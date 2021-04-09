<script lang="ts">
    import { onDestroy, onMount } from 'svelte';

    import { user } from '../../auth/store';
    import { chatStore } from '../../stores';
    import { SocketHandler } from '../../ChatSocketHandler';
    import { pageTitle } from '../../stores';
    import ChatMessage from './ChatMessage.svelte';
    import Input from '../shared/Input.svelte';

    let newChatText = '';
    let socketHandler = new SocketHandler();
    const sendChat = () => {
        socketHandler.send(newChatText);
        newChatText = '';
    };
    $: messages = Array.from($chatStore.messages.values()).sort(
        (a, b) => a.createdDate - b.createdDate,
    );
    onMount(() => pageTitle.set('Chat'));
    onDestroy(() => socketHandler.dispose());
</script>

<div class="messages">
    {#each messages as message (message.id)}
        <ChatMessage {message} userId={$user.id} />
    {/each}
</div>
<form on:submit|preventDefault={sendChat} autocomplete="off">
    <Input bind:value={newChatText} nofade placeholder="Write a message" />
</form>

<style>
    .messages {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
</style>
