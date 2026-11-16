
import { useState } from "react";
import {
    Alert,
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

export default function SearchScreen() {
    const [language, setLanguage] = useState<Language>("ru");
    const t = searchTranslations[language];
    const insets = useSafeAreaInsets();
    const [selectedCategory, setSelectedCategory] =
        useState<SearchCategoryId | null>(null);

    const { height } = useWindowDimensions();

    const categoryHeight =
        height < 700 ? 60 : height < 800 ? 75 : 90;

    function selectCategory(id: SearchCategoryId) {
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
                                    {t.categories[category.id]}
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
                        disabled={!selectedCategory}
                        onPress={handleSearch}
                        accessibilityRole="button"
                        style={[
                            styles.button,
                            !selectedCategory && styles.buttonDisabled,
                        ]}
                    >
                        <Text style={styles.buttonText}>
                            {t.searchButton} →
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}
