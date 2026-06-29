interface LangButtonProps {
  t: (key: string) => string
  handleLinkClick: (locale: string) => void
  locale: string
  lang: string
}

const LangButton: React.FC<LangButtonProps> = ({ t, handleLinkClick, locale, lang }) => (
  <button
    className="group mx-2 flex flex-row items-center rounded-lg px-4 py-3 transition-all duration-200 hover:scale-105 hover:bg-primary-500 hover:text-white hover:shadow-md"
    onClick={() => handleLinkClick(locale)}
  >
    <span className="mr-3 w-10 rounded-md bg-primary-500 px-2 py-1 text-sm font-bold text-white group-hover:bg-white group-hover:text-primary-500 dark:bg-primary-400 dark:text-gray-900">
      {locale.toUpperCase()}
    </span>
    <div className="text-base font-medium capitalize">{t(lang)}</div>
  </button>
)

export default LangButton
