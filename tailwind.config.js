import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f9f3ef',
                    100: '#f5ece7',
                    200: '#ebd8ce',
                    300: '#bf8262',
                    400: '#ac7558',
                    500: '#99684e',
                    600: '#8f624a',
                    700: '#734e3b',
                    800: '#563a2c',
                    900: '#432e22',
                },
                secondary: {
                    50: '#eff9f5',
                    100: '#e7f5f0',
                    200: '#ceebe0',
                    300: '#62bf9c',
                    400: '#58ac8c',
                    500: '#4e997d',
                    600: '#4a8f75',
                    700: '#3b735e',
                    800: '#2c5646',
                    900: '#224337',
                },
                accent: {
                    50: '#eff6f9',
                    100: '#e7f2f5',
                    200: '#cee3eb',
                    300: '#62a5bf', 
                    400: '#5895ac',
                    500: '#4e8499',
                    600: '#4a7c8f',
                    700: '#3b6373',
                    800: '#2c4a56',
                    900: '#223a43',
                },
                neutral: {
                    50: '#f6f3ed',
                    100: '#f4f0ea',
                    200: '#f2ede6',
                    300: '#ebe4d8',
                    400: '#c8c2b8',
                    500: '#aca69e',
                    600: '#52504c',
                    700: '#3b3936',
                    800: '#1a1918',
                    900: '#000000',
                },

                success: '#10b981',
                info: '#',
                warning: '#f59e0b',
                danger: '#ef4444',

            },
            fontFamily: {
                sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
                lora: ['Lora', ...defaultTheme.fontFamily.serif],
            },
            fontSize: {
                'xs': ['0.562rem', { lineHeight: '1' }],     
                'sm': ['0.750rem', { lineHeight: '1.25' }],   
                'base': ['1.000rem', { lineHeight: '1.5' }],  
                'h6': ['1.312rem', { lineHeight: '1.75' }],   
                'h5': ['1.688rem', { lineHeight: '1.75' }],  
                'h4': ['2.250rem', { lineHeight: '2' }],     
                'h3': ['2.938rem', { lineHeight: '2.25' }],  
                'h2': ['3.812rem', { lineHeight: '2.5' }],   
                'h1': ['5.000rem', { lineHeight: '2.75' }],   
            }
        },
    },

    plugins: [],
};
