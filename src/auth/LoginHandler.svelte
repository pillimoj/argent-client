<script lang="ts">
    import type { User } from '../ArgentTypes';
    import { client } from '../api.js';
    import { auth, user } from '../stores.js';
    import GoogleLoginButton from './GoogleLoginButton.svelte';

    const clientId =
        '487251436763-osourolcp58kh2q3t5qofapllbflnutr.apps.googleusercontent.com';

    const handleLogin = (loginEvent) => {
        const user = loginEvent.detail.user;
        const token = user.getAuthResponse().id_token;
        tokenLogin(token);
    };

    const tokenLogin = async (token) => {
        const userResponse = await client<User>('api/v1/login', {
            headers: { Authorization: `Bearer ${token}` },
        });
        user.set(userResponse);
        auth.set('Authenticated');
    };
</script>

<GoogleLoginButton {clientId} on:auth-success={handleLogin} />
