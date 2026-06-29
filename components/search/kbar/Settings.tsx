import { SettingsIcon } from '../icons'
import { Sun, Moon, Monitor } from '@/components/theme/icons'
import { Theme } from '@/components/theme/ThemeContext'
import LangButton from './LangButton'
import ThemeButton from './ThemeButton'
import { fallbackLng, secondLng } from 'app/[locale]/i18n/locales'

interface SettingsProps {
  t: (key: string) => string
  handleThemeChange: (theme: Theme) => void
  handleLinkClick: (locale: string) => void
}

const Settings: React.FC<SettingsProps> = ({ t, handleThemeChange, handleLinkClick }) => (
  <>
    <div className="mb-6 ml-4 mt-5 flex flex-row items-center text-2xl font-bold text-heading-500">
      <span>
        <SettingsIcon className="mr-2 h-7 w-7 text-primary-500" />
      </span>
      <div>{t('settings')}</div>
    </div>
    <div className="my-auto mb-20 mt-6 flex max-h-[280px] flex-col space-y-6 overflow-y-auto px-2">
      <div className="space-y-3">
        <div className="ml-2 flex items-center text-lg font-semibold text-primary-500">
          <span className="mr-2 h-1 w-1 rounded-full bg-primary-500"></span>
          {t('language')}
        </div>
        <div className="space-y-2">
          <LangButton t={t} handleLinkClick={handleLinkClick} locale={fallbackLng} lang="english" />
          <LangButton t={t} handleLinkClick={handleLinkClick} locale={secondLng} lang="português" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="ml-2 flex items-center text-lg font-semibold text-primary-500">
          <span className="mr-2 h-1 w-1 rounded-full bg-primary-500"></span>
          {t('theme')}
        </div>
        <div className="space-y-2">
          <ThemeButton t={t} handleThemeChange={handleThemeChange} theme={Theme.LIGHT} Icon={Sun} />
          <ThemeButton t={t} handleThemeChange={handleThemeChange} theme={Theme.DARK} Icon={Moon} />
          <ThemeButton
            t={t}
            handleThemeChange={handleThemeChange}
            theme={Theme.SYSTEM}
            Icon={Monitor}
          />
        </div>
      </div>
    </div>
  </>
)

export default Settings
