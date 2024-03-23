import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/launchpad-react-lib/components/*.tsx',
    ],
    theme: {
        extend: {
            colors: {
                'brand-100': 'var(--theme-default)',

                'btn-primary': 'var(--btn-primary)',
                'btn-primary-hover': 'var(--btn-primary-hover)',
                'btn-disabled': 'var(--btn-disabled)',
                'btn-disabled-text': 'var(--btn-disabled-text)',

                'tab-brand-100': 'var(--tab-brand-100)',
                'tab-brand-100-hover': 'var(--tab-brand-100-hover)',
                'tab-brand-200': 'var(--tab-brand-200)',
                'tab-brand-300': 'var(--tab-brand-300)',
                'tab-brand-200-hover': 'var(--tab-brand-200-hover)',

                'input-brand-border': 'var(--input-brand-border)',
                'input-brand-error': 'var(--input-brand-error)',
                'input-brand-placeholder': 'var(--input-brand-placeholder)',
                'input-brand-active-border': 'var(--input-brand-active-border)',
                'input-brand-bg-disabled': 'var(--input-brand-bg-disabled)',

                'dropdown-hover': 'var(--dropdown-hover)',
                'dropdown-border': 'var(--dropdown-border)',
                'dropdown-placeholder': 'var(--dropdown-placeholder)',
                'dropdown-brand-100': 'var(--dropdown-brand-100)',
                'dropdown-error': 'var(--dropdown-error)',
            },

            minHeight: {
                screen: '100dvh',
            },
        },
    },
    plugins: [],
}
export default config
