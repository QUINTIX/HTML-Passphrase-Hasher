module.exports = {
  "roots": [
    "<rootDir>/test"
  ],
	"testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
	"collectCoverageFrom": [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
		"!<rootDir>/test/**"
  ],
	"reporters": [
    "default",
    ["./node_modules/jest-html-reporter", {
        "pageTitle": "Test Report"
    }]
	],
	"collectCoverage" : true,
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
}