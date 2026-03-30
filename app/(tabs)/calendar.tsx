import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/colors";
import { MOCK_GOALS, MOCK_TASKS } from "../../constants/mockData";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getWeekDays(centeredDate: Date) {
  const days = [];
  const start = new Date(centeredDate);
  start.setDate(centeredDate.getDate() - 3);
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

const HOURS = Array.from({ length: 16 }, (_, i) => i + 6); // 06:00 to 21:00

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const weekDays = getWeekDays(selectedDate);

  const selectedDateStr = selectedDate.toISOString().split("T")[0];
  const tasksForDay = MOCK_TASKS.filter((t) => t.date === selectedDateStr);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <Text style={styles.subtitle}>{formatDate(selectedDate)}</Text>
      </View>

      {/* Week strip */}
      <View style={styles.weekStrip}>
        {weekDays.map((day, i) => {
          const isSelected =
            day.toDateString() === selectedDate.toDateString();
          const isToday = day.toDateString() === new Date().toDateString();
          return (
            <TouchableOpacity
              key={i}
              style={styles.dayCol}
              onPress={() => setSelectedDate(day)}
              activeOpacity={0.7}
            >
              <Text style={[styles.dayName, isSelected && styles.dayNameActive]}>
                {SHORT_DAYS[day.getDay()].toUpperCase().slice(0, 3)}
              </Text>
              <View
                style={[
                  styles.dayNum,
                  isSelected && styles.dayNumActive,
                  isToday && !isSelected && styles.dayNumToday,
                ]}
              >
                <Text
                  style={[
                    styles.dayNumText,
                    isSelected && styles.dayNumTextActive,
                    isToday && !isSelected && styles.dayNumTextToday,
                  ]}
                >
                  {day.getDate()}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Time slots */}
      <ScrollView
        style={styles.timeScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.timeContent}
      >
        {HOURS.map((hour) => {
          const hourStr = `${hour.toString().padStart(2, "0")}:00`;
          const tasksAtHour = tasksForDay.filter(
            (t) => t.scheduledTime.startsWith(hour.toString().padStart(2, "0"))
          );
          return (
            <View key={hour} style={styles.hourRow}>
              <Text style={styles.hourLabel}>{hourStr}</Text>
              <View style={styles.hourLine} />
              {tasksAtHour.map((task) => {
                const goal = MOCK_GOALS.find((g) => g.id === task.goalId);
                return (
                  <View key={task.id} style={styles.taskBlock}>
                    <View style={styles.taskBlockInner}>
                      <TouchableOpacity style={styles.taskCheckbox} activeOpacity={0.7}>
                        {task.status === "COMPLETED" && (
                          <Text style={styles.taskCheck}>✓</Text>
                        )}
                      </TouchableOpacity>
                      <View style={styles.taskInfo}>
                        <Text style={styles.taskTitle}>{task.title}</Text>
                        <Text style={styles.taskMeta}>
                          ⏱ {task.estimatedMinutes}min
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },

  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: { fontSize: 28, fontWeight: "700", color: Colors.text.primary },
  subtitle: { fontSize: 14, color: Colors.text.secondary, marginTop: 2 },

  weekStrip: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.card,
  },
  dayCol: { flex: 1, alignItems: "center", gap: 6, paddingVertical: 4 },
  dayName: { fontSize: 10, color: Colors.text.muted, fontWeight: "500", letterSpacing: 0.3 },
  dayNameActive: { color: Colors.primary },
  dayNum: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  dayNumActive: { backgroundColor: Colors.primary },
  dayNumToday: { backgroundColor: Colors.primaryLight },
  dayNumText: { fontSize: 15, fontWeight: "500", color: Colors.text.primary },
  dayNumTextActive: { color: "#fff", fontWeight: "700" },
  dayNumTextToday: { color: Colors.primary, fontWeight: "600" },

  timeScroll: { flex: 1 },
  timeContent: { paddingHorizontal: 20, paddingVertical: 8, paddingBottom: 40 },
  hourRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    minHeight: 56,
    paddingTop: 8,
    gap: 12,
  },
  hourLabel: {
    fontSize: 12,
    color: Colors.text.muted,
    width: 44,
    paddingTop: 2,
    textAlign: "right",
  },
  hourLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
    marginTop: 8,
  },

  taskBlock: {
    position: "absolute",
    left: 68,
    right: 0,
    top: 0,
  },
  taskBlockInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.primaryLight,
    borderRadius: 10,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  taskCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  taskCheck: { color: Colors.primary, fontSize: 12, fontWeight: "700" },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 13, fontWeight: "600", color: Colors.text.primary },
  taskMeta: { fontSize: 11, color: Colors.text.secondary, marginTop: 2 },
});
