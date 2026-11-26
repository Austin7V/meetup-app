
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
import PlacePickerModal from "../components/PlacePickerModal";
import PlaceDetailsModal from "../components/PlaceDetailsModal";

import type { Game } from "../services/gamesApi";

import type {
    Place,
    PlaceCategory,
} from "../services/placesApi";

import { usePlaceSearch } from "../hooks/usePlaceSearch";
import { useRouter } from "expo-router";

// RU: Данные для универсального окна информации.
// DE: Daten für das universelle Informationsfenster.
type PlaceDetails = {
    place: Place;
    icon: string;
};

export default function SearchScreen() {
    // -----------------------------------------------
    // LANGUAGE
    // -----------------------------------------------

    const [language, setLanguage] = useState<Language>("ru");
    const router = useRouter();
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

    const [selectedGames, setSelectedGames] =
        useState<Game[]>([]);

    const [gamePickerVisible, setGamePickerVisible] =
        useState(false);

    const openGamePickerAfterDismiss = useRef(false);

    // -----------------------------------------------
    // PLACES SEARCH
    // -----------------------------------------------

    // RU: Отдельный поиск для каждой категории.
    // DE: Separate Suche für jede Ortskategorie.
    const barsSearch = usePlaceSearch("bars");
    const cinemasSearch = usePlaceSearch("cinemas");
    const bowlingSearch = usePlaceSearch("bowling");

    // RU: Состояния окон выбора заведений.
    // DE: Zustände der Ortsauswahlfenster.
    const [barModalVisible, setBarModalVisible] =
        useState(false);

    const [movieModalVisible, setMovieModalVisible] =
        useState(false);

    const [bowlingModalVisible, setBowlingModalVisible] =
        useState(false);

    // RU: Выбранные заведения каждой категории.
    // DE: Ausgewählte Orte jeder Kategorie.
    const [selectedBar, setSelectedBar] =
        useState<Place | null>(null);

    const [selectedCinema, setSelectedCinema] =
        useState<Place | null>(null);

    const [selectedBowling, setSelectedBowling] =
        useState<Place | null>(null);

    // -----------------------------------------------
    // UNIVERSAL PLACE DETAILS
    // -----------------------------------------------

    // RU: Одно состояние вместо трёх отдельных окон.
    // DE: Ein Zustand statt drei separater Fenster.
    const [placeDetails, setPlaceDetails] =
        useState<PlaceDetails | null>(null);

    // RU: Показываем информацию о выбранном месте.
    // DE: Informationen zum ausgewählten Ort anzeigen.
    function openPlaceDetails(place: Place, icon: string) {
        setPlaceDetails({ place, icon });
    }

    function closePlaceDetails() {
        setPlaceDetails(null);
    }

    // -----------------------------------------------
    // SEARCH SETTINGS
    // -----------------------------------------------

    const canSearch =
        selectedCategory !== null &&
        (selectedCategory !== "gaming" ||
            (selectedPlatform !== null &&
                selectedGames.length > 0));

    const categoryHeight =
        height < 700 ? 60 : height < 800 ? 75 : 90;

    // RU: Определяем выбранное заведение и его оформление.
    // DE: Ausgewählten Ort und dessen Darstellung bestimmen.
    const selectedPlace =
        selectedCategory === "bars"
            ? selectedBar
            : selectedCategory === "movies"
                ? selectedCinema
                : selectedCategory === "bowling"
                    ? selectedBowling
                    : null;

    const selectedPlaceIcon =
        selectedCategory === "bars"
            ? "🍸"
            : selectedCategory === "movies"
                ? "🎬"
                : selectedCategory === "bowling"
                    ? "🎳"
                    : "📍";

    const selectedPlaceLabel =
        selectedCategory === "bars"
            ? barT.selectedBar
            : selectedCategory === "movies"
                ? cinemaT.selectedCinema
                : selectedCategory === "bowling"
                    ? bowlingT.selectedPlace
                    : t.distance;

    // -----------------------------------------------
    // CATEGORY HANDLERS
    // -----------------------------------------------

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
if (
            selectedCategory === "gaming" &&
            (!selectedPlatform || selectedGames.length === 0)
        ) {
            setPlatformModalVisible(true);
            return;
        }

       const selectedPlaceId =
            selectedCategory === "bars"
                ? selectedBar?.id
                : selectedCategory === "movies"
                    ? selectedCinema?.id
                    : selectedCategory === "bowling"
                        ? selectedBowling?.id
                        : undefined;

        router.push({
            pathname: "/search-results",
            params: {
                language,
                category: selectedCategory,
                ...(selectedPlatform && selectedCategory === "gaming"
                    ? { platform: selectedPlatform }
                    : {}),
                ...(selectedCategory === "gaming"
                    ? {
                        gameIds: JSON.stringify(
                            selectedGames.map((game) => game.id)
                        ),
                    }
                    : {}),
                ...(selectedPlaceId
                    ? { placeId: selectedPlaceId }
                    : {}),
            },
        });
    }

    // -----------------------------------------------
    // UNIVERSAL PLACE SEARCH
    // -----------------------------------------------

    // RU: Один обработчик для всех типов заведений.
    // DE: Ein Suchhandler für alle Ortskategorien.
    async function handlePlaceSearch(
        category: PlaceCategory,
        radius: number
    ) {
        const placeSearch =
            category === "bars"
                ? barsSearch
                : category === "cinemas"
                    ? cinemasSearch
                    : bowlingSearch;

        try {
            const results = await placeSearch.search(radius);

            // RU: Запрос уже выполняется.
            // DE: Eine Anfrage wird bereits ausgeführt.
            if (results === null) return;

            if (results.length === 0) {
                if (category === "bars") {
                    Alert.alert(
                        barT.noBarsTitle,
                        barT.noBarsMessage
                    );
                } else if (category === "cinemas") {
                    Alert.alert(
                        cinemaT.noResultsTitle,
                        cinemaT.noResultsMessage
                    );
                } else {
                    Alert.alert(
                        bowlingT.noResultsTitle,
                        bowlingT.noResultsMessage
                    );
                }
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
                return;
            }

            console.error(`${category} search failed:`, error);

            if (category === "bars") {
                Alert.alert(
                    barT.searchErrorTitle,
                    barT.searchErrorMessage
                );
            } else if (category === "cinemas") {
                Alert.alert(
                    cinemaT.errorTitle,
                    cinemaT.errorMessage
                );
            } else {
                Alert.alert(
                    bowlingT.errorTitle,
                    bowlingT.errorMessage
                );
            }
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

                {/* -----------------------------------------
            BOTTOM SECTION
        ----------------------------------------- */}

                <View style={styles.bottomSection}>
                    <View style={styles.distanceContainer}>
                        {selectedPlace ? (
                            <>
                                <Text style={styles.distanceTitle}>
                                    {selectedPlaceIcon} {selectedPlaceLabel}
                                </Text>

                                <Pressable
                                    onPress={() =>
                                        openPlaceDetails(
                                            selectedPlace,
                                            selectedPlaceIcon
                                        )
                                    }
                                    accessibilityRole="button"
                                    accessibilityLabel={selectedPlace.name}
                                    style={styles.selectedBarButton}
                                >
                                    <Text
                                        style={styles.distanceValue}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {selectedPlace.name}
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

            {/* -----------------------------------------
          GAME PLATFORM MODAL
      ----------------------------------------- */}

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
                onClose={() =>
                    setGamePickerVisible(false)
                }
                onConfirm={(games) => {
                    setSelectedGames(games);
                    setGamePickerVisible(false);
                }}
            />

            {/* -----------------------------------------
          PLACE PICKERS
      ----------------------------------------- */}

            {/* BARS */}
            <PlacePickerModal
                visible={barModalVisible}
                language={language}
                category="bars"
                places={barsSearch.places}
                loading={barsSearch.loading}
                onClose={() => setBarModalVisible(false)}
                onSearch={(radius) => handlePlaceSearch("bars", radius)}
                onConfirm={(bar) => {
                    setSelectedBar(bar);
                    setBarModalVisible(false);
                }}
            />


            {/* CINEMAS */}

            <PlacePickerModal
                visible={movieModalVisible}
                language={language}
                category="cinemas"
                places={cinemasSearch.places}
                loading={cinemasSearch.loading}
                onClose={() =>
                    setMovieModalVisible(false)
                }
                onSearch={(radius) =>
                    handlePlaceSearch("cinemas", radius)
                }
                onConfirm={(cinema) => {
                    setSelectedCinema(cinema);
                    setMovieModalVisible(false);
                }}
            />

            {/* BOWLING */}

            <PlacePickerModal
                visible={bowlingModalVisible}
                language={language}
                category="bowling"
                places={bowlingSearch.places}
                loading={bowlingSearch.loading}
                onClose={() =>
                    setBowlingModalVisible(false)
                }
                onSearch={(radius) =>
                    handlePlaceSearch("bowling", radius)
                }
                onConfirm={(place) => {
                    setSelectedBowling(place);
                    setBowlingModalVisible(false);
                }}
            />

            {/* -----------------------------------------
          UNIVERSAL PLACE DETAILS
      ----------------------------------------- */}

            <PlaceDetailsModal
                visible={placeDetails !== null}
                place={placeDetails?.place ?? null}
                icon={placeDetails?.icon ?? ""}
                closeLabel={barT.close}
                onClose={closePlaceDetails}
            />
        </SafeAreaView>
    );
}
