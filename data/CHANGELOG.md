# Carbon React V11 → V12 changelog

Generated 2026-09-24T23:44:35.985Z from the live V11 and V12 Storybooks. Values are computed styles.

Components: 30 unchanged · 50 changed · 17 new · 4 removed

## Tokens

- added `--cds-button-radius`: 0px
- added `--cds-button-radius-ee`: 0px
- added `--cds-button-radius-es`: 999999px
- added `--cds-button-radius-se`: 0px
- added `--cds-button-radius-ss`: 999999px
- changed `--cds-popover-border-radius`: 2px → .25rem

## Release notes (V12 Storybook: Getting Started/Changelog)

- **August 31, 2026**: New border-radius tokens have been introduced for various border-radius values. These tokens are accompanied by new visual updates made to input components such as TextInput, NumberInput, Search and more. Updates include rounded corners, a new gradient border, and some added margins and insets for surrounding buttons and menus.
- **August 5, 2026**: A new preview DatePicker has been added to @carbon/react as preview__DatePicker. It is built on the Temporal API and a framework-agnostic state machine shared with @carbon/web-components, replacing the Flatpickr-based implementation. Stories and documentation can be found in the Components/Preview/preview__DatePicker section of Storybook.
- **July 22, 2026**: Initial motion API has been added to @carbon/motion and @carbon/react packages. Stories along with documentation in the Overview page can be viewed in the Elements/Motion section of Storybook. The initial work covers definition of "surfaces" which are different motion animations we want to standardize (currently examples!) and new React wrapper components that implement the Motion library under the hood. There is an option to also utilize native CSS for the "reveal" surfaces.

## Changed (50)

### Breadcrumb

_Components · max 5.8% pixels, 3/5 stories differ_

- **Visual** Breadcrumb · .cds--tooltip-trigger__wrapper · line-height 0px → 18.0001px _(2 stories)_
- **Visual** Breadcrumb · .cds--popover · line-height 0px → 18.0001px _(2 stories)_
- **Visual** Breadcrumb · .cds--autoalign.cds--icon-tooltip.cds--popover-container.cds--tooltip · line-height 0px → 18.0001px _(2 stories)_
- **Visual** Breadcrumb · .cds--tooltip-trigger__wrapper · line-height 0px → 16px
- **Visual** Breadcrumb · .cds--popover · line-height 0px → 16px
- **Visual** Breadcrumb · .cds--autoalign.cds--icon-tooltip.cds--popover-container.cds--tooltip · line-height 0px → 16px
- **Structure** Breadcrumb · .cds--autoalign.cds--overflow-menu__container element added _(3 stories)_
- **Structure** Breadcrumb · .cds--overflow-menu__wrapper element removed _(3 stories)_
- **Structure** Breadcrumb · .cds--autoalign.cds--menu.cds--menu--border.cds--menu--md.cds--menu--open.cds--menu--shown.cds--overflow-menu__bottom-start element added
- **Structure** Breadcrumb · .cds--menu-item element added
- **Structure** Breadcrumb · .cds--menu-item__label element added
- **Structure** Breadcrumb · .cds--visually-hidden element removed
- **Structure** Breadcrumb · .cds--breadcrumb-menu-options.cds--overflow-menu-options.cds--overflow-menu-options--open element removed
- **Structure** Breadcrumb · .cds--overflow-menu-options__option element removed
- **Structure** Breadcrumb · .cds--overflow-menu-options__btn element removed
- **Structure** Breadcrumb · .cds--overflow-menu-options__option-content element removed

### Button

_Components · max 6.6% pixels, 7/24 stories differ_

- **Visual** Button · .cds--btn · border-radius 0px → 999999px (pill) _(9 stories)_
- **Visual** Button · .cds--btn.cds--skeleton · border-radius 0px → 999999px (pill)
- **Story** Button · story added: Radius

### ComboBox

_Components · max 1.0% pixels, 2/8 stories differ_

- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · background-color #f4f4f4 → transparent _(8 stories)_
- **Visual** ComboBox · .cds--text-input · border-radius 0px → 4px _(8 stories)_
- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · border-radius 0px → 4px _(8 stories)_
- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · border-top/right/left none → 1px solid transparent _(8 stories)_
- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(7 stories)_
- **Visual** ComboBox · .cds--text-input · border-bottom 1px solid #8d8d8d → none _(7 stories)_
- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent _(7 stories)_
- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · background-color #ffffff → transparent
- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** ComboBox · .cds--autoalign.cds--combo-box.cds--list-box · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** ComboBox · .cds--text-input · border-bottom 1px solid transparent → none
- **Visual** ComboBox · .cds--btn · border-radius 0px → 999999px (pill)
- **Layout** ComboBox · .cds--text-input · height 40px → 38px (-2px) _(8 stories)_
- **Layout** ComboBox · .cds--text-input · width 300px → 298px (-2px) _(6 stories)_
- **Layout** ComboBox · .cds--text-input · width 1196px → 1194px (-2px)
- **Layout** ComboBox · .cds--text-input · width 400px → 398px (-2px)
- **Story** ComboBox · story graduated from Feature Flag: components-combobox--floating-styles
- **Flag** ComboBox · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### ComboButton

_Components · max 7.9% pixels, 5/5 stories differ_

- **Visual** ComboButton · .cds--btn · border-radius 0px → 999999px 0px 0px 999999px (pill) _(5 stories)_
- **Visual** ComboButton · .cds--btn.cds--combo-button__trigger · border-radius 0px → 0px 999999px 999999px 0px _(4 stories)_
- **Visual** ComboButton · .cds--btn · display inline-flex → block
- **Visual** ComboButton · .cds--btn · padding 0px → 14px 63px 14px 15px
- **Layout** ComboButton · .cds--btn · width 48px → 172.25px (+124.25px)
- **Structure** ComboButton · .cds--combo-button__container.cds--combo-button__container--lg element added
- **Structure** ComboButton · .cds--combo-button__primary-action element added
- **Structure** ComboButton · .cds--autoalign.cds--icon-tooltip.cds--popover--auto-align.cds--popover--high-contrast.cds--popover--top.cds--popover-container.cds--tooltip element added
- **Structure** ComboButton · .cds--tooltip-trigger__wrapper element added
- **Structure** ComboButton · .cds--btn.cds--btn--icon-only.cds--btn--lg.cds--btn--primary.cds--combo-button__trigger.cds--layout--size-lg element added
- **Structure** ComboButton · .cds--popover element added
- **Structure** ComboButton · .cds--combo-button__container.cds--combo-button__container--lg element removed
- **Structure** ComboButton · .cds--combo-button__primary-action element removed
- **Structure** ComboButton · .cds--btn.cds--btn--lg.cds--btn--primary.cds--layout--size-lg element removed
- **Structure** ComboButton · .cds--autoalign.cds--icon-tooltip.cds--popover--auto-align.cds--popover--high-contrast.cds--popover--top.cds--popover-container.cds--tooltip element removed
- **Structure** ComboButton · .cds--tooltip-trigger__wrapper element removed
- **Structure** ComboButton · .cds--popover element removed
- **Story** ComboButton · story graduated from Feature Flag: components-combobutton--floating-styles
- **Flag** ComboButton · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### ComposedModal

_Components · max 2.5% pixels, 8/10 stories differ_

- **Visual** ComposedModal · .cds--btn · border-radius 0px → 999999px (pill) _(10 stories)_
- **Visual** ComposedModal · .cds--text-input · background-color #ffffff → transparent _(6 stories)_
- **Visual** ComposedModal · .cds--select-input · background-color #ffffff → transparent _(6 stories)_
- **Visual** ComposedModal · .cds--text-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(6 stories)_
- **Visual** ComposedModal · .cds--select-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(6 stories)_
- **Visual** ComposedModal · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(6 stories)_
- **Visual** ComposedModal · .cds--select-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(6 stories)_
- **Visual** ComposedModal · .cds--text-input · border-radius 0px → 4px _(6 stories)_
- **Visual** ComposedModal · .cds--select-input · border-radius 0px → 4px _(6 stories)_
- **Visual** ComposedModal · .cds--text-input · border-top/right/left none → 1px solid transparent _(6 stories)_
- **Visual** ComposedModal · .cds--select-input · border-top/right/left none → 1px solid transparent _(6 stories)_
- **Visual** ComposedModal · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px _(2 stories)_
- **Visual** ComposedModal · .cds--dropdown.cds--list-box · background-color #ffffff → transparent
- **Visual** ComposedModal · .cds--autoalign.cds--list-box.cds--multi-select · background-color #ffffff → transparent
- **Visual** ComposedModal · .cds--dropdown.cds--list-box · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** ComposedModal · .cds--autoalign.cds--list-box.cds--multi-select · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** ComposedModal · .cds--dropdown.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** ComposedModal · .cds--autoalign.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** ComposedModal · .cds--dropdown.cds--list-box · border-radius 0px → 4px
- **Visual** ComposedModal · .cds--autoalign.cds--list-box.cds--multi-select · border-radius 0px → 4px
- **Visual** ComposedModal · .cds--dropdown.cds--list-box · border-top/right/left none → 1px solid transparent
- **Visual** ComposedModal · .cds--autoalign.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent
- **Structure** ComposedModal · .cds--visually-hidden element removed _(6 stories)_
- **Structure** ComposedModal · .cds--popover-caret element removed _(2 stories)_

