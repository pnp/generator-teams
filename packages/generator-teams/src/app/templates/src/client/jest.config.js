module.exports = {
    name: "client",
    displayName: "client",
    rootDir: "./../../",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/src/client/tsconfig.json",
            diagnostics: {
                ignoreCodes: [151001]
            }
        }
    },
    preset: "ts-jest/presets/js-with-ts",
    snapshotSerializers: [
        "enzyme-to-json/serializer"
    ],
    setupFiles: [
        "<rootDir>/src/test/test-shim.js",
        "<rootDir>/src/test/test-setup.js"
    ],
    testMatch: [
        "<rootDir>/src/client/**/__tests__/*.(ts|tsx|js)"
    ],
    collectCoverageFrom: [
        "src/client/**/*.{js,jsx,ts,tsx}",
        "!<rootDir>/node_modules/"
    ],
    coverageReporters: [
        "text"
    ]
};
