import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/colors";
import { supabase } from "../../lib/supabase";

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  async function handleSignup() {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    if (error) {
      setError(error.message);
    } else {
      setConfirmed(true);
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.safe}>
      {confirmed ? (
        <View style={styles.confirmedContainer}>
          <Text style={styles.confirmedEmoji}>📧</Text>
          <Text style={styles.confirmedTitle}>Check your email</Text>
          <Text style={styles.confirmedText}>
            We sent a confirmation link to{"\n"}
            <Text style={styles.confirmedEmail}>{email}</Text>
            {"\n\n"}Click the link in the email to activate your account, then come back and sign in.
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => router.replace("/auth/login" as any)}
            activeOpacity={0.85}
          >
            <Text style={styles.btnText}>Go to sign in</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.logo}>🎯</Text>
              <Text style={styles.appName}>Goal Hitter</Text>
              <Text style={styles.tagline}>Turn goals into daily actions</Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.formTitle}>Create account</Text>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Manas Patel"
                  placeholderTextColor={Colors.text.muted}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor={Colors.text.muted}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Min. 6 characters"
                  placeholderTextColor={Colors.text.muted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={[styles.btn, loading && styles.btnDisabled]}
                onPress={handleSignup}
                activeOpacity={0.85}
                disabled={loading}
              >
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.btnText}>Create account</Text>
                }
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.switchBtn}
                onPress={() => router.back()}
              >
                <Text style={styles.switchText}>
                  Already have an account?{" "}
                  <Text style={styles.switchLink}>Sign in</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },
  container: { flex: 1, paddingHorizontal: 24 },

  header: { alignItems: "center", marginTop: 40, marginBottom: 32 },
  logo: { fontSize: 56, marginBottom: 8 },
  appName: { fontSize: 28, fontWeight: "700", color: Colors.text.primary },
  tagline: { fontSize: 14, color: Colors.text.secondary, marginTop: 4 },

  form: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 40,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: 20,
  },
  error: {
    fontSize: 13,
    color: "#EF5350",
    backgroundColor: "#FFF5F5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  inputGroup: { marginBottom: 16 },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.text.secondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.text.primary,
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  btnDisabled: { opacity: 0.7 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  switchBtn: { marginTop: 16, alignItems: "center" },
  switchText: { fontSize: 14, color: Colors.text.secondary },
  switchLink: { color: Colors.primary, fontWeight: "600" },

  confirmedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  confirmedEmoji: { fontSize: 64, marginBottom: 16 },
  confirmedTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: 12,
  },
  confirmedText: {
    fontSize: 15,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  confirmedEmail: {
    color: Colors.primary,
    fontWeight: "600",
  },
});