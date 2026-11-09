import type { CategoryId } from "../constants/categories";

export type Language = "ru" | "de" | "en";

type Translation = {
  title: string;
  subtitle: string;
  nickname: string;
  birthday: string;
  interests: string;
  multiple: string;
  about: string;
  save: string;
  cancel: string;
  done: string;
  welcome: string;
  ready: string;
  search: string;
  edit: string;
  categories: Record<CategoryId, string>;
};

export const locales: Record<Language, string> = {
  ru: "ru-RU",
  de: "de-DE",
  en: "en-US",
};

export const translations: Record<Language, Translation> = {
  ru: {
    title: "Создай свой профиль",
    subtitle: "Найди людей, которые разделяют твои интересы.",
    nickname: "Никнейм",
    birthday: "Дата рождения",
    interests: "Что тебе интересно?",
    multiple: "Можно выбрать несколько",
    about: "Расскажи о себе (необязательно)",
    save: "Продолжить",
    cancel: "Отмена",
    done: "Готово",
    welcome: "Привет",
    ready: "Твой профиль готов!",
    search: "Скоро здесь появится поиск людей.",
    edit: "Изменить профиль",
    categories: {
      games: "Игры",
      movies: "Кино",
      chat: "Общение",
      bars: "Бары",
      parties: "Вечеринки",
      walking: "Прогулки",
      dating: "Знакомства",
    },
  },
  de: {
    title: "Erstelle dein Profil",
    subtitle: "Finde Menschen mit ähnlichen Interessen.",
    nickname: "Benutzername",
    birthday: "Geburtsdatum",
    interests: "Was interessiert dich?",
    multiple: "Mehrfachauswahl möglich",
    about: "Erzähl etwas über dich (optional)",
    save: "Weiter",
    cancel: "Abbrechen",
    done: "Fertig",
    welcome: "Hallo",
    ready: "Dein Profil ist fertig!",
    search: "Hier erscheint bald die Personensuche.",
    edit: "Profil bearbeiten",
    categories: {
      games: "Gaming",
      movies: "Kino",
      chat: "Unterhaltung",
      bars: "Bars",
      parties: "Partys",
      walking: "Spazieren",
      dating: "Dating",
    },
  },
  en: {
    title: "Create your profile",
    subtitle: "Find people who share your interests.",
    nickname: "Nickname",
    birthday: "Date of birth",
    interests: "What are you into?",
    multiple: "Select multiple interests",
    about: "Tell us about yourself (optional)",
    save: "Continue",
    cancel: "Cancel",
    done: "Done",
    welcome: "Hello",
    ready: "Your profile is ready!",
    search: "People discovery is coming soon.",
    edit: "Edit profile",
    categories: {
      games: "Gaming",
      movies: "Movies",
      chat: "Chat",
      bars: "Bars",
      parties: "Parties",
      walking: "Walking",
      dating: "Dating",
    },
  },
};
