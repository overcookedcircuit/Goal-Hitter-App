import { Clock } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Task } from "../../constants/mockData";

interface TaskRowProps {
  task: Task;
  goalEmoji?: string;
  onToggle?: (id: string) => void;
}

export function TaskRow({ task, goalEmoji = "🎯", onToggle }: TaskRowProps) {
  const isCompleted = task.status === "COMPLETED";

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.checkbox, isCompleted && styles.checkboxDone]}
        onPress={() => onToggle?.(task.id)}
        activeOpacity={0.7}
      >
        {isCompleted && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.body}>
        <Text style={[styles.title, isCompleted && styles.titleDone]}>
          {task.title}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.emoji}>{goalEmoji}</Text>
          <Clock size={12} color={Colors.text.muted} strokeWidth={1.5} />
          <Text style={styles.metaText}>
            {task.scheduledTime} · {task.estimatedMinutes}min
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxDone: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  body: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text.primary,
  },
  titleDone: {
    textDecorationLine: "line-through",
    color: Colors.text.muted,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  emoji: {
    fontSize: 12,
  },
  metaText: {
    fontSize: 12,
    color: Colors.text.muted,
  },
});
