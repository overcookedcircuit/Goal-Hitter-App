import { create } from "zustand";
import { Goal, Task, MOCK_GOALS, MOCK_TASKS } from "../constants/mockData";

interface GoalStore {
  goals: Goal[];
  tasks: Task[];

  // Goal actions
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;

  // Task actions
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;

  // Computed
  getGoalById: (id: string) => Goal | undefined;
  getTasksForGoal: (goalId: string) => Task[];
  getTasksForDate: (date: string) => Task[];
  getTodayProgress: () => { completed: number; pending: number; total: number; pct: number };
}

export const useGoalStore = create<GoalStore>((set, get) => ({
  // Seeded with mock data — swap for Supabase calls once auth is wired up
  goals: MOCK_GOALS,
  tasks: MOCK_TASKS,

  addGoal: (goal) =>
    set((state) => ({ goals: [goal, ...state.goals] })),

  updateGoal: (id, updates) =>
    set((state) => ({
      goals: state.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
    })),

  deleteGoal: (id) =>
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== id),
      tasks: state.tasks.filter((t) => t.goalId !== id),
    })),

  addTask: (task) =>
    set((state) => ({ tasks: [task, ...state.tasks] })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "COMPLETED" ? "PENDING" : "COMPLETED" }
          : t
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

  getGoalById: (id) => get().goals.find((g) => g.id === id),

  getTasksForGoal: (goalId) =>
    get().tasks.filter((t) => t.goalId === goalId),

  getTasksForDate: (date) =>
    get().tasks.filter((t) => t.date === date),

  getTodayProgress: () => {
    const today = new Date().toISOString().split("T")[0];
    const todayTasks = get().tasks.filter((t) => t.date === today);
    const completed = todayTasks.filter((t) => t.status === "COMPLETED").length;
    const total = todayTasks.length;
    return {
      completed,
      pending: total - completed,
      total,
      pct: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  },
}));
