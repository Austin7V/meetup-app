
import { useState } from "react";
import {
    Alert,
    Modal,
    Pressable,
    StatusBar,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
    searchCategories,
    type SearchCategoryId,
} from "../constants/searchCategories";

import type { Language } from "../i18n/translations";
import { searchTranslations } from "../i18n/searchTranslations";
import { searchStyles as styles } from "../styles/search.styles";
import {
    gamePlatforms,
    type GamePlatformId,
} from "../constants/gamePlatforms";

export default function SearchScreen() {
    const [language, setLanguage] = useState<Language>("ru");
    const t = searchTranslations[language];
    const insets = useSafeAreaInsets();
    const [selectedCategory, setSelectedCategory] =
        useState<SearchCategoryId | null>(null);
    const [selectedPlatform, setSelectedPlatform] =
        useState<GamePlatformId | null>(null);

    const [platformModalVisible, setPlatformModalVisible] =
        useState(false);

    const canSearch =
        selectedCategory !== null &&
        (selectedCategory !== "gaming" || selectedPlatform !== null);

    const { height } = useWindowDimensions();

    const categoryHeight =
        height < 700 ? 60 : height < 800 ? 75 : 90;

    function selectCategory(id: SearchCategoryId) {
        if (id === "gaming") {
            setSelectedCategory("gaming");
            setPlatformModalVisible(true);
            return;
        }

        setSelectedCategory((current) =>
            current === id ? null : id
        );
    }

    function handleSearch() {
        if (!selectedCategory) {
            Alert.alert(t.selectCategory);
            return;
        }

        Alert.alert(t.title, t.comingSoon);
    }

    return (
        <SafeAreaView
            style={styles.screen}
            edges={["top", "left", "right"]}
        >
            <StatusBar barStyle="dark-content" />

            <View
                style={[
                    styles.container,
                    {
                        paddingBottom: insets.bottom + 100,
                    },
                ]}
            >
                <View style={styles.header}>
                    <Text style={styles.brand}>MEETUP</Text>

                    <View style={styles.languageContainer}>
                        {(["ru", "de", "en"] as const).map((lang) => {
                            const active = language === lang;

                            return (
                                <Pressable
                                    key={lang}
                                    onPress={() => setLanguage(lang)}
                                    style={[
                                        styles.languageButton,
                                        active && styles.languageButtonActive,
                                    ]}
                                    accessibilityRole="button"
                                    accessibilityState={{ selected: active }}
                                >
                                    <Text
                                        style={[
                                            styles.languageText,
                                            active && styles.languageTextActive,
                                        ]}
                                    >
                                        {lang.toUpperCase()}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <Text style={styles.title}>{t.title}</Text>
                <Text style={styles.subtitle}>{t.subtitle}</Text>

                <Text style={styles.sectionTitle}>
                    {t.categoriesTitle}
                </Text>

                <View style={styles.categoryGrid}>
                    {searchCategories.map((category) => {
                        const selected =
                            selectedCategory === category.id;

                        return (
                            <Pressable
                                key={category.id}
                                onPress={() => selectCategory(category.id)}
                                accessibilityRole="button"
                                accessibilityState={{ selected }}
                                style={[
                                    styles.category,
                                    { height: categoryHeight },
                                    selected && styles.categorySelected,
                                ]}
                            >
                                <Text style={styles.categoryIcon}>
                                    {category.icon}
                                </Text>

                                <Text
                                    style={[
                                        styles.categoryLabel,
                                        selected && styles.categoryLabelSelected,
                                    ]}
                                >
                                    {category.id === "gaming" && selectedPlatform
                                        ? `${t.categories.gaming} · ${t.platforms[selectedPlatform]}`
                                        : t.categories[category.id]}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                <View style={styles.bottomSection}>
                    <View style={styles.distanceContainer}>
                        <Text style={styles.distanceTitle}>
                            📍 {t.distance}
                        </Text>

                        <Text style={styles.distanceValue}>
                            {t.comingSoon}
                        </Text>
                    </View>

                    <Pressable
                        disabled={!canSearch}
                        onPress={handleSearch}
                        accessibilityRole="button"
                        style={[
                            styles.button,
                            !canSearch && styles.buttonDisabled
                        ]}
                    >
                        <Text style={styles.buttonText}>
                            {t.searchButton} →
                        </Text>
                    </Pressable>
                </View>
            </View>
            <Modal
                visible={platformModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setPlatformModalVisible(false)}
            >
                <View style={styles.platformOverlay}>
                    <View style={styles.platformSheet}>
                        <View style={styles.platformHeader}>
                            <View>
                                <Text style={styles.platformTitle}>
                                    🎮 {t.platformTitle}
                                </Text>

                                <Text style={styles.platformHint}>
                                    {t.platformHint}
                                </Text>
                            </View>

                            <Pressable
                                onPress={() => setPlatformModalVisible(false)}
                                accessibilityRole="button"
                            >
                                <Text style={styles.platformClose}>
                                    {t.close}
                                </Text>
                            </Pressable>
                        </View>

                        {gamePlatforms.map((platform) => (
                            <Pressable
                                key={platform.id}
                                onPress={() => {
                                    setSelectedPlatform(platform.id);
                                    setPlatformModalVisible(false);
                                }}
                                style={[
                                    styles.platformOption,
                                    selectedPlatform === platform.id &&
                                    styles.platformOptionSelected,
                                ]}
                                accessibilityRole="button"
                                accessibilityState={{
                                    selected: selectedPlatform === platform.id,
                                }}
                            >
                                <Text style={styles.platformIcon}>
                                    {platform.icon}
                                </Text>

                                <Text style={styles.platformName}>
                                    {t.platforms[platform.id]}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}
