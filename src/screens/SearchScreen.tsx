
import { useRef, useState } from "react";
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

import GamePickerModal from "../components/GamePickerModal";
import BarPickerModal from "../components/BarPickerModal";
import type { Game } from "../services/gamesApi";
import { getUserCoordinates } from "../services/locationService";
import { getBars, type Bar } from "../services/barsApi";
import { barPickerTranslations } from "../i18n/barPickerTranslations";

export default function SearchScreen() {
    const [language, setLanguage] = useState<Language>("ru");
    const t = searchTranslations[language];
    const barT = barPickerTranslations[language];

    const insets = useSafeAreaInsets();
    const { height } = useWindowDimensions();

    const [selectedCategory, setSelectedCategory] =
        useState<SearchCategoryId | null>(null);

    const [selectedPlatform, setSelectedPlatform] =
        useState<GamePlatformId | null>(null);

    const [platformModalVisible, setPlatformModalVisible] =
        useState(false);

    const [selectedGames, setSelectedGames] = useState<Game[]>([]);
    const [gamePickerVisible, setGamePickerVisible] = useState(false);

    const openGamePickerAfterDismiss = useRef(false);

    const [barModalVisible, setBarModalVisible] = useState(false);
    const [barLoading, setBarLoading] = useState(false);
    const [foundBars, setFoundBars] = useState<Bar[]>([]);
    const [selectedBar, setSelectedBar] = useState<Bar | null>(null);

    const canSearch =
        selectedCategory !== null &&
        (selectedCategory !== "gaming" ||
            (selectedPlatform !== null && selectedGames.length > 0));

    const categoryHeight =
        height < 700 ? 60 : height < 800 ? 75 : 90;

    function selectCategory(id: SearchCategoryId) {
        if (id === "gaming") {
            setSelectedCategory("gaming");
            setPlatformModalVisible(true);
            return;
        }

        if (id === "bars") {
            setSelectedCategory(id);
            setBarModalVisible(true);
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

        if (selectedCategory === "bars") {
            setBarModalVisible(true);
            return;
        }

        Alert.alert(t.title, t.comingSoon);
    }




    async function handleBarSearch(radius: number) {
        if (barLoading) return;

        if (radius > 50) {
            Alert.alert(
                barT.radiusErrorTitle,
                barT.radiusErrorMessage
            );
            return;
        }

        setBarLoading(true);
        setFoundBars([]);

        try {
            const coordinates = await getUserCoordinates();

            const bars = await getBars({
                coordinates,
                radius,
            });

            setFoundBars(bars);

            if (bars.length === 0) {
                Alert.alert(
                    barT.noBarsTitle,
                    barT.noBarsMessage
                );
            }
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === "LOCATION_PERMISSION_DENIED"
            ) {
                Alert.alert(
                    barT.locationErrorTitle,
                    barT.locationErrorMessage
                );
            } else {
                console.error("Bar search failed:", error);

                Alert.alert(
                    barT.searchErrorTitle,
                    barT.searchErrorMessage
                );
            }
        } finally {
            setBarLoading(false);
        }
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
                                        ? `${t.categories.gaming} · ${t.platforms[selectedPlatform]} (${selectedGames.length})`
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
                            !canSearch && styles.buttonDisabled,
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
                onDismiss={() => {
                    if (openGamePickerAfterDismiss.current) {
                        openGamePickerAfterDismiss.current = false;
                        setGamePickerVisible(true);
                    }
                }}
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
                                    if (selectedPlatform !== platform.id) {
                                        setSelectedGames([]);
                                    }

                                    setSelectedPlatform(platform.id);
                                    openGamePickerAfterDismiss.current = true;
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

            <GamePickerModal
                visible={gamePickerVisible}
                platform={selectedPlatform}
                language={language}
                selectedGames={selectedGames}
                onClose={() => setGamePickerVisible(false)}
                onConfirm={(games) => {
                    setSelectedGames(games);
                    setGamePickerVisible(false);
                }}
            />

            <BarPickerModal
                visible={barModalVisible}
                language={language}
                bars={foundBars}
                loading={barLoading}
                onClose={() => setBarModalVisible(false)}
                onSearch={handleBarSearch}
                onConfirm={(bar) => {
                    setSelectedBar(bar);
                    setBarModalVisible(false);

                    Alert.alert(
                        barT.selectedBar,
                        `${bar.name}\n${bar.address}`
                    );
                }}
            />
        </SafeAreaView>
    );
}
