
import { NativeTabs } from "expo-router/native-tabs";

export default function TabsLayout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="search">
                <NativeTabs.Trigger.Label>
                    Поиск
                </NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="magnifyingglass" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="chats">
                <NativeTabs.Trigger.Label>
                    Чаты
                </NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="bubble.left.and.bubble.right" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="favorites">
                <NativeTabs.Trigger.Label>
                    Избранное
                </NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="heart" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="profile">
                <NativeTabs.Trigger.Label>
                    Профиль
                </NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="person.crop.circle" />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
