<script lang="ts">
    export let value: number;

    const textColorMapping = ["text-unverified-grey", "text-red-ball", "text-yellow-ball", "text-green-ball", "text-brown-ball", "text-blue-ball", "text-pink-ball", "text-black-ball"]
    const borderColorMapping = ["border-unverified-grey", "border-red-ball", "border-yellow-ball", "border-green-ball", "border-brown-ball", "border-blue-ball", "border-pink-ball", "border-black-ball"]
</script>

<div class="ball rounded-full border-4 w-[4.5rem] h-[4.5rem] flex justify-center items-center text-5xl font-slab {textColorMapping[value]} {borderColorMapping[value]} bg-gray-200">
    {value}
</div>