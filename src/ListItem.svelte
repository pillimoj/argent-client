<script lang="ts">
    export let title;
    export let done;
</script>

<div class="item" class:done on:click>{title}</div>

<style>
    .item {
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 0.5rem;
    }
    .done {
        text-decoration: line-through;
        color: gray;
    }
</style>
