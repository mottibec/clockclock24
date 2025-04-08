export type HandPosition = {
    hour: number;   // degrees, 0 = right, 90 = down, etc.
    minute: number;
};

export type DigitLayout = HandPosition[][];

export type DigitFont = {
    [digit: string]: DigitLayout;
};

// Helper function to create hand positions
const pos = (hour: number, minute: number): HandPosition => ({ hour, minute });


// Segment definitions for the minimalist L-shaped design
const digitSegments = {
    "0": [
        [pos(90, 180), pos(180, 270)],
        [pos(0, 180), pos(0, 180)],
        [pos(90, 0), pos(0, 270)]
    ],
    "1": [
        [pos(220, 220), pos(180, 180)],
        [pos(220, 220), pos(0, 180)],
        [pos(220, 220), pos(0, 0)]
    ],
    "2": [
        [pos(90, 90), pos(180, 270)],
        [pos(90, 180), pos(0, 270)],
        [pos(90, 0), pos(270, 270)]
    ],
    "3": [
        [pos(90, 90), pos(180, 270)],
        [pos(90, 90), pos(0, 270)],
        [pos(90, 90), pos(0, 270)]
    ],
    "4": [
        [pos(180, 180), pos(180, 180)],
        [pos(0, 90), pos(0, 180)],
        [pos(220, 220), pos(0, 0)]
    ],
    "5": [
        [pos(180, 90), pos(270, 270)],
        [pos(0, 90), pos(270, 180)],
        [pos(90, 90), pos(0, 270)]
    ],
    "6": [
        [pos(180, 90), pos(270, 270)],
        [pos(0, 90), pos(270, 180)],
        [pos(90, 0), pos(0, 270)]
    ],
    "7": [
        [pos(90, 90), pos(180, 270)],
        [pos(220, 220), pos(0, 180)],
        [pos(220, 220), pos(0, 0)]
    ],
    "8": [
        [pos(90, 180), pos(180, 270)],
        [pos(0, 90), pos(0, 270)],
        [pos(90, 0), pos(0, 270)]
    ],
    "9": [
        [pos(90, 180), pos(180, 270)],
        [pos(0, 90), pos(0, 180)],
        [pos(90, 90), pos(0, 270)]
    ]
};

// Export the digit font directly
export const digitFont: DigitFont = digitSegments; 