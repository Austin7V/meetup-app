
import { useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import Slider from "@react-native-community/slider";

import { styles } from "../styles/barPicker.styles";
import type { Language } from "../i18n/translations";
import { barPickerTranslations } from "../i18n/barPickerTranslations";
import { placePickerTranslations } from "../i18n/placePickerTranslations";
import type {
    Place,
    PlaceCategory,
} from "../services/placesApi";

// RU: Свойства универсального окна выбора заведений.
// DE: Eigenschaften des universellen Ortsauswahlfensters.
type PlacePickerModalProps = {
    visible: boolean;
    language: Language;
    category: PlaceCategory;
    places: Place[];
    loading?: boolean;
    onClose: () => void;
    onSearch: (radius: number) => void;
    onConfirm: (place: Place) => void;
};

export default function PlacePickerModal({
                                             visible,
                                             language,
                                             category,
                                             places,
                                             loading = false,
                                             onClose,
                                             onSearch,
                                             onConfirm,
                                         }: PlacePickerModalProps) {
    const [radius, setRadius] = useState(10);
    const [selectedPlaceId, setSelectedPlaceId] =
        useState<string | null>(null);

    // RU: Общие переводы интерфейса.
    // DE: Allgemeine Übersetzungen der Benutzeroberfläche.
    const commonT = barPickerTranslations[language];

    // RU: Переводы выбранной категории.
    // DE: Übersetzungen der ausgewählten Kategorie.
    const categoryT =
        placePickerTranslations[language][category];

    const selectedPlace =
        places.find((place) => place.id === selectedPlaceId) ??
        null;

    // RU: Google Places вызывается только после нажатия.
    // DE: Google Places wird nur nach einem Tastendruck aufgerufen.
    function handleSearchPress() {
        if (loading) return;

        setSelectedPlaceId(null);
        onSearch(radius);
    }

    function handleConfirm() {
        if (!selectedPlace || loading) return;

        onConfirm(selectedPlace);
    }

    const categoryIcon =
        category === "bars"
            ? "🍸"
            : category === "cinemas"
                ? "🎬"
                : "🎳";

    return (
        <Modal
            visible={visible}
    animationType="slide"
    presentationStyle="pageSheet"
    onRequestClose={onClose}
    >
    <View style={styles.container}>
    <View style={styles.header}>
    <Text style={styles.title}>
        {categoryIcon} {categoryT.title}
    </Text>

    <Pressable
    onPress={onClose}
    disabled={loading}
    accessibilityRole="button"
    >
    <Text style={styles.close}>
        {commonT.close}
        </Text>
        </Pressable>
        </View>

        <ScrollView
    style={styles.scrollView}
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
    >
    <Text style={styles.description}>
        {categoryT.description}
        </Text>

    {/* RU: Радиус от 1 до 50 км. */}
    {/* DE: Suchradius von 1 bis 50 km. */}
    <View style={styles.radiusCard}>
    <Text style={styles.label}>
        {commonT.radiusLabel}
        </Text>

        <Text style={styles.radiusValue}>
        {radius} {commonT.distanceUnit}
    </Text>

    <Slider
    minimumValue={1}
    maximumValue={50}
    step={1}
    value={radius}
    onValueChange={setRadius}
    minimumTrackTintColor="#6478FF"
    maximumTrackTintColor="#D1D5DB"
    thumbTintColor="#6478FF"
    disabled={loading}
    />

    <View style={styles.radiusLabels}>
    <Text style={styles.hint}>
        1 {commonT.distanceUnit}
    </Text>

    <Text style={styles.hint}>
        50 {commonT.distanceUnit}
    </Text>
    </View>
    </View>

    <View style={styles.locationCard}>
    <Text style={styles.locationIcon}>
              📍
            </Text>

            <View style={styles.locationText}>
    <Text style={styles.locationTitle}>
        {commonT.locationTitle}
        </Text>

        <Text style={styles.locationDescription}>
        {commonT.locationDescription}
        </Text>
        </View>
        </View>

    {/* RU: Список заведений от Google Places. */}
    {/* DE: Ortsliste von Google Places. */}
    {places.length > 0 && (
        <View style={styles.resultsSection}>
        <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>
            {categoryT.resultsTitle}
            </Text>

            <Text style={styles.resultsCount}>
        {commonT.resultsCount}: {places.length}
        </Text>
        </View>

        <Text style={styles.resultsHint}>
        {categoryT.selectBar}
        </Text>

        {places.map((place) => {
            const selected =
                selectedPlaceId === place.id;

            return (
                <Pressable
                    key={place.id}
            onPress={() =>
            setSelectedPlaceId(place.id)
        }
            disabled={loading}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            style={[
                    styles.barCard,
                selected && styles.barCardSelected,
        ]}
        >
            <View style={styles.barDetails}>
            <Text style={styles.barName}>
                {place.name}
                </Text>

                <Text style={styles.barAddress}>
                        📍 {place.address}
            </Text>
            </View>

            <View
            style={[
                        styles.selectionCircle,
                    selected &&
                styles.selectionCircleSelected,
        ]}
        >
            {selected && (
                <Text style={styles.checkmark}>
                          ✓
                        </Text>
            )}
            </View>
            </Pressable>
        );
        })}
        </View>
    )}
    </ScrollView>

    {/* RU: Кнопки поиска и подтверждения. */}
    {/* DE: Schaltflächen für Suche und Bestätigung. */}
    <View style={styles.footer}>
    <Pressable
        style={[
            styles.searchButton,
        loading && styles.disabledButton,
]}
    disabled={loading}
    accessibilityRole="button"
    onPress={handleSearchPress}
        >
        {loading ? (
                <ActivityIndicator color="#FFFFFF" />
            ) : (
                <Text style={styles.searchButtonText}>
                    {categoryT.searchButton} · {radius}{" "}
    {commonT.distanceUnit}
    </Text>
)}
    </Pressable>

    {places.length > 0 && (
        <Pressable
            style={[
                    styles.confirmButton,
            (!selectedPlace || loading) &&
            styles.disabledButton,
    ]}
        disabled={!selectedPlace || loading}
        accessibilityRole="button"
        onPress={handleConfirm}
        >
        <Text style={styles.confirmButtonText}>
            {commonT.confirmBar}
            </Text>
            </Pressable>
    )}
    </View>
    </View>
    </Modal>
);
}
