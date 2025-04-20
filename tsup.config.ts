import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm", "cjs"],
	dts: {
		entry: "src/index.ts",
	},
	sourcemap: true,
	clean: true,
	target: "es2022",
});
