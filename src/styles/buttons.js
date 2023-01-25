/*
 * Here we export a Tailwind plugin that adds some new button components to the `components` layer
 * of Tailwind's theme. Doing it through Tailwind's plugin system gives us full autocompletion
 * through its LSP/VSCode plugin, rather than just handwriting it in plain CSS.
 */
const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents, theme }) {
  // import the custom type we wrote in the ./types.ts file so we get proper autocompletion of CSS
  // properties for the CSS-in-JS syntax below
  /** @type {import('./types').TailwindComponent} */
  const buttonComponents = {
    ".btn-primary": {
      marginTop: theme("spacing.6"),
      border: theme("rounded.md"),
      backgroundColor: theme("colors.purple.700"),
      borderRadius: theme("borderRadius.md"),
      paddingBlock: theme("spacing.2"),
      paddingInline: theme("spacing.4"),
      fontSize: theme("fontSize.lg"),
      fontWeight: theme("fontWeight.medium"),
      color: theme("colors.white"),
      "&:disabled": {
        borderWidth: theme("borderWidth.2"),
        borderColor: theme("colors.purple.300"),
        backgroundColor: theme("colors.purple.200"),
        color: theme("colors.white"),
      },
    },
  };

  addComponents(buttonComponents);
});
