<script lang="ts">
  import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";

    let email: string;
    let password: string;
    let errorMessage = "";

    async function signInHandler() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {
            errorMessage = error.message;
            throw error;
        }
        goto("/");
    }

    onMount(async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) { throw error; }
        if (data.session) {
            goto("/");
        }
    })
</script>

<div class="flex flex-col lg:flex-row items-center lg:mt-10 lg:justify-around mb-24 px-30">
    <p class="font-medium text-2xl">Enter details...</p>
    <form class="mt-5 w-2/3" on:submit={ signInHandler }>
        <p class="font-light text-xl">Email</p>
        <input type="text" bind:value={email} class="text-input h-fit text-xl p-1 rounded w-full mb-4">
        <p class="font-light text-xl">Password</p>
        <input type="password" bind:value={password} class="text-input h-fit text-xl p-1 rounded w-full mb-5">
        <div class="w-full text-right">
            <input type="submit" value="Sign in" class="sign-in h-fit text-xl p-2 rounded-none active:saturate-50" />
        </div>
    </form>
    {#if errorMessage !== ""}
        <div>
            { errorMessage }
        </div>
    {/if}
</div>

<style>
    :global(body) {
        background: var(--green-baize);
        color: white;
    }

    .text-input {
        background: linear-gradient(90deg, #EFCC96 0%, #FFE5BD 100%);
        color: black
    }

    .sign-in {
        background: linear-gradient(90deg, #C94FF4 0%, #C886E8 100%);
    }
</style>