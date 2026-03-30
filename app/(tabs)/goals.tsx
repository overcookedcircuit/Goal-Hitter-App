import { Plus } from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoalCard } from "../../components/ui/GoalCard";
import { Colors } from "../../constants/colors";
import { MOCK_GOALS } from "../../constants/mockData";

type Tab = "active" | "completed";

export default function GoalsScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("active");

  const activeGoals = MOCK_GOALS;
  const completedGoals: typeof MOCK_GOALS = [];

  const displayed = activeTab === "active" ? activeGoals : completedGoals;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Goals</Text>
        <TouchableOpacity style={styles.newBtn} activeOpacity={0.8}>
          <Plus size={16} color="#fff" strokeWidth={2.5} />
          <Text style={styles.newBtnText}>New</Text>
        </TouchableOpacity>
      </View>

      {/* Tab toggle */}
      <View style={styles.tabWrap}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "active" && styles.tabActive]}
          onPress={() => setActiveTab("active")}
        >
          <Text style={[styles.tabText, activeTab === "active" && styles.tabTextActive]}>
            Active ({activeGoals.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "completed" && styles.tabActive]}
          onPress={() => setActiveTab("completed")}
        >
          <Text style={[styles.tabText, activeTab === "completed" && styles.tabTextActive]}>
            Completed ({completedGoals.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Goals list */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {displayed.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🎯</Text>
            <Text style={styles.emptyTitle}>No goals yet</Text>
            <Text style={styles.emptyText}>
              Tap the + New button to create your first goal
            </Text>
          </View>
        ) : (
          displayed.map((goal) => <GoalCard key={goal.id} goal={goal} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 32, paddingTop: 8 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: { fontSize: 28, fontWeight: "700", color: Colors.text.primary },
  newBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 99,
  },
  newBtnText: { color: "#fff", fontSize: 14, fontWeight: "600" },

  tabWrap: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: Colors.border,
    borderRadius: 12,
    padding: 3,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: "center",
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: Colors.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: { fontSize: 13, fontWeight: "500", color: Colors.text.secondary },
  tabTextActive: { color: Colors.text.primary, fontWeight: "600" },

  empty: {
    alignItems: "center",
    paddingTop: 60,
    gap: 8,
  },
  emptyEmoji: { fontSize: 48, marginBottom: 8 },
  emptyTitle: { fontSize: 18, fontWeight: "600", color: Colors.text.primary },
  emptyText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
