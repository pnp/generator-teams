module.exports = {
    displayName: "server",
    rootDir: "./../../",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/src/server/tsconfig.json"
        }
    },
    preset: "ts-jest/presets/js-with-ts",
    testMatch: [
        "<rootDir>/src/server/**/__tests__/*.(ts|js)"
    ],
    collectCoverageFrom: [
        "src/server/**/*.{js,ts}",
        "!<rootDir>/node_modules/"
    ],
    coverageReporters: [
        "text"
    ]
};
