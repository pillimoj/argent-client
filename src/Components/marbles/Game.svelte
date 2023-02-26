<script lang="ts">
    import { onMount } from 'svelte';

    import { pageTitle } from '../../stores';
    import { modal } from '../../stores';
    import { Game } from '../../marbles/Game';
    import { GameEvent } from '../../marbles/GameEvent';
    import type { RenderData } from '../../marbles/RenderData';

    import CompleteMarbleGame from '../modals/CompleteMarbleGame.svelte';
    import Fireworks from '../shared/Fireworks.svelte';
    import Pipe from './Pipe.svelte';

    let game: Game | null = null;
    let renderData: RenderData | null = null;
    let isInteractionsLocked = false;
    let renderFireWorks: boolean = false;
    let renderFireWorksTimer: number | null = null;

    const openWinModal = () => {
        modal.set({
            component: CompleteMarbleGame,
            show: true,
            props: {
                updateCallback: () => {
                    modal.set({ show: false });
                },
                completedGameLevel: game.level,
            },
            onClose: () => newGame(),
        });
    };

    const newGame = async () => {
        const uninitializedGame = new Game();
        game = await uninitializedGame.init();
        renderData = game.getRenderData();
        hideFireWorks();
        isInteractionsLocked = false;
        pageTitle.set(`Marbles🧪 lvl-${game.level}`);
    };

    const showFireWorks = () => {
        renderFireWorks = true;
        if (renderFireWorksTimer !== null) {
            clearTimeout(renderFireWorksTimer);
        }
    };

    const hideFireWorks = () => {
        renderFireWorks = false;
        if (renderFireWorksTimer !== null) {
            clearTimeout(renderFireWorksTimer);
        }
    };

    const flashFireWorks = (durationMs: number) => {
        renderFireWorks = true;
        renderFireWorksTimer = setTimeout(hideFireWorks, durationMs);
    };

    const handleEvent = (event: GameEvent | null) => {
        switch (event) {
            case GameEvent.PipeFinished:
                flashFireWorks(1000);
                break;
            case GameEvent.GameWon:
                isInteractionsLocked = true;
                showFireWorks();
                setTimeout(openWinModal, 3000);
                break;
            default:
                break;
        }
    };

    const handlePipeClick = (pipeId: string) => {
        if (isInteractionsLocked) return;
        const event = game.handlePipeClick(pipeId);
        renderData = game.getRenderData();
        handleEvent(event);
    };
    onMount(newGame);
</script>

<div>
    {#if renderData !== null}
        {#each renderData.pipes as pipe}
            <Pipe
                activatePipe={handlePipeClick}
                {pipe}
                activePipeId={renderData.activePipe}
            />
        {/each}
    {/if}
    {#if renderFireWorks}
        <Fireworks />
    {/if}
</div>

<style>
    div {
        display: flex;
    }
</style>
