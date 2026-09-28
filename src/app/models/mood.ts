// definerar att exakt ett av dessa moods kan användas i koden
export type Mood = "HAPPY" | "SAD" | "MOTIVATED" | "ANGRY" | "SUSPICIOUS"

// kopplar varje mood till en emoji
export const MOOD_EMOJI: Record<Mood, string> = {
    HAPPY: "😊",
    SAD: "☹️",
    MOTIVATED: "💪",
    ANGRY: "🤬",
    SUSPICIOUS: "🤨"
}