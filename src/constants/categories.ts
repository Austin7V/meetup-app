export const categories = [
  { id: "games", icon: "🎮" },
  { id: "movies", icon: "🎬" },
  { id: "chat", icon: "💬" },
  { id: "bars", icon: "🍸" },
  { id: "parties", icon: "🎉" },
  { id: "walking", icon: "🚶" },
  { id: "dating", icon: "❤️" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