### ContainedList

_Components · max 0.4% pixels, 1/11 stories differ_

- **Visual** ContainedList · .cds--search-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** ContainedList · .cds--search-magnifier · border-radius 0px → 4px
- **Visual** ContainedList · .cds--tag · border-radius 16px → 2px
- **Visual** ContainedList · .cds--search-input · border-radius 0px → 4px
- **Visual** ContainedList · .cds--search-input · border-top/right/left none → 1px solid transparent
- **Visual** ContainedList · .cds--tooltip-trigger__wrapper · line-height 0px → 16px
- **Visual** ContainedList · .cds--popover · line-height 0px → 16px
- **Visual** ContainedList · .cds--autoalign.cds--icon-tooltip.cds--popover-container.cds--tooltip · line-height 0px → 16px
- **Structure** ContainedList · .cds--autoalign.cds--overflow-menu__container element added
- **Structure** ContainedList · .cds--overflow-menu__wrapper element removed

### CopyButton

_Components · max 0.0% pixels, 0/1 stories differ_

- **Visual** CopyButton · .cds--btn.cds--copy.cds--copy-btn · border-radius 0px → 999999px (pill)

### DataTable

_Components · max 0.0% pixels, 0/25 stories differ_

- **Visual** DataTable · .cds--search-input · background-color #f4f4f4 → transparent _(8 stories)_
- **Visual** DataTable · .cds--search-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(8 stories)_
- **Visual** DataTable · .cds--search-input · border-radius 0px → 4px _(8 stories)_
- **Visual** DataTable · .cds--autoalign.cds--icon-tooltip.cds--popover-container.cds--tooltip · display inline-block → block _(8 stories)_
- **Visual** DataTable · .cds--tooltip-trigger__wrapper · line-height 0px → 16px _(8 stories)_
- **Visual** DataTable · .cds--popover · line-height 0px → 16px _(8 stories)_
- **Visual** DataTable · .cds--autoalign.cds--icon-tooltip.cds--popover-container.cds--tooltip · line-height 0px → 16px _(8 stories)_
- **Visual** DataTable · .cds--btn.cds--overflow-menu · padding 8px 0px → 0px _(8 stories)_
- **Visual** DataTable · .cds--search-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(5 stories)_
- **Visual** DataTable · .cds--search-input · border-top/right/left none → 1px solid transparent _(5 stories)_
- **Visual** DataTable · .cds--btn.cds--overflow-menu · border-radius 0px → 999999px (pill)
- **Visual** DataTable · .cds--tooltip-trigger__wrapper · line-height 0px → 18.0001px
- **Visual** DataTable · .cds--popover · line-height 0px → 18.0001px
- **Visual** DataTable · .cds--autoalign.cds--icon-tooltip.cds--popover-container.cds--tooltip · line-height 0px → 18.0001px
- **Structure** DataTable · .cds--autoalign.cds--overflow-menu.cds--overflow-menu__container.cds--toolbar-action element added _(8 stories)_
- **Structure** DataTable · .cds--overflow-menu__wrapper element removed _(8 stories)_
- **Structure** DataTable · .cds--autoalign.cds--overflow-menu__container element added

### DatePicker

_Components · max 1.7% pixels, 8/9 stories differ_

> August 5, 2026: A new preview DatePicker has been added to @carbon/react as preview__DatePicker. It is built on the Temporal API and a framework-agnostic state machine shared with @carbon/web-components, replacing the Flatpickr-based implementation. Stories and documentation can be found in the Components/Preview/preview__DatePicker section of Storybook.

- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · background-color #f4f4f4 → transparent _(8 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(7 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-bottom 1px solid #8d8d8d → 1px solid transparent _(7 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 4px _(6 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-top/right/left none → 1px solid transparent _(6 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · background-color #ffffff → transparent _(3 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(3 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 4px 0px 0px 4px _(2 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 0px 4px 4px 0px _(2 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-top/left none → 1px solid transparent _(2 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-top/right none → 1px solid transparent _(2 stories)_
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** DatePicker · .cds--date-picker__input.cds--date-picker__input--md · border-bottom 1px solid #4589ff → 1px solid transparent
- **Visual** DatePicker · .cds--label · border-radius 0px → 4px
- **Visual** DatePicker · .cds--date-picker__input.cds--skeleton · border-radius 0px → 4px 0px 0px 4px
- **Visual** DatePicker · .cds--date-picker__input.cds--skeleton · border-radius 0px → 0px 4px 4px 0px

### Dropdown

_Components · max 1.4% pixels, 5/9 stories differ_

- **Visual** Dropdown · .cds--dropdown.cds--list-box · border-radius 0px → 4px _(7 stories)_
- **Visual** Dropdown · .cds--dropdown.cds--list-box · border-top/right/left none → 1px solid transparent _(7 stories)_
- **Visual** Dropdown · .cds--dropdown.cds--list-box · background-color #f4f4f4 → transparent _(5 stories)_
- **Visual** Dropdown · .cds--dropdown.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(4 stories)_
- **Visual** Dropdown · .cds--dropdown.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent _(4 stories)_
- **Visual** Dropdown · .cds--autoalign.cds--dropdown.cds--list-box · background-color #f4f4f4 → transparent
- **Visual** Dropdown · .cds--dropdown.cds--list-box · background-color #ffffff → transparent
- **Visual** Dropdown · .cds--autoalign.cds--dropdown.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Dropdown · .cds--dropdown.cds--list-box · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** Dropdown · .cds--dropdown.cds--list-box · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Dropdown · .cds--autoalign.cds--dropdown.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** Dropdown · .cds--autoalign.cds--dropdown.cds--list-box · border-radius 0px → 4px
- **Visual** Dropdown · .cds--dropdown.cds--skeleton · border-radius 0px → 4px
- **Visual** Dropdown · .cds--autoalign.cds--dropdown.cds--list-box · border-top/right/left none → 1px solid transparent
- **Layout** Dropdown · .cds--dropdown.cds--list-box · width 119.28px → 121.28px (+2px) _(2 stories)_
- **Story** Dropdown · story graduated from Feature Flag: components-dropdown--floating-styles
- **Flag** Dropdown · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### ErrorBoundary

_Components · max 1.7% pixels, 2/2 stories differ_

- **Visual** ErrorBoundary · .cds--btn · border-radius 0px → 999999px (pill) _(2 stories)_

### FileUploader

_Components · max 1.2% pixels, 4/8 stories differ_

- **Visual** FileUploader · .cds--btn · border-radius 0px → 999999px (pill) _(3 stories)_
- **Visual** FileUploader · .cds--btn.cds--skeleton · border-radius 0px → 999999px (pill)
- **Flag** FileUploader · feature flag enable-enhanced-file-uploader: off in V11 → opt-in

### Fluid Components

_Components · max 5.6% pixels, 27/36 stories differ_

