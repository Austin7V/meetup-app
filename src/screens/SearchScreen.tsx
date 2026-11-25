
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

import {
    gamePlatforms,
    type GamePlatformId,
} from "../constants/gamePlatforms";

import type { Language } from "../i18n/translations";
import { searchTranslations } from "../i18n/searchTranslations";
import { barPickerTranslations } from "../i18n/barPickerTranslations";

import { searchStyles as styles } from "../styles/search.styles";

import GamePickerModal from "../components/GamePickerModal";
import BarPickerModal from "../components/BarPickerModal";
import PlacePickerModal from "../components/PlacePickerModal";

import type { Game } from "../services/gamesApi";
import { getUserCoordinates } from "../services/locationService";
import { getBars, type Bar } from "../services/barsApi";
import type { Place } from "../services/placesApi";
import { getPlaces } from "../services/placesApi";
import { cinemaSearchMessages } from "../i18n/placePickerTranslations";

export default function SearchScreen() {
    const [language, setLanguage] = useState<Language>("ru");
    const t = searchTranslations[language];
    const barT = barPickerTranslations[language];
    const cinemaT = cinemaSearchMessages[language];
    const insets = useSafeAreaInsets();
    const { height } = useWindowDimensions();

    const [selectedCategory, setSelectedCategory] =
        useState<SearchCategoryId | null>(null);

    // --------------------------------------------------
    // GAMING
    // --------------------------------------------------

    const [selectedPlatform, setSelectedPlatform] =
        useState<GamePlatformId | null>(null);

    const [platformModalVisible, setPlatformModalVisible] =
        useState(false);

    const [selectedGames, setSelectedGames] = useState<Game[]>([]);

    const [gamePickerVisible, setGamePickerVisible] =
        useState(false);

    const openGamePickerAfterDismiss = useRef(false);

    // --------------------------------------------------
    // BARS
    // --------------------------------------------------

    const [barModalVisible, setBarModalVisible] =
        useState(false);

    const [barLoading, setBarLoading] = useState(false);

    const [foundBars, setFoundBars] = useState<Bar[]>([]);

    const [selectedBar, setSelectedBar] =
        useState<Bar | null>(null);

    const [barDetailsVisible, setBarDetailsVisible] =
        useState(false);

    // --------------------------------------------------
    // CINEMAS
    // --------------------------------------------------

    // RU: Управляет окном поиска кинотеатров.
    // DE: Steuert das Modalfenster zur Kinosuche.
    const [movieModalVisible, setMovieModalVisible] =
        useState(false);

    // RU: Список найденных кинотеатров.
    // DE: Liste der gefundenen Kinos.
    const [foundCinemas, setFoundCinemas] =
        useState<Place[]>([]);

    // RU: Выбранный кинотеатр.
    // DE: Ausgewähltes Kino.
    const [selectedCinema, setSelectedCinema] =
        useState<Place | null>(null);

    // RU: Состояние загрузки кинотеатров.
    // DE: Ladezustand der Kinosuche.
    const [cinemaLoading, setCinemaLoading] = useState(false);

    // --------------------------------------------------
    // SEARCH SETTINGS
    // --------------------------------------------------

    const canSearch =
        selectedCategory !== null &&
        (selectedCategory !== "gaming" ||
            (selectedPlatform !== null &&
                selectedGames.length > 0));

    const categoryHeight =
        height < 700 ? 60 : height < 800 ? 75 : 90;

    function selectCategory(id: SearchCategoryId) {
        if (id === "gaming") {
            setSelectedCategory("gaming");
            setPlatformModalVisible(true);
            return;
        }

        // Bars
        if (id === "bars") {
            setSelectedCategory("bars");
            setBarModalVisible(true);
            return;
        }

        // Cinemas
        if (id === "movies") {
            setSelectedCategory("movies");
            setMovieModalVisible(true);
            return;
        }

        // Other categories
        setSelectedCategory((current) =>
            current === id ? null : id
        );
    }

    // RU: Обработчик главной кнопки поиска.
    // DE: Aktion der Hauptsuchschaltfläche.
    function handleSearch() {
        if (!selectedCategory) {
            Alert.alert(t.selectCategory);
            return;
        }

        if (selectedCategory === "bars") {
            setBarModalVisible(true);
            return;
        }

        if (selectedCategory === "movies") {
            setMovieModalVisible(true);
            return;
        }

        Alert.alert(t.title, t.comingSoon);
    }

    // --------------------------------------------------
    // BAR SEARCH
    // --------------------------------------------------

    // RU: Выполняем поиск баров после нажатия кнопки.
    // DE: Barsuche erst nach einem Tastendruck.
    async function handleBarSearch(radius: number) {
        if (barLoading) {
            return;
        }

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
    // --------------------------------------------------
    // Cinema SEARCH
    // --------------------------------------------------

    async function handleCinemaSearch(radius: number) {
        // RU: Не допускаем повторного запроса во время загрузки.
        // DE: Doppelte Anfragen während des Ladens verhindern.
        if (cinemaLoading) return;

        if (!Number.isInteger(radius) || radius < 1 || radius > 50) {
            return;
        }

        setCinemaLoading(true);
        setFoundCinemas([]);

        try {
            // RU: Получаем координаты iPhone после нажатия кнопки.
            // DE: Standort erst nach dem Tastendruck ermitteln.
            const coordinates = await getUserCoordinates();

            // RU: Запрос кинотеатров через наш backend.
            // DE: Kinos über unser Backend suchen.
            const cinemas = await getPlaces({
                coordinates,
                radius,
                category: "cinemas",
            });

            setFoundCinemas(cinemas);

            if (cinemas.length === 0) {
                Alert.alert(
                    cinemaT.noResultsTitle,
                    cinemaT.noResultsMessage
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
                console.error("Cinema search failed:", error);

                Alert.alert(
                    cinemaT.errorTitle,
                    cinemaT.errorMessage
                );
            }
        } finally {
            setCinemaLoading(false);
        }
    }

    // --------------------------------------------------
    // RENDER
    // --------------------------------------------------

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
                {/* HEADER */}

                <View style={styles.header}>
                    <Text style={styles.brand}>
                        MEETUP
                    </Text>

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

                {/* SCREEN TITLE */}

                <Text style={styles.title}>
                    {t.title}
                </Text>

                <Text style={styles.subtitle}>
                    {t.subtitle}
                </Text>

                <Text style={styles.sectionTitle}>
                    {t.categoriesTitle}
                </Text>

                {/* CATEGORIES */}

                <View style={styles.categoryGrid}>
                    {searchCategories.map((category) => {
                        const selected =
                            selectedCategory === category.id;

                        return (
                            <Pressable
                                key={category.id}
                                onPress={() =>
                                    selectCategory(category.id)
                                }
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
                                        selected &&
                                        styles.categoryLabelSelected,
                                    ]}
                                >
                                    {category.id === "gaming" &&
                                    selectedPlatform
                                        ? `${t.categories.gaming} · ${
                                            t.platforms[selectedPlatform]
                                        } (${selectedGames.length})`
                                        : t.categories[category.id]}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                {/* BOTTOM SECTION */}

                <View style={styles.bottomSection}>
                    <View style={styles.distanceContainer}>
                        {selectedCategory === "bars" &&
                        selectedBar ? (
                            <>
                                <Text style={styles.distanceTitle}>
                                    🍸 {barT.selectedBar}
                                </Text>

                                <Pressable
                                    onPress={() =>
                                        setBarDetailsVisible(true)
                                    }
                                    accessibilityRole="button"
                                    accessibilityLabel={selectedBar.name}
                                    style={styles.selectedBarButton}
                                >
                                    <Text
                                        style={styles.distanceValue}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {selectedBar.name}
                                    </Text>

                                    <Text style={styles.selectedBarArrow}>
                                        ›
                                    </Text>
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <Text style={styles.distanceTitle}>
                                    📍 {t.distance}
                                </Text>

                                <Text style={styles.distanceValue}>
                                    {t.comingSoon}
                                </Text>
                            </>
                        )}
                    </View>

                    {/* MAIN SEARCH BUTTON */}

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

            {/* ------------------------------------------------
          GAME PLATFORM MODAL
      ------------------------------------------------ */}

            <Modal
                visible={platformModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() =>
                    setPlatformModalVisible(false)
                }
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
                                onPress={() =>
                                    setPlatformModalVisible(false)
                                }
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
                                    if (
                                        selectedPlatform !== platform.id
                                    ) {
                                        setSelectedGames([]);
                                    }

                                    setSelectedPlatform(platform.id);

                                    openGamePickerAfterDismiss.current =
                                        true;

                                    setPlatformModalVisible(false);
                                }}
                                style={[
                                    styles.platformOption,
                                    selectedPlatform === platform.id &&
                                    styles.platformOptionSelected,
                                ]}
                                accessibilityRole="button"
                                accessibilityState={{
                                    selected:
                                        selectedPlatform === platform.id,
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

            {/* GAME PICKER */}

            <GamePickerModal
                visible={gamePickerVisible}
                platform={selectedPlatform}
                language={language}
                selectedGames={selectedGames}
                onClose={() =>
                    setGamePickerVisible(false)
                }
                onConfirm={(games) => {
                    setSelectedGames(games);
                    setGamePickerVisible(false);
                }}
            />

            {/* BAR PICKER */}

            <BarPickerModal
                visible={barModalVisible}
                language={language}
                bars={foundBars}
                loading={barLoading}
                onClose={() =>
                    setBarModalVisible(false)
                }
                onSearch={handleBarSearch}
                onConfirm={(bar) => {
                    setSelectedBar(bar);
                    setBarModalVisible(false);
                }}
            />

            {/* ------------------------------------------------
          CINEMA PICKER
      ------------------------------------------------ */}

            <PlacePickerModal
                visible={movieModalVisible}
                language={language}
                category="cinemas"
                places={foundCinemas}
                loading={cinemaLoading}
                onClose={() => setMovieModalVisible(false)}
                onSearch={handleCinemaSearch}
                onConfirm={(cinema) => {
                    setSelectedCinema(cinema);
                    setMovieModalVisible(false);
                }}
            />

            {/* ------------------------------------------------
          SELECTED BAR DETAILS
      ------------------------------------------------ */}

            <Modal
                visible={barDetailsVisible}
                transparent
                animationType="fade"
                onRequestClose={() =>
                    setBarDetailsVisible(false)
                }
            >
                <View style={styles.barDetailsOverlay}>
                    <View style={styles.barDetailsCard}>
                        <Text style={styles.barDetailsIcon}>
                            🍸
                        </Text>

                        <Text style={styles.barDetailsTitle}>
                            {selectedBar?.name}
                        </Text>

                        <View style={styles.barDetailsAddressRow}>
                            <Text
                                style={styles.barDetailsLocationIcon}
                            >
                                📍
                            </Text>

                            <Text style={styles.barDetailsAddress}>
                                {selectedBar?.address}
                            </Text>
                        </View>

                        <Pressable
                            onPress={() =>
                                setBarDetailsVisible(false)
                            }
                            style={styles.barDetailsCloseButton}
                            accessibilityRole="button"
                        >
                            <Text style={styles.barDetailsCloseText}>
                                {barT.close}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
