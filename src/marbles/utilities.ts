function randomInt(maxExclusive: number) {
    return Math.floor(maxExclusive * Math.random());
}

export function* randomIterator<T>(arr: readonly T[]): Generator<T> {
    const _arr = [...arr];
    while (_arr.length > 0) {
        yield _arr.splice(randomInt(_arr.length), 1)[0];
    }
}

export function* take<T>(iterable: Iterable<T>, numElements: number): Generator<T> {
    const iterator = iterable[Symbol.iterator]();
    while (numElements-- > 0) yield iterator.next().value;
}

export function getRandomId(): string {
    return Math.random().toString(36).substring(2);
}
