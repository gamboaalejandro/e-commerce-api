import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/node_modules", "**/dist", "**/build", "**/coverage", "**/prisma"],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        import: fixupPluginRules(_import),
        prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: ["./tsconfig.json"],
        },
    },

    rules: {
        "prettier/prettier": "warn",
        "no-console": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-debugger": "warn",
        "eqeqeq": ["error", "always"], // evalua que los condicionales tengas 3 operadores  "==="
        "no-dupe-else-if": "error", // no permite evaluar la misma condicion mas de una vez
        "no-console": "warn", // muestra warning en los console logs
        "no-eval": "error", // no permite la funcion eval
        "no-multi-spaces": "error", // no permite multiples espacios continuos
        "indent": ["error", 4], // define la cantidad de espacio para la identación
        "semi": ["error", "always"], // Exige punto y coma en todas las declaraciones
        "no-multiple-empty-lines": ["error", { "max": 1 }], // Define el número máximo de saltos de línea permitidos
        "no-unused-vars": "error", // controlar cómo se manejan las variables no utilizadas.
        "no-shadow": "error", // Esta regla previene la declaración de variables que ya están en el ámbito superior, lo que puede causar confusiones y errores
        "prefer-const": "error", // Fomenta el uso de const para variables que no serán reasignadas después de su declaración, mejorando la claridad y la seguridad.
        "no-case-declarations": "off", // Permite realizar declaraciones a switch case
        "no-fallthrough": "off", // Permite la ejecucion en switch case sin breaks

    },
}];