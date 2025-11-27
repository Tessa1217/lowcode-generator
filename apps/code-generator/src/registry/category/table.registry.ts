// Component
import { Tbody, Thead, TableCaption, Tr, Td, Th } from "@packages/ui";
// 메타 파일
import {
  TbodyMeta,
  TheadMeta,
  TableCaptionMeta,
  TrMeta,
  ThMeta,
  TdMeta,
} from "../meta/table.meta";

/**
 * Table 하위 컴포넌트 Registry (숨김 처리)
 */
export const TableComponentRegistry = {
  Tbody: {
    hidden: true,
    component: Tbody,
    meta: TbodyMeta,
  },
  Thead: {
    hidden: true,
    component: Thead,
    meta: TheadMeta,
  },
  TableCaption: {
    hidden: true,
    component: TableCaption,
    meta: TableCaptionMeta,
  },
  Tr: {
    hidden: true,
    component: Tr,
    meta: TrMeta,
  },
  Th: {
    hidden: true,
    component: Th,
    meta: ThMeta,
  },
  Td: {
    hidden: true,
    component: Td,
    meta: TdMeta,
  },
} as const;
