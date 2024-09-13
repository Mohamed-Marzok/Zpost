// src/i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources (can be extended with more languages)
const resources = {
  en: {
    translation: {
      welcome: "Zpost",
      home: "Home",
      profile: "Profile",
      language: "العربيه",
      logout: "Log Out",
      login: "Log In",
      signup: "Sign Up",
      edit: "Edit",
      delete: "Delete",
      "Are you sure you want to delete the post?":
        "Are you sure you want to delete the post?",
      Close: "Close",
      "Edit The Post": "Edit The Post",
      title: "Title",
      body: "Body",
      Send: "Send",
      image: "Image",
      email: "Email",
      password: "Password",
      "First Name": "First Name",
      "Last Name": "Last Name",
      "Confirm Password": "Confirm Password",
      submit: "Submit",
    },
  },
  ar: {
    translation: {
      welcome: "Zpost",
      home: "الرئيسية",
      profile: "الملف الشخصي",
      language: "English",
      logout: "تسجيل الخروج",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      edit: "تعديل",
      delete: "حذف",
      "Are you sure you want to delete the post?":
        "هل أنت متأكد أنك تريد حذف المنشور؟",
      Close: "إغلاق",
      "Edit The Post": "تعديل المنشور",
      title: "العنوان",
      body: "المحتوى",
      Send: "إرسال",
      image: "الصورة",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      "First Name": "الاسم الأول",
      "Last Name": "الاسم الأخير",
      "Confirm Password": "تأكيد كلمة المرور",
      submit: "إرسال",
    },
  },
};

i18n
  .use(LanguageDetector) // Automatically detect language from browser settings
  .use(initReactI18next) // Pass i18n instance to react-i18next.
  .init({
    resources,
    fallbackLng: "en", // Fallback language if no translation is found
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
