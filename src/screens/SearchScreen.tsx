
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
import {
    cinemaSearchMessages,
    bowlingSearchMessages,
} from "../i18n/placePickerTranslations";

import { searchStyles as styles } from "../styles/search.styles";

import GamePickerModal from "../components/GamePickerModal";
import BarPickerModal from "../components/BarPickerModal";
import PlacePickerModal from "../components/PlacePickerModal";

import type { Game } from "../services/gamesApi";
import { getUserCoordinates } from "../services/locationService";
import { getBars, type Bar } from "../services/barsApi";
import { getPlaces, type Place } from "../services/placesApi";

export default function SearchScreen() {
    const [language, setLanguage] = useState<Language>("ru");

    const t = searchTranslations[language];
    const barT = barPickerTranslations[language];
    const cinemaT = cinemaSearchMessages[language];
    const bowlingT = bowlingSearchMessages[language];

    const insets = useSafeAreaInsets();
    const { height } = useWindowDimensions();

    const [selectedCategory, setSelectedCategory] =
        useState<SearchCategoryId | null>(null);

    // -----------------------------------------------
    // GAMING
    // -----------------------------------------------

    const [selectedPlatform, setSelectedPlatform] =
        useState<GamePlatformId | null>(null);

    const [platformModalVisible, setPlatformModalVisible] =
        useState(false);

    const [selectedGames, setSelectedGames] = useState<Game[]>([]);

    const [gamePickerVisible, setGamePickerVisible] =
        useState(false);

    const openGamePickerAfterDismiss = useRef(false);

    // -----------------------------------------------
    // BARS
    // -----------------------------------------------

    const [barModalVisible, setBarModalVisible] = useState(false);
    const [barLoading, setBarLoading] = useState(false);
    const [foundBars, setFoundBars] = useState<Bar[]>([]);
    const [selectedBar, setSelectedBar] = useState<Bar | null>(null);
    const [barDetailsVisible, setBarDetailsVisible] =
        useState(false);

    // -----------------------------------------------
    // CINEMAS
    // -----------------------------------------------

    const [movieModalVisible, setMovieModalVisible] =
        useState(false);

    const [cinemaLoading, setCinemaLoading] = useState(false);

    const [foundCinemas, setFoundCinemas] =
        useState<Place[]>([]);

    const [selectedCinema, setSelectedCinema] =
        useState<Place | null>(null);

    const [cinemaDetailsVisible, setCinemaDetailsVisible] =
        useState(false);

    // -----------------------------------------------
    // BOWLING
    // -----------------------------------------------

    // RU: Окно поиска боулинга.
    // DE: Modalfenster für die Bowlingsuche.
    const [bowlingModalVisible, setBowlingModalVisible] =
        useState(false);

    const [bowlingLoading, setBowlingLoading] =
        useState(false);

    // RU: Найденные и выбранные заведения.
    // DE: Gefundene und ausgewählte Bowlingcenter.
    const [foundBowling, setFoundBowling] =
        useState<Place[]>([]);

    const [selectedBowling, setSelectedBowling] =
        useState<Place | null>(null);

    const [bowlingDetailsVisible, setBowlingDetailsVisible] =
        useState(false);

    // -----------------------------------------------
    // SEARCH SETTINGS
    // -----------------------------------------------

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
            setSelectedCategory("bars");
            setBarModalVisible(true);
            return;
        }

        if (id === "movies") {
            setSelectedCategory("movies");
            setMovieModalVisible(true);
            return;
        }

        // RU: Открываем поиск боулинга.
        // DE: Bowlingsuche öffnen.
        if (id === "bowling") {
            setSelectedCategory("bowling");
            setBowlingModalVisible(true);
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

        if (selectedCategory === "movies") {
            setMovieModalVisible(true);
            return;
        }

        if (selectedCategory === "bowling") {
            setBowlingModalVisible(true);
            return;
        }

        Alert.alert(t.title, t.comingSoon);
    }

    // -----------------------------------------------
    // BAR SEARCH
    // -----------------------------------------------

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

    // -----------------------------------------------
    // CINEMA SEARCH
    // -----------------------------------------------

    async function handleCinemaSearch(radius: number) {
        if (cinemaLoading) return;

        if (
            !Number.isInteger(radius) ||
            radius < 1 ||
            radius > 50
        ) {
            return;
        }

        setCinemaLoading(true);
        setFoundCinemas([]);

        try {
            const coordinates = await getUserCoordinates();

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

    // -----------------------------------------------
    // BOWLING SEARCH
    // -----------------------------------------------

    // RU: Запрос к Google Places только после нажатия.
    // DE: Google-Places-Anfrage nur nach Tastendruck.
    async function handleBowlingSearch(radius: number) {
        if (bowlingLoading) return;

        if (
            !Number.isInteger(radius) ||
            radius < 1 ||
            radius > 50
        ) {
            return;
        }

        setBowlingLoading(true);
        setFoundBowling([]);

        try {
            const coordinates = await getUserCoordinates();

            const bowlingPlaces = await getPlaces({
                coordinates,
                radius,
                category: "bowling",
            });

            setFoundBowling(bowlingPlaces);

            if (bowlingPlaces.length === 0) {
                Alert.alert(
                    bowlingT.noResultsTitle,
                    bowlingT.noResultsMessage
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
                console.error("Bowling search failed:", error);
                Alert.alert(
                    bowlingT.errorTitle,
                    bowlingT.errorMessage
                );
            }
        } finally {
            setBowlingLoading(false);
        }
    }

    // -----------------------------------------------
    // RENDER
    // -----------------------------------------------

    return (
        <SafeAreaView
            style={styles.screen}
            edges={["top", "left", "right"]}
        >
            <StatusBar barStyle="dark-content" />

            <View
                style={[
                    styles.container,
                    { paddingBottom: insets.bottom + 100 },
                ]}
            >
                {/* HEADER */}

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

                {/* TITLES */}

                <Text style={styles.title}>{t.title}</Text>
                <Text style={styles.subtitle}>{t.subtitle}</Text>

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
                        {selectedCategory === "bars" && selectedBar ? (
                            <>
                                <Text style={styles.distanceTitle}>
                                    🍸 {barT.selectedBar}
                                </Text>

                                <Pressable
                                    onPress={() => setBarDetailsVisible(true)}
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
                        ) : selectedCategory === "movies" &&
                        selectedCinema ? (
                            <>
                                <Text style={styles.distanceTitle}>
                                    🎬 {cinemaT.selectedCinema}
                                </Text>

                                <Pressable
                                    onPress={() => setCinemaDetailsVisible(true)}
                                    accessibilityRole="button"
                                    accessibilityLabel={selectedCinema.name}
                                    style={styles.selectedBarButton}
                                >
                                    <Text
                                        style={styles.distanceValue}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {selectedCinema.name}
                                    </Text>

                                    <Text style={styles.selectedBarArrow}>
                                        ›
                                    </Text>
                                </Pressable>
                            </>
                        ) : selectedCategory === "bowling" &&
                        selectedBowling ? (
                            <>
                                <Text style={styles.distanceTitle}>
                                    🎳 {bowlingT.selectedPlace}
                                </Text>

                                <Pressable
                                    onPress={() => setBowlingDetailsVisible(true)}
                                    accessibilityRole="button"
                                    accessibilityLabel={selectedBowling.name}
                                    style={styles.selectedBarButton}
                                >
                                    <Text
                                        style={styles.distanceValue}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {selectedBowling.name}
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

            {/* GAME PLATFORM MODAL */}

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
                onClose={() => setGamePickerVisible(false)}
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
                onClose={() => setBarModalVisible(false)}
                onSearch={handleBarSearch}
                onConfirm={(bar) => {
                    setSelectedBar(bar);
                    setBarModalVisible(false);
                }}
            />

            {/* CINEMA PICKER */}

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

            {/* BOWLING PICKER */}

            <PlacePickerModal
                visible={bowlingModalVisible}
                language={language}
                category="bowling"
                places={foundBowling}
                loading={bowlingLoading}
                onClose={() => setBowlingModalVisible(false)}
                onSearch={handleBowlingSearch}
                onConfirm={(place) => {
                    setSelectedBowling(place);
                    setBowlingModalVisible(false);
                }}
            />

            {/* SELECTED BAR DETAILS */}

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
                        <Text style={styles.barDetailsIcon}>🍸</Text>

                        <Text style={styles.barDetailsTitle}>
                            {selectedBar?.name}
                        </Text>

                        <View style={styles.barDetailsAddressRow}>
                            <Text style={styles.barDetailsLocationIcon}>
                                📍
                            </Text>

                            <Text style={styles.barDetailsAddress}>
                                {selectedBar?.address}
                            </Text>
                        </View>

                        <Pressable
                            onPress={() => setBarDetailsVisible(false)}
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

            {/* SELECTED CINEMA DETAILS */}

            <Modal
                visible={cinemaDetailsVisible}
                transparent
                animationType="fade"
                onRequestClose={() =>
                    setCinemaDetailsVisible(false)
                }
            >
                <View style={styles.barDetailsOverlay}>
                    <View style={styles.barDetailsCard}>
                        <Text style={styles.barDetailsIcon}>🎬</Text>

                        <Text style={styles.barDetailsTitle}>
                            {selectedCinema?.name}
                        </Text>

                        <View style={styles.barDetailsAddressRow}>
                            <Text style={styles.barDetailsLocationIcon}>
                                📍
                            </Text>

                            <Text style={styles.barDetailsAddress}>
                                {selectedCinema?.address}
                            </Text>
                        </View>

                        <Pressable
                            onPress={() =>
                                setCinemaDetailsVisible(false)
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

            {/* SELECTED BOWLING DETAILS */}

            <Modal
                visible={bowlingDetailsVisible}
                transparent
                animationType="fade"
                onRequestClose={() =>
                    setBowlingDetailsVisible(false)
                }
            >
                <View style={styles.barDetailsOverlay}>
                    <View style={styles.barDetailsCard}>
                        <Text style={styles.barDetailsIcon}>🎳</Text>

                        <Text style={styles.barDetailsTitle}>
                            {selectedBowling?.name}
                        </Text>

                        <View style={styles.barDetailsAddressRow}>
                            <Text style={styles.barDetailsLocationIcon}>
                                📍
                            </Text>

                            <Text style={styles.barDetailsAddress}>
                                {selectedBowling?.address}
                            </Text>
                        </View>

                        <Pressable
                            onPress={() =>
                                setBowlingDetailsVisible(false)
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
