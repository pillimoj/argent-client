import type { Marble } from './Marble';
import { getRandomId } from './utilities';

export class Pipe {
    id: string;
    marbles: Marble[];
    done: boolean = false;
    constructor() {
        this.id = getRandomId();
        this.marbles = [];
    }

    isFull(): boolean {
        return this.marbles.length === 4;
    }

    isEmpty(): boolean {
        return this.marbles.length === 0;
    }

    topMarble(): Marble | null {
        return this.marbles[this.marbles.length - 1] ?? null;
    }

    addMarble(marble: Marble) {
        this.marbles.push(marble);
        this.done =
            this.isFull() && this.marbles.every((marble) => marble === this.marbles[0]);
    }

    takeMarble(): Marble {
        const marble = this.marbles.pop();
        this.done = this.isEmpty();
        return marble;
    }

    clone(): Pipe {
        const newPipe = new Pipe();
        newPipe.id = this.id;
        newPipe.done = this.done;
        newPipe.marbles = [...this.marbles];
        return newPipe;
    }
}
