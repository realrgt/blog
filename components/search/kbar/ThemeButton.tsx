import { Theme } from '@/components/theme/ThemeContext'

interface ThemeButtonProps {
  t: (key: string) => string
  handleThemeChange: (theme: Theme) => void
  theme: Theme
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ t, handleThemeChange, theme, Icon }) => (
  <button
    className="group mx-2 flex flex-row items-center rounded-lg px-4 py-3 transition-all duration-200 hover:scale-105 hover:bg-primary-500 hover:text-white hover:shadow-md"
    onClick={() => handleThemeChange(theme)}
  >
    <span className="mr-3 flex w-10 items-center justify-center rounded-md bg-primary-500 px-2 py-1 text-white group-hover:bg-white group-hover:text-primary-500 dark:bg-primary-400 dark:text-gray-900">
      <Icon className="h-4 w-4" />
    </span>
    <div className="text-base font-medium capitalize">{t(theme)}</div>
  </button>
)

export default ThemeButton
