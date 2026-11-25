
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

import { styles } from "../styles/placePicker.styles";

import type { Language } from "../i18n/translations";
import { placePickerCommonTranslations } from "../i18n/placePickerCommonTranslations";
import { placePickerTranslations } from "../i18n/placePickerTranslations";

import type {
    Place,
    PlaceCategory,
} from "../services/placesApi";

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

    const commonT = placePickerCommonTranslations[language];

    const categoryT =
        placePickerTranslations[language][category];

    const selectedPlace =
        places.find((place) => place.id === selectedPlaceId) ??
        null;

    const categoryIcon =
        category === "bars"
            ? "🍸"
            : category === "cinemas"
                ? "🎬"
                : "🎳";

    function handleSearchPress() {
        if (loading) return;

        setSelectedPlaceId(null);
        onSearch(radius);
    }

    function handleConfirm() {
        if (!selectedPlace || loading) return;

        onConfirm(selectedPlace);
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                {/* HEADER */}

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

                {/* CONTENT */}

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.description}>
                        {categoryT.description}
                    </Text>

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

                    {/* LOCATION */}

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
                                {categoryT.selectPlace}
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
                                            styles.placeCard,
                                            selected && styles.placeCardSelected,
                                        ]}
                                    >
                                        <View style={styles.placeDetails}>
                                            <Text style={styles.placeName}>
                                                {place.name}
                                            </Text>

                                            <Text style={styles.placeAddress}>
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

                {/* FOOTER */}

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
                                {commonT.confirmPlace}
                            </Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </Modal>
    );
}
