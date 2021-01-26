<script lang="ts">
    export let open;
</script>

<div class="container" on:click>
    <div class="bar top" class:open />
    <div class="bar middle" class:open />
    <div class="bar bottom" class:open />
</div>

<style>
    .bar {
        width: 35px;
        height: 5px;
        background-color: #fff;
        margin: 6px 0;
        transition: 0.4s;
    }

    .open.top {
        transform: rotate(-45deg) translate(-8px, 6px);
    }

    .open.middle {
        opacity: 0;
    }

    .open.bottom {
        transform: rotate(45deg) translate(-9px, -8px);
    }
</style>
