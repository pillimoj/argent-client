interface ScriptLoaderOptions {
    url: string;
    global: string;
}

interface ScriptLoader<T> {
    get(): Promise<T>;
}

enum ScriptState {
    Pending,
    Resolved,
    Rejected,
}

const fold = (reducer, init, xs) => {
    let acc = init;
    for (const x of xs) {
        acc = reducer(acc, x);
    }
    return acc;
};

const accessNested = (obj: any, path: string): any => {
    return fold((acc, el) => acc[el], obj, path.split('.'));
};

export function loadScript<T>(options: ScriptLoaderOptions): ScriptLoader<T> {
    let state = ScriptState.Pending;

    const _loadScript = (): Promise<T> => {
        console.log('Loading', options.url);
        return new Promise((resolve, reject) => {
            // Create script element and set attributes
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.defer = true;
            script.src = options.url;

            // Append the script to the DOM
            document.body.appendChild(script);

            // Resolve the promise once the script is loaded
            script.addEventListener('load', () => {
                state = ScriptState.Resolved;
                resolve(accessNested(window, options.global));
            });

            // Catch any errors while loading the script
            script.addEventListener('error', () => {
                state = ScriptState.Rejected;
                reject(new Error(`${options.url} failed to load.`));
            });
        });
    };

    let script = _loadScript();

    const get = () => {
        if (state == ScriptState.Rejected) {
            script = _loadScript();
            state = ScriptState.Pending;
        }
        return script;
    };

    return {
        get,
    };
}
