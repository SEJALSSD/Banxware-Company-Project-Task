"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        include: ["**/*.test.ts"],
        globals: true,
        coverage: {
            include: ["src/**/*"],
            all: true,
            provider: "v8",
        },
    },
});
