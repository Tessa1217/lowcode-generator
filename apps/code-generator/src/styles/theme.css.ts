import { createGlobalTheme } from "@vanilla-extract/css";
import { vars } from "@packages/vanilla-extract-config";
import { themeTokens } from "@packages/tokens/design-tokens";

createGlobalTheme(":root", vars, themeTokens);
