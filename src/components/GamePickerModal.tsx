
import { useEffect, useState } from "react";

import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Linking,
    Modal,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { GamePlatformId } from "../constants/gamePlatforms";
import type { Language } from "../i18n/translations";
import { gamePickerTranslations } from "../i18n/gamePickerTranslations";
import { getGames, type Game } from "../services/gamesApi";
import { gamePickerStyles as styles } from "../styles/gamePicker.styles";
import { theme } from "../theme/theme";


type Props = {
    visible: boolean;
    platform: GamePlatformId | null;
    language: Language;
    selectedGames: Game[];
    onClose: () => void;
    onConfirm: (games: Game[]) => void;
};


export default function GamePickerModal({
                                            visible,
                                            platform,
                                            language,
                                            selectedGames,
                                            onClose,
                                            onConfirm,
                                        }: Props) {
    const t = gamePickerTranslations[language];
    const insets = useSafeAreaInsets();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Game[]>([]);

    const [draftSelected, setDraftSelected] = useState<Game[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showSelectedOnly, setShowSelectedOnly] =
        useState(false);

    useEffect(() => {
        if (!visible) return;

        setQuery("");
        setDraftSelected(selectedGames);
        setShowSelectedOnly(false);
    }, [visible, selectedGames]);


    useEffect(() => {
        if (!visible || !platform) return;

        let active = true;

        setLoading(true);
        setError(false);

        const timer = setTimeout(async () => {
            try {
                const games = await getGames({
                    platform,
                    search: query,
                });

                if (active) {
                    setResults(games);
                }
            } catch (err) {
                if (active) {
                    console.error("Games loading failed:", err);
                    setResults([]);
                    setError(true);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }, 350);

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [visible, platform, query]);

    function toggleGame(game: Game) {
        setDraftSelected((current) => {
            const exists = current.some((item) => item.id === game.id);

            return exists
                ? current.filter((item) => item.id !== game.id)
                : [...current, game];
        });
    }

    return (
        <Modal
            visible={visible && platform !== null}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.overlay}
            >
                <View
                    style={[
                        styles.sheet,
                        { paddingBottom: Math.max(insets.bottom, 12) },
                    ]}
                >
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            🎮 {t.title}
                        </Text>

                        <Pressable
                            onPress={onClose}
                            accessibilityRole="button"
                        >
                            <Text style={styles.closeText}>
                                {t.cancel}
                            </Text>
                        </Pressable>
                    </View>

                    <TextInput
                        style={styles.searchInput}
                        value={query}
                        onChangeText={setQuery}
                        placeholder={t.search}
                        placeholderTextColor={theme.colors.placeholder}
                        autoCorrect={false}
                        autoCapitalize="none"
                        clearButtonMode="while-editing"
                    />

                    <View style={styles.filterRow}>
                        <Text style={styles.selectedCount}>
                            {t.selectedCount}: {draftSelected.length}
                        </Text>

                        <Pressable
                            style={styles.filterButton}
                            onPress={() =>
                                setShowSelectedOnly((current) => !current)
                            }
                            accessibilityRole="button"
                        >
                            <Text style={styles.filterButtonText}>
                                {showSelectedOnly ? t.showAll : t.showSelected}
                            </Text>
                        </Pressable>
                    </View>


                    {loading && !showSelectedOnly ? (
                        <View style={styles.messageContainer}>
                            <ActivityIndicator
                                size="large"
                                color={theme.colors.primary}
                            />
                            <Text style={styles.message}>
                                {t.loading}
                            </Text>
                        </View>
                    ) : error && !showSelectedOnly ? (
                        <View style={styles.messageContainer}>
                            <Text style={styles.message}>
                                {t.error}
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            style={styles.list}
                            contentContainerStyle={styles.listContent}
                            data={showSelectedOnly ? draftSelected : results}
                            keyExtractor={(item) => String(item.id)}
                            keyboardShouldPersistTaps="handled"
                            keyboardDismissMode="on-drag"
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                                <Text style={styles.message}>
                                    {showSelectedOnly ? t.noneSelected : t.empty}
                                </Text>
                            }
                            renderItem={({ item }) => {
                                const selected = draftSelected.some(
                                    (game) => game.id === item.id
                                );

                                return (
                                    <Pressable
                                        onPress={() => toggleGame(item)}
                                        style={[
                                            styles.gameRow,
                                            selected && styles.gameRowSelected,
                                        ]}
                                        accessibilityRole="checkbox"
                                        accessibilityState={{ checked: selected }}
                                        accessibilityLabel={item.name}
                                    >
                                        {item.image ? (
                                            <Image
                                                source={{ uri: item.image }}
                                                style={styles.gameImage}
                                                contentFit="cover"
                                                transition={150}
                                            />
                                        ) : (
                                            <View style={styles.imagePlaceholder}>
                                                <Text>🎮</Text>
                                            </View>
                                        )}

                                        <View style={styles.gameInfo}>
                                            <Text
                                                style={styles.gameName}
                                                numberOfLines={2}
                                            >
                                                {item.name}
                                            </Text>

                                            <Text
                                                style={styles.gameGenres}
                                                numberOfLines={1}
                                            >
                                                {item.genres.join(" · ")}
                                            </Text>
                                        </View>

                                        <Text style={styles.checkmark}>
                                            {selected ? "✓" : "+"}
                                        </Text>
                                    </Pressable>
                                );
                            }}
                        />
                    )}

                    {/* RU: Указываем источник игровых данных.
              DE: Quelle der Spieldaten angeben. */}
                    <Pressable
                        onPress={() => {
                            void Linking.openURL("https://rawg.io/");
                        }}
                    >
                        <Text style={styles.source}>
                            {t.source}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.confirmButton}
                        onPress={() => onConfirm(draftSelected)}
                        accessibilityRole="button"
                    >
                        <Text style={styles.confirmText}>
                            {t.confirm} ({draftSelected.length})
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}
