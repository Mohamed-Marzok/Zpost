import { useTranslation } from "react-i18next";

export default function Button() {
  const { t } = useTranslation();
  return (
    <button
      type="submit"
      className="self-end bg-sky-400 py-2 px-4 shadow-sm shadow-sky-500 text-white hover:bg-sky-800 active:shadow-none"
    >
      {t("submit")}
    </button>
  );
}
