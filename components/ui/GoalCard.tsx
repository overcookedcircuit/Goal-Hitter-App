import { ChevronRight } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CategoryKey, Colors } from "../../constants/colors";
import { Goal } from "../../constants/mockData";

interface GoalCardProps {
  goal: Goal;
  onPress?: () => void;
  compact?: boolean;
}

export function GoalCard({ goal, onPress, compact = false }: GoalCardProps) {
  const catColor = Colors.category[goal.category as CategoryKey];
  const catBg = Colors.categoryBg[goal.category as CategoryKey];

  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.cardCompact]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Icon */}
      <View style={[styles.iconBox, { backgroundColor: catBg }]}>
        <Text style={styles.emoji}>{goal.emoji}</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={1}>
            {goal.title}
          </Text>
          {!compact && (
            <ChevronRight size={16} color={Colors.text.muted} strokeWidth={1.5} />
          )}
        </View>

        <Text style={[styles.category, { color: catColor }]}>
          {goal.category}
        </Text>

        {/* Progress */}
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>{goal.progress}%</Text>
          {!compact && (
            <Text style={styles.deadline}>
              📅 {new Date(goal.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </Text>
          )}
        </View>
        <View style={styles.progressBg}>
          <View
            style={[
              styles.progressFill,
              { width: `${goal.progress}%` as any, backgroundColor: catColor },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  cardCompact: {
    flex: 1,
    padding: 14,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  emoji: {
    fontSize: 22,
  },
  body: {
    flex: 1,
    gap: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text.primary,
    flex: 1,
  },
  category: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  deadline: {
    fontSize: 11,
    color: Colors.text.muted,
  },
  progressBg: {
    height: 5,
    backgroundColor: Colors.border,
    borderRadius: 99,
    overflow: "hidden",
    marginTop: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 99,
  },
});
