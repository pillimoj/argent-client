<script lang="ts">
    import { Game } from '../../marbles/Game';
    import { GameEvent } from '../../marbles/GameEvent';
    import type { RenderData } from '../../marbles/RenderData';
    import { modal } from '../../stores';
    import CompleteMarbleGame from '../modals/CompleteMarbleGame.svelte';
    import Fireworks from './Fireworks.svelte';
    import Pipe from './Pipe.svelte';

    // TODO: Remember player

    let game: Game | null = null;
    let renderData: RenderData | null = null;
    let renderFireWorks: boolean = false;
    let renderFireWorksTimer: number | null = null;

    const openWinModal = () => {
        modal.set({
            component: CompleteMarbleGame,
            show: true,
            props: {
                updateCallback: () => {
                    modal.set({ show: false });
                    newGame();
                },
                completedGameLevel: 1,
            },
        });
    };

    const newGame = () => {
        game = new Game(6);
        renderData = game.getRenderData();
        hideFireWorks();
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
                console.log('small firework');
                flashFireWorks(1000);
                break;
            case GameEvent.GameWon:
                console.log('large firework');
                showFireWorks();
                setTimeout(openWinModal, 3000);
                break;
            default:
                break;
        }
    };

    const handlePipeClick = (pipeId: string) => {
        const event = game.handlePipeClick(pipeId);
        renderData = game.getRenderData();
        handleEvent(event);
    };
    newGame();
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
