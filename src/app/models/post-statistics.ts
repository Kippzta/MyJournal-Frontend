import { MoodStat } from "./mood-stat";

export interface PostStatistics {

    totalPosts: number;

    startDate: string;

    endDate: string;

    moodStats: MoodStat[];
}
