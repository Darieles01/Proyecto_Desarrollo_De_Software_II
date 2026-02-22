export function speciesEmoji(species: string): string {
  const map: Record<string, string> = {
    Dog: "🐶",
    Cat: "🐱",
    Horse: "🐴",
    Bird: "🐦",
    Rabbit: "🐰",
  };
  return map[species] ?? "🐾";
}
