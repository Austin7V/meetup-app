
import {
    Modal,
    Pressable,
    Text,
    View,
} from "react-native";

import type { Place } from "../services/placesApi";
import { searchStyles as styles } from "../styles/search.styles";

// RU: Свойства универсального окна информации.
// DE: Eigenschaften des universellen Informationsfensters.
type PlaceDetailsModalProps = {
    visible: boolean;
    place: Place | null;
    icon: string;
    closeLabel: string;
    onClose: () => void;
};

// RU: Показывает название и адрес выбранного заведения.
// DE: Zeigt den Namen und die Adresse des ausgewählten Ortes.
export default function PlaceDetailsModal({
                                              visible,
                                              place,
                                              icon,
                                              closeLabel,
                                              onClose,
                                          }: PlaceDetailsModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.barDetailsOverlay}>
                <View style={styles.barDetailsCard}>
                    {/* RU: Иконка выбранной категории. */}
                    {/* DE: Symbol der ausgewählten Kategorie. */}
                    <Text style={styles.barDetailsIcon}>
                        {icon}
                    </Text>

                    {/* RU: Название заведения. */}
                    {/* DE: Name des Ortes. */}
                    <Text style={styles.barDetailsTitle}>
                        {place?.name}
                    </Text>

                    {/* RU: Полный адрес заведения. */}
                    {/* DE: Vollständige Adresse des Ortes. */}
                    <View style={styles.barDetailsAddressRow}>
                        <Text style={styles.barDetailsLocationIcon}>
                            📍
                        </Text>

                        <Text style={styles.barDetailsAddress}>
                            {place?.address}
                        </Text>
                    </View>

                    {/* RU: Кнопка закрытия с переводом. */}
                    {/* DE: Schließen-Schaltfläche mit Übersetzung. */}
                    <Pressable
                        onPress={onClose}
                        style={styles.barDetailsCloseButton}
                        accessibilityRole="button"
                    >
                        <Text style={styles.barDetailsCloseText}>
                            {closeLabel}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
