export type Category = "STUDY" | "FITNESS" | "CAREER" | "HEALTH" | "FINANCE";
export type Priority = "LOW" | "MEDIUM" | "HIGH";
export type TaskStatus = "PENDING" | "COMPLETED";

export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  category: Category;
  priority: Priority;
  progress: number; // 0–100
  emoji: string;
}

export interface Task {
  id: string;
  goalId: string;
  title: string;
  estimatedMinutes: number;
  scheduledTime: string; // "HH:MM"
  status: TaskStatus;
  date: string; // "YYYY-MM-DD"
}

export const MOCK_GOALS: Goal[] = [
  {
    id: "1",
    title: "Learn Spanish B1",
    description: "Reach B1 level in Spanish using Duolingo and podcasts",
    deadline: "2025-06-29",
    category: "STUDY",
    priority: "HIGH",
    progress: 33,
    emoji: "📚",
  },
  {
    id: "2",
    title: "Run a Half Marathon",
    description: "Complete a 21km half marathon race",
    deadline: "2025-09-14",
    category: "FITNESS",
    priority: "MEDIUM",
    progress: 20,
    emoji: "🏃",
  },
];

export const MOCK_TASKS: Task[] = [
  {
    id: "t1",
    goalId: "2",
    title: "Interval training session",
    estimatedMinutes: 45,
    scheduledTime: "07:00",
    status: "PENDING",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "t2",
    goalId: "1",
    title: "Spanish vocabulary review",
    estimatedMinutes: 30,
    scheduledTime: "09:00",
    status: "PENDING",
    date: new Date().toISOString().split("T")[0],
  },
];

export const MOCK_USER = {
  name: "Manas",
  email: "manaspatel31122004@gmail.com",
  isPro: false,
  streak: 1,
};
