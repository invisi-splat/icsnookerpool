<script lang="ts">
    interface Props {
        value: number;
    }

    let { value }: Props = $props();

    const textColorMapping = ["text-unverified-grey", "text-red-ball", "text-yellow-ball", "text-green-ball", "text-brown-ball", "text-blue-ball", "text-pink-ball", "text-black-ball"]
    const borderColorMapping = ["border-unverified-grey", "border-red-ball", "border-yellow-ball", "border-green-ball", "border-brown-ball", "border-blue-ball", "border-pink-ball", "border-black-ball"]
    const symbolMapping = ["?", "R", "Y", "G", "B", "B", "P", "B"]
</script>

<div class="ball rounded-full border-4 w-8 h-8 flex justify-center items-center text-lg font-slab {textColorMapping[value]} {borderColorMapping[value]}">
    {symbolMapping[value]}
</div>