- **Visual** Fluid Components · .cds--form-item · border-radius 0px → 4px _(10 stories)_
- **Visual** Fluid Components · .cds--text-input · border-radius 0px → 4px _(9 stories)_
- **Visual** Fluid Components · .cds--list-box.cds--skeleton · background-color #e8e8e8 → transparent _(5 stories)_
- **Visual** Fluid Components · .cds--form-item · background-color #f4f4f4 → transparent _(5 stories)_
- **Visual** Fluid Components · .cds--list-box.cds--skeleton · background-image none → linear-gradient(#e8e8e8, #e8e8e8), linear-gradient(#e0e0e0 calc(100% - 4px), #c6c6c6 100%) (now drawn with gradients) _(5 stories)_
- **Visual** Fluid Components · .cds--form-item · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(5 stories)_
- **Visual** Fluid Components · .cds--form-item · border none → 1px solid transparent _(5 stories)_
- **Visual** Fluid Components · .cds--list-box.cds--skeleton · border-bottom 1px solid #c6c6c6 → 1px solid transparent _(5 stories)_
- **Visual** Fluid Components · .cds--list-box.cds--skeleton · border-radius 0px → 4px _(5 stories)_
- **Visual** Fluid Components · .cds--label.cds--skeleton · border-radius 0px → 4px _(5 stories)_
- **Visual** Fluid Components · .cds--skeleton.cds--text-input · border-radius 0px → 4px _(5 stories)_
- **Visual** Fluid Components · .cds--list-box.cds--skeleton · border-top/right/left none → 1px solid transparent _(5 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--combo-box.cds--list-box · background-color #f4f4f4 → transparent _(4 stories)_
- **Visual** Fluid Components · .cds--dropdown.cds--list-box · background-color #f4f4f4 → transparent _(4 stories)_
- **Visual** Fluid Components · .cds--form-item.cds--text-input-wrapper · background-color #f4f4f4 → transparent _(4 stories)_
- **Visual** Fluid Components · .cds--text-input · background-color #f4f4f4 → transparent _(4 stories)_
- **Visual** Fluid Components · .cds--select · background-color #f4f4f4 → transparent _(4 stories)_
- **Visual** Fluid Components · .cds--select-input · background-color #f4f4f4 → transparent _(4 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--list-box.cds--multi-select · background-color #f4f4f4 → transparent _(4 stories)_
- **Visual** Fluid Components · .cds--form-item · background-color #e8e8e8 → transparent _(4 stories)_
- **Visual** Fluid Components · .cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(4 stories)_
- **Visual** Fluid Components · .cds--form-item · background-image none → linear-gradient(#e8e8e8, #e8e8e8), linear-gradient(#e0e0e0 calc(100% - 4px), #c6c6c6 100%) (now drawn with gradients) _(4 stories)_
- **Visual** Fluid Components · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(4 stories)_
- **Visual** Fluid Components · .cds--form-item · border-bottom 1px solid #c6c6c6 → 1px solid transparent _(4 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--combo-box.cds--list-box · border-radius 0px → 4px _(4 stories)_
- **Visual** Fluid Components · .cds--dropdown.cds--list-box · border-radius 0px → 4px _(4 stories)_
- **Visual** Fluid Components · .cds--list-box__wrapper.cds--list-box__wrapper--fluid.cds--multi-select__wrapper · border-radius 0px → 4px _(4 stories)_
- **Visual** Fluid Components · .cds--select-input__wrapper · border-radius 0px → 4px _(4 stories)_
- **Visual** Fluid Components · .cds--select-input · border-radius 0px → 4px _(4 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--list-box.cds--multi-select · border-radius 0px → 4px _(4 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--combo-box.cds--list-box · border-top/right/left none → 1px solid transparent _(4 stories)_
- **Visual** Fluid Components · .cds--dropdown.cds--list-box · border-top/right/left none → 1px solid transparent _(4 stories)_
- **Visual** Fluid Components · .cds--text-input · border-top/right/left none → 1px solid transparent _(4 stories)_
- **Visual** Fluid Components · .cds--select-input · border-top/right/left none → 1px solid transparent _(4 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent _(4 stories)_
- **Visual** Fluid Components · .cds--form-item · border-top/right/left none → 1px solid transparent _(4 stories)_
- **Visual** Fluid Components · .cds--combo-box.cds--list-box.cds--multi-select · background-color #f4f4f4 → transparent _(3 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--combo-box.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(3 stories)_
- **Visual** Fluid Components · .cds--dropdown.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(3 stories)_
- **Visual** Fluid Components · .cds--select-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(3 stories)_
- **Visual** Fluid Components · .cds--combo-box.cds--list-box.cds--multi-select · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(3 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--list-box.cds--multi-select · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(3 stories)_
- **Visual** Fluid Components · .cds--text-input · border-bottom 1px solid #8d8d8d → none _(3 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--combo-box.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent _(3 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-bottom 1px solid #8d8d8d → none _(3 stories)_
- **Visual** Fluid Components · .cds--dropdown.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent _(3 stories)_
- **Visual** Fluid Components · .cds--select-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(3 stories)_
- **Visual** Fluid Components · .cds--combo-box.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent _(3 stories)_
- **Visual** Fluid Components · .cds--autoalign.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent _(3 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 4px _(3 stories)_
- **Visual** Fluid Components · .cds--combo-box.cds--list-box.cds--multi-select · border-radius 0px → 4px _(3 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-top/right/left none → 1px solid transparent _(3 stories)_
- **Visual** Fluid Components · .cds--combo-box.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent _(3 stories)_
- **Visual** Fluid Components · .cds--search-input · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** Fluid Components · .cds--form-item.cds--password-input-wrapper.cds--text-input-wrapper · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** Fluid Components · .cds--password-input.cds--text-input · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** Fluid Components · .cds--search-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(2 stories)_
- **Visual** Fluid Components · .cds--password-input.cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(2 stories)_
- **Visual** Fluid Components · .cds--number__control-btn · border none → 1px solid transparent _(2 stories)_
- **Visual** Fluid Components · .cds--date-picker-container · border-bottom 1px solid #8d8d8d → none _(2 stories)_
- **Visual** Fluid Components · .cds--search-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(2 stories)_
- **Visual** Fluid Components · .cds--password-input.cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(2 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-left 1px solid #8d8d8d → 1px solid #e0e0e0 _(2 stories)_
- **Visual** Fluid Components · .cds--list-box__wrapper.cds--list-box__wrapper--fluid · border-radius 0px → 4px _(2 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 4px 0px 0px 4px _(2 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 0px 4px 4px 0px _(2 stories)_
- **Visual** Fluid Components · .cds--dropdown__wrapper.cds--list-box__wrapper.cds--list-box__wrapper--fluid · border-radius 0px → 4px _(2 stories)_
- **Visual** Fluid Components · .cds--search-input · border-radius 0px → 4px _(2 stories)_
- **Visual** Fluid Components · .cds--number__control-btn · border-radius 0px → 4px _(2 stories)_
- **Visual** Fluid Components · .cds--password-input.cds--text-input · border-radius 0px → 4px _(2 stories)_
- **Visual** Fluid Components · .cds--btn.cds--tooltip__trigger · border-radius 0px → 4px _(2 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-top/left none → 1px solid transparent _(2 stories)_
- **Visual** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · border-top/right none → 1px solid transparent _(2 stories)_
- **Visual** Fluid Components · .cds--search-input · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** Fluid Components · .cds--password-input.cds--text-input · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** Fluid Components · .cds--number__rule-divider · display block → none _(2 stories)_
- **Visual** Fluid Components · .cds--combo-box.cds--list-box.cds--multi-select · background-color #ffffff → transparent
- **Visual** Fluid Components · .cds--autoalign.cds--combo-box.cds--list-box · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** Fluid Components · .cds--dropdown.cds--list-box · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** Fluid Components · .cds--combo-box.cds--list-box.cds--multi-select · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Fluid Components · .cds--autoalign.cds--list-box.cds--multi-select · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** Fluid Components · .cds--select-input · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** Fluid Components · .cds--text-input · border-bottom 1px solid transparent → none
- **Visual** Fluid Components · .cds--select-input · border-bottom 1px solid #4589ff → 1px solid transparent
- **Visual** Fluid Components · .cds--list-box__wrapper.cds--list-box__wrapper--fluid.cds--list-box__wrapper--fluid--condensed · border-radius 0px → 4px
- **Visual** Fluid Components · .cds--list-box__wrapper.cds--list-box__wrapper--decorator.cds--list-box__wrapper--fluid · border-radius 0px → 4px
- **Visual** Fluid Components · .cds--dropdown__wrapper.cds--list-box__wrapper.cds--list-box__wrapper--fluid.cds--list-box__wrapper--fluid--condensed · border-radius 0px → 4px
- **Visual** Fluid Components · .cds--dropdown__wrapper.cds--list-box__wrapper.cds--list-box__wrapper--decorator.cds--list-box__wrapper--fluid · border-radius 0px → 4px
- **Visual** Fluid Components · .cds--btn · border-radius 0px → 999999px (pill)
- **Visual** Fluid Components · .cds--list-box__wrapper.cds--list-box__wrapper--fluid.cds--list-box__wrapper--fluid--condensed.cds--multi-select__wrapper · border-radius 0px → 4px
- **Visual** Fluid Components · .cds--list-box__wrapper.cds--list-box__wrapper--decorator.cds--list-box__wrapper--fluid.cds--multi-select__wrapper · border-radius 0px → 4px
- **Visual** Fluid Components · .cds--select-input · border-top/left none → 1px solid transparent
- **Visual** Fluid Components · .cds--label.cds--skeleton · display block → inline-block
- **Layout** Fluid Components · .cds--text-input · height 64px → 62px (-2px) _(4 stories)_
- **Layout** Fluid Components · .cds--form-item · height 64px → 66px (+2px) _(4 stories)_
- **Layout** Fluid Components · .cds--text-input · width 400px → 398px (-2px) _(4 stories)_
- **Layout** Fluid Components · .cds--list-box__field · width 200px → 199px (-1px) _(4 stories)_
- **Layout** Fluid Components · .cds--list-box__field::before · width 200px → 199px (-1px) _(4 stories)_
- **Layout** Fluid Components · .cds--text-input · height 63px → 62px (-1px) _(3 stories)_
- **Layout** Fluid Components · .cds--form-item · height 64px → 65px (+1px) _(2 stories)_
- **Layout** Fluid Components · .cds--date-picker-container · height 64px → 63px (-1px) _(2 stories)_
- **Layout** Fluid Components · .cds--number__rule-divider · height 16px → 0px (-16px) _(2 stories)_
- **Layout** Fluid Components · .cds--form-item · width 288px → 290px (+2px) _(2 stories)_
- **Layout** Fluid Components · .cds--form-item · width 144px → 146px (+2px) _(2 stories)_
- **Layout** Fluid Components · .cds--number__rule-divider · width 1px → 0px (-1px) _(2 stories)_
- **Layout** Fluid Components · .cds--label.cds--skeleton · width 200px → 199px (-1px) _(2 stories)_
- **Layout** Fluid Components · .cds--label.cds--skeleton::before · width 200px → 199px (-1px) _(2 stories)_
- **Layout** Fluid Components · .cds--form-item · width 411px → 415px (+4px)
- **Layout** Fluid Components · .cds--date-picker-container · width 205.5px → 206.5px (+1px)
- **Layout** Fluid Components · .cds--date-picker__input.cds--date-picker__input--md · width 205.5px → 206.5px (+1px)
- **Layout** Fluid Components · .cds--text-input · width 600px → 598px (-2px)
- **Layout** Fluid Components · .cds--text-input · width 292px → 290px (-2px)
- **Layout** Fluid Components · .cds--text-input · width 300px → 298px (-2px)
- **Layout** Fluid Components · .cds--label.cds--skeleton · width 150px → 149px (-1px)
- **Layout** Fluid Components · .cds--label.cds--skeleton::before · width 150px → 149px (-1px)
- **Layout** Fluid Components · .cds--label.cds--skeleton · width 37.5px → 36.5px (-1px)
- **Layout** Fluid Components · .cds--label.cds--skeleton::before · width 37.5px → 36.5px (-1px)
- **Layout** Fluid Components · .cds--list-box__field · width 37.5px → 36.5px (-1px)
- **Layout** Fluid Components · .cds--list-box__field::before · width 37.5px → 36.5px (-1px)
- **Layout** Fluid Components · .cds--list-box__field · width 75px → 74px (-1px)
- **Layout** Fluid Components · .cds--list-box__field::before · width 75px → 74px (-1px)
- **Layout** Fluid Components · .cds--label.cds--skeleton · width 75px → 74px (-1px)
- **Layout** Fluid Components · .cds--label.cds--skeleton::before · width 75px → 74px (-1px)

### Form

_Components · max 1.0% pixels, 2/2 stories differ_

- **Visual** Form · .cds--search-input · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** Form · .cds--text-input · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** Form · .cds--dropdown.cds--list-box · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** Form · .cds--select-input · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** Form · .cds--combo-box.cds--list-box.cds--multi-select · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** Form · .cds--password-input.cds--text-input · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** Form · .cds--autoalign.cds--combo-box.cds--list-box · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** Form · .cds--autoalign.cds--list-box.cds--multi-select · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** Form · .cds--search-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(2 stories)_
- **Visual** Form · .cds--password-input.cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(2 stories)_
- **Visual** Form · .cds--number__control-btn · border none → 1px solid transparent _(2 stories)_
- **Visual** Form · .cds--search-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(2 stories)_
- **Visual** Form · .cds--password-input.cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(2 stories)_
- **Visual** Form · .cds--search-input · border-radius 0px → 4px _(2 stories)_
- **Visual** Form · .cds--text-input · border-radius 0px → 4px _(2 stories)_
- **Visual** Form · .cds--dropdown.cds--list-box · border-radius 0px → 4px _(2 stories)_
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 4px 0px 0px 4px _(2 stories)_
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 0px 4px 4px 0px _(2 stories)_
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-radius 0px → 4px _(2 stories)_
- **Visual** Form · .cds--number__control-btn · border-radius 0px → 4px _(2 stories)_
- **Visual** Form · .cds--select-input · border-radius 0px → 4px _(2 stories)_
- **Visual** Form · .cds--combo-box.cds--list-box.cds--multi-select · border-radius 0px → 4px _(2 stories)_
- **Visual** Form · .cds--password-input.cds--text-input · border-radius 0px → 4px _(2 stories)_
- **Visual** Form · .cds--btn · border-radius 0px → 999999px (pill) _(2 stories)_
- **Visual** Form · .cds--btn.cds--tooltip__trigger · border-radius 0px → 4px _(2 stories)_
- **Visual** Form · .cds--autoalign.cds--combo-box.cds--list-box · border-radius 0px → 4px _(2 stories)_
- **Visual** Form · .cds--autoalign.cds--list-box.cds--multi-select · border-radius 0px → 4px _(2 stories)_
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-top/left none → 1px solid transparent _(2 stories)_
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-top/right none → 1px solid transparent _(2 stories)_
- **Visual** Form · .cds--search-input · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** Form · .cds--text-input · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** Form · .cds--dropdown.cds--list-box · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** Form · .cds--select-input · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** Form · .cds--combo-box.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** Form · .cds--password-input.cds--text-input · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** Form · .cds--autoalign.cds--combo-box.cds--list-box · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** Form · .cds--autoalign.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** Form · .cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Form · .cds--dropdown.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Form · .cds--select-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Form · .cds--combo-box.cds--list-box.cds--multi-select · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Form · .cds--autoalign.cds--combo-box.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Form · .cds--autoalign.cds--list-box.cds--multi-select · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Form · .cds--text-input · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** Form · .cds--dropdown.cds--list-box · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** Form · .cds--select-input · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** Form · .cds--combo-box.cds--list-box.cds--multi-select · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** Form · .cds--autoalign.cds--combo-box.cds--list-box · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** Form · .cds--autoalign.cds--list-box.cds--multi-select · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** Form · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** Form · .cds--dropdown.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** Form · .cds--select-input · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** Form · .cds--combo-box.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** Form · .cds--text-input · border-bottom 1px solid #8d8d8d → none
- **Visual** Form · .cds--autoalign.cds--combo-box.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** Form · .cds--autoalign.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** Form · .cds--text-input · border-bottom 1px solid #4589ff → 1px solid transparent
- **Visual** Form · .cds--date-picker__input.cds--date-picker__input--md · border-bottom 1px solid #4589ff → 1px solid transparent
- **Visual** Form · .cds--select-input · border-bottom 1px solid #4589ff → 1px solid transparent
- **Visual** Form · .cds--text-input · border-bottom 1px solid transparent → none
- **Visual** Form · .cds--number__rule-divider · display block → none
- **Layout** Form · .cds--text-input · height 39px → 38px (-1px) _(2 stories)_
- **Layout** Form · .cds--text-input · height 40px → 38px (-2px) _(2 stories)_
- **Layout** Form · .cds--text-input · width 600px → 598px (-2px) _(2 stories)_
- **Layout** Form · .cds--text-input · width 292px → 290px (-2px) _(2 stories)_
- **Layout** Form · .cds--number__rule-divider · height 16px → 0px (-16px)
- **Layout** Form · .cds--number__rule-divider · width 1px → 0px (-1px)
- **Structure** Form · .cds--number__control-btn element removed

### FormGroup

_Components · max 0.3% pixels, 1/1 stories differ_

- **Visual** FormGroup · .cds--text-input · background-color #f4f4f4 → transparent
- **Visual** FormGroup · .cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** FormGroup · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** FormGroup · .cds--text-input · border-radius 0px → 4px
- **Visual** FormGroup · .cds--btn · border-radius 0px → 999999px (pill)
- **Visual** FormGroup · .cds--text-input · border-top/right/left none → 1px solid transparent

### FormLabel

_Components · max 0.0% pixels, 0/2 stories differ_

- **Visual** FormLabel · .cds--actionable-notification · border-radius 0px → 8px
- **Visual** FormLabel · .cds--actionable-notification::before · border-radius 0px → 0px 4px 4px 0px
- **Structure** FormLabel · .cds--visually-hidden element removed

### IconButton

_Components · max 10.6% pixels, 1/2 stories differ_

- **Visual** IconButton · .cds--btn · border-radius 0px → 999999px (pill) _(2 stories)_
- **Visual** IconButton · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px
- **Structure** IconButton · .cds--popover-caret element removed

### InlineLoading

_Components · max 30.2% pixels, 1/2 stories differ_

- **Visual** InlineLoading · .cds--btn · box-shadow none → #e0e0e0 -1px 0px 0px 0px
- **Layout** InlineLoading · .cds--btn · width 123.97px → 196px (+72.03px)
- **Layout** InlineLoading · .cds--btn · width 125.97px → 196px (+70.03px)
- **Structure** InlineLoading · .cds--btn-set element added

### Loading

_Components · max 3.7% pixels, 2/3 stories differ_

- **Visual** Loading · .cds--btn · border-radius 0px → 999999px (pill) _(2 stories)_

### Menu

_Components · max 0.3% pixels, 1/1 stories differ_

- **Visual** Menu · .cds--menu-item · border-radius 0px → 4px
- **Visual** Menu · .cds--menu · border-radius 0px → 8px
- **Visual** Menu · .cds--menu-item-divider · margin 4px 0px → 4px -4px
- **Visual** Menu · .cds--menu · outline none → 1px solid #e0e0e0
- **Visual** Menu · .cds--menu-item · padding 0px 16px → 0px 12px
- **Visual** Menu · .cds--menu · padding 4px 0px → 4px
- **Flag** Menu · feature flag enable-v12-overflowmenu: off in V11 → on by default in V12

### MenuButton

_Components · max 2.3% pixels, 8/8 stories differ_

- **Visual** MenuButton · .cds--btn.cds--menu-button__trigger · border-radius 0px → 999999px (pill) _(8 stories)_
- **Flag** MenuButton · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### Modal

_Components · max 2.6% pixels, 7/11 stories differ_

- **Visual** Modal · .cds--btn · border-radius 0px → 999999px (pill) _(11 stories)_
- **Visual** Modal · .cds--text-input · background-color #ffffff → transparent _(3 stories)_
- **Visual** Modal · .cds--select-input · background-color #ffffff → transparent _(3 stories)_
- **Visual** Modal · .cds--text-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(3 stories)_
- **Visual** Modal · .cds--select-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(3 stories)_
- **Visual** Modal · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(3 stories)_
- **Visual** Modal · .cds--select-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(3 stories)_
- **Visual** Modal · .cds--text-input · border-radius 0px → 4px _(3 stories)_
- **Visual** Modal · .cds--select-input · border-radius 0px → 4px _(3 stories)_
- **Visual** Modal · .cds--text-input · border-top/right/left none → 1px solid transparent _(3 stories)_
- **Visual** Modal · .cds--select-input · border-top/right/left none → 1px solid transparent _(3 stories)_
- **Visual** Modal · .cds--autoalign.cds--combo-box.cds--list-box · background-color #ffffff → transparent _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--list-box.cds--multi-select · background-color #ffffff → transparent _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--combo-box.cds--list-box · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--list-box.cds--multi-select · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--combo-box.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent _(2 stories)_
- **Visual** Modal · .cds--text-input · border-bottom 1px solid #8d8d8d → none _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--combo-box.cds--list-box · border-radius 0px → 4px _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--list-box.cds--multi-select · border-radius 0px → 4px _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--combo-box.cds--list-box · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** Modal · .cds--autoalign.cds--dropdown.cds--list-box · background-color #ffffff → transparent
- **Visual** Modal · .cds--autoalign.cds--dropdown.cds--list-box · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Modal · .cds--autoalign.cds--dropdown.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** Modal · .cds--autoalign.cds--dropdown.cds--list-box · border-radius 0px → 4px
- **Visual** Modal · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px
- **Visual** Modal · .cds--autoalign.cds--dropdown.cds--list-box · border-top/right/left none → 1px solid transparent
- **Layout** Modal · .cds--text-input · height 40px → 38px (-2px) _(2 stories)_
- **Layout** Modal · .cds--text-input · width 734px → 732px (-2px) _(2 stories)_
- **Structure** Modal · .cds--visually-hidden element removed _(7 stories)_
- **Structure** Modal · .cds--popover-caret element removed

### MultiSelect

_Components · max 1.8% pixels, 10/14 stories differ_

- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · background-color #f4f4f4 → transparent _(9 stories)_
- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · border-radius 0px → 4px _(9 stories)_
- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent _(9 stories)_
- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(8 stories)_
- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent _(8 stories)_
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · background-color #f4f4f4 → transparent _(5 stories)_
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · border-radius 0px → 4px _(5 stories)_
- **Visual** MultiSelect · .cds--text-input · border-radius 0px → 4px _(5 stories)_
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · border-top/right/left none → 1px solid transparent _(5 stories)_
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(4 stories)_
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · border-bottom 1px solid #8d8d8d → 1px solid transparent _(4 stories)_
- **Visual** MultiSelect · .cds--tag__close-icon · border-radius 50% → 4px _(2 stories)_
- **Visual** MultiSelect · .cds--tag · border-radius 16px → 4px _(2 stories)_
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · background-color #ffffff → transparent
- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · background-color #ffffff → transparent
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** MultiSelect · .cds--combo-box.cds--list-box.cds--multi-select · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** MultiSelect · .cds--autoalign.cds--list-box.cds--multi-select · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** MultiSelect · .cds--btn · border-radius 0px → 999999px (pill)
- **Layout** MultiSelect · .cds--text-input · height 39px → 38px (-1px) _(5 stories)_
- **Layout** MultiSelect · .cds--text-input · width 300px → 298px (-2px) _(4 stories)_
- **Layout** MultiSelect · .cds--text-input · width 400px → 398px (-2px)
- **Flag** MultiSelect · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### Notifications

_Components · max 0.9% pixels, 3/7 stories differ_

- **Visual** Notifications · .cds--actionable-notification · border-radius 0px → 8px _(3 stories)_
- **Visual** Notifications · .cds--actionable-notification__close-button · border-radius 0px → 999999px (pill) _(3 stories)_
- **Visual** Notifications · .cds--actionable-notification__action-button.cds--btn · border-radius 0px → 999999px (pill) _(2 stories)_
- **Visual** Notifications · .cds--actionable-notification · border-radius 0px → 4px _(2 stories)_
- **Visual** Notifications · .cds--actionable-notification::before · border-radius 0px → 0px 4px 4px 0px
- **Visual** Notifications · .cds--inline-notification · border-radius 0px → 4px
- **Visual** Notifications · .cds--inline-notification__close-button · border-radius 0px → 999999px (pill)
- **Visual** Notifications · .cds--toast-notification · border-radius 0px → 8px
- **Visual** Notifications · .cds--toast-notification__close-button · border-radius 0px → 999999px (pill)
- **Visual** Notifications · .cds--inline-notification__close-button · margin 0px → 8px
- **Visual** Notifications · .cds--toast-notification__close-button · margin 0px 0px 0px 25.3125px → 8px 8px 0px 33.3125px
- **Structure** Notifications · .cds--visually-hidden element removed _(2 stories)_

### NumberInput

_Components · max 0.6% pixels, 1/6 stories differ_

> August 31, 2026: New border-radius tokens have been introduced for various border-radius values. These tokens are accompanied by new visual updates made to input components such as TextInput, NumberInput, Search and more. Updates include rounded corners, a new gradient border, and some added margins and insets for surrounding buttons and menus.

- **Visual** NumberInput · .cds--number__control-btn · border none → 1px solid transparent _(5 stories)_
- **Visual** NumberInput · .cds--number__control-btn · border-radius 0px → 4px _(5 stories)_
- **Visual** NumberInput · .cds--number__rule-divider · display block → none _(4 stories)_
- **Visual** NumberInput · .cds--label.cds--skeleton · border-radius 0px → 4px
- **Visual** NumberInput · .cds--number.cds--skeleton · border-radius 0px → 4px
- **Layout** NumberInput · .cds--number__rule-divider · height 16px → 0px (-16px) _(4 stories)_
- **Layout** NumberInput · .cds--number__rule-divider · width 1px → 0px (-1px) _(4 stories)_
- **Structure** NumberInput · .cds--number__control-btn element removed

### OverflowMenu

_Components · max 7.4% pixels, 1/6 stories differ_

- **Visual** OverflowMenu · .cds--btn.cds--overflow-menu · border-radius 0px → 999999px (pill) _(5 stories)_
- **Visual** OverflowMenu · .cds--tooltip-trigger__wrapper · line-height 0px → 16px
- **Visual** OverflowMenu · .cds--popover · line-height 0px → 16px
- **Visual** OverflowMenu · .cds--autoalign.cds--icon-tooltip.cds--popover-container.cds--tooltip · line-height 0px → 16px
- **Structure** OverflowMenu · .cds--autoalign.cds--overflow-menu__container element added _(2 stories)_
- **Structure** OverflowMenu · .cds--overflow-menu__wrapper element removed _(2 stories)_
- **Structure** OverflowMenu · .cds--autoalign.cds--icon-tooltip.cds--popover--auto-align.cds--popover--high-contrast.cds--popover--top.cds--popover-container.cds--tooltip element added
- **Structure** OverflowMenu · .cds--tooltip-trigger__wrapper element added
- **Structure** OverflowMenu · .cds--btn.cds--btn--ghost.cds--btn--icon-only.cds--overflow-menu element added
- **Structure** OverflowMenu · .cds--overflow-menu__icon element added
- **Structure** OverflowMenu · .cds--popover element added
- **Structure** OverflowMenu · .cds--icon-tooltip.cds--popover--caret.cds--popover--high-contrast.cds--popover--top.cds--popover-container.cds--tooltip element removed
- **Structure** OverflowMenu · .cds--tooltip-trigger__wrapper element removed
- **Structure** OverflowMenu · .cds--btn.cds--btn--ghost.cds--btn--icon-only.cds--btn--md.cds--layout--size-md.cds--overflow-menu.cds--overflow-menu--md element removed
- **Structure** OverflowMenu · .cds--overflow-menu__icon element removed
- **Structure** OverflowMenu · .cds--popover element removed
- **Story** OverflowMenu · story graduated from Feature Flag: components-overflowmenu--auto-align
- **Story** OverflowMenu · story graduated from Feature Flag: components-overflowmenu--floating-styles
- **Story** OverflowMenu · story graduated from Feature Flag: components-overflowmenu--nested
- **Story** OverflowMenu · story graduated from Feature Flag: components-overflowmenu--with-menu-alignment
- **Story** OverflowMenu · story removed: Default
- **Flag** OverflowMenu · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12
- **Flag** OverflowMenu · feature flag enable-v12-overflowmenu: off in V11 → on by default in V12

### Pagination

_Components · max 1.3% pixels, 1/7 stories differ_

- **Visual** Pagination · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px
- **Structure** Pagination · .cds--popover-caret element removed

### PasswordInput

_Components · max 0.9% pixels, 1/1 stories differ_

- **Visual** PasswordInput · .cds--password-input.cds--text-input · background-color #f4f4f4 → transparent
- **Visual** PasswordInput · .cds--password-input.cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** PasswordInput · .cds--password-input.cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** PasswordInput · .cds--password-input.cds--text-input · border-radius 0px → 4px
- **Visual** PasswordInput · .cds--btn.cds--tooltip__trigger · border-radius 0px → 4px
- **Visual** PasswordInput · .cds--password-input.cds--text-input · border-top/right/left none → 1px solid transparent

### Popover

_Components · max 9.6% pixels, 5/6 stories differ_

- **Visual** Popover · .cds--popover-content · border-radius 2px → 8px _(4 stories)_
- **Visual** Popover · .cds--popover-content · border-radius 0px → 8px _(2 stories)_
- **Visual** Popover · .cds--popover-caret · display block → none _(2 stories)_
- **Structure** Popover · .cds--popover-caret element removed
- **Story** Popover · story graduated from Feature Flag: components-popover--floating-styles
- **Flag** Popover · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### ProgressBar

_Components · max 0.0% pixels, 0/4 stories differ_

- **Visual** ProgressBar · .cds--progress-bar__track · border-radius 0px → 999999px (pill) _(4 stories)_
- **Visual** ProgressBar · .cds--progress-bar__track::after · background-color transparent → #0f62fe _(2 stories)_
- **Visual** ProgressBar · .cds--progress-bar__track::after · background-image linear-gradient(90deg, #0f62fe 12.5%, transparent 12.5%) → none _(2 stories)_
- **Visual** ProgressBar · .cds--progress-bar__bar · border-radius 0px → 999999px (pill) _(2 stories)_
- **Visual** ProgressBar · .cds--progress-bar__track::after · border-radius 0px → 999999px (pill) _(2 stories)_
- **Layout** ProgressBar · .cds--progress-bar__track::after · width 1196px → 299px (-897px) _(2 stories)_

### Search

_Components · max 0.5% pixels, 2/5 stories differ_

> August 31, 2026: New border-radius tokens have been introduced for various border-radius values. These tokens are accompanied by new visual updates made to input components such as TextInput, NumberInput, Search and more. Updates include rounded corners, a new gradient border, and some added margins and insets for surrounding buttons and menus.

- **Visual** Search · .cds--search-input · border-radius 0px → 4px _(3 stories)_
- **Visual** Search · .cds--search-input · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** Search · .cds--search-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(2 stories)_
- **Visual** Search · .cds--search-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(2 stories)_
- **Visual** Search · .cds--search-magnifier · border-radius 0px → 4px _(2 stories)_
- **Visual** Search · .cds--search-input · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** Search · .cds--search-input · background-color #ffffff → transparent
- **Visual** Search · .cds--search-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)

### Select

_Components · max 2.9% pixels, 4/5 stories differ_

- **Visual** Select · .cds--select-input · border-radius 0px → 4px _(4 stories)_
- **Visual** Select · .cds--select-input · background-color #f4f4f4 → transparent _(3 stories)_
- **Visual** Select · .cds--select-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(3 stories)_
- **Visual** Select · .cds--select-input · border-top/right/left none → 1px solid transparent _(3 stories)_
- **Visual** Select · .cds--select-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(2 stories)_
- **Visual** Select · .cds--select-input · background-color #ffffff → transparent
- **Visual** Select · .cds--select-input · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** Select · .cds--select-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** Select · .cds--select-input · border none → 1px solid transparent
- **Visual** Select · .cds--select-input · border-bottom 1px solid #4589ff → 1px solid transparent
- **Visual** Select · .cds--label.cds--skeleton · border-radius 0px → 4px
- **Visual** Select · .cds--select.cds--skeleton · border-radius 0px → 4px

### Slider

_Components · max 0.3% pixels, 2/10 stories differ_

- **Visual** Slider · .cds--slider-text-input.cds--text-input · background-color #f4f4f4 → transparent _(5 stories)_
- **Visual** Slider · .cds--slider-text-input.cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(5 stories)_
- **Visual** Slider · .cds--slider-text-input.cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(5 stories)_
- **Visual** Slider · .cds--slider-text-input.cds--text-input · border-radius 0px → 4px _(5 stories)_
- **Visual** Slider · .cds--slider-text-input.cds--text-input · border-top/right/left none → 1px solid transparent _(5 stories)_
- **Visual** Slider · .cds--slider-text-input.cds--text-input · background-color #ffffff → transparent _(2 stories)_
- **Visual** Slider · .cds--slider-text-input.cds--text-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(2 stories)_

### StructuredList

_Components · max 7.0% pixels, 3/5 stories differ_

- **Visual** StructuredList · .cds--structured-list-td · padding 16px 16px 24px 0px → 16px 16px 24px
- **Structure** StructuredList · .cds--structured-list.cds--structured-list--selection element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-thead element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-row.cds--structured-list-row--header-row element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-th element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-tbody element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-row element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-td element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list__icon element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-input.cds--visually-hidden element added _(2 stories)_
- **Structure** StructuredList · .cds--structured-list.cds--structured-list--selection element removed _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-thead element removed _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-row.cds--structured-list-row--header-row element removed _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-th element removed _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-tbody element removed _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-row element removed _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-td element removed _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-input.cds--visually-hidden element removed _(2 stories)_
- **Structure** StructuredList · .cds--structured-list-svg element removed _(2 stories)_
- **Structure** StructuredList · .cds--layer-two.cds--layer__with-background element added
- **Structure** StructuredList · .cds--layer-three.cds--layer__with-background element added
- **Structure** StructuredList · .cds--layer-two.cds--layer__with-background element removed
- **Structure** StructuredList · .cds--layer-three.cds--layer__with-background element removed
- **Story** StructuredList · story removed: Selection
- **Story** StructuredList · story removed: With Background Layer
- **Flag** StructuredList · feature flag enable-v12-structured-list-visible-icons: off in V11 → on by default in V12

### Tabs

_Components · max 3.5% pixels, 5/17 stories differ_

- **Visual** Tabs · .cds--btn · border-radius 0px → 999999px (pill) _(3 stories)_
- **Visual** Tabs · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px _(2 stories)_
- **Structure** Tabs · .cds--popover-caret element removed _(2 stories)_

### Tag

_Components · max 1.2% pixels, 6/6 stories differ_

- **Visual** Tag · .cds--tag · border-radius 16px → 4px _(5 stories)_
- **Visual** Tag · .cds--tag__close-icon · border-radius 50% → 4px _(2 stories)_
- **Visual** Tag · .cds--btn · border-radius 0px → 999999px (pill)
- **Visual** Tag · .cds--skeleton.cds--tag · border-radius 16px → 4px

### TextInput

_Components · max 1.9% pixels, 5/7 stories differ_

> August 31, 2026: New border-radius tokens have been introduced for various border-radius values. These tokens are accompanied by new visual updates made to input components such as TextInput, NumberInput, Search and more. Updates include rounded corners, a new gradient border, and some added margins and insets for surrounding buttons and menus.

- **Visual** TextInput · .cds--text-input · border-top/right/left none → 1px solid transparent _(6 stories)_
- **Visual** TextInput · .cds--text-input · background-color #f4f4f4 → transparent _(5 stories)_
- **Visual** TextInput · .cds--text-input · border-radius 0px → 4px _(5 stories)_
- **Visual** TextInput · .cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(4 stories)_
- **Visual** TextInput · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(4 stories)_
- **Visual** TextInput · .cds--text-input · background-color #ffffff → transparent
- **Visual** TextInput · .cds--text-input · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** TextInput · .cds--text-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** TextInput · .cds--text-input · border-bottom 1px solid #4589ff → 1px solid transparent
- **Visual** TextInput · .cds--label.cds--skeleton · border-radius 0px → 4px
- **Visual** TextInput · .cds--skeleton.cds--text-input · border-radius 0px → 4px

### Tile

_Components · max 0.4% pixels, 2/23 stories differ_

- **Visual** Tile · .cds--btn · border-radius 0px → 999999px (pill) _(2 stories)_
- **Structure** Tile · .cds--tile--icon element added _(2 stories)_
- **Flag** Tile · feature flag enable-experimental-tile-contrast: deprecated → opt-in
- **Flag** Tile · feature flag enable-tile-contrast: off in V11 → opt-in
- **Flag** Tile · feature flag enable-v12-tile-default-icons: off in V11 → on by default in V12
- **Flag** Tile · feature flag enable-v12-tile-radio-icons: off in V11 → on by default in V12

### TimePicker

_Components · max 2.0% pixels, 2/2 stories differ_

- **Visual** TimePicker · .cds--text-input.cds--time-picker__input-field · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** TimePicker · .cds--select-input · background-color #f4f4f4 → transparent _(2 stories)_
- **Visual** TimePicker · .cds--text-input.cds--time-picker__input-field · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(2 stories)_
- **Visual** TimePicker · .cds--select-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(2 stories)_
- **Visual** TimePicker · .cds--text-input.cds--time-picker__input-field · border-bottom 1px solid #8d8d8d → 1px solid transparent _(2 stories)_
- **Visual** TimePicker · .cds--select-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(2 stories)_
- **Visual** TimePicker · .cds--text-input.cds--time-picker__input-field · border-radius 0px → 4px _(2 stories)_
- **Visual** TimePicker · .cds--select-input · border-radius 0px → 4px _(2 stories)_
- **Visual** TimePicker · .cds--text-input.cds--time-picker__input-field · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** TimePicker · .cds--select-input · border-top/right/left none → 1px solid transparent _(2 stories)_
- **Visual** TimePicker · .cds--text-input.cds--time-picker__input-field · background-color #ffffff → transparent
- **Visual** TimePicker · .cds--select-input · background-color #ffffff → transparent
- **Visual** TimePicker · .cds--text-input.cds--time-picker__input-field · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** TimePicker · .cds--select-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Layout** TimePicker · .cds--select-input · width 85px → 87px (+2px) _(2 stories)_
- **Layout** TimePicker · .cds--select-input · width 143px → 145px (+2px) _(2 stories)_

### Toggle

_Components · max 7.9% pixels, 3/5 stories differ_

- **Visual** Toggle · .cds--toggle__label-text · margin 0px 0px 16px → 0px 0px 8px _(3 stories)_
- **Visual** Toggle · .cds--toggle__label-text.cds--visually-hidden · margin -1px -1px 16px → -1px -1px 8px
- **Flag** Toggle · feature flag enable-v12-toggle-reduced-label-spacing: off in V11 → on by default in V12

### Toggletip

_Components · max 17.9% pixels, 1/3 stories differ_

- **Visual** Toggletip · .cds--btn · border-radius 0px → 999999px (pill) _(2 stories)_
- **Visual** Toggletip · .cds--popover-content · border-radius 2px → 4px _(2 stories)_
- **Story** Toggletip · story graduated from Feature Flag: components-toggletip--floating-styles
- **Flag** Toggletip · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### Tooltip

_Components · max 4.4% pixels, 4/5 stories differ_

- **Visual** Tooltip · .cds--btn · border-radius 0px → 999999px (pill) _(3 stories)_
- **Structure** Tooltip · .cds--autoalign.cds--popover--auto-align.cds--popover--bottom.cds--popover--high-contrast.cds--popover-container.cds--tooltip element added
- **Structure** Tooltip · .cds--tooltip-trigger__wrapper element added
- **Structure** Tooltip · .cds--popover element added
- **Structure** Tooltip · .cds--autoalign.cds--popover--auto-align.cds--popover--bottom.cds--popover--high-contrast.cds--popover-container.cds--tooltip element removed
- **Structure** Tooltip · .cds--tooltip-trigger__wrapper element removed
- **Structure** Tooltip · .cds--popover element removed
- **Story** Tooltip · story graduated from Feature Flag: components-tooltip--floating-styles
- **Flag** Tooltip · feature flag enable-v12-dynamic-floating-styles: off in V11 → on by default in V12

### TreeView

_Components · max 0.3% pixels, 1/6 stories differ_

- **Visual** TreeView · .cds--btn · border-radius 0px → 999999px (pill) _(2 stories)_
- **Visual** TreeView · .cds--btn.cds--tree-node__label__text-button · border-radius 0px → 999999px (pill)
- **Flag** TreeView · feature flag enable-treeview-controllable: off in V11 → opt-in

### UI Shell

_Components · max 0.0% pixels, 0/11 stories differ_

- **Visual** UI Shell · .cds--btn · border-radius 0px → 999999px (pill) _(11 stories)_

### preview__Card

_Preview · max 0.0% pixels, 0/17 stories differ_

- **Visual** preview__Card · .cds--tag · border-radius 16px → 4px

### preview__DatePicker

_Preview · max 1.7% pixels, 8/9 stories differ_

> August 5, 2026: A new preview DatePicker has been added to @carbon/react as preview__DatePicker. It is built on the Temporal API and a framework-agnostic state machine shared with @carbon/web-components, replacing the Flatpickr-based implementation. Stories and documentation can be found in the Components/Preview/preview__DatePicker section of Storybook.

- **Visual** preview__DatePicker · .cds--date-picker__input · background-color #f4f4f4 → transparent _(8 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(7 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(7 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · border-radius 0px → 4px _(6 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · border-top/right/left none → 1px solid transparent _(6 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · background-color #ffffff → transparent _(3 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(3 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · border-radius 0px → 4px 0px 0px 4px _(2 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · border-radius 0px → 0px 4px 4px 0px _(2 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · border-top/left none → 1px solid transparent _(2 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · border-top/right none → 1px solid transparent _(2 stories)_
- **Visual** preview__DatePicker · .cds--date-picker__input · background-image linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%) → linear-gradient(0deg, #4589ff / 16% 0%, 15%, transparent 50%, transparent 100%), linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#a6c8ff / 64% calc(100% - 4px), #4589ff 100%)
- **Visual** preview__DatePicker · .cds--date-picker__input · border-bottom 1px solid #4589ff → 1px solid transparent
- **Visual** preview__DatePicker · .cds--label.cds--skeleton · border-radius 0px → 4px
- **Visual** preview__DatePicker · .cds--date-picker__input.cds--skeleton · border-radius 0px → 4px 0px 0px 4px
- **Visual** preview__DatePicker · .cds--date-picker__input.cds--skeleton · border-radius 0px → 0px 4px 4px 0px

### preview__Dialog

_Preview · max 2.8% pixels, 5/5 stories differ_

- **Visual** preview__Dialog · .cds--btn · border-radius 0px → 999999px (pill) _(5 stories)_
- **Visual** preview__Dialog · .cds--text-input · background-color #ffffff → transparent _(3 stories)_
- **Visual** preview__Dialog · .cds--select-input · background-color #ffffff → transparent _(3 stories)_
- **Visual** preview__Dialog · .cds--text-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(3 stories)_
- **Visual** preview__Dialog · .cds--select-input · background-image none → linear-gradient(#ffffff, #ffffff), linear-gradient(#c6c6c6 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients) _(3 stories)_
- **Visual** preview__Dialog · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(3 stories)_
- **Visual** preview__Dialog · .cds--select-input · border-bottom 1px solid #8d8d8d → 1px solid transparent _(3 stories)_
- **Visual** preview__Dialog · .cds--text-input · border-radius 0px → 4px _(3 stories)_
- **Visual** preview__Dialog · .cds--select-input · border-radius 0px → 4px _(3 stories)_
- **Visual** preview__Dialog · .cds--popover-content.cds--tooltip-content · border-radius 2px → 4px _(3 stories)_
- **Visual** preview__Dialog · .cds--text-input · border-top/right/left none → 1px solid transparent _(3 stories)_
- **Visual** preview__Dialog · .cds--select-input · border-top/right/left none → 1px solid transparent _(3 stories)_
- **Structure** preview__Dialog · .cds--popover-caret element removed _(3 stories)_

### preview__Layout

_Preview · max 0.6% pixels, 1/1 stories differ_

- **Visual** preview__Layout · .cds--text-input · background-color #f4f4f4 → transparent
- **Visual** preview__Layout · .cds--text-input · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** preview__Layout · .cds--text-input · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** preview__Layout · .cds--text-input · border-radius 0px → 4px
- **Visual** preview__Layout · .cds--btn · border-radius 0px → 999999px (pill)
- **Visual** preview__Layout · .cds--tag · border-radius 16px → 4px
- **Visual** preview__Layout · .cds--tag · border-radius 16px → 2px
- **Visual** preview__Layout · .cds--text-input · border-top/right/left none → 1px solid transparent
- **Layout** preview__Layout · .cds--text-input · width 230.47px → 231.8px (+1.33px)

### preview__OverflowMenuV2

_Preview · max 0.0% pixels, 0/1 stories differ_

- **Visual** preview__OverflowMenuV2 · .cds--btn.cds--overflow-menu · border-radius 0px → 999999px (pill)

### preview_Text

_Preview · max 0.2% pixels, 1/4 stories differ_

- **Visual** preview_Text · .cds--dropdown.cds--list-box · background-color #f4f4f4 → transparent
- **Visual** preview_Text · .cds--dropdown.cds--list-box · background-image none → linear-gradient(#f4f4f4, #f4f4f4), linear-gradient(#e0e0e0 calc(100% - 4px), #8d8d8d 100%) (now drawn with gradients)
- **Visual** preview_Text · .cds--dropdown.cds--list-box · border-bottom 1px solid #8d8d8d → 1px solid transparent
- **Visual** preview_Text · .cds--btn · border-radius 0px → 999999px (pill)
- **Visual** preview_Text · .cds--dropdown.cds--list-box · border-radius 0px → 4px
- **Visual** preview_Text · .cds--dropdown.cds--list-box · border-top/right/left none → 1px solid transparent

## New (17)

### Coachmark

_Components_

- **Story** Coachmark · story added: Floating
- **Story** Coachmark · story added: Tooltip

### EditInPlace

_Components_

- **Story** EditInPlace · story added: Default
- **Story** EditInPlace · story added: Custom Blur Function
- **Story** EditInPlace · story added: Invalid
- **Story** EditInPlace · story added: Read Only

### FullPageError

_Components_

- **Story** FullPageError · story added: Default
- **Story** FullPageError · story added: Error 403
- **Story** FullPageError · story added: Error 404

### InterstitialScreen

_Components_

- **Story** InterstitialScreen · story added: Full Screen
- **Story** InterstitialScreen · story added: Full Screen With Multiple Steps
- **Story** InterstitialScreen · story added: Modal
- **Story** InterstitialScreen · story added: Modal With Multiple Steps
- **Story** InterstitialScreen · story added: With Asynchronous Action Callback
- **Story** InterstitialScreen · story added: With Custom Action Buttons

### NotificationsPanel

_Components_

- **Story** NotificationsPanel · story added: Default

### OptionsTile

_Components_

- **Story** OptionsTile · story added: Default
- **Story** OptionsTile · story added: Static

### PageHeader

_Components_

- **Story** PageHeader · story added: Default
- **Story** PageHeader · story added: Compact
- **Story** PageHeader · story added: Content With Contextual Actions
- **Story** PageHeader · story added: Content With Contextual Actions And Page Actions
- **Story** PageHeader · story added: Content With Hero Image
- **Story** PageHeader · story added: Content With Icon
- **Story** PageHeader · story added: Custom Render With Callbacks
- **Story** PageHeader · story added: Tab Bar With Tabs And Tags
- **Story** PageHeader · story added: With Disabled Sticky Tab Bar

### SidePanel

_Components_

- **Story** SidePanel · story added: Multi-step panel
- **Story** SidePanel · story added: Slide in
- **Story** SidePanel · story added: Slide over
- **Story** SidePanel · story added: Specify element to have initial focus
- **Story** SidePanel · story added: With action toolbar
- **Story** SidePanel · story added: With AI Label
- **Story** SidePanel · story added: With static title
- **Story** SidePanel · story added: Without title

### TagOverflow

_Components_

- **Story** TagOverflow · story added: Custom Components With Overflow Modal
- **Story** TagOverflow · story added: Interactive Tags
- **Story** TagOverflow · story added: Multiline Tags
- **Story** TagOverflow · story added: Tags With Overflow Count
- **Story** TagOverflow · story added: Tags With Overflow Modal
- **Story** TagOverflow · story added: Tags With Truncation
- **Story** TagOverflow · story added: User Avatars With Overflow Count
- **Story** TagOverflow · story added: User Avatars With Overflow Modal

### Tearsheet

_Components_

- **Story** Tearsheet · story added: Default
- **Story** Tearsheet · story added: Narrow Tearsheet
- **Story** Tearsheet · story added: Stacking Narrow Tearsheets
- **Story** Tearsheet · story added: Stacking Tearsheet
- **Story** Tearsheet · story added: Stacking With Different Sizes
- **Story** Tearsheet · story added: With Custom Footer Actions
- **Story** Tearsheet · story added: With Influencer
- **Story** Tearsheet · story added: With Steps
- **Story** Tearsheet · story added: With Steps And Horizontal Progress Indicator
- **Story** Tearsheet · story added: With Tabs

### UserAvatar

_Components_

- **Story** UserAvatar · story added: Default
- **Story** UserAvatar · story added: WithImage

### Motion

_Elements_

> July 22, 2026: Initial motion API has been added to @carbon/motion and @carbon/react packages. Stories along with documentation in the Overview page can be viewed in the Elements/Motion section of Storybook. The initial work covers definition of "surfaces" which are different motion animations we want to standardize (currently examples!) and new React wrapper components that implement the Motion library under the hood. There is an option to also utilize native CSS for the "reveal" surfaces.

- **Story** Motion · story added: 🚀 Custom Surface With Motion
- **Story** Motion · story added: 🚀 Custom Surface With Native CSS
- **Story** Motion · story added: 🚀 Expand
- **Story** Motion · story added: 🚀 Button To Dialog
- **Story** Motion · story added: 🚀 Tile To Dialog

### Onboarding

_Preview_

- **Story** Onboarding · story added: Default
- **Story** Onboarding · story added: Collapsible
- **Story** Onboarding · story added: Many Insights

### preview__BigNumber

_Preview_

- **Story** preview__BigNumber · story added: Default

### Resizer

_Utilities_

- **Story** Resizer · story added: Four panels
- **Story** Resizer · story added: Single panel (bounded)
- **Story** Resizer · story added: Single panel (no boundaries)
- **Story** Resizer · story added: Single panel (overlay)
- **Story** Resizer · story added: Two panels (horizontal)
- **Story** Resizer · story added: Two panels (vertical)
- **Story** Resizer · story added: Two panels vertical (grid)
- **Story** Resizer · story added: With custom handles

### ScrollGradient

_Utilities_

- **Story** ScrollGradient · story added: Default (vertical)
- **Story** ScrollGradient · story added: With x and y axis

### TruncatedText

_Utilities_

- **Story** TruncatedText · story added: With expand
- **Story** TruncatedText · story added: With tooltip

## Removed (4)

### ModalWrapper

_Deprecated_

- **Story** ModalWrapper · story removed: Default

### preview__PageHeader

_Deprecated_

- **Story** preview__PageHeader · story removed: Default

### preview__StaticNotification

_Deprecated_

- **Story** preview__StaticNotification · story removed: Default

### preview_Pagination

_Deprecated_

- **Story** preview_Pagination · story removed: with a page selector
- **Story** preview_Pagination · story removed: with no sizer, child input, or child selector
- **Story** preview_Pagination · story removed: Playground

## Unchanged (30)

### Accordion

_Components · max 0.0% pixels, 0/4 stories differ_


### AILabel

_Components · max 0.0% pixels, 0/3 stories differ_


### AspectRatio

_Components · max 0.0% pixels, 0/1 stories differ_


### Checkbox

_Components · max 0.0% pixels, 0/5 stories differ_


### ClassPrefix

_Components · max 0.0% pixels, 0/1 stories differ_


### CodeSnippet

_Components · max 0.0% pixels, 0/7 stories differ_


### ContentSwitcher

_Components · max 0.0% pixels, 0/6 stories differ_


### DefinitionTooltip

_Components · max 0.0% pixels, 0/2 stories differ_


### Heading

_Components · max 0.0% pixels, 0/2 stories differ_


### IdPrefix

_Components · max 0.0% pixels, 0/1 stories differ_


### Layer

_Components · max 0.0% pixels, 0/4 stories differ_


### Link

_Components · max 0.0% pixels, 0/3 stories differ_


### OrderedList

_Components · max 0.0% pixels, 0/3 stories differ_


### PaginationNav

_Components · max 0.0% pixels, 0/1 stories differ_


### ProgressIndicator

_Components · max 0.0% pixels, 0/3 stories differ_


### RadioButton

_Components · max 0.0% pixels, 0/4 stories differ_


### Skeleton

_Components · max 0.0% pixels, 0/6 stories differ_


### TextArea

_Components · max 0.0% pixels, 0/4 stories differ_


### Theme

_Components · max 0.0% pixels, 0/4 stories differ_


### UnorderedList

_Components · max 0.0% pixels, 0/2 stories differ_


### FlexGrid

_Elements · max 0.0% pixels, 0/11 stories differ_


### Grid

_Elements · max 0.0% pixels, 0/12 stories differ_


### IBM Plex

_Elements · max 0.0% pixels, 0/8 stories differ_


### Icons

_Elements · max 0.0% pixels, 0/2 stories differ_

- **Flag** Icons · feature flag enable-v12-structured-list-visible-icons: off in V11 → on by default in V12
- **Flag** Icons · feature flag enable-v12-tile-default-icons: off in V11 → on by default in V12
- **Flag** Icons · feature flag enable-v12-tile-radio-icons: off in V11 → on by default in V12

### HideAtBreakpoint

_Helpers · max 0.0% pixels, 0/1 stories differ_


### useContextMenu

_Hooks · max 0.0% pixels, 0/2 stories differ_


### Stack

_Layout · max 0.0% pixels, 0/2 stories differ_


### preview__ChatButton

_Preview · max 0.0% pixels, 0/1 stories differ_


### StatusIndicators

_Preview · max 0.0% pixels, 0/4 stories differ_


### OverflowHandler

_Utilities · max 0.0% pixels, 0/1 stories differ_

