/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const srcDir = ".";
export default {
  content: [
    `${srcDir}/components/**/*.{vue,js,ts}`,
    `${srcDir}/layouts/**/*.vue`,
    `${srcDir}/pages/**/*.vue`,
    `${srcDir}/composables/**/*.{js,ts}`,
    `${srcDir}/plugins/**/*.{js,ts}`,
    `${srcDir}/utils/**/*.{js,ts}`,
    `${srcDir}/App.{js,ts,vue}`,
    `${srcDir}/app.{js,ts,vue}`,
    `${srcDir}/Error.{js,ts,vue}`,
    `${srcDir}/error.{js,ts,vue}`,
    `${srcDir}/app.config.{js,ts}`
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
    plugin(function({ addVariant }) {addVariant('child-p', '&>p')}),
    plugin(function({ addVariant }) {addVariant('child-a', '& a')}),
    plugin(function({ addVariant }) {addVariant('child-list-ul', '&>ul')}),
    plugin(function({ addVariant }) {addVariant('child-list-ol', '&>ol')}),
    plugin(function({ addVariant }) {addVariant('child-list-ol-li', '&>ol>li')}),
    plugin(function({ addVariant }) {addVariant('child-list-ol-li-marker', '&>ol>li>::marker')}),
    plugin(function({ addVariant }) {addVariant('child-list-ul-li', '&>ul>li')}),
    plugin(function({ addVariant }) {addVariant('child-list-ol-li-ul', '&>ol>li>ul')}),
    plugin(function({ addVariant }) {addVariant('child-list-ul-li-ul', '&>ul>li>ul')}),
    plugin(function({ addVariant }) {addVariant('child-list-ol-li-ul-li', '&>ol>li>ul>li')}),
    plugin(function({ addVariant }) {addVariant('child-list-ul-li-ul-li', '&>ul>li>ul>li')})
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
        {customdark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#7dd3fc",
          "secondary": "#f59e0b",
          "accent": "#f87171",
          "neutral": "#2A3C45",
          "base-content": "#B9B9B9",
          "base-100": "#1F2023",
          "base-200": "#292B30",
          "base-300": "#3C3C3C",
          "info": "#a8a29e",
          "success": "#4d7c0f",
          "warning": "#c2410c",
          "error": "#dc2626",
        },},
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
}

