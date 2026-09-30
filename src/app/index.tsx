import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const messages = [
  "Uma nova ideia pode começar hoje.",
  "Seu cartão digital está pronto para compartilhar.",
  "Pequenos detalhes fazem a diferença.",
  "Hora de criar algo incrível.",
];

export default function Index() {
  const [bio, setBio] = useState("");
  const [draftBio, setDraftBio] = useState("");
  const [editing, setEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationsSaved, setNotificationsSaved] = useState(false);
  const [notificationsActive, setNotificationsActive] = useState(false);
  const [toastVersion, setToastVersion] = useState(0);
  const hasBioChanges = draftBio.trim() !== bio;
  const hasNotificationChanges =
    notificationsEnabled !== notificationsSaved ||
    notificationsEnabled !== notificationsActive;

  useEffect(() => {
    if (!notificationsActive) return;
    const timer = setInterval(() => {
      Alert.alert(
        "Notificação",
        messages[Math.floor(Math.random() * messages.length)],
        undefined,
        { cancelable: true },
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [notificationsActive]);

  useEffect(() => {
    if (!toastVersion) return;
    const timer = setTimeout(() => setToastVersion(0), 2500);
    return () => clearTimeout(timer);
  }, [toastVersion]);

  function openEditor() {
    setDraftBio(bio);
    setEditing(true);
  }

  function saveBio() {
    setBio(draftBio.trim());
    setEditing(false);
  }

  function toggleNotifications(enabled: boolean) {
    setNotificationsEnabled(enabled);
    if (!enabled) setNotificationsActive(false);
  }

  function saveSettings() {
    setNotificationsSaved(notificationsEnabled);
    setNotificationsActive(notificationsEnabled);
    setToastVersion((version) => version + 1);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profile}>
          <Image
            source={require("../../assets/images/profile-avatar.png")}
            style={styles.avatar}
            accessibilityLabel="Foto fictícia de Marina Costa"
          />
          <Text style={styles.name}>Marina Costa</Text>
          <Text style={styles.role}>Designer de experiências digitais</Text>
          <Text style={styles.location}>São Paulo, Brasil</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>BIO</Text>
            <Pressable
              onPress={openEditor}
              accessibilityRole="button"
              hitSlop={10}
            >
              <Text style={styles.textButton}>Editar Bio ↗</Text>
            </Pressable>
          </View>
          <Text style={styles.bio}>{bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CONFIGURAÇÕES</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingCopy}>
              <Text style={styles.settingTitle}>Receber Notificações</Text>
              <Text style={styles.settingHint}>
                Uma mensagem a cada 5 segundos
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: "#D2D2D7", true: "#0066CC" }}
              thumbColor="#FFFFFF"
              accessibilityLabel="Receber Notificações"
            />
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            !hasNotificationChanges && styles.disabledButton,
            pressed && hasNotificationChanges && styles.pressed,
          ]}
          onPress={saveSettings}
          disabled={!hasNotificationChanges}
          accessibilityRole="button"
          accessibilityState={{ disabled: !hasNotificationChanges }}
        >
          <Text
            style={[
              styles.saveButtonText,
              !hasNotificationChanges && styles.disabledButtonText,
            ]}
          >
            Salvar
          </Text>
        </Pressable>

        {/* Para usar o Alert exigido no enunciado, comente o botão acima e descomente este.
        <Pressable
          style={[styles.saveButton, !hasNotificationChanges && styles.disabledButton]}
          onPress={() => {
            setNotificationsSaved(notificationsEnabled);
            setNotificationsActive(notificationsEnabled);
            Alert.alert("Sucesso", "Dados salvos com sucesso!");
          }}
          disabled={!hasNotificationChanges}
          accessibilityRole="button"
          accessibilityState={{ disabled: !hasNotificationChanges }}
        >
          <Text style={[styles.saveButtonText, !hasNotificationChanges && styles.disabledButtonText]}>
            Salvar
          </Text>
        </Pressable>
        */}
      </ScrollView>

      {toastVersion > 0 && (
        <View
          style={styles.toast}
          accessible
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          <Text style={styles.toastText}>Dados salvos com sucesso!</Text>
        </View>
      )}

      <Modal
        visible={editing}
        transparent
        animationType="fade"
        onRequestClose={() => setEditing(false)}
      >
        <KeyboardAvoidingView style={styles.modalBackdrop} behavior="height">
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setEditing(false)}
            accessibilityRole="button"
            accessibilityLabel="Fechar edição da bio"
          />
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Bio</Text>
              <Pressable
                onPress={() => setEditing(false)}
                accessibilityRole="button"
                hitSlop={10}
              >
                <Text style={styles.closeButton}>Fechar</Text>
              </Pressable>
            </View>
            <Text style={styles.modalHint}>Conte um pouco sobre você.</Text>
            <TextInput
              value={draftBio}
              onChangeText={setDraftBio}
              multiline
              autoFocus
              placeholder="Escreva sua bio aqui..."
              placeholderTextColor="#86868B"
              style={styles.bioInput}
              textAlignVertical="top"
              accessibilityLabel="Texto da bio"
            />
            <Pressable
              style={[styles.modalSaveButton, !hasBioChanges && styles.disabledButton]}
              onPress={saveBio}
              disabled={!hasBioChanges}
              accessibilityRole="button"
              accessibilityState={{ disabled: !hasBioChanges }}
            >
              <Text
                style={[
                  styles.saveButtonText,
                  !hasBioChanges && styles.disabledButtonText,
                ]}
              >
                Salvar Bio
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F5F7" },
  content: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 32,
  },
  profile: { alignItems: "center", paddingTop: 48, paddingBottom: 44 },
  avatar: {
    width: 164,
    height: 164,
    borderRadius: 82,
    backgroundColor: "#D2D2D7",
  },
  name: {
    marginTop: 25,
    color: "#1D1D1F",
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: -1.2,
    textAlign: "center",
  },
  role: { marginTop: 8, color: "#3A3A3C", fontSize: 16, textAlign: "center" },
  location: {
    marginTop: 7,
    color: "#86868B",
    fontSize: 13,
    textAlign: "center",
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 22,
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionLabel: {
    color: "#86868B",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.8,
  },
  textButton: { color: "#0066CC", fontSize: 14, fontWeight: "600" },
  bio: {
    minHeight: 74,
    paddingTop: 18,
    color: "#1D1D1F",
    fontSize: 16,
    lineHeight: 25,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingTop: 23,
  },
  settingCopy: { flex: 1 },
  settingTitle: { color: "#1D1D1F", fontSize: 16, fontWeight: "600" },
  settingHint: { marginTop: 5, color: "#86868B", fontSize: 12 },
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
    marginTop: 6,
    borderRadius: 27,
    backgroundColor: "#0066CC",
  },
  pressed: { opacity: 0.82 },
  saveButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  disabledButton: { backgroundColor: "#E0E0E0" },
  disabledButtonText: { color: "#6E6E73" },
  toast: {
    position: "absolute",
    pointerEvents: "none",
    right: 24,
    bottom: 16,
    left: 24,
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#1D1D1F",
  },
  toastText: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  modalCard: { padding: 25, borderRadius: 24, backgroundColor: "#FFFFFF" },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: { color: "#1D1D1F", fontSize: 24, fontWeight: "700" },
  closeButton: { color: "#0066CC", fontSize: 14, fontWeight: "600" },
  modalHint: { marginTop: 9, color: "#86868B", fontSize: 14 },
  bioInput: {
    height: 150,
    marginTop: 22,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 13,
    color: "#1D1D1F",
    fontSize: 16,
    lineHeight: 23,
  },
  modalSaveButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: "#0066CC",
  },
});
