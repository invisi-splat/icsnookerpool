<script lang="ts">
    import { goto } from "$app/navigation";
    import phoenixImg from "$lib/assets/phoenix.png";
  import { checkLoggedIn } from "$lib/functions/checkLoggedIn";
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
        checkLoggedIn(() => {
            goto("/");
        })
    })
</script>

<div class="lg:flex lg:justify-around lg:px-24">
    <img src={ phoenixImg } alt="Phoenix logo" class="lg:size-1/4 lg:inline-block lg:rounded-full hidden" />
    <div class="flex flex-col items-center lg:items-baseline lg:mt-10 lg:justify-around mb-24 px-30 lg:w-1/2">
        <p class="font-medium text-2xl">Enter details...</p>
        <form class="mt-5 w-2/3 lg:w-full" on:submit={ signInHandler }>
            <div class="lg:flex lg:flex-row lg:gap-x-10">
                <div class="lg:w-1/3">
                    <p class="font-light text-xl lg:w-full">Email</p>
                    <input type="text" bind:value={email} class="text-input h-fit text-xl p-1 rounded w-full lg:w-full mb-4">
                </div>
                <div class="lg:w-1/3">
                    <p class="font-light text-xl lg:w-full">Password</p>
                    <input type="password" bind:value={password} class="text-input h-fit text-xl p-1 rounded w-full lg:w-full mb-5">
                </div>
            </div>
            <div class="w-full text-right lg:text-left">
                <input type="submit" value="Sign in" class="sign-in h-fit text-xl p-2 rounded-none active:saturate-50" />
            </div>
        </form>
        {#if errorMessage !== ""}
            <div>
                { errorMessage }
            </div>
        {/if}
    </div>
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