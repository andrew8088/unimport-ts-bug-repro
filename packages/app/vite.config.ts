import { defineConfig } from "vite";
import Unimport from "unimport/unplugin";

export default defineConfig({
  plugins: [
    Unimport.vite({
      dts: true,
      presets: [
        {
          package: "common",
        },
      ],
    }),
  ],
});
