import { type CSSProp, css } from 'styled-components'

export const Breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
} as const

export type IBreakpoint = keyof typeof Breakpoints

export const cssFromBp = (breakpoint: IBreakpoint, styles: string | CSSProp) =>
  css`@media only screen and (min-width: ${Breakpoints[breakpoint]}px) {
    ${styles}
  }`
export const cssUptoBp = (breakpoint: IBreakpoint, styles: string | CSSProp) =>
  css`@media only screen and (max-width: ${Breakpoints[breakpoint]}px) {
    ${styles}
  }`

export const sm = (styles: string | CSSProp) => cssFromBp('sm', styles)
export const md = (styles: string | CSSProp) => cssFromBp('md', styles)
export const lg = (styles: string | CSSProp) => cssFromBp('lg', styles)
export const xl = (styles: string | CSSProp) => cssFromBp('xl', styles)
