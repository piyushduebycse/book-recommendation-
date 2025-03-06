import { createContext, useContext } from 'react';

export type Language = 'en' | 'hi';

export const translations = {
  en: {
    search: {
      title: "Discover Your Next Favorite Book",
      placeholder: "Search for books...",
      button: "Search"
    },
    filters: {
      advancedFilters: "Advanced Filters",
      sortBy: "Sort by",
      language: "Language",
      selectLanguage: "Select language",
      publicationYear: "Publication Year",
      sortOptions: {
        relevance: "Relevance",
        newest: "Newest",
        title: "Title",
        author: "Author"
      },
      languages: {
        english: "English",
        hindi: "Hindi",
        all: "All Languages"
      }
    },
    categories: {
      all: "All",
      fiction: "Fiction",
      mystery: "Mystery",
      scienceFiction: "Science Fiction",
      fantasy: "Fantasy",
      romance: "Romance",
      thriller: "Thriller",
      biography: "Biography",
      history: "History",
      science: "Science",
      technology: "Technology"
    },
    book: {
      details: "Details",
      by: "by",
      addToFavorites: "Add to Favorites",
      removeFromFavorites: "Remove from Favorites",
      publisher: "Publisher",
      categories: "Categories",
      length: "Length",
      pages: "pages",
      description: "Description",
      unknownAuthor: "Unknown Author",
      unknownPublisher: "Unknown",
      uncategorized: "Uncategorized",
      noDescription: "No description available"
    },
    navigation: {
      home: "Home",
      favorites: "Favorites"
    },
    favorites: {
      title: "Your Favorite Books",
      empty: "You haven't added any favorites yet"
    }
  },
  hi: {
    search: {
      title: "अपनी अगली पसंदीदा किताब खोजें",
      placeholder: "किताबें खोजें...",
      button: "खोजें"
    },
    filters: {
      advancedFilters: "उन्नत फ़िल्टर",
      sortBy: "क्रमबद्ध करें",
      language: "भाषा",
      selectLanguage: "भाषा चुनें",
      publicationYear: "प्रकाशन वर्ष",
      sortOptions: {
        relevance: "प्रासंगिकता",
        newest: "नवीनतम",
        title: "शीर्षक",
        author: "लेखक"
      },
      languages: {
        english: "अंग्रेज़ी",
        hindi: "हिंदी",
        all: "सभी भाषाएँ"
      }
    },
    categories: {
      all: "सभी",
      fiction: "कथा साहित्य",
      mystery: "रहस्य",
      scienceFiction: "विज्ञान कथा",
      fantasy: "फैंटेसी",
      romance: "रोमांस",
      thriller: "थ्रिलर",
      biography: "जीवनी",
      history: "इतिहास",
      science: "विज्ञान",
      technology: "तकनीकी"
    },
    book: {
      details: "विवरण",
      by: "द्वारा",
      addToFavorites: "पसंदीदा में जोड़ें",
      removeFromFavorites: "पसंदीदा से हटाएं",
      publisher: "प्रकाशक",
      categories: "श्रेणियां",
      length: "लंबाई",
      pages: "पृष्ठ",
      description: "विवरण",
      unknownAuthor: "अज्ञात लेखक",
      unknownPublisher: "अज्ञात",
      uncategorized: "अवर्गीकृत",
      noDescription: "कोई विवरण उपलब्ध नहीं है"
    },
    navigation: {
      home: "होम",
      favorites: "पसंदीदा"
    },
    favorites: {
      title: "आपकी पसंदीदा किताबें",
      empty: "आपने अभी तक कोई पसंदीदा नहीं जोड़ा है"
    }
  }
};

export type TranslationKey = keyof typeof translations.en;

export const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
}>({
  language: 'en',
  setLanguage: () => {},
});

export const useTranslation = () => {
  const { language } = useContext(LanguageContext);
  return translations[language];
};