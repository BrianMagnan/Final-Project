# Fonts Folder

This folder contains the Inter font family for the Vary Suite website.

## Font Files Needed

To use the custom fonts, you need to download and add the following Inter font files to this folder:

### Regular Weights

- `Inter-Regular.woff2` - Regular (400)
- `Inter-Medium.woff2` - Medium (500)
- `Inter-SemiBold.woff2` - SemiBold (600)
- `Inter-Bold.woff2` - Bold (700)
- `Inter-ExtraBold.woff2` - ExtraBold (800)
- `Inter-Black.woff2` - Black (900)
- `Inter-Light.woff2` - Light (300)
- `Inter-Thin.woff2` - Thin (100)

### Italic Variants

- `Inter-Italic.woff2` - Regular Italic (400)
- `Inter-MediumItalic.woff2` - Medium Italic (500)
- `Inter-SemiBoldItalic.woff2` - SemiBold Italic (600)
- `Inter-BoldItalic.woff2` - Bold Italic (700)

## How to Download

1. Visit [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
2. Download the font family
3. Extract the files and copy the `.woff2` files to this folder
4. Alternatively, use the [Inter Font GitHub Repository](https://github.com/rsms/inter)

## File Formats

The CSS is set up to use multiple formats for maximum browser compatibility:

- **WOFF2** (primary) - Best compression, modern browsers
- **WOFF** (fallback) - Good compression, older browsers
- **TTF** (fallback) - Widest compatibility, larger file size

## Performance Benefits

- **Local Loading**: No external requests, faster page load
- **Offline Support**: Fonts work without internet connection
- **Better Control**: Customize font loading behavior
- **Reduced Dependencies**: No reliance on Google Fonts CDN

## Font Display Strategy

Using `font-display: swap` for optimal performance:

- Text renders immediately with fallback font
- Custom font swaps in when loaded
- Prevents invisible text during font loading
