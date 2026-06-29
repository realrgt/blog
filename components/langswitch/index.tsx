import { useState, useRef, useCallback, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useOuterClick } from '../util/useOuterClick'
import { useTagStore } from '@/components/util/useTagStore'
import { LocaleTypes, locales } from 'app/[locale]/i18n/settings'
import { useLocale } from '@/components/locale/LocaleProvider'
import {
  Menu,
  Transition,
  RadioGroup,
  MenuButton,
  MenuItems,
  Radio,
  MenuItem,
} from '@headlessui/react'
import { ChevronDownIcon } from './icon'

const LangSwitch = () => {
  const pathname = usePathname()
  const { locale, setLocale } = useLocale()
  const router = useRouter()
  const setSelectedTag = useTagStore((state) => state.setSelectedTag)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const menubarRef = useRef<HTMLDivElement>(null)
  useOuterClick(menubarRef, () => setIsMenuOpen(false))

  const handleLocaleChange = useCallback(
    (newLocale: string): string => {
      const segments = pathname!.split('/')
      const localeIndex = segments.findIndex((segment) => locales.includes(segment as LocaleTypes))
      if (localeIndex !== -1) {
        segments[localeIndex] = newLocale
      } else {
        segments.splice(1, 0, newLocale)
      }
      const newPath = segments.join('/').replace(/\/$/, '')
      return newPath
    },
    [pathname]
  )

  const handleLinkClick = useCallback(
    (newLocale: string) => {
      setSelectedTag('')
      const resolvedUrl = handleLocaleChange(newLocale)
      setLocale(newLocale as LocaleTypes) // Update the locale context
      router.push(resolvedUrl)
      setIsMenuOpen(false)
    },
    [handleLocaleChange, router, setSelectedTag, setLocale]
  )

  const currentLocale = useMemo(() => locale.charAt(0).toUpperCase() + locale.slice(1), [locale])

  return (
    <div ref={menubarRef} className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <div>
            <MenuButton
              className="inline-flex rounded-md px-1 py-2 font-bold leading-5 text-gray-700 shadow-sm dark:text-white"
              aria-haspopup="true"
              aria-expanded={open}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {currentLocale}
              <ChevronDownIcon
                className={`ml-1 mt-1 transform transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
              />
            </MenuButton>
            <Transition
              show={open}
              enter="transition-all ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-[-10px]"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="transition-all ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-[10px]"
            >
              <MenuItems
                className="absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-600 dark:bg-gray-800"
                aria-orientation="vertical"
                onBlur={() => setIsMenuOpen(false)}
              >
                <RadioGroup>
                  <div className="m-0 list-none p-0 py-1" role="none">
                    {locales.map((newLocale: string) => (
                      <Radio key={newLocale} value={newLocale}>
                        <MenuItem>
                          {({ focus }) => (
                            <button
                              onClick={() => handleLinkClick(newLocale)}
                              className={`${
                                focus
                                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
                                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-white dark:hover:bg-primary-900 dark:hover:text-primary-300'
                              } flex w-full items-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150`}
                              role="menuitem"
                            >
                              <span className="mr-2 text-xs font-bold uppercase text-primary-500">
                                {newLocale}
                              </span>
                              {newLocale.charAt(0).toUpperCase() + newLocale.slice(1)}
                            </button>
                          )}
                        </MenuItem>
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
              </MenuItems>
            </Transition>
          </div>
        )}
      </Menu>
    </div>
  )
}

export default LangSwitch
