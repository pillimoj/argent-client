import { client } from '../api';
import type { User } from '../ArgentTypes';
import { loadScript } from '../util/scriptloader';
import { authStatus, user } from './store';

type IdConfig = google.accounts.id.IdConfiguration;

const ONE_TAP_CONTAINER_ID = 'g-one-tap-container';

const loader = loadScript<typeof google.accounts.id>({
    url: 'https://accounts.google.com/gsi/client',
    global: 'google.accounts.id',
});

let token: string | null = null;
let api = init();

async function init() {
    const api = await loader.get();
    const config: IdConfig = {
        client_id:
            '487251436763-osourolcp58kh2q3t5qofapllbflnutr.apps.googleusercontent.com',
        auto_select: true,
        callback: (response) => {
            token = response.credential;
            tokenLogin(token);
        },
        prompt_parent_id: ONE_TAP_CONTAINER_ID,
        context: 'signin',
        ux_mode: 'popup',
        itp_support: true,
    };

    api.initialize(config);
    return api;
}

const prompt = async () => {
    (await api).prompt();
};

async function tokenLogin(token: string) {
    const userResponse = await client<User>('api/v1/login', {
        headers: { Authorization: `Bearer ${token}` },
    });
    user.set(userResponse);
    authStatus.set('Authenticated');
}

export default {
    init,
    token,
    prompt,
    api,
    ONE_TAP_CONTAINER_ID,
};
