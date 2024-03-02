<script lang="ts">
    import BoardBall from "./boardBall.svelte";
    import { supabase } from "$lib/supabaseClient";
    import { scale } from "svelte/transition";

    // @ts-ignore
    function debounce(func, timeout = 300) {
        let timer: NodeJS.Timeout;
        // @ts-ignore
        return (...args) => {
            clearTimeout(timer);
            // @ts-ignore
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    let name: string;
    let selectedUserId: string;
    let breakTotal: number;
    let ballsPotted: number[] = [];
    let locationPrefix: string;
    let location: string;
    $: breakTotal = ballsPotted.length === 0 ? breakTotal : ballsPotted.reduce((a, b) => a + b, 0);

    let badSubmission: boolean = false;
    let errorMessage: string;
    let goodSubmission: boolean = false;
    let successMessage: string;
    let matchingUsers: User[] = []; 
    let confirmNewUser: boolean = false;
    
    async function handleFormSubmit() {
        badSubmission = false;
        setTimeout(async () => {
            // validation
            if (name === undefined) {
                badSubmission = true;
                errorMessage = "Name is required.";
                return;
            }
            if (!breakTotal || breakTotal <= 0 || (ballsPotted.length > 0 && breakTotal !== ballsPotted.reduce((a, b) => a + b, 0))) {
                badSubmission = true;
                errorMessage = "...enter a valid break, please."
                return;
            }
            if (name.split(" ").length === 1) {
                badSubmission = true;
                errorMessage = "Please enter a first name and a last name."
                return;
            }
            if (!selectedUserId && !confirmNewUser) {
                badSubmission = true;
                errorMessage = `${name} was not selected from the drop-down menu. This will create a new user; are you sure? (Submit again to confirm.)`
                confirmNewUser = true;
                return;
            }

            // form processing
            let [givenName, lastName] = name.split(" ");
            givenName = givenName.charAt(0).toUpperCase() + givenName.slice(1);
            lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

            if (!selectedUserId) {
                const findUserReq = await supabase
                    .from("users")
                    .select("*")
                    .eq("given_name", givenName)
                    .eq("last_name", lastName)
                if (findUserReq.error) { throw findUserReq.error };
                if (findUserReq.data.length > 0) {
                    badSubmission = true;
                    errorMessage = `${name} already exists in the database. Please try choosing this person from the drop-down menu.`
                    return;
                }

                const addNewUser = await supabase
                    .from("users")
                    .insert([
                        {
                            given_name: givenName,
                            last_name: lastName
                        }
                    ])
                    .select("user_id")
                if (addNewUser.error) {
                    badSubmission = true;
                    errorMessage = "Something went wrong adding a user. Are you an imposter?";
                    return;
                }
                const addNewUserInfo = await supabase
                    .from("user_types")
                    .insert([
                        {
                            user_id: addNewUser.data[0].user_id,
                            status: "student",
                            type: "user"
                        }
                    ])
                if (addNewUserInfo.error) {
                    badSubmission = true;
                    errorMessage = "Something went wrong adding a user. Are you an imposter?";
                    return;
                }
                selectedUserId = addNewUser.data[0].user_id;
            }
            const { data, error } = await supabase
                .from("breaks")
                .insert([
                    {
                        submitted: new Date().toISOString(),
                        break: breakTotal,
                        verified: false,
                        is_best: false, // verify this in the admin panel
                        location: location ? (locationPrefix === "table" ? "on Table" : "at") + " " + location : null,
                        balls_potted: ballsPotted.length > 0 ? ballsPotted : null, 
                        player: selectedUserId 
                    }
                ])
                .select("id, break")
            if (error) {
                badSubmission = true;
                errorMessage = "Something went wrong sending the break. That can't be good."
                throw error
            } else {
                goodSubmission = true;
                successMessage = `Successfully sent break of ${data[0].break} to be verified!`
            }
        }, 100) // delay to make the animation replay
    }

    async function handleQueryUsers() {
        selectedUserId = "";
        confirmNewUser = false;
        const [firstName, lastName] = name.split(" ");
        if (firstName === "") {
            return;
        }
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .ilike("given_name", `%${firstName}%`)
            .ilike("last_name", `%${lastName ? lastName : ''}%`)
            .range(0, 2);
        if (error) { throw error };
        matchingUsers = data;
    }
</script>

<div class="my-3 w-5/6 bg-[#B1B1B1] rounded-md font-handwritten p-5">
    <div class="grid grid-cols-8 gap-y-5 items-center">
        <div class="text-red-ball text-xl col-span-3">Name</div>
        <div class="col-span-5 relative">
            <input on:keydown={debounce(handleQueryUsers)} bind:value={name} type="text" class="w-full { selectedUserId ? 'text-gray-500' : 'text-black' } text-xl bg-[#B1B1B1] border-black border-b" />
            {#if matchingUsers.length > 0 && !selectedUserId}
            <div class="absolute overflow-clip p-1 text-black bg-white opacity-80 text-sm w-full top-10 z-50">
                {#each matchingUsers as matchingUser}
                    <button type="button" on:click={() => { selectedUserId = matchingUser.user_id; name = matchingUser.given_name + " " + matchingUser.last_name; confirmNewUser = false; }} class="active:bg-gray-400">
                        { matchingUser.given_name } { matchingUser.last_name }
                    </button>
                {/each}
            </div>
            {/if}
        </div>
        <div class="text-red-ball text-xl col-span-3">Break</div>
        <input type="number" bind:value={breakTotal} pattern="[0-9]*" class="text-black text-xl bg-[#B1B1B1] col-span-5 border-b border-black" />
        <p class="mt-8 mb-1 col-span-full text-black">Optional fields</p>
        <select bind:value={locationPrefix} class="text-black text-xl bg-[#B1B1B1] col-span-2 p-0">
            <option value="table">Table</option>
            <option value="at">At</option>
        </select>
        <p class="col-span-1 p-2 text-black">▼</p>
        {#if locationPrefix === "at"}
            <input type="text" bind:value={location} class="text-black text-xl bg-[#B1B1B1] col-span-5 border-b border-black" />
        {:else if locationPrefix === "table"}
            <input type="number" bind:value={location} pattern="[0-9]*" class="text-black text-xl bg-[#B1B1B1] col-span-5 border-b border-black" />
        {/if}
        <div class="text-black col-span-full text-xl">Balls potted</div>
        <div class="flex justify-center gap-2 col-span-full flex-wrap">
            {#each ballsPotted as value, i}
                <button type="button" class="hover:cursor-pointer" on:click={() => {ballsPotted.splice(i, 1); ballsPotted = ballsPotted;}}>
                    <BoardBall value={value}></BoardBall>
                </button>
            {/each}
        </div>
        <div class="flex justify-center gap-x-2 col-span-full">
            {#each {length: 7} as _, i}
                <button type="button" class="hover:cursor-pointer" on:click={() => {ballsPotted.push(i + 1); ballsPotted = ballsPotted;}}>
                    <BoardBall value={i + 1}></BoardBall>
                </button>
            {/each}
        </div>
        <div class="col-span-full text-right text-2xl">
            <button type="button" on:click={handleFormSubmit} class="text-[#000587]">Submit</button>
        </div>
        {#if badSubmission}
            <p transition:scale={{ start: 0.5 }} class="col-span-full text-gray-500">{errorMessage}</p>
        {/if}
        {#if goodSubmission}
            <p transition:scale={{ start: 0.5 }} class="col-span-full text-green-800">{successMessage}</p>
        {/if}
    </div>
</div>

<style>
    input[type="text"],
    input[type="number"],
    select {
        -webkit-appearance: none;
        border-radius: 0;
    }
</style>