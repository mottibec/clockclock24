# ClockClock24

A React-based digital clock inspired by the [ClockClock24](https://www.humanssince1982.com/en-int/products/clockclock-24-white) installation by Humans Since 1982. This project uses a grid of analog clocks to display digital time, with smooth animations during time transitions.

## Features

- Displays current time using a 8×3 grid of analog clocks
- Each digit is formed by a 2×3 block of clocks
- Smooth animations during time transitions
- Responsive design
- Dark theme

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/clockclock24.git
cd clockclock24
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Clock.tsx      # Single analog clock component
│   ├── Digit.tsx      # Digit component (2×3 grid of clocks)
│   └── ClockGrid.tsx  # Full clock display (4 digits)
├── fonts/
│   └── digitFont.ts   # Digit font definitions
├── utils/
│   └── time.ts        # Time-related utility functions
├── App.tsx            # Main application component
└── App.css            # Global styles
```

## How It Works

1. The `App` component manages the current time state and animation state
2. The `ClockGrid` component displays four `Digit` components
3. Each `Digit` component renders a 2×3 grid of `Clock` components
4. When the time changes, the clocks animate to their new positions
5. The digit font defines the hand positions for each digit (0-9)

## Future Enhancements

- [ ] Add more animation patterns
- [ ] Implement a light/dark theme toggle
- [ ] Add sound effects during transitions
- [ ] Create an editor mode for designing custom digits
- [ ] Add support for different time zones

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [ClockClock24](https://www.humanssince1982.com/clockclock24) by Humans Since 1982
- Built with [React](https://reactjs.org/) and [Framer Motion](https://www.framer.com/motion/)
