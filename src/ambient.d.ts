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
    player: User,
    opponent?: User | null,
    player_info: UserInfo,
    opponent_info?: UserInfo | null,
}[]

type User = {
    user_id: string,
    last_name: string,
    given_name: string,
}

type UserInfo = {
    user_id: string,
    status: "alumnus" | "student",
    type: "admin" | "user"
}