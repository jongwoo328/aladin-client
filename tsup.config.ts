import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm", "cjs"],
	outDir: "dist",
	dts: {
		entry: "src/index.ts",
	},
	sourcemap: true,
	clean: true,
	target: "es2022",
	outExtension({ format }) {
		return {
			js: format === "esm" ? ".mjs" : ".cjs",
		};
	},
});
