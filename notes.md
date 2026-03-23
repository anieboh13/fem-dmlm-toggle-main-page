# Functional Requirements and Notes 

Light/Dark Mode toggle -- takes system pref by default, but can override with toggle

- What HTML markup (accessible)
- Switching between light?dark mode via javascrript
- Three options toggle: light/dark/system pref

CSS Variables (Custom Properties)

Prefer-color-scheme media query 

Accessibility
- Use correct heading tags 
- Screenreader-only text for card titles/username


For content of the body 
BEM = BLOCK ELEMENT MODIFIER
Block = card 
Element = icon, platform, count, change
Modifier = facebook, twitter etc 

.card {
    &__icon {
        &--facebook
    }
}

& - this will reference the parent selector, for example the parent selector above is 'card'