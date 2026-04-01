export const Colors = {
  primary: "#6C63FF",
  primaryLight: "#EEF0FF",
  primaryDark: "#4A43CC",

  surface: "#F8F8FC",
  card: "#FFFFFF",
  border: "#EDEDF5",

  text: {
    primary: "#1A1A2E",
    secondary: "#7B7B9A",
    muted: "#B0B0C8",
  },

  category: {
    STUDY: "#6C63FF",
    FITNESS: "#FF6B6B",
    CAREER: "#4ECDC4",
    HEALTH: "#45B7D1",
    FINANCE: "#96CEB4",
  },

  categoryBg: {
    STUDY: "#EEF0FF",
    FITNESS: "#FFF0F0",
    CAREER: "#E8FAFA",
    HEALTH: "#E8F6FA",
    FINANCE: "#EEF7F2",
  },

  status: {
    success: "#4CAF50",
    warning: "#FF9800",
    danger: "#F44336",
  },

  tabBar: {
    active: "#6C63FF",
    inactive: "#B0B0C8",
    background: "#FFFFFF",
    border: "#EDEDF5",
  },
} as const;

export type CategoryKey = keyof typeof Colors.category;
