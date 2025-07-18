# Animated Commit Heatmap

A customizable GitHub-style commit heatmap with smooth fill animations, designed for creating GIFs to showcase private repository activity on portfolios and README files.

## Overview

This project provides an animated commit heatmap component that visually represents coding activity in the familiar GitHub contribution graph style. The primary purpose is to generate custom GIFs that can be used to display private repository commit patterns where actual GitHub contribution graphs cannot be shared publicly.

## Features

- **GitHub-accurate styling** - Matches GitHub's exact colors and visual design for both light and dark modes
- **Smooth animations** - Column-by-column fill animation with customizable timing
- **Responsive design** - Adapts to light/dark mode preferences automatically
- **Customizable data** - Easy to modify commit levels and patterns
- **GIF-ready output** - Optimized for direct GIF recording

## Use Cases

- **Portfolio websites** - Showcase coding activity from private repositories
- **README files** - Add dynamic visual elements to project documentation
- **Social media** - Create engaging content showing development progress
- **Presentations** - Visual representation of coding productivity over time

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/llotze/animated-heatmap.git
cd animated-heatmap
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Creating GIFs

### Recommended Workflow with ScreenToGif

1. **Download ScreenToGif** - Get it from [screentogif.com](https://www.screentogif.com/)
2. **Customize the data** - Modify the `getRandomLevel()` function or replace with your actual commit data
3. **Adjust timing** - Change the animation speed by modifying the interval value (currently 80ms)
4. **Position and record**:
   - Set your browser to the desired theme (light/dark)
   - Ensure the heatmap is centered and fully visible
   - Open ScreenToGif and select the recording area around the heatmap
   - Click "Start Animation" and begin recording
   - Stop recording after one complete animation cycle
5. **Edit and export** - Use ScreenToGif's built-in editor to trim, optimize, and export your GIF

### ScreenToGif Recording Tips

- Use a consistent frame rate (15-30 FPS works well)
- Keep the recording area tight around the heatmap for smaller file sizes
- Record multiple cycles if you want a longer loop
- Use ScreenToGif's optimization features to reduce file size

## Customization

### Commit Data

The component uses a random data generator by default. To use your own data:

```javascript
// Replace the getRandomLevel() function with your data
const commitData = {
  // Your commit levels (0-5) for each cell
};
```

### Animation Timing

Adjust the fill speed by changing the interval value:

```javascript
// Faster animation (40ms intervals)
setInterval(() => {
  // animation logic
}, 40);

// Slower animation (120ms intervals)  
setInterval(() => {
  // animation logic
}, 120);
```

### Visual Styling

The component uses GitHub's exact color palette and can be customized by modifying the `getColor()` function.

## Component Structure

```
src/
├── app/
│   ├── components/
│   │   └── CommitHeatmap.js    # Main heatmap component
│   ├── page.js                 # Demo page
│   └── globals.css             # Global styles
```

## Technical Details

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS with custom hex colors
- **State Management**: React hooks (useState, useEffect, useRef)
- **Animation**: CSS transitions with JavaScript timing control
- **Theme Support**: Automatic light/dark mode detection

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
