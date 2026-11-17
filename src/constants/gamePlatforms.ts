
export const gamePlatforms = [
    {
        id: "pc",
        icon: "🖥️",
    },
    {
        id: "playstation",
        icon: "🎮",
    },
    {
        id: "xbox",
        icon: "🕹️",
    },
] as const;

export type GamePlatformId =
    (typeof gamePlatforms)[number]["id"];
