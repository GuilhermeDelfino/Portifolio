import 'styled-components'
import type { Theme } from './index'

declare module 'styled-components' {
  // styled-components requires interface augmentation to expose the application theme.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
