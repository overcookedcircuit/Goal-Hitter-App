import { Tabs } from "expo-router";
import { BarChart2, Calendar, Home, Settings, Target } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

interface TabIconProps {
  icon: React.ReactNode;
  label: string;
  focused: boolean;
}

function TabIcon({ icon, label, focused }: TabIconProps) {
  return (
    <View style={styles.tabItem}>
      <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
        {icon}
      </View>
      <Text style={[styles.label, focused && styles.labelActive]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <Home
                  size={20}
                  color={focused ? Colors.primary : Colors.tabBar.inactive}
                  strokeWidth={focused ? 2.2 : 1.8}
                />
              }
              label="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <Target
                  size={20}
                  color={focused ? Colors.primary : Colors.tabBar.inactive}
                  strokeWidth={focused ? 2.2 : 1.8}
                />
              }
              label="Goals"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <Calendar
                  size={20}
                  color={focused ? Colors.primary : Colors.tabBar.inactive}
                  strokeWidth={focused ? 2.2 : 1.8}
                />
              }
              label="Calendar"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <BarChart2
                  size={20}
                  color={focused ? Colors.primary : Colors.tabBar.inactive}
                  strokeWidth={focused ? 2.2 : 1.8}
                />
              }
              label="Progress"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <Settings
                  size={20}
                  color={focused ? Colors.primary : Colors.tabBar.inactive}
                  strokeWidth={focused ? 2.2 : 1.8}
                />
              }
              label="Settings"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBar.background,
    borderTopColor: Colors.tabBar.border,
    borderTopWidth: 1,
    height: 65,
    paddingBottom: 8,
    paddingTop: 6,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingTop: 4,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: {
    backgroundColor: Colors.primaryLight,
  },
  label: {
    fontSize: 10,
    color: Colors.tabBar.inactive,
    fontWeight: "400",
    letterSpacing: -0.3,
    minWidth: 60,
    textAlign: "center",
  },
  labelActive: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
