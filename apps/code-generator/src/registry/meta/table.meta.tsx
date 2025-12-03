import { THEME_COLOR_VARIANTS } from "@packages/vanilla-extract-config";
import { Table, TableCaption, Thead, Tbody, Tr, Th, Td } from "@packages/ui";
import { type ComponentMetaDefinition } from "../types";

const tableScaffold = `
<Table>
  <Thead>
    <Tr>
      <Th>제목 1</Th>
      <Th>제목 2</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>내용 1</Td>
      <Td>내용 2</Td>
    </Tr>
  </Tbody>
</Table>
`;

export const TableMeta: ComponentMetaDefinition = {
  component: "Table",
  category: "Display",
  description: "데이터를 행과 열로 정리하여 보여주는 테이블입니다.",
  hasChildren: true,
  props: {
    variant: {
      control: "radio",
      options: ["simple", "striped"],
      default: "simple",
      description: "테이블의 전체적인 스타일 변형",
    },
    color: {
      control: "select",
      options: [...THEME_COLOR_VARIANTS],
      default: "base",
      description: "테이블의 강조 색상",
    },
  },
  renderPreview: (_, props) => {
    return (
      <Table {...props}>
        <Thead>
          <Tr>
            <Th>Header 1</Th>
            <Th>Header 2</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Cell 1</Td>
            <Td>Cell 2</Td>
          </Tr>
          <Tr>
            <Td>Cell 3</Td>
            <Td>Cell 4</Td>
          </Tr>
        </Tbody>
      </Table>
    );
  },
  scaffold: tableScaffold,
};

export const TheadMeta: ComponentMetaDefinition = {
  component: "Thead",
  category: "Display",
  description: "테이블의 헤더 영역을 정의합니다.",
  hasChildren: true,
  props: {},
  scaffold: `
  <Tr>
    <Th>Header 1</Th>
    <Th>Header 2</Th>
  </Tr>
  `,
  renderPreview: (_) => (
    <Thead>
      <Tr>
        <Th>Header 1</Th>
        <Th>Header 2</Th>
      </Tr>
    </Thead>
  ),
};

export const TbodyMeta: ComponentMetaDefinition = {
  component: "Tbody",
  category: "Display",
  description: "테이블의 본문 영역을 정의합니다.",
  hasChildren: true,
  props: {},
  scaffold: `
  <Tr>
    <Td>내용 1</Td>
    <Td>내용 2</Td>
  </Tr>
  `,
  renderPreview: (_) => (
    <Tbody>
      <Tr>
        <Td>내용 1</Td>
        <Td>내용 2</Td>
      </Tr>
    </Tbody>
  ),
};

export const TrMeta: ComponentMetaDefinition = {
  component: "Tr",
  category: "Display",
  description: "테이블의 행(Row)을 정의합니다.",
  hasChildren: true,
  props: {},
  scaffold: `
  <Td>셀 1</Td>
  <Td>셀 2</Td>
  `,
  renderPreview: (_) => (
    <Tr>
      <Td>셀 1</Td>
      <Td>셀 2</Td>
    </Tr>
  ),
};

export const ThMeta: ComponentMetaDefinition = {
  component: "Th",
  category: "Display",
  description: "테이블의 헤더 셀을 정의합니다.",
  hasChildren: false,
  props: {
    align: {
      control: "select",
      options: ["left", "center", "right"],
      default: "left",
      description: "텍스트 정렬 방식",
    },
  },
  scaffold: `<Th>Header</Th>`,
  renderPreview: (_) => <Th>Header</Th>,
};

export const TdMeta: ComponentMetaDefinition = {
  component: "Td",
  category: "Display",
  description: "테이블의 데이터 셀을 정의합니다.",
  hasChildren: false,
  props: {
    align: {
      control: "select",
      options: ["left", "center", "right"],
      default: "left",
      description: "텍스트 정렬 방식",
    },
  },
  scaffold: `<Td>Data</Td>`,
  renderPreview: (_) => <Td>Data</Td>,
};

export const TableCaptionMeta: ComponentMetaDefinition = {
  component: "TableCaption",
  category: "Display",
  description: "테이블의 캡션 영역을 정의합니다.",
  hasChildren: false,
  props: {},
  scaffold: `<TableCaption>테이블 설명</TableCaption>`,
  renderPreview: (_) => <TableCaption>테이블 설명</TableCaption>,
};
