/**
 * Type declarations for emotion theming.
 */

import "@emotion/react"
import type { Theme as AppTheme } from "@/styles/theme"

declare module "@emotion/react" {
  export interface Theme extends AppTheme {}
}
