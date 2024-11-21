import plugin from "tailwindcss/plugin";

// https://gist.github.com/annedorko/340c00ab7c5844a47c782b005fdba872
const fontVariationSettings = plugin(function ({ addUtilities }) {
  const weights = {
    thin: 100,
    light: 300,
    normal: 400,
    semibold: 600,
    bold: 700,
    black: 900,
  };

  // Custom weights with italic, stretch, italic and stretch.
  Object.entries(weights).forEach((i) => {
    const [key, value] = i;
    const select = `.font-${key}`;
    const baseData = {};
    baseData[select] = {
      fontWeight: value,
      fontVariationSettings: `'wght' ${value}`,
    };

    addUtilities(baseData);
  });
});

export default fontVariationSettings;
