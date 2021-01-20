import ScriptLoader from '../util/scriptloader';

const loader = new ScriptLoader({
    url: '//apis.google.com/js/api:client.js',
    global: 'gapi',
});

const clientId =
    '487251436763-osourolcp58kh2q3t5qofapllbflnutr.apps.googleusercontent.com';

const initialise = async () => {
    const gapiScript: any = await loader.load();
    await new Promise((res, rej) => {
        gapiScript.load('client:auth2', { callback: res, onerror: rej });
    });
    return await gapiScript.auth2.init({ client_id: clientId });
};

let res;
let processed = false;
const authInstancePromise = () => {
    if (processed) return res;
    res = initialise();
    processed = true;
    return res;
};

const logout = async () => {
    const authInstance = await authInstancePromise();
    authInstance.signOut();
};

const login = async () => {
    const authInstance = await authInstancePromise();
    return await authInstance.signIn();
};

const isLoggedIn = async () => {
    const authInstance = await authInstancePromise();
    return authInstance.isSignedIn.get();
};

const getToken = async () => {
    const authInstance = await authInstancePromise();
    const user = authInstance.currentUser.get();
    if (user.isSignedIn()) {
        return user.getAuthResponse().id_token;
    }
};

export default {
    logout,
    login,
    isLoggedIn,
    getToken,
};
