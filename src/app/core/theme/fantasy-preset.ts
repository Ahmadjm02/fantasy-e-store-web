import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const FantasyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f5f0e8',
      100: '#ece0c8',
      200: '#d8c9a6',
      300: '#c4b284',
      400: '#b09b62',
      500: '#9a7330',
      600: '#7d5e26',
      700: '#5f471d',
      800: '#3a2c12',
      900: '#2b2316',
      950: '#1a1509',
    },
    // '0' radius cascades to buttons, inputs, paginator, select-button, toast
    formField: {
      borderRadius: '0',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#efe7d2',
          50: '#e7dcc1',
          100: '#ddd0ad',
          200: '#cdbd91',
          300: '#bda874',
          400: '#9a7330',
          500: '#7d5e26',
          600: '#5f471d',
          700: '#473614',
          800: '#3a2c12',
          900: '#2b2316',
          950: '#1a1509',
        },
        primary: {
          color: '#3a4a32',
          contrastColor: '#efe7d2',
          hoverColor: '#2f3d29',
          activeColor: '#2f3d29',
        },
      },
    },
  },
  components: {
    dialog: {
      root: { borderRadius: '0' },
    },
    card: {
      root: { borderRadius: '0' },
    },
  },
});
