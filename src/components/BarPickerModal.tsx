
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
import type { Bar } from "../services/barsApi";

type BarPickerModalProps = {
    visible: boolean;
    language: Language;
    bars: Bar[];
    loading?: boolean;
    onClose: () => void;
    onSearch: (radius: number) => void;
    onConfirm: (bar: Bar) => void;
};

export default function BarPickerModal({
                                           visible,
                                           language,
                                           bars,
                                           loading = false,
                                           onClose,
                                           onSearch,
                                           onConfirm,
                                       }: BarPickerModalProps) {
    const [radius, setRadius] = useState(10);
    const [selectedBarId, setSelectedBarId] =
        useState<string | null>(null);

    const t = barPickerTranslations[language];

    const selectedBar =
        bars.find((bar) => bar.id === selectedBarId) ?? null;

    function handleSearchPress() {
        if (loading) return;

        setSelectedBarId(null);
        onSearch(radius);
    }

    function handleConfirm() {
        if (!selectedBar || loading) return;

        onConfirm(selectedBar);
    }

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
                        🍸 {t.title}
                    </Text>

                    <Pressable
                        onPress={onClose}
                        disabled={loading}
                        accessibilityRole="button"
                    >
                        <Text style={styles.close}>
                            {t.close}
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
                        {t.description}
                    </Text>

                    <View style={styles.radiusCard}>
                        <Text style={styles.label}>
                            {t.radiusLabel}
                        </Text>

                        <Text style={styles.radiusValue}>
                            {radius} {t.distanceUnit}
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
                                1 {t.distanceUnit}
                            </Text>
                            <Text style={styles.hint}>
                                50 {t.distanceUnit}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.locationCard}>
                        <Text style={styles.locationIcon}>
                            📍
                        </Text>

                        <View style={styles.locationText}>
                            <Text style={styles.locationTitle}>
                                {t.locationTitle}
                            </Text>

                            <Text style={styles.locationDescription}>
                                {t.locationDescription}
                            </Text>
                        </View>
                    </View>

                    {bars.length > 0 && (
                        <View style={styles.resultsSection}>
                            <View style={styles.resultsHeader}>
                                <Text style={styles.resultsTitle}>
                                    {t.resultsTitle}
                                </Text>

                                <Text style={styles.resultsCount}>
                                    {t.resultsCount}: {bars.length}
                                </Text>
                            </View>

                            <Text style={styles.resultsHint}>
                                {t.selectBar}
                            </Text>

                            {bars.map((bar) => {
                                const selected =
                                    selectedBarId === bar.id;

                                return (
                                    <Pressable
                                        key={bar.id}
                                        onPress={() => setSelectedBarId(bar.id)}
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
                                                {bar.name}
                                            </Text>

                                            <Text style={styles.barAddress}>
                                                📍 {bar.address}
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
                                {t.searchButton} · {radius} {t.distanceUnit}
                            </Text>
                        )}
                    </Pressable>

                    {bars.length > 0 && (
                        <Pressable
                            style={[
                                styles.confirmButton,
                                (!selectedBar || loading) &&
                                styles.disabledButton,
                            ]}
                            disabled={!selectedBar || loading}
                            accessibilityRole="button"
                            onPress={handleConfirm}
                        >
                            <Text style={styles.confirmButtonText}>
                                {t.confirmBar}
                            </Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </Modal>
    );
}
