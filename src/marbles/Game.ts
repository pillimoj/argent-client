import { client } from '../api';
import type { GameStatus } from '../ArgentTypes';
import { GameEvent } from './GameEvent';
import type { Marble } from './Marble';
import { ALL_MARBLES } from './Marble';
import { Pipe } from './Pipe';
import type { RenderData } from './RenderData';
import { randomIterator, take } from './utilities';

function getNumberOfMarblesFromLevel(level: number): number {
    if (level < 5) {
        return 5;
    }
    if (level < 10) {
        return 6;
    }
    if (level < 20) {
        return 7;
    }
    if (level < 30) {
        return 8;
    }
    if (level < 40) {
        return 9;
    }
    return 10;
}

export class Game {
    colors: Map<Marble, boolean>;
    pipes: Map<string, Pipe>;
    activePipe: Pipe;
    dirty: boolean = true;
    cachedData: RenderData;
    level: number;

    constructor() {}

    async init(): Promise<Game> {
        this.colors = new Map<Marble, boolean>();
        this.pipes = new Map<string, Pipe>();
        this.activePipe = null;

        const gameStatus = await client<GameStatus>('api/v1/marble-game/status');
        this.level = gameStatus.highestCleared + 1;

        const numMarbleColors = getNumberOfMarblesFromLevel(this.level);
        const colorsToUse = [...take(randomIterator(ALL_MARBLES), numMarbleColors)];
        const bagOfMarbles: Marble[] = [];
        colorsToUse.forEach((color) => {
            const p = new Pipe();
            p.marbles.push(color);
            this.pipes.set(p.id, p);
            this.colors.set(color, false);
            bagOfMarbles.push(color, color, color);
        });
        let currentPipeIdx = 0;
        const pipeArray = [...this.pipes.values()];
        for (const marble of randomIterator(bagOfMarbles)) {
            pipeArray[currentPipeIdx++ % pipeArray.length].marbles.push(marble);
        }

        const numberOfEmptyPipes = Math.ceil(numMarbleColors / 3);
        const emptyPipes = Array.from({ length: numberOfEmptyPipes }, () => new Pipe());
        for (const p of emptyPipes) {
            this.pipes.set(p.id, p);
        }

        this.cachedData = this.getRenderData();

        return this;
    }

    handlePipeClick(pipeId: string): GameEvent | null {
        let event: GameEvent | null = null;

        const clickedPipe = this.pipes.get(pipeId);
        if (this.activePipe === null && !clickedPipe.isEmpty() && !clickedPipe.done) {
            this.activePipe = clickedPipe;
            this.dirty = true;
        } else if (
            this.activePipe !== null &&
            !clickedPipe.isFull() &&
            (clickedPipe.isEmpty() ||
                clickedPipe.topMarble() === this.activePipe.topMarble())
        ) {
            clickedPipe.addMarble(this.activePipe.takeMarble());
            this.activePipe = null;
            this.dirty = true;
            if (clickedPipe.done) {
                this.colors.set(clickedPipe.topMarble(), true);
                event = GameEvent.PipeFinished;
            }
            // Win condition
            if (Array.from(this.colors.values()).every(Boolean)) {
                event = GameEvent.GameWon;
                client('api/v1/marble-game/update-highest-cleared', {
                    method: 'POST',
                });
            }
        } else if (this.activePipe === clickedPipe) {
            this.activePipe = null;
            this.dirty = true;
        } else if (!clickedPipe.isEmpty() && !clickedPipe.done) {
            this.activePipe = clickedPipe;
            this.dirty = true;
        }
        return event;
    }

    getRenderData(): RenderData {
        if (this.dirty) {
            console.log('updating cache');
            this.cachedData = {
                pipes: Array.from(this.pipes.values(), (p) => p.clone()),
                activePipe: this.activePipe?.id ?? null,
            };
            this.dirty = false;
        }
        return this.cachedData;
    }
}
