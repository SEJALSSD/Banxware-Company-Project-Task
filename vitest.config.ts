import { defineConfig } from "vitest/config";

export default defineConfig({
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
