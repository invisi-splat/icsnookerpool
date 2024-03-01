type BallColor = "bg-union-purple" | "bg-whatsapp-green" | "bg-black" | "instagram" | "bg-white"

type BallInfo = {
    symbol: string,
    description: string,
    ballColor: BallColor,
    linkTo: string,
    delay: number
}

type BreakInfo = {
    id: number,
    submitted: string,
    break: number,
    verified: boolean,
    is_best: boolean,
    location: string,
    balls_potted?: number[] | null,
    reactions?: number[] | null, // change this to an appropriate type
    player: {
        user_id: string,
        last_name: string,
        given_name: string,
    },
    opponent?: {
        user_id: string,
        last_name: string,
        given_name: string
    } | null,
    player_info: {
        type: string,
        status: string,
        user_id: string
    },
    opponent_info?: {
        type: string,
        status: string,
        user_id: string
    } | null,
}[]