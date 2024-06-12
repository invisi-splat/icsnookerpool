<script lang="ts">
    export let value: number;
    export let count: number;

    const textColorMapping = ["text-unverified-grey", "text-red-ball", "text-yellow-ball", "text-green-ball", "text-brown-ball", "text-blue-ball", "text-pink-ball", "text-black-ball"]
    const borderColorMapping = ["border-unverified-grey", "border-red-ball", "border-yellow-ball", "border-green-ball", "border-brown-ball", "border-blue-ball", "border-pink-ball", "border-black-ball"]
</script>

<div class="ball rounded-full border-4 w-8 h-8 flex justify-center items-center text-xl font-slab font-bold {textColorMapping[value]} {borderColorMapping[value]}">
    {count}
</div>