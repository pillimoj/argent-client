<script lang="ts">
    import type { WishlistItem } from '../../ArgentTypes';

    export let item: WishlistItem;
</script>

<div class="item" class:taken={item.takenBy !== null} on:click>
    <div class="title text">{item.title}</div>
    <div class="description text">{item.description.replaceAll('\n', ' | ')}</div>
</div>

<style>
    .item {
        height: 3rem;
        display: grid;
        grid-template-columns: 5rem 1fr;
        align-items: center;
        width: 100%;
        border: 1px solid #fff;
        margin-top: 0.5rem;
    }
    .taken {
        color: #888;
    }
    .title {
        font-weight: 700;
        width: 5rem;
    }
    .description {
        color: #888;
        font-size: 0.8rem;
    }
    .text {
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
        padding: 0 1.5rem;
    }
</style>
