import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoalCard } from "../../components/ui/GoalCard";
import { TaskRow } from "../../components/ui/TaskRow";
import { Colors } from "../../constants/colors";
import { MOCK_GOALS, MOCK_TASKS, MOCK_USER } from "../../constants/mockData";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function HomeScreen() {
  const router = useRouter();
  const completedCount = MOCK_TASKS.filter((t) => t.status === "COMPLETED").length;
  const pendingCount = MOCK_TASKS.filter((t) => t.status === "PENDING").length;
  const totalCount = MOCK_TASKS.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const todayTasks = MOCK_TASKS.filter(
    (t) => t.date === new Date().toISOString().split("T")[0]
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.name}>{MOCK_USER.name}</Text>
        </View>

        {/* Today's Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Today's Progress</Text>
            <Text style={styles.progressPct}>{progress}%</Text>
          </View>

          {/* Bar */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` as any }]} />
          </View>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <View style={styles.statIconWrap}>
                <Text style={styles.statIcon}>✓</Text>
              </View>
              <Text style={styles.statNum}>{completedCount}</Text>
              <Text style={styles.statLabel}>COMPLETED</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <View style={[styles.statIconWrap, { backgroundColor: "#FFF8E6" }]}>
                <Text style={styles.statIcon}>⏰</Text>
              </View>
              <Text style={styles.statNum}>{pendingCount}</Text>
              <Text style={styles.statLabel}>PENDING</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <View style={[styles.statIconWrap, { backgroundColor: "#F0EEFF" }]}>
                <Text style={styles.statIcon}>🎯</Text>
              </View>
              <Text style={styles.statNum}>{totalCount}</Text>
              <Text style={styles.statLabel}>TOTAL</Text>
            </View>
          </View>
        </View>

        {/* Active Goals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Goals</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/goals")}>
              <Text style={styles.seeAll}>See all &gt;</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.goalsRow}
          >
            {MOCK_GOALS.map((goal) => (
              <View key={goal.id} style={styles.goalCardWrap}>
                <GoalCard goal={goal} compact />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Today's Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/calendar")}>
              <Text style={styles.seeAll}>View all &gt;</Text>
            </TouchableOpacity>
          </View>

          {todayTasks.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No tasks scheduled for today 🎉</Text>
            </View>
          ) : (
            todayTasks.map((task) => {
              const goal = MOCK_GOALS.find((g) => g.id === task.goalId);
              return (
                <TaskRow key={task.id} task={task} goalEmoji={goal?.emoji} />
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 32 },

  header: { marginTop: 8, marginBottom: 20 },
  greeting: { fontSize: 14, color: Colors.text.secondary, fontWeight: "400" },
  name: { fontSize: 28, fontWeight: "700", color: Colors.text.primary, marginTop: 2 },

  progressCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressTitle: { fontSize: 16, fontWeight: "600", color: Colors.text.primary },
  progressPct: { fontSize: 20, fontWeight: "700", color: Colors.primary },
  progressBarBg: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 99,
    overflow: "hidden",
    marginBottom: 16,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 99,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  stat: { alignItems: "center", gap: 4 },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  statIcon: { fontSize: 16 },
  statNum: { fontSize: 20, fontWeight: "700", color: Colors.text.primary },
  statLabel: { fontSize: 10, color: Colors.text.muted, letterSpacing: 0.5, fontWeight: "500" },
  statDivider: { width: 1, height: 40, backgroundColor: Colors.border },

  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: Colors.text.primary },
  seeAll: { fontSize: 13, color: Colors.primary, fontWeight: "500" },

  goalsRow: { gap: 12, paddingRight: 4 },
  goalCardWrap: { width: 180 },

  empty: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyText: { color: Colors.text.secondary, fontSize: 14 },
});
