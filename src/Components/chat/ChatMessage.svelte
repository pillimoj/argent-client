<script lang="ts">
    import type { ChatMessage } from '../../ArgentTypes';

    export let message: ChatMessage;
    export let userId: string;
    const sent = message.senderId === userId;
</script>

<div class="message" class:sent>
    <div>{message.messageText}</div>
    {#if !sent}
        <div class="sender">{message.sender}</div>
    {/if}
</div>

<style>
    .message {
        grid-column: 1 / 4;
        background-color: #fff;
        color: #000;
        margin: 0.2rem 0;
    }

    .message.sent {
        grid-column: 2 / 5;
        background-color: #0d0;
        color: #fff;
    }

    .sender {
        font-size: 10px;
        color: #ccc;
    }
</style>
