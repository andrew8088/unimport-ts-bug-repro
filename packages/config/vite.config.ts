import { readFileSync } from "fs";
import { defineConfig, type Plugin } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import Unimport from "unimport/unplugin";

export default function createConfig(root: string) {
  const pkg = JSON.parse(readFileSync(resolve(root, "package.json")).toString());

  const isCommon = pkg.name === "@disco/common";

  return defineConfig({
    build: {
      lib: {
        entry: resolve(root, "src/index.ts"),
        formats: ["es"],
        name: pkg.name,
        fileName: pkg.name,
      },
      rollupOptions: {},
    },
    plugins: [
      dts({}) as Plugin,
      isCommon
        ? null
        : Unimport.vite({
            dts: true,
            imports: [{ name: "z", from: "zod" }],
            presets: [
              {
                package: "@disco/common",
              },
            ],
          }),
    ].filter(Boolean),
  });
}
