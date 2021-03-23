<script lang="ts">
    import type { ChatMessage } from '../../ArgentTypes';

    export let message: ChatMessage;
    export let userId: string;
    const sent = message.senderId === userId;
</script>

<div class="message-row" class:sent>
    <div class="message" class:sent>
        <div>{message.messageText}</div>
        {#if !sent}
            <div class="sender">{message.sender}</div>
        {/if}
    </div>
</div>

<style>
    .message-row {
        margin: 0.2rem 0;
        grid-column: 1 / 5;
    }
    .message-row.sent {
        justify-self: flex-end;
        grid-column: 2 / 6;
    }
    .message {
        display: inline-block;
        padding: 0.5rem;
        background-color: #fff;
        color: #000;
    }

    .message.sent {
        background-color: #0d0;
        color: #fff;
    }

    .sender {
        font-size: 10px;
        color: #ccc;
    }
</style>
