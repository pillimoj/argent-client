<script lang="ts">
    import { onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import { modal } from '../stores';
    import { closeModal } from './modals/index';

    // binding used for focus trap
    let modalElement: Element;
    const onClose = $modal.onClose;

    const handle_keydown = (e) => {
        if (e.key === 'Escape') {
            close();
            return;
        }

        if (e.key === 'Tab') {
            // trap focus
            const nodes = modalElement.querySelectorAll('*');
            const tabbable = Array.from(nodes).filter(
                (n: HTMLInputElement) => n.tabIndex >= 0,
            );

            let index = tabbable.indexOf(document.activeElement);
            if (index === -1 && e.shiftKey) index = 0;

            index += tabbable.length + (e.shiftKey ? -1 : 1);
            index %= tabbable.length;

            (<HTMLInputElement>tabbable[index]).focus();
            e.preventDefault();
        }
    };

    const previously_focused = typeof document !== 'undefined' && document.activeElement;

    if (previously_focused) {
        onDestroy(() => {
            previously_focused.focus();
        });
    }
    if (onClose != null) {
        onDestroy(onClose);
    }
</script>

<svelte:window on:keydown={handle_keydown} />

<div transition:fade class="modal-background" on:click={closeModal} />

<div
    transition:fade
    class="modal"
    role="dialog"
    aria-modal="true"
    bind:this={modalElement}
>
    <slot />
</div>

<style>
    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.15);
    }

    .modal {
        position: absolute;
        left: 50%;
        top: 50%;
        width: calc(100vw - 4rem);
        max-width: 32em;
        max-height: calc(100vh - 4rem);
        overflow: auto;
        transform: translate(-50%, -50%);
        border-radius: 0.2em;
        background: #112dba;
    }
</style>
