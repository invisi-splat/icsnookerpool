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
                symbol: "W",
                description: "Whatsapp group chat",
                ballColor: "bg-whatsapp-green",
                linkTo: "https://chat.whatsapp.com/EFJm97Ri4PGL5VFhyMVUSj",
                delay: 400
            },
            {
                symbol: "H",
                description: "High break board",
                ballColor: "bg-black",
                linkTo: "/board",
                delay: 600
            },
            {
                symbol: "I",
                description: "Instagram",
                ballColor: "instagram",
                linkTo: "https://www.instagram.com/icusnooker/",
                delay: 800
            }
        ]
	};
};