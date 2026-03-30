import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/colors";
import { MOCK_GOALS, MOCK_USER } from "../../constants/mockData";

const { width } = Dimensions.get("window");

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Mock weekly activity data (tasks completed per day)
const WEEK_DATA = [0, 0, 0, 0, 2, 3, 1];

interface StatCardProps {
  emoji: string;
  value: string | number;
  label: string;
  color?: string;
  bgColor?: string;
}

function StatCard({ emoji, value, label, color = Colors.primary, bgColor = Colors.primaryLight }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIconWrap, { backgroundColor: bgColor }]}>
        <Text style={styles.statEmoji}>{emoji}</Text>
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function ProgressScreen() {
  const maxVal = Math.max(...WEEK_DATA, 1);
  const chartHeight = 120;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Progress</Text>
          <Text style={styles.subtitle}>Your productivity overview</Text>
        </View>

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          <StatCard
            emoji="🎯"
            value={MOCK_GOALS.length}
            label="GOALS"
            color="#6C63FF"
            bgColor="#EEF0FF"
          />
          <StatCard
            emoji="✅"
            value={2}
            label="COMPLETED"
            color="#4CAF50"
            bgColor="#E8F5E9"
          />
          <StatCard
            emoji="⏱"
            value={1}
            label="HOURS"
            color="#2196F3"
            bgColor="#E3F2FD"
          />
          <StatCard
            emoji="🔥"
            value={MOCK_USER.streak}
            label="STREAK"
            color="#FF9800"
            bgColor="#FFF3E0"
          />
        </View>

        {/* Weekly chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>This Week</Text>
          <View style={styles.chart}>
            {WEEK_DATA.map((val, i) => {
              const barH = val > 0 ? (val / maxVal) * chartHeight : 4;
              const isToday = i === new Date().getDay() - 1;
              return (
                <View key={i} style={styles.barCol}>
                  <View style={styles.barWrap}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: barH,
                          backgroundColor: isToday
                            ? Colors.primary
                            : val > 0
                            ? Colors.primaryLight
                            : Colors.border,
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.barLabel, isToday && styles.barLabelActive]}>
                    {WEEK_DAYS[i]}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Goal progress breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Goal Progress</Text>
          {MOCK_GOALS.map((goal) => (
            <View key={goal.id} style={styles.goalRow}>
              <Text style={styles.goalEmoji}>{goal.emoji}</Text>
              <View style={styles.goalInfo}>
                <View style={styles.goalInfoHeader}>
                  <Text style={styles.goalName} numberOfLines={1}>
                    {goal.title}
                  </Text>
                  <Text style={styles.goalPct}>{goal.progress}%</Text>
                </View>
                <View style={styles.goalBarBg}>
                  <View
                    style={[
                      styles.goalBarFill,
                      {
                        width: `${goal.progress}%` as any,
                        backgroundColor: Colors.category[goal.category as keyof typeof Colors.category],
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 40 },

  header: { marginTop: 8, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "700", color: Colors.text.primary },
  subtitle: { fontSize: 14, color: Colors.text.secondary, marginTop: 2 },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 52) / 2,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  statEmoji: { fontSize: 20 },
  statValue: { fontSize: 28, fontWeight: "700" },
  statLabel: {
    fontSize: 11,
    color: Colors.text.muted,
    fontWeight: "500",
    letterSpacing: 0.5,
  },

  chartCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 20,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 160,
    paddingTop: 20,
  },
  barCol: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  barWrap: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  bar: {
    width: 28,
    borderRadius: 8,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 11,
    color: Colors.text.muted,
    fontWeight: "400",
  },
  barLabelActive: {
    color: Colors.primary,
    fontWeight: "600",
  },

  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: 12,
  },
  goalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  goalEmoji: { fontSize: 24 },
  goalInfo: { flex: 1, gap: 6 },
  goalInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalName: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text.primary,
    flex: 1,
  },
  goalPct: { fontSize: 13, fontWeight: "600", color: Colors.text.secondary },
  goalBarBg: {
    height: 5,
    backgroundColor: Colors.border,
    borderRadius: 99,
    overflow: "hidden",
  },
  goalBarFill: { height: "100%", borderRadius: 99 },
});
