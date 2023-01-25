/*
 * use the `csstype` package to provide custom autocompletion for the CSS-In-JS syntax of
 * Tailwind's `addComponents` API
 */
import type { AtRules, Properties, Pseudos } from "csstype";

type NestedSelectors = `&${Pseudos}` | AtRules;

export type TailwindComponent = Record<
  string,
  Properties | Record<NestedSelectors, Properties>
>;
