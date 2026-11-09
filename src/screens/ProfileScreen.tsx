import { useEffect, useState } from "react";
import {
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { categories, type CategoryId } from "../constants/categories";
import { locales, translations, type Language } from "../i18n/translations";
import { styles } from "../styles/profile.styles";
import { theme } from "../theme/theme";
import { calculateAge, latestAdultBirthDate } from "../utils/date";
import {
  loadProfile,
  saveProfile,
} from "../storage/profileStorage";

export default function ProfileScreen() {
  const [language, setLanguage] = useState<Language>("ru");
  const t = translations[language];

  const [nickname, setNickname] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [about, setAbout] = useState("");
  const [interests, setInterests] = useState<CategoryId[]>([]);
  const [profileSaved, setProfileSaved] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function restoreProfile() {
      try {
        const saved = await loadProfile();

        if (!isActive || !saved) return;

        const [year, month, day] = saved.birthDate
            .split("-")
            .map(Number);

        const restoredDate = new Date(year, month - 1, day);

        if (
            restoredDate.getFullYear() !== year ||
            restoredDate.getMonth() !== month - 1 ||
            restoredDate.getDate() !== day
        ) {
          return;
        }

        setNickname(saved.nickname);
        setBirthDate(restoredDate);
        setAbout(saved.about);
        setInterests(saved.interests as CategoryId[]);
        setProfileSaved(true);
      } catch (error) {
        console.error("Could not load profile:", error);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void restoreProfile();

    return () => {
      isActive = false;
    };
  }, []);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [draftDate, setDraftDate] = useState(new Date(2000, 0, 1));
  const maxBirthDate = latestAdultBirthDate();

  const canSave =
    nickname.trim().length >= 2 &&
    birthDate !== null &&
    calculateAge(birthDate) >= 18 &&
    interests.length > 0;

  function toggleInterest(id: CategoryId) {
    setInterests((current) =>
      current.includes(id)
        ? current.filter((interest) => interest !== id)
        : [...current, id]
    );
  }

  function openDatePicker() {
    Keyboard.dismiss();
    setDraftDate(birthDate ?? new Date(2000, 0, 1));
    setDatePickerVisible(true);
  }

  function confirmDate() {
    setBirthDate(draftDate);
    setDatePickerVisible(false);
  }

  async function handleSaveProfile() {
    if (!canSave || !birthDate || isSaving) return;

    setIsSaving(true);

    try {
      const year = birthDate.getFullYear();
      const month = String(birthDate.getMonth() + 1).padStart(2, "0");
      const day = String(birthDate.getDate()).padStart(2, "0");

      await saveProfile({
        nickname: nickname.trim(),
        birthDate: `${year}-${month}-${day}`,
        about: about.trim(),
        interests,
      });

      setProfileSaved(true);
    } catch (error) {
      console.error("Could not save profile:", error);
    } finally {
      setIsSaving(false);
    }
  }


  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.languages}>
          <Text style={styles.brand}>MEETUP</Text>
          <View style={styles.languageButtons}>
            {(["ru", "de", "en"] as const).map((lang) => (
              <Pressable
                key={lang}
                onPress={() => setLanguage(lang)}
                style={[
                  styles.languageButton,
                  language === lang && styles.languageActive,
                ]}
                accessibilityRole="button"
                accessibilityState={{ selected: language === lang }}
              >
                <Text
                  style={[
                    styles.languageText,
                    language === lang && styles.languageTextActive,
                  ]}
                >
                  {lang.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {!profileSaved ? (
          <>
            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.subtitle}>{t.subtitle}</Text>

            <TextInput
              style={styles.input}
              placeholder={t.nickname}
              placeholderTextColor={theme.colors.placeholder}
              value={nickname}
              onChangeText={setNickname}
              maxLength={30}
              autoCapitalize="words"
            />

            <Pressable
              style={styles.input}
              onPress={openDatePicker}
              accessibilityRole="button"
              accessibilityLabel={t.birthday}
            >
              <Text style={[styles.dateText, !birthDate && styles.placeholder]}>
                {birthDate
                  ? birthDate.toLocaleDateString(locales[language])
                  : t.birthday}
              </Text>
            </Pressable>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t.interests}</Text>
              <Text style={styles.sectionHint}>{t.multiple}</Text>
            </View>

            <View style={styles.categories}>
              {categories.map((category) => {
                const selected = interests.includes(category.id);
                return (
                  <Pressable
                    key={category.id}
                    onPress={() => toggleInterest(category.id)}
                    style={[styles.category, selected && styles.categorySelected]}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selected && styles.categoryTextSelected,
                      ]}
                    >
                      {category.icon} {t.categories[category.id]}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <TextInput
              style={[styles.input, styles.aboutInput]}
              placeholder={t.about}
              placeholderTextColor={theme.colors.placeholder}
              multiline
              maxLength={300}
              value={about}
              onChangeText={setAbout}
              textAlignVertical="top"
            />

            <Pressable
                disabled={!canSave || isSaving}
                onPress={() => void handleSaveProfile()}
                style={[
                  styles.button,
                  (!canSave || isSaving) && styles.buttonDisabled,
                ]}
                accessibilityRole="button"
            >
              <Text style={styles.buttonText}>{t.save} →</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.title}>
              {t.welcome}, {nickname}! 👋
            </Text>
            <Text style={styles.subtitle}>{t.ready}</Text>
            <Text style={styles.ageText}>
              {birthDate ? `${calculateAge(birthDate)} 🎂` : ""}
            </Text>
            <View style={styles.categories}>
              {interests.map((id) => {
                const category = categories.find((item) => item.id === id);
                return (
                  <View key={id} style={[styles.category, styles.categorySelected]}>
                    <Text style={styles.categoryTextSelected}>
                      {category?.icon} {t.categories[id]}
                    </Text>
                  </View>
                );
              })}
            </View>
            <Text style={styles.subtitle}>{t.search}</Text>
            <Pressable
              style={styles.button}
              onPress={() => setProfileSaved(false)}
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>{t.edit}</Text>
            </Pressable>
          </>
        )}
      </ScrollView>

      <Modal
        visible={datePickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDatePickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setDatePickerVisible(false)}>
                <Text style={styles.modalAction}>{t.cancel}</Text>
              </Pressable>
              <Pressable onPress={confirmDate}>
                <Text style={styles.modalAction}>{t.done}</Text>
              </Pressable>
            </View>
            <DateTimePicker
              value={draftDate}
              mode="date"
              display="spinner"
              locale={locales[language]}
              minimumDate={new Date(1900, 0, 1)}
              maximumDate={maxBirthDate}
              onChange={(_, selectedDate) => {
                if (selectedDate) setDraftDate(selectedDate);
              }}
              style={styles.datePicker}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
