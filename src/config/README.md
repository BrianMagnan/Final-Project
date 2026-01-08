# Configuration Constants

This directory contains centralized configuration files for the application.

## `constants.js`

This file contains all hard-coded constants used throughout the application. All constants are named in **UPPER_CASE** following JavaScript naming conventions.

### Usage

```javascript
import { HEADER_HEIGHT, PRIMARY_TEXT_COLOR, MOBILE_BREAKPOINT } from '../config/constants';

// Use in components
const headerStyle = {
  height: HEADER_HEIGHT,
  color: PRIMARY_TEXT_COLOR
};

// Use in media queries
@media (max-width: ${MOBILE_BREAKPOINT}) {
  /* mobile styles */
}
```

### Categories

#### **API Configuration**

- Spotify API credentials and endpoints
- Authentication redirect URIs

#### **UI Dimensions & Spacing**

- Header heights, footer margins
- Modal dimensions and padding
- Content widths and constraints

#### **Colors & Opacity**

- Text colors with transparency
- Background colors
- Border and shadow colors

#### **Font Sizes**

- Responsive font sizes for different breakpoints
- Title, subtitle, and body text sizes

#### **Animation Durations**

- Transition and animation timing
- Loading state durations

#### **Z-Index Values**

- Layering hierarchy for modals, overlays, and UI elements

#### **Breakpoints**

- Responsive design breakpoints
- Mobile, tablet, and desktop thresholds

#### **Layout Constraints**

- Maximum content widths
- Artwork and image dimensions

#### **Button Dimensions**

- Standard button sizes and padding
- Spotify button specifications

### Benefits

1. **Centralized Management**: All constants in one place
2. **Easy Updates**: Change values once, update everywhere
3. **Consistency**: Ensures consistent values across components
4. **Maintainability**: Clear naming makes code self-documenting
5. **Type Safety**: Can be extended with TypeScript interfaces

### Adding New Constants

When adding new constants:

1. **Use descriptive names** in UPPER_CASE
2. **Group by category** with clear comments
3. **Export individually** for tree-shaking
4. **Document the purpose** in comments
5. **Update this README** if adding new categories

### Example

```javascript
// Before (hard-coded)
const modalStyle = {
  width: "70%",
  height: "760px",
  padding: "25px",
};

// After (using constants)
import {
  MODAL_WIDTH_DESKTOP,
  MODAL_HEIGHT_DESKTOP,
  MODAL_PADDING,
} from "../config/constants";

const modalStyle = {
  width: MODAL_WIDTH_DESKTOP,
  height: MODAL_HEIGHT_DESKTOP,
  padding: MODAL_PADDING,
};
```
