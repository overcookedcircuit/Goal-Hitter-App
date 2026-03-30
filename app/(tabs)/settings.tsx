import { Bell, Crown, LogOut, Moon } from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/colors";
import { MOCK_USER } from "../../constants/mockData";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.title}>Settings</Text>

        {/* Profile */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {MOCK_USER.name[0].toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={styles.profileName}>{MOCK_USER.name} Patel</Text>
            <Text style={styles.profileEmail}>{MOCK_USER.email}</Text>
          </View>
        </View>

        {/* Upgrade Banner */}
        {!MOCK_USER.isPro && (
          <View style={styles.upgradeCard}>
            <View style={styles.upgradeHeader}>
              <Crown size={18} color={Colors.primary} strokeWidth={1.8} />
              <Text style={styles.upgradePlan}>Free Plan</Text>
            </View>
            <Text style={styles.upgradeDesc}>
              Up to 3 active goals. Upgrade for unlimited goals, smart scheduling, and advanced analytics.
            </Text>
            <TouchableOpacity style={styles.upgradeBtn} activeOpacity={0.85}>
              <Crown size={16} color="#fff" strokeWidth={1.8} />
              <Text style={styles.upgradeBtnText}>Upgrade to Pro</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Preferences */}
        <Text style={styles.sectionLabel}>Preferences</Text>
        <View style={styles.prefCard}>
          <View style={styles.prefRow}>
            <View style={styles.prefLeft}>
              <View style={[styles.prefIcon, { backgroundColor: "#F5F5F5" }]}>
                <Moon size={18} color={Colors.text.secondary} strokeWidth={1.8} />
              </View>
              <Text style={styles.prefLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.separator} />

          <View style={styles.prefRow}>
            <View style={styles.prefLeft}>
              <View style={[styles.prefIcon, { backgroundColor: "#F5F5F5" }]}>
                <Bell size={18} color={Colors.text.secondary} strokeWidth={1.8} />
              </View>
              <Text style={styles.prefLabel}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutBtn} activeOpacity={0.75}>
          <LogOut size={18} color="#EF5350" strokeWidth={1.8} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Goal Hitter v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 40 },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text.primary,
    marginTop: 8,
    marginBottom: 20,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.primary,
  },
  profileName: { fontSize: 16, fontWeight: "600", color: Colors.text.primary },
  profileEmail: { fontSize: 13, color: Colors.text.secondary, marginTop: 2 },

  upgradeCard: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: "#D8D5FA",
  },
  upgradeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  upgradePlan: { fontSize: 15, fontWeight: "700", color: Colors.text.primary },
  upgradeDesc: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  upgradeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 99,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  upgradeBtnText: { color: "#fff", fontSize: 14, fontWeight: "600" },

  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text.muted,
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: "uppercase",
  },

  prefCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  prefRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  prefLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  prefIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  prefLabel: { fontSize: 15, color: Colors.text.primary },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 48,
  },

  signOutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFF5F5",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  signOutText: { fontSize: 15, color: "#EF5350", fontWeight: "500" },

  version: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.text.muted,
  },
});
