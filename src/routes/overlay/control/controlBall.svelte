<script lang="ts">
    interface Props {
        value: number;
    }

    let { value }: Props = $props();

    const textColorMapping = ["text-unverified-grey", "text-red-ball", "text-yellow-ball", "text-green-ball", "text-brown-ball", "text-blue-ball", "text-pink-ball", "text-black-ball"]
    const borderColorMapping = ["border-unverified-grey", "border-red-ball", "border-yellow-ball", "border-green-ball", "border-brown-ball", "border-blue-ball", "border-pink-ball", "border-black-ball"]
</script>

<div class="ball rounded-full border-4 w-[4.5rem] h-[4.5rem] flex justify-center items-center text-5xl font-slab {textColorMapping[value % textColorMapping.length]} {borderColorMapping[value % borderColorMapping.length]} bg-gray-200">
    {value > textColorMapping.length ? 'L' : value}
</div>