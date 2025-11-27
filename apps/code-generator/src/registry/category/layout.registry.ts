// Component
import { Container, Section, Stack, Grid } from "@packages/ui";
// 메타 파일
import { ContainerMeta } from "../meta/container.meta";
import { SectionMeta } from "../meta/section.meta";
import { StackMeta } from "../meta/stack.meta";
import { GridMeta } from "../meta/grid.meta";

/**
 * Layout 컴포넌트 Registry
 */
export const LayoutComponentRegistry = {
  Container: {
    component: Container,
    meta: ContainerMeta,
  },
  Section: {
    component: Section,
    meta: SectionMeta,
  },
  Stack: {
    component: Stack,
    meta: StackMeta,
  },
  Grid: {
    component: Grid,
    meta: GridMeta,
  },
} as const;
