
import { Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { Language } from "../i18n/translations";
import { searchResultsTranslations } from "../i18n/searchResultsTranslations";
import { styles } from "../styles/searchResults.styles";

type SearchResultsScreenProps = {
    language: Language;
    onBack: () => void;
};

// RU: Экран результатов поиска пользователей.
// DE: Bildschirm mit den Ergebnissen der Personensuche.
export default function SearchResultsScreen({
                                                language,
                                                onBack,
                                            }: SearchResultsScreenProps) {
    const t = searchResultsTranslations[language];

    // RU: Реальные профили подключим через backend.
    // DE: Echte Profile werden später über das Backend geladen.

    return (
        <SafeAreaView
            style={styles.screen}
            edges={["top", "left", "right", "bottom"]}
        >
            <StatusBar barStyle="dark-content" />

            <View style={styles.container}>
                <Pressable
                    onPress={onBack}
                    accessibilityRole="button"
                    style={styles.backButton}
                >
                    <Text style={styles.backText}>
                        ← {t.back}
                    </Text>
                </Pressable>

                <Text style={styles.title}>
                    {t.title}
                </Text>

                <Text style={styles.subtitle}>
                    {t.subtitle}
                </Text>

                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>
                        👥
                    </Text>

                    <Text style={styles.emptyTitle}>
                        {t.emptyTitle}
                    </Text>

                    <Text style={styles.emptyDescription}>
                        {t.emptyDescription}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
