// Component
import { Typography, Pagination, Table } from "@packages/ui";
// 메타 파일
import { TypographyMeta } from "../meta/typography.meta";
import { PaginationMeta } from "../meta/pagination.meta";
import { TableMeta } from "../meta/table.meta";

/**
 * Display 컴포넌트 Registry
 */
export const DisplayComponentRegistry = {
  Typography: {
    component: Typography,
    meta: TypographyMeta,
  },
  Pagination: {
    component: Pagination,
    meta: PaginationMeta,
  },
  Table: {
    component: Table,
    meta: TableMeta,
  },
} as const;
