<script lang="ts">
    import type { WishlistItem } from '../../ArgentTypes';

    export let item: WishlistItem;
    let taken = item.takenBy !== null;
</script>

<div class="item" tabindex="0" on:click on:keydown>
    <div class="title text" class:taken>{item.title}</div>
    <div class="description text" class:taken>
        {item.description.replaceAll('\n', ' | ')}
    </div>
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
    .item:hover {
        background-color: #111;
    }
    .title.taken,
    .description.taken {
        color: #888;
    }
    .title {
        font-weight: 700;
        width: 5rem;
    }
    .description {
        color: #ccc;
        font-size: 0.8rem;
    }
    .text {
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
        padding: 0 1.5rem;
    }
</style>
