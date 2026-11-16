export const searchCategories = [
    {
        id: "gaming",
        icon: "🎮",
    },
    {
        id: "bars",
        icon: "🍸",
    },
    {
        id: "movies",
        icon: "🎬",
    },
    {
        id: "bowling",
        icon: "🎳",
    },
    {
        id: "walking",
        icon: "🚶",
    },
    {
        id: "parties",
        icon: "🎉",
    },
] as const;

export type SearchCategoryId =
    (typeof searchCategories)[number]["id"];
