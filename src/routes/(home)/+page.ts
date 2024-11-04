export const load: () => { ballInfo: BallInfo[] } = () => {
	return {
		ballInfo: [
            {
                symbol: "U",
                description: "Union website",
                ballColor: "bg-union-purple",
                linkTo: "http://www.union.ic.ac.uk/rcc/snooker_billiards",
                delay: 200
            },
            {
                symbol: "H",
                description: "High break board",
                ballColor: "bg-black",
                linkTo: "/board",
                delay: 400
            },
            {
                symbol: "I",
                description: "Instagram",
                ballColor: "instagram",
                linkTo: "https://www.instagram.com/icusnooker/",
                delay: 600
            },
            {
                symbol: "O",
                description: "Streaming tournament overlay",
                ballColor: "bg-red-800",
                linkTo: "/overlay",
                delay: 800
            }
        ]
	};
};