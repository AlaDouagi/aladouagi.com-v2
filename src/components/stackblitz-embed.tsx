import {component$, useVisibleTask$} from '@builder.io/qwik'
import type {UiThemeOption, UiViewOption} from '@stackblitz/sdk'

interface Props {
  id: string
  file: string
  view?: UiViewOption
  hideExplorer?: boolean
  height?: number
  theme?: UiThemeOption
  clickToLoad?: boolean
  width?: number | string
  index?: number
}

const StackBlitz = component$<Props>(
  ({
    id,
    file,
    view,
    hideExplorer = false,
    height = 600,
    theme = 'dark',
    clickToLoad = false,
    width = '100%',
    index = 0,
  }) => {
    useVisibleTask$(async () => {
      const sdk = (await import('@stackblitz/sdk')).default
      sdk.embedProjectId(`stackblitz-embed-${id}-${index}`, id, {
        forceEmbedLayout: true,
        openFile: file,
        view,
        hideExplorer,
        hideNavigation: true,
        height,
        theme,
        clickToLoad,
        width,
      })
    })

    return <div id={`stackblitz-embed-${id}-${index}`} class="w-full" />
  },
)

export default StackBlitz
