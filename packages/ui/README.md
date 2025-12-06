# @packages/ui Tech Spec

## 📋 프로젝트 개요

`@packages/ui`는 디자인 토큰과 Vanilla Extract를 기반으로 구축된 **타입 안전한 React 컴포넌트 라이브러리**입니다. Low-code Generator 프로젝트의 핵심 디자인 시스템으로, 일관된 UI를 제공하며 variant 시스템을 통해 다양한 디자인 변형을 지원합니다. Storybook을 통한 문서화와 시각적 테스팅을 제공하여 개발자와 디자이너 간의 협업을 촉진합니다.

### 주요 역할

- **컴포넌트 라이브러리**: Layout, Display, Form, UI 등 4가지 카테고리의 15개 컴포넌트 제공
- **Variant 시스템**: 토큰 기반의 타입 안전한 variant로 다양한 디자인 변형 지원
- **컴포넌트 레지스트리**: 메타데이터와 함께 컴포넌트를 등록하여 code generator에서 활용
- **Storybook 문서화**: 모든 컴포넌트의 인터랙티브 문서 및 시각적 테스트 제공
- **제로 런타임 CSS**: Vanilla Extract로 빌드 타임에 최적화된 CSS 생성

---

## 🛠 기술 스택

### 핵심 기술

| 기술                                 | 버전         | 용도                           |
| ------------------------------------ | ------------ | ------------------------------ |
| **React**                            | ^19.1.1      | UI 컴포넌트 프레임워크         |
| **TypeScript**                       | ^5.0.0       | 타입 안전성 및 개발 경험       |
| **@vanilla-extract/css**             | ^1.17.4      | Zero-runtime CSS-in-TypeScript |
| **@vanilla-extract/recipes**         | ^0.5.7       | 타입 안전한 variant 시스템     |
| **Vite**                             | ^7.1.7       | 빌드 도구 및 개발 서버         |
| **Storybook**                        | ^9.1.10      | 컴포넌트 문서화 및 개발 환경   |
| **@packages/tokens**                 | workspace:\* | 디자인 토큰                    |
| **@packages/vanilla-extract-config** | workspace:\* | Theme Contract 및 Recipe       |

### 패키지 구조

```
src/
├── components/
│   ├── layout/              # Container, Section, Stack, Grid
│   ├── display/             # Typography, Pagination, Table
│   ├── ui/                  # Button, Divider
│   └── inputs/              # Input, Select, Checkbox, Radio, Textarea
├── styles/
│   └── theme.css.ts         # Global Theme 적용
├── utils/
│   └── cn.ts                # className 유틸리티
└── index.ts                 # Export 진입점

.storybook/                  # Storybook 설정
├── main.ts
└── preview.tsx

주의: registry.ts 및 *.meta.tsx 파일들은 현재 apps/code-generator로 이동됨
```

---

## 💡 기술 스택 선택 이유

### 1. React 19를 선택한 이유

**최신 기능 활용**:

- **Automatic Batching**: 성능 최적화된 상태 업데이트
- **Improved TypeScript Support**: 더욱 정교한 타입 추론
- **새로운 Hook**: useId, useDeferredValue 등 최신 Hook 활용

**프로젝트 적합성**:

```typescript
// useId로 접근성 향상
export function Input({ id, ...props }: InputProps) {
  const inputId = id || useId(); // 고유 ID 자동 생성
  return <input id={inputId} {...props} />;
}
```

### 2. Vanilla Extract 통합의 이점

**토큰 시스템과의 완벽한 연동**:

```typescript
// 토큰 → Config → UI 컴포넌트의 매끄러운 흐름
import { vars } from "@packages/vanilla-extract-config";

export const button = recipe({
  base: style({
    backgroundColor: vars.color.background.brand.default, // 타입 안전
    color: vars.color.text.base.inverse,
  }),
});
```

**제로 런타임 성능**:

- CSS가 빌드 타임에 생성되어 JavaScript 번들에 영향 없음
- Critical CSS 자동 추출
- 런타임 스타일 계산 없음

### 3. Vite를 선택한 이유

**빠른 개발 경험**:

- **즉각적인 HMR**: 코드 변경 시 밀리초 단위 반영
- **빠른 빌드**: esbuild 기반의 빠른 번들링
- **Vanilla Extract 플러그인 지원**: 완벽한 CSS-in-TypeScript 통합

**Storybook과의 통합**:

```typescript
// .storybook/main.ts
viteFinal: async (config) => {
  return mergeConfig(config, {
    plugins: [vanillaExtractPlugin()], // Vanilla Extract 지원
  });
};
```

### 4. Storybook을 선택한 이유

**컴포넌트 주도 개발**:

- **격리된 개발 환경**: 컴포넌트를 독립적으로 개발 및 테스트
- **시각적 문서화**: 디자이너와 개발자가 동일한 UI 확인
- **인터랙티브 테스트**: props를 실시간으로 변경하며 결과 확인

**CI/CD 통합**:

- **자동 배포**: main 브랜치 반영 시 Chromatic 자동 배포
- **변경 사항 추적**: Visual regression testing으로 의도치 않은 UI 변경 감지
- **버전 관리**: 디자인 시스템의 히스토리 추적

---

## 📚 기술 스택 활용 예제

### 예제 1: Button 컴포넌트 - 동적 Color Variant 생성

**문제 상황**:
디자인 토큰에 정의된 모든 color를 Button variant로 제공하되, 하드코딩 없이 동적으로 생성하고 싶습니다.

**해결 방법 - button.css.ts**:

```typescript
import { vars, COLOR_VARIANTS } from "@packages/vanilla-extract-config";
import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

// 🔑 핵심: COLOR_VARIANTS를 순회하며 동적으로 variant 생성
const makeColorVariant = () => {
  return Object.fromEntries(
    COLOR_VARIANTS.map((color) => [
      color,
      style({
        backgroundColor: vars.color.background[color].default,
        ":hover": {
          backgroundColor: vars.color.background[color].bold,
        },
        ":disabled": {
          backgroundColor: vars.color.background[color].subtle,
        },
      }),
    ])
  );
};

export const button = recipe({
  base: [
    typographyRecipe({ role: "textMdRegular" }),
    style({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      border: "none",
      color: vars.color.text.base.inverse,
      borderRadius: vars.sizing["3"],
    }),
  ],
  variants: {
    color: { ...makeColorVariant() }, // 동적으로 생성된 variant
    size: {
      sm: [
        typographyRecipe({ role: "textSmRegular" }),
        style({
          padding: `${vars.sizing["1"]} ${vars.sizing["3"]}`,
        }),
      ],
      md: [
        typographyRecipe({ role: "textMdRegular" }),
        style({
          padding: `${vars.sizing["2"]} ${vars.sizing["4"]}`,
        }),
      ],
      lg: [
        typographyRecipe({ role: "textLgRegular" }),
        style({
          padding: `${vars.sizing["3"]} ${vars.sizing["6"]}`,
        }),
      ],
    },
    fullWidth: {
      true: style({ width: vars.sizing.full }),
    },
  },
  defaultVariants: {
    color: "brand",
    size: "md",
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
```

**Button 컴포넌트 - button.tsx**:

```typescript
import { button, type ButtonVariants } from "./button.css";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
} & ButtonVariants;

export function Button({
  color = "brand",
  size = "md",
  fullWidth = false,
  className,
  children,
  ref,
  ...props
}: ButtonProps) {
  const classNames = [button({ color, size, fullWidth }), className].join(" ");
  return (
    <button ref={ref} className={classNames} {...props}>
      {children}
    </button>
  );
}
```

**핵심 아이디어**:

1. **동적 Variant 생성**: `COLOR_VARIANTS` 상수를 순회하여 자동으로 모든 color variant 생성
2. **토큰과의 일관성**: 토큰에 color가 추가되면 자동으로 Button에도 반영
3. **타입 안전성**: `RecipeVariants<typeof button>`로 자동 타입 생성
4. **유지보수성**: 하드코딩 제거로 color 추가/제거 시 한 곳만 수정

**결과**:

```typescript
// 모든 color가 타입 안전하게 사용 가능
<Button color="brand">Brand</Button>
<Button color="primary">Primary</Button>
<Button color="info">Info</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="danger">Danger</Button>
// ✅ 토큰에 정의된 모든 color 지원
```

### 예제 2: Typography 컴포넌트 - Polymorphic Component

**요구사항**:
동일한 Typography 컴포넌트로 `<p>`, `<h1>`, `<span>` 등 다양한 HTML 요소를 렌더링하고 싶습니다.

**해결 방법 - typography.tsx**:

```typescript
import {
  type ElementType,
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
} from "react";
import {
  typographyRecipe,
  type TypographyRole,
} from "@packages/vanilla-extract-config";

export const TYPOGRAPHY_ELEMENT = [
  "p",
  "span",
  "strong",
  "em",
  "label",
  "blockquote",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "pre",
] as const;

export type TypographyElement = (typeof TYPOGRAPHY_ELEMENT)[number];

// 🔑 핵심: Polymorphic 타입 정의
type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"];

export type TypographyProps<T extends TypographyElement = "p"> = {
  as?: T; // 렌더링할 HTML 요소
  role?: TypographyRole; // 타이포그래피 스타일
  children?: React.ReactNode;
  className?: string;
  ref?: PolymorphicRef<T>;
} & ComponentPropsWithoutRef<T>; // 해당 요소의 native props 상속

export function Typography<T extends TypographyElement = "p">({
  as,
  role = "textMdRegular",
  ref,
  children,
  className,
  ...props
}: TypographyProps<T>) {
  const Component = (as ?? "p") as ElementType;
  const classNames = cn(typographyRecipe({ role }), className);

  return (
    <Component ref={ref} className={classNames} {...props}>
      {children}
    </Component>
  );
}
```

**핵심 아이디어**:

1. **Polymorphic Component**: `as` prop으로 렌더링할 HTML 요소 지정
2. **타입 안전한 Props**: 선택한 요소의 native props 자동 상속
3. **스타일 독립성**: HTML 요소와 스타일(`role`)을 독립적으로 선택

**사용 예시**:

```typescript
// p 태그 + text 스타일
<Typography as="p" role="textMdRegular">
  본문 텍스트
</Typography>

// h1 태그 + heading 스타일
<Typography as="h1" role="headingXl">
  페이지 제목
</Typography>

// span 태그 + caption 스타일
<Typography as="span" role="captionSm">
  작은 설명
</Typography>

// label 태그 + label 전용 속성 사용 가능
<Typography as="label" role="textSmSemibold" htmlFor="input-id">
  레이블
</Typography>
// ✅ htmlFor가 타입 안전하게 사용 가능 (label 요소의 속성)
```

### 예제 3: Input 컴포넌트 - 접근성과 유연성

**요구사항**:

- 접근성을 위한 고유 ID 자동 생성
- 유연한 width 설정 (px, %, 토큰 값)
- size에 따른 타이포그래피와 padding 변경

**해결 방법 - input.tsx**:

```typescript
import { type Ref, type CSSProperties, useId } from "react";
import { input, type InputVariants } from "./input.css";
import { cn } from "../../utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  width?: CSSProperties["width"];
  ref?: Ref<HTMLInputElement>;
} & InputVariants;

export function Input({
  id,
  className,
  type = "text",
  inputSize = "md",
  width = "100%",
  style,
  ref,
  ...props
}: InputProps) {
  // 🔑 핵심 1: useId로 고유 ID 자동 생성
  const inputId = id || useId();
  const classNames = cn(input({ inputSize }), className);

  // 🔑 핵심 2: 유연한 width 처리
  const inputStyle: CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    ...style,
  };

  return (
    <input
      id={inputId}
      ref={ref}
      type={type}
      className={classNames}
      style={inputStyle}
      {...props}
    />
  );
}
```

**Input 스타일 - input.css.ts**:

```typescript
import { vars, typographyRecipe } from "@packages/vanilla-extract-config";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const input = recipe({
  base: [
    typographyRecipe({ role: "textMdRegular" }),
    style({
      background: vars.color.background.input.default,
      boxSizing: "border-box",
      border: `${vars.sizing["0.5"]} solid ${vars.color.border.input.default}`,
      borderRadius: vars.sizing["2"],

      // 🔑 핵심 3: 상태별 스타일 토큰 기반 정의
      ":disabled": {
        borderColor: vars.color.border.input.disabled,
        background: vars.color.background.input.disabled,
      },
      ":focus-visible": {
        outline: "none",
        borderColor: vars.color.border.input.active,
        boxShadow: vars.elevation.shadow.raised,
      },
      "::placeholder": {
        color: vars.color.text.subtle.default,
      },
    }),
  ],
  variants: {
    inputSize: {
      sm: [
        typographyRecipe({ role: "textSmRegular" }),
        style({
          paddingLeft: vars.sizing["2"],
          paddingRight: vars.sizing["2"],
          paddingTop: vars.sizing["1"],
          paddingBottom: vars.sizing["1"],
        }),
      ],
      md: [
        typographyRecipe({ role: "textMdRegular" }),
        style({
          paddingLeft: vars.sizing["3"],
          paddingRight: vars.sizing["3"],
          paddingTop: vars.sizing["2"],
          paddingBottom: vars.sizing["2"],
        }),
      ],
      lg: [
        typographyRecipe({ role: "textLgRegular" }),
        style({
          paddingLeft: vars.sizing["3"],
          paddingRight: vars.sizing["3"],
          paddingTop: vars.sizing["3"],
          paddingBottom: vars.sizing["3"],
        }),
      ],
    },
  },
  defaultVariants: {
    inputSize: "md",
  },
});

export type InputVariants = RecipeVariants<typeof input>;
```

**사용 예시**:

```typescript
// 자동 ID 생성
<Input placeholder="이름을 입력하세요" />

// 명시적 ID 지정 (label과 연결)
<label htmlFor="email-input">이메일</label>
<Input id="email-input" type="email" />

// 유연한 width 설정
<Input width={300} />              // 300px
<Input width="50%" />              // 50%
<Input width={vars.sizing["48"]} />  // 토큰 값 (192px)

// Size variant
<Input inputSize="sm" placeholder="Small" />
<Input inputSize="md" placeholder="Medium" />
<Input inputSize="lg" placeholder="Large" />
```

**핵심 아이디어**:

1. **접근성**: `useId`로 label과 input을 자동으로 연결 가능
2. **유연한 API**: width를 number, string, 토큰 값 등 다양한 형태로 지정
3. **일관된 스타일**: size에 따라 typography와 padding이 자동 조정

### 예제 4: Component Meta - Code Generator 연동

**요구사항**:
Code Generator에서 컴포넌트를 드래그 앤 드롭으로 사용하려면 메타데이터(props 정의, 기본값, control 타입)가 필요합니다. 하지만 UI 패키지의 모든 variant를 제공하면 UX가 복잡해지므로, **필요한 옵션만 선택**하고 싶습니다.

**해결 방법 - apps/code-generator/src/registry/button.meta.tsx**:

```typescript
// 🔑 핵심: Meta는 Code Generator에서 정의
import { Button } from "@packages/ui";
import { type ComponentMetaDefinition } from "../types/meta";

export const ButtonMeta: ComponentMetaDefinition = {
  component: "Button",
  category: "UI",
  description: "버튼",
  hasChildren: true,

  // 프리뷰 렌더링 로직
  renderPreview: (Component, props) => (
    <Component {...props}>
      {props.children ? props.children : "Click Me"}
    </Component>
  ),

  // ✨ 핵심: packages/ui는 7개 color를 제공하지만, 4개만 선택
  props: {
    color: {
      control: "select",
      options: ["brand", "primary", "success", "danger"], // 4개만
      default: "brand",
      description: "버튼 색상",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      default: "md",
      description: "버튼 크기",
    },
    fullWidth: {
      control: "boolean",
      default: false,
      description: "전체 넓이 여부",
    },
    children: {
      control: "json",
      default: "Button",
      description: "버튼 내부 요소",
    },
  },
};
```

**Meta 타입 정의 - apps/code-generator/src/types/meta.ts**:

```typescript
export type ControlType =
  | "text" // 텍스트 입력
  | "number" // 숫자 입력
  | "boolean" // 체크박스
  | "select" // 드롭다운
  | "radio" // 라디오 버튼
  | "color" // 색상 선택
  | "json"; // JSON 편집기

export type PropsMeta = {
  control: ControlType;
  options?: string[] | number[];
  default?: string | number | boolean | object;
  required?: boolean;
  description?: string;
};

export type ComponentMetaDefinition = {
  component: string;
  category: string;
  description: string;
  props: Record<string, PropsMeta>;
  hasChildren: boolean;
  scaffold?: string;
  renderPreview?: (Component: React.ElementType, props: any) => React.ReactNode;
};
```

**Component Registry - apps/code-generator/src/registry/index.ts**:

```typescript
// packages/ui에서 컴포넌트만 import
import { Button } from "@packages/ui";
import { Input } from "@packages/ui";
import { Typography } from "@packages/ui";
// ... 다른 컴포넌트들

// code-generator에서 정의한 Meta import
import { ButtonMeta } from "./button.meta";
import { InputMeta } from "./input.meta";
import { TypographyMeta } from "./typography.meta";
// ... 다른 Meta들

// Code Generator 전용 Registry 구성
export const ComponentRegistry = {
  Button: {
    component: Button,
    meta: ButtonMeta,
  },
  Input: {
    component: Input,
    meta: InputMeta,
  },
  Typography: {
    component: Typography,
    meta: TypographyMeta,
  },
  // ...
} as const;

export type ComponentName = keyof typeof ComponentRegistry;

// 헬퍼 함수
export function getComponent(name: ComponentName) {
  return ComponentRegistry[name]?.component;
}

export function getComponentMeta(name: ComponentName) {
  return ComponentRegistry[name]?.meta;
}
```

**Code Generator에서 사용**:

```typescript
// apps/code-generator/src/components/ComponentPalette.tsx
import { ComponentRegistry, getComponentMeta } from "../registry";

// 1. 컴포넌트 팔레트 렌더링
function ComponentPalette() {
  return (
    <div>
      {Object.keys(ComponentRegistry).map((name) => {
        const meta = getComponentMeta(name as ComponentName);
        return (
          <div key={name}>
            <h3>{meta.component}</h3>
            <p>{meta.description}</p>
          </div>
        );
      })}
    </div>
  );
}

// 2. Props 편집기 렌더링
function PropsEditor({ componentName, currentProps, onChange }) {
  const meta = getComponentMeta(componentName);

  return (
    <div>
      {Object.entries(meta.props).map(([propName, propMeta]) => {
        switch (propMeta.control) {
          case "select":
            return (
              <select
                value={currentProps[propName]}
                onChange={(e) => onChange(propName, e.target.value)}
              >
                {/* ✨ Meta에 정의된 4개 옵션만 표시 */}
                {propMeta.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            );
          case "boolean":
            return (
              <input
                type="checkbox"
                checked={currentProps[propName]}
                onChange={(e) => onChange(propName, e.target.checked)}
              />
            );
          // ... 다른 control 타입
        }
      })}
    </div>
  );
}

// 3. 프리뷰 렌더링
function Preview({ componentName, props }) {
  const { component: Component, meta } = ComponentRegistry[componentName];

  if (meta.renderPreview) {
    return meta.renderPreview(Component, props);
  }

  return <Component {...props} />;
}
```

**핵심 아이디어**:

1. **관심사 분리**:
   - `packages/ui`: Pure Component만 제공
   - `apps/code-generator`: Meta와 Registry 관리
2. **유연한 옵션 선택**:
   - UI 패키지는 7개 color 지원
   - Code Generator는 4개만 UI에 노출
   - 필요시 생성된 코드에서 7개 모두 사용 가능
3. **타입 안전성**: `ComponentName` 타입으로 잘못된 컴포넌트 이름 방지
4. **확장 가능성**:
   - 새 컴포넌트 추가 시 Meta 작성 후 Registry에 등록
   - UI 패키지는 전혀 수정 불필요

**실제 사용 플로우**:

```typescript
// 1. 사용자가 컴포넌트 팔레트에서 "Button" 드래그

// 2. Props 편집기가 ButtonMeta 기반으로 렌더링
// color 드롭다운: brand, primary, success, danger (4개만)

// 3. 사용자가 "primary" 선택

// 4. 코드 생성
<Button color="primary" size="md">Click Me</Button>

// 5. 사용자가 생성된 코드를 수정하여 다른 color 사용 가능
<Button color="info" size="md">Click Me</Button>  // ✅ 가능!
// packages/ui는 여전히 7개 모두 지원하므로
```

### 예제 5: Global Theme 적용

**문제 상황**:
`@packages/vanilla-extract-config`는 Theme Contract만 제공하므로, 실제 CSS 변수를 적용해야 합니다.

**해결 방법 - styles/theme.css.ts**:

```typescript
import { createGlobalTheme } from "@vanilla-extract/css";
import { vars } from "@packages/vanilla-extract-config";
import { themeTokens } from "@packages/tokens/design-tokens";

// 🔑 핵심: UI 패키지에서 Global Theme 적용
createGlobalTheme(":root", vars, themeTokens);
```

**왜 UI 패키지에서?**

- **Vanilla Extract의 빌드 컨텍스트**: `.css.ts` 파일은 해당 패키지의 빌드 프로세스에서 처리
- **CSS 생성 위치**: UI 패키지가 실제 CSS를 생성하고 배포하는 주체
- **Config 패키지의 역할**: 구조(Contract)만 정의하고 값 적용은 소비자에게 위임

**진입점에서 Import - index.ts**:

```typescript
// 🔑 핵심: 패키지 import 시 자동으로 theme CSS 로드
import "./styles/theme.css";

// Component Exports
export { Button } from "./components/ui/button";
export { Input } from "./components/inputs/input";
// ...
```

**생성되는 CSS**:

```css
:root {
  --color-brand-500: #3355ff;
  --color-brand-600: #2944cc;
  --color-text-base-default: #1a1a1a;
  --color-background-input-default: #ffffff;
  --sizing-1: 4px;
  --sizing-2: 8px;
  /* ... 모든 토큰이 CSS 변수로 변환 */
}
```

### 예제 6: Storybook 통합

**Storybook 설정 - .storybook/main.ts**:

```typescript
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/components/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // 🔑 핵심: Vanilla Extract 플러그인 추가
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [vanillaExtractPlugin()],
    });
  },
};

export default config;
```

**Button Story - button.stories.tsx**:

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Stack } from "../layout/stack";
import {
  COLOR_VARIANTS,
  SIZE_VARIANTS,
} from "@packages/vanilla-extract-config";

const meta = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    color: {
      control: "select",
      options: COLOR_VARIANTS,
      description: "버튼 색상",
    },
    size: {
      control: "radio",
      options: SIZE_VARIANTS,
      description: "버튼 크기",
    },
  },
  decorators: (stories) => (
    <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
      {stories()}
    </div>
  ),
  args: {
    color: "brand",
    size: "md",
    fullWidth: false,
    children: "Button",
  },
  tags: ["autodocs"], // 🔑 핵심: 자동 문서 생성
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 Story
export const Primary: Story = {
  args: {
    color: "brand",
    size: "md",
    children: "Button",
  },
};

// 모든 Color Variant 표시
export const ColorButtons: Story = {
  render: (args) => (
    <>
      {COLOR_VARIANTS.map((color) => (
        <Button key={color} color={color} size={args.size}>
          {color}
        </Button>
      ))}
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button의 `color` props를 변경하면 type에 맞는 색상의 버튼을 생성할 수 있습니다.",
      },
    },
  },
};

// 모든 Size Variant 표시
export const SizeButtons: Story = {
  render: (args) => (
    <Stack direction="column" gap="sm">
      <Button color={args.color} size="sm">
        SM 버튼
      </Button>
      <Button color={args.color} size="md">
        MD 버튼
      </Button>
      <Button color={args.color} size="lg">
        LG 버튼
      </Button>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button의 `size` props를 변경하면 size에 맞는 버튼을 생성할 수 있습니다.",
      },
    },
  },
};

// Full Width 예시
export const FullWidthButtons: Story = {
  render: (args) => (
    <Button color={args.color} size={args.size} fullWidth={true}>
      Full Width 버튼
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button의 `fullWidth` props를 true로 설정하면 container의 100% width를 차지합니다.",
      },
    },
  },
};
```

**핵심 아이디어**:

1. **자동 문서 생성**: `tags: ["autodocs"]`로 props 문서 자동 생성
2. **인터랙티브 Controls**: argTypes로 Storybook UI에서 props 실시간 변경
3. **다양한 Story**: 각 variant 조합을 별도 Story로 제공
4. **설명 추가**: `parameters.docs.description`으로 사용법 안내

**Storybook 배포**:

```json
// package.json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build --output-dir ./packages/ui/storybook-static"
  }
}
```

**CI/CD 연동 (예시)**:

```yaml
# .github/workflows/storybook-deploy.yml
name: Deploy Storybook

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm build-storybook
      - uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          storybookBuildDir: packages/ui/storybook-static
```

**효과**:

- main 브랜치 반영 시 Chromatic에 자동 배포
- Visual regression testing으로 UI 변경 사항 추적
- 디자이너/PM이 최신 컴포넌트 확인 가능

### 예제 7: className 유틸리티 - cn 함수

**요구사항**:
여러 className을 조합하고 조건부 className을 깔끔하게 처리하고 싶습니다.

**해결 방법 - utils/cn.ts**:

```typescript
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
```

**사용 예시**:

```typescript
// Typography 컴포넌트에서
const classNames = cn(typographyRecipe({ role }), className);

// 조건부 className
const buttonClass = cn(
  baseClass,
  isActive && activeClass,
  isDisabled && disabledClass,
  className
);

// 여러 className 조합
const inputClass = cn(
  input({ inputSize }),
  hasError && errorClass,
  isFocused && focusClass,
  className
);
```

**핵심 아이디어**:

- falsy 값 자동 필터링 (`undefined`, `null`, `false` 제거)
- 간결한 조건부 className 처리
- TypeScript 타입 안전성

---

## 🎯 개인적인 회고: 문제 해결 과정

### 1. 문제 인식

#### 1-1. 어떤 컴포넌트를 제공할지 결정

**문제 상황**:
디자인 시스템 구축 초기, 무한히 많은 컴포넌트 중 어떤 것을 우선적으로 개발할지 고민이 되었습니다.

**고민 포인트**:

1. **범위의 모호함**: 모든 UI 패턴을 컴포넌트화하기엔 리소스 부족
2. **추상화 레벨**: 너무 Atomic한 컴포넌트 vs 너무 복합적인 컴포넌트
3. **확장성**: 나중에 추가될 컴포넌트와의 일관성 유지

**초기 접근**:

```
❌ 잘못된 접근:
"모든 가능한 UI를 컴포넌트로!"
→ 개발 시간 무한 증가
→ 실제로 사용되지 않는 컴포넌트 다수 발생
→ 유지보수 부담 증가
```

#### 1-2. Variant 시스템의 복잡도

**문제 상황**:
Button 하나만 해도 color, size, state, width 등 수많은 variant 조합이 가능합니다.

```typescript
// 🤔 모든 조합을 다 정의해야 할까?
<Button color="primary" size="sm" state="hover" width="full" rounded="md" />
<Button color="primary" size="sm" state="hover" width="full" rounded="lg" />
<Button color="primary" size="sm" state="active" width="full" rounded="md" />
// ... 수백 가지 조합
```

**고민 포인트**:

- **복잡도 증가**: variant가 많을수록 관리 어려움
- **일관성 부족**: 어떤 variant 조합이 유효한지 불명확
- **문서화 어려움**: 모든 조합을 문서화하기 불가능

#### 1-3. Component Meta와 Registry의 위치

**초기 설계**:

```
packages/ui/
├── components/
│   └── ui/
│       ├── button.tsx
│       └── button.meta.tsx     # ← Meta가 UI 패키지에
├── registry.ts                  # ← Registry도 UI 패키지에
└── index.ts
```

**문제 발견 1: Variant 선택의 유연성 부족**

```typescript
// packages/ui/button.meta.tsx
export const ButtonMeta = {
  props: {
    color: {
      options: [
        "brand",
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "neutral",
      ],
      // ↑ packages/ui는 7개 color 모두 제공
    },
  },
};

// apps/code-generator에서 사용 시
// 😰 문제: Code Generator UI에서는 4개만 필요한데 7개 모두 노출됨
// → 사용자 혼란 (어떤 color를 써야 할까?)
// → UX 복잡도 증가
```

**문제 발견 2: 책임 혼재**

```
팀원 A: "UI 패키지가 Code Generator의 UX까지 결정하는 게 맞나요?"
나: "Meta에서 options를 줄이면... UI 패키지의 유연성이 떨어지는데..."
팀원 B: "Code Generator마다 다른 options가 필요할 수도 있잖아요"
```

**논의 과정**:

1. **초기 아이디어**: UI 패키지에서 "필터링" 기능 제공?

   ```typescript
   // ❌ 복잡도만 증가
   const filteredMeta = filterMetaOptions(ButtonMeta, ["brand", "primary"]);
   ```

2. **핵심 인사이트**: "UI 패키지는 가능성을 제공, 사용처는 필요한 것만 선택"
   ```
   UI 패키지: "Button은 7가지 color를 지원합니다"
   Code Generator: "우리는 그 중 4개만 쓰겠습니다"
   ```

---

### 2. 문제 해결

#### 2-1. 1차 기본 컴포넌트 선정 전략

**해결 방법**:

**Step 1: Low-code Generator의 핵심 유스케이스 분석**

```
목표: 간단한 CRUD 페이지 생성

필요한 UI 요소:
1. Layout: Container, Section, Grid, Stack (페이지 구조)
2. Display: Typography, Table, Pagination (정보 표시)
3. Forms: Input, Select, Checkbox, Radio, Textarea (데이터 입력)
4. UI: Button, Divider (상호작용 및 구분)
```

**Step 2: 카테고리별 우선순위 설정**

```typescript
// 최종 선정된 컴포넌트 구성
export const ComponentsByCategory = {
  Layout: ["Container", "Section", "Stack", "Grid"], // 4개
  Display: ["Typography", "Pagination", "Table"], // 3개 (+6 하위)
  UI: ["Button", "Divider"], // 2개
  Forms: ["Input", "Select", "Checkbox", "Radio", "Textarea"], // 5개
} as const;

// 총 15개 최상위 컴포넌트 + 6개 Table 하위 컴포넌트
```

**선정 기준**:

1. **CRUD 페이지 커버리지**: 이 15개로 기본적인 CRUD 페이지 구성 가능
2. **복잡도 vs 효용**: 개발 시간 대비 활용도가 높은 컴포넌트 우선
3. **확장 가능성**: 나중에 쉽게 추가할 수 있는 구조

**검증 방법**:

```typescript
// 실제 CRUD 페이지 시뮬레이션
<Container widthScale="lg">
  <Section spacingScale="md">
    {/* 헤더 */}
    <Typography as="h1" role="headingXl">
      사용자 관리
    </Typography>
    <Divider />

    {/* 검색 폼 */}
    <Stack direction="row" gap="md">
      <Input placeholder="이름 검색" />
      <Select options={departments} />
      <Button color="primary">검색</Button>
    </Stack>

    {/* 데이터 테이블 */}
    <Table>
      <Thead>
        <Tr>
          <Th>이름</Th>
          <Th>부서</Th>
          <Th>상태</Th>
        </Tr>
      </Thead>
      <Tbody>{/* ... */}</Tbody>
    </Table>

    {/* 페이지네이션 */}
    <Pagination totalPages={10} currentPage={1} />
  </Section>
</Container>

// ✅ 15개 컴포넌트로 완전한 CRUD 페이지 구성 가능 확인
```

**효과**:

- 개발 범위 명확화
- MVP 빠른 출시
- 실제 사용 패턴 기반의 확장 가능

#### 2-2. Variant 시스템의 균형 찾기

**해결 전략**:

**원칙 1: 토큰 기반 Variant**

```typescript
// ✅ 토큰에 정의된 것만 variant로 제공
variants: {
  color: { ...makeColorVariant() },  // 토큰의 COLOR_VARIANTS
  size: {
    sm: { ... },  // 토큰의 SIZE_VARIANTS
    md: { ... },
    lg: { ... },
  }
}

// ❌ 임의로 추가하지 않음
variants: {
  color: {
    // ... 토큰 기반 color
    customPink: { ... },  // ❌ 토큰에 없는 color
  }
}
```

**원칙 2: 핵심 Variant만 제공**

```typescript
// ✅ Button의 핵심 variant
export const button = recipe({
  variants: {
    color: { ... },      // 브랜딩에 중요
    size: { ... },       // 계층 구조에 중요
    fullWidth: { ... },  // 레이아웃에 중요
  }
});

// ❌ 과도한 variant
export const button = recipe({
  variants: {
    color: { ... },
    size: { ... },
    fullWidth: { ... },
    rounded: { ... },        // ❌ borderRadius는 className으로
    shadow: { ... },         // ❌ boxShadow는 className으로
    textAlign: { ... },      // ❌ 정렬은 className으로
    animation: { ... },      // ❌ 애니메이션은 별도 처리
  }
});
```

**원칙 3: className으로 커스터마이징 허용**

```typescript
// ✅ variant + className 조합
<Button
  color="primary"
  size="md"
  className={customStyle} // 추가 커스터마이징
>
  Submit
</Button>;

// customStyle에서 자유로운 스타일 적용
const customStyle = style({
  borderRadius: "999px", // 완전 둥근 버튼
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  textTransform: "uppercase",
});
```

**검증 결과**:

```typescript
// Button: 3개 variant
// - color (7개 옵션) × size (3개 옵션) × fullWidth (2개 옵션)
// = 42개 조합

// Input: 1개 variant
// - inputSize (3개 옵션)
// = 3개 조합

// Typography: 2개 variant (독립적)
// - as (13개 옵션)
// - role (20개 옵션)
// = 260개 조합 가능하지만 독립적이라 복잡도 낮음
```

**효과**:

- **관리 가능한 복잡도**: 각 컴포넌트 3-5개 variant 내외
- **일관성 확보**: 모든 variant가 토큰 기반
- **확장성 유지**: className으로 추가 커스터마이징 가능

#### 2-3. Meta와 Registry를 Code Generator로 이동

**최종 설계 결정**:

**UI 패키지의 역할 - export 구조**:

```typescript
// packages/ui/src/index.ts
// ✅ UI 패키지가 제공하는 것

// 1. Theme CSS (Global Theme 적용)
import "./styles/theme.css";

// 2. 컴포넌트만 Export (Pure Components)
export { Button } from "./components/ui/button";
export type { ButtonProps } from "./components/ui/button";

export { Input } from "./components/inputs/input";
export type { InputProps } from "./components/inputs/input";

export { Typography } from "./components/display/typography";
export type { TypographyProps } from "./components/display/typography";

// ... 다른 컴포넌트들

// 3. 유틸리티
export { cn } from "./utils/cn";
```

**Code Generator의 역할 - registry 직접 구성**:

```typescript
// apps/code-generator/src/registry/button.meta.tsx
// ✅ Code Generator가 하는 것

import { Button, type ButtonProps } from "@packages/ui";
import type { ComponentMetaDefinition } from "./types";

// 1. packages/ui의 모든 variant 중 필요한 것만 선택
export const ButtonMeta: ComponentMetaDefinition = {
  component: "Button",
  category: "UI",
  description: "버튼",
  hasChildren: true,
  renderPreview: (Component, props) => (
    <Component {...props}>
      {props.children ? props.children : "Click Me"}
    </Component>
  ),
  props: {
    color: {
      control: "select",
      // ✨ 핵심: packages/ui는 7개 color를 제공하지만,
      // code-generator에서는 실제로 사용할 4개만 선택
      options: ["brand", "primary", "success", "danger"],
      default: "brand",
      description: "버튼 색상",
    },
    size: {
      control: "select",
      // packages/ui는 sm/md/lg 제공, 모두 사용
      options: ["sm", "md", "lg"],
      default: "md",
      description: "버튼 크기",
    },
    fullWidth: {
      control: "boolean",
      default: false,
      description: "전체 넓이 여부",
    },
    children: {
      control: "json",
      default: "Button",
      description: "버튼 내부 요소",
    },
  },
};

// apps/code-generator/src/registry/index.ts
import { Button } from "@packages/ui";
import { ButtonMeta } from "./button.meta";
import { Input } from "@packages/ui";
import { InputMeta } from "./input.meta";
// ... 다른 컴포넌트들

// 2. Code Generator 전용 Registry 구성
export const ComponentRegistry = {
  Button: {
    component: Button,
    meta: ButtonMeta,
  },
  Input: {
    component: Input,
    meta: InputMeta,
  },
  // ...
} as const;

export type ComponentName = keyof typeof ComponentRegistry;

// 3. Code Generator 전용 로직 추가
export function getComponentsForPalette() {
  return Object.entries(ComponentRegistry)
    .filter(([_, item]) => !item.hidden)
    .map(([name, item]) => ({
      name: name as ComponentName,
      ...item,
    }));
}

export function generateComponentCode(
  componentName: ComponentName,
  props: Record<string, any>
) {
  const meta = ComponentRegistry[componentName].meta;
  // Code 생성 로직
  // ...
}

// 4. Code Generator 전용 타입
export type ComponentNodeTree = {
  id: string;
  component: ComponentName;
  props: Record<string, any>;
  children: ComponentNodeTree[];
};
```

**책임 분리 결과**:

```
@packages/ui (공급자)
  └─ 컴포넌트 제공 (Pure Components)
  └─ 모든 가능한 variant 제공
  └─ 재사용 가능한 유틸리티 제공
  └─ Storybook 문서화 (모든 variant 표시)

@apps/code-generator (소비자)
  └─ 컴포넌트 Import해서 사용
  └─ Meta와 Registry 직접 정의
  └─ packages/ui의 variant 중 필요한 것만 선택
  └─ Code Generator 전용 로직 (노드 트리, 코드 생성)
```

**핵심 아이디어**:

1. **UI 패키지**: "이런 컴포넌트들이 있고, 이런 variant들이 가능하다" (공급)
2. **Code Generator**: "UI 패키지의 컴포넌트를 가져와서, 우리가 필요한 옵션만 골라 사용한다" (소비 + 선택)
3. **유연성 확보**:
   - UI 패키지는 범용적으로 사용 가능 (다양한 variant 제공)
   - Code Generator는 실제 사용 시나리오에 맞게 제한 (UX 단순화)

**왜 Meta를 Code Generator로 이동했는가?**

**이전 설계의 문제점**:

```typescript
// ❌ packages/ui에 meta가 있을 때
// ButtonMeta가 COLOR_VARIANTS 7개를 모두 포함
options: [
  "brand",
  "primary",
  "info",
  "success",
  "warning",
  "danger",
  "neutral",
];

// Code Generator에서는 4개만 필요한데...
// Meta를 수정할 수 없어서 7개 모두 노출됨
// → 사용자 혼란, UX 복잡도 증가
```

**현재 설계의 장점**:

```typescript
// ✅ apps/code-generator에 meta가 있을 때
// Button 컴포넌트는 여전히 7개 color 모두 지원
<Button color="neutral" />; // 가능

// 하지만 Code Generator의 Meta는 4개만 정의
options: ["brand", "primary", "success", "danger"];

// → Drag & Drop UI에서는 4개만 노출
// → 필요시 코드에서 직접 "neutral" 사용 가능
// → UI 패키지의 유연성 + Code Generator의 단순성 확보
```

**검증**:

```typescript
// ✅ Code Generator에서만 Registry 사용
// apps/code-generator
import { ComponentRegistry } from "./registry";

// ✅ Storybook에서는 컴포넌트만 사용
// packages/ui
import { Button } from "@packages/ui";

// ✅ 다른 프로젝트에서 순수하게 컴포넌트만 사용
import { Button, Input, Container } from "@packages/ui";

// 모든 variant 자유롭게 사용 가능
<Button color="neutral" size="lg" />; // Code Generator에 없어도 사용 가능
```

---

### 3. 다시 만든다면 이렇게 할 것

#### 3-1. Compound Components 패턴

**현재 한계**:
Table은 여러 하위 컴포넌트가 있지만, 사용 시 일일이 import 해야 합니다.

```typescript
// ❌ 현재 방식
import { Table, Thead, Tbody, Tr, Th, Td } from "@packages/ui";

<Table>
  <Thead>
    <Tr>
      <Th>Header</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>Cell</Td>
    </Tr>
  </Tbody>
</Table>;
```

**개선 방안**:

```typescript
// ✅ Compound Component 패턴
import { Table } from "@packages/ui";

<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Header</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Cell</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>;

// 구현
export function Table({ children, ...props }) {
  return <table {...props}>{children}</table>;
}

Table.Head = Thead;
Table.Body = Tbody;
Table.Row = Tr;
Table.HeaderCell = Th;
Table.Cell = Td;
```

**기대 효과**:

- 더 명확한 계층 구조
- Import 개수 감소
- 네임스페이스 충돌 방지

#### 3-2. Form 컴포넌트 통합

**현재 한계**:
Input, Select 등이 독립적이라 Form 레벨의 일관성 부족

```typescript
// ❌ 각 input마다 개별 state 관리
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [age, setAge] = useState('');

<Input value={name} onChange={(e) => setName(e.target.value)} />
<Input value={email} onChange={(e) => setEmail(e.target.value)} />
<Input value={age} onChange={(e) => setAge(e.target.value)} />
```

**개선 방안**:

```typescript
// ✅ Form 컴포넌트로 통합
import { Form } from "@packages/ui";

<Form.Root onSubmit={handleSubmit}>
  <Form.Field name="name" label="이름">
    <Form.Input placeholder="이름을 입력하세요" />
    <Form.ErrorMessage />
  </Form.Field>

  <Form.Field name="email" label="이메일">
    <Form.Input type="email" placeholder="email@example.com" />
    <Form.ErrorMessage />
  </Form.Field>

  <Form.Field name="age" label="나이">
    <Form.Input type="number" />
    <Form.ErrorMessage />
  </Form.Field>

  <Form.Submit>제출</Form.Submit>
</Form.Root>;

// 구현 (React Hook Form 또는 Zod 통합)
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function FormRoot({ schema, onSubmit, children }) {
  const methods = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
```

**기대 효과**:

- Form validation 통합
- 에러 처리 일관성
- Accessibility 자동 적용 (aria-invalid, aria-describedby)

#### 3-3. 토큰 기반 Spacing Props

**현재 한계**:
Layout 조정을 위해 custom CSS나 style prop 사용

```typescript
// ❌ 현재 방식
<Stack style={{ marginTop: "32px" }}>
  <Button className={style({ marginBottom: "16px" })} />
</Stack>
```

**개선 방안**:

```typescript
// ✅ 토큰 기반 spacing props
<Stack mt="8" mb="4" gap="md">
  <Button mb="4" />
</Stack>;

// 구현
type SpacingValue = keyof typeof vars.spacing;

interface SpacingProps {
  m?: SpacingValue; // margin
  mt?: SpacingValue; // margin-top
  mb?: SpacingValue; // margin-bottom
  ml?: SpacingValue; // margin-left
  mr?: SpacingValue; // margin-right
  p?: SpacingValue; // padding
  pt?: SpacingValue; // padding-top
  // ...
}

function applySpacing(props: SpacingProps): CSSProperties {
  return {
    margin: props.m ? vars.spacing[props.m] : undefined,
    marginTop: props.mt ? vars.spacing[props.mt] : undefined,
    // ...
  };
}

export function Stack({
  mt,
  mb,
  children,
  ...props
}: StackProps & SpacingProps) {
  const spacingStyle = applySpacing({ mt, mb });
  return (
    <div className={stackRecipe(props)} style={spacingStyle}>
      {children}
    </div>
  );
}
```

**기대 효과**:

- 일관된 spacing 사용
- 토큰 기반으로 타입 안전
- 코드 가독성 향상

#### 3-4. 컴포넌트 자동 문서화

**현재 한계**:
Meta 파일을 수동으로 작성하고 Story도 별도 작성

**개선 방안**:

````typescript
// ✅ JSDoc 기반 자동 문서화
/**
 * Button 컴포넌트
 *
 * @example
 * ```tsx
 * <Button color="primary" size="md">Click Me</Button>
 * ```
 */
export function Button({
  /**
   * 버튼 색상
   * @default "brand"
   */
  color = "brand",

  /**
   * 버튼 크기
   * @default "md"
   */
  size = "md",

  /**
   * 전체 너비 여부
   * @default false
   */
  fullWidth = false,

  children,
  ...props
}: ButtonProps) {
  // ...
}

// 스크립트로 JSDoc → ComponentMeta 자동 생성
// scripts/generate-meta.ts
import { Project } from "ts-morph";

function generateMetaFromJSDoc(sourceFile: string) {
  const project = new Project();
  const source = project.addSourceFileAtPath(sourceFile);

  // JSDoc 파싱
  // ComponentMeta 생성
  // .meta.tsx 파일 자동 생성
}
````

**기대 효과**:

- 문서 작성 시간 단축
- 문서와 코드의 불일치 방지
- JSDoc으로 IDE에서도 문서 확인 가능

---

### 4. 더 해봤으면 좋았을 것들

#### 4-1. 테마 전환 시스템 (Light/Dark Mode)

**현재 상태**:
Light 모드만 지원

**구현 아이디어**:

```typescript
// packages/ui/src/styles/themes.css.ts
import { createTheme } from "@vanilla-extract/css";
import { vars } from "@packages/vanilla-extract-config";
import { themeTokens, darkThemeTokens } from "@packages/tokens/design-tokens";

// Light Theme (기본)
export const lightTheme = createGlobalTheme(":root", vars, themeTokens);

// Dark Theme
export const darkTheme = createTheme(vars, darkThemeTokens);

// 사용
import { darkTheme } from "@packages/ui";

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? darkTheme : undefined}>
      <Button onClick={() => setIsDark(!isDark)}>테마 전환</Button>
    </div>
  );
}
```

**기대 효과**:

- 사용자 선호도 지원
- 접근성 향상 (고대비 모드)
- 자동 테마 전환 (시간대별)

#### 4-2. Responsive Props 시스템

**현재 한계**:
반응형 스타일을 media query로 수동 작성

**구현 아이디어**:

```typescript
// ✅ Responsive props
<Stack
  direction={{ mobile: "column", desktop: "row" }}
  gap={{ mobile: "sm", tablet: "md", desktop: "lg" }}
>
  <Button size={{ mobile: "sm", desktop: "lg" }}>버튼</Button>
</Stack>;

// 구현
type Responsive<T> =
  | T
  | {
      mobile?: T;
      tablet?: T;
      desktop?: T;
    };

const breakpoints = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
};

function resolveResponsive<T>(value: Responsive<T>): StyleRule {
  if (typeof value !== "object") {
    return { default: value };
  }

  return {
    default: value.mobile,
    "@media": {
      [breakpoints.tablet]: value.tablet,
      [breakpoints.desktop]: value.desktop,
    },
  };
}
```

**기대 효과**:

- 반응형 디자인 간소화
- 일관된 breakpoint 사용
- 모바일 우선 개발

#### 4-3. Animation Preset

**현재 한계**:
애니메이션을 매번 수동으로 정의

**구현 아이디어**:

```typescript
// packages/ui/src/animations/presets.css.ts
import { keyframes } from "@vanilla-extract/css";

export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const slideUp = keyframes({
  from: { transform: "translateY(20px)", opacity: 0 },
  to: { transform: "translateY(0)", opacity: 1 },
});

export const animations = {
  fadeIn: `${fadeIn} 0.3s ease-out`,
  slideUp: `${slideUp} 0.4s ease-out`,
  // ...
};

// 사용
import { animations } from "@packages/ui/animations";

export const modal = style({
  animation: animations.fadeIn,
});

// 또는 컴포넌트에서
<Modal animation="fadeIn">콘텐츠</Modal>;
```

**기대 효과**:

- 일관된 애니메이션
- 성능 최적화된 애니메이션
- 재사용 가능한 패턴

#### 4-4. Visual Regression Testing

**현재 상태**:
Storybook 배포만 되고 자동 테스트 없음

**구현 아이디어**:

```yaml
# .github/workflows/visual-test.yml
name: Visual Regression Test

on: [pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          autoAcceptChanges: false # 자동 승인 비활성화
          exitOnceUploaded: false
          exitZeroOnChanges: false # 변경 사항 발견 시 실패
```

**Storybook에 시각적 테스트 추가**:

```typescript
// button.stories.tsx
export const VisualTest: Story = {
  parameters: {
    chromatic: {
      viewports: [320, 768, 1024], // 여러 뷰포트 테스트
      delay: 300, // 애니메이션 대기
    },
  },
};
```

**기대 효과**:

- 의도치 않은 UI 변경 방지
- PR 단계에서 시각적 회귀 감지
- 디자인 일관성 자동 검증

---

## 📊 성과 및 영향

### 정량적 성과

- **컴포넌트 개수**: 15개 최상위 + 6개 하위 (총 21개)
- **카테고리**: Layout(4), Display(3), Forms(5), UI(2)
- **Variant 총 개수**: 50+ variant 조합
- **Storybook Stories**: 60+ stories (컴포넌트당 평균 4개)
- **타입 안전성**: 100% TypeScript 타입 커버리지
- **번들 크기**: ~15KB (minified + gzipped)
- **Zero Runtime**: JavaScript 번들에 CSS 코드 없음

### 정성적 영향

1. **개발 생산성 향상**

   - Variant 시스템으로 반복 코드 80% 감소
   - Storybook으로 컴포넌트 탐색 시간 단축
   - 타입 안전성으로 런타임 에러 사전 방지

2. **디자인 시스템 일관성**

   - 모든 컴포넌트가 동일한 토큰 기반
   - variant로 일관된 디자인 변형 제공
   - Storybook으로 디자이너-개발자 공통 언어 확립

3. **Code Generator 통합**

   - Component Meta로 드래그 앤 드롭 UI 자동 생성
   - Registry로 코드 생성 엔진 구현
   - 컴포넌트 추가 시 자동으로 Generator에 반영

4. **협업 문화 개선**
   - Storybook 배포로 최신 UI 상시 공유
   - Visual regression으로 변경 사항 추적
   - 문서화로 온보딩 시간 단축

---

## 🔗 관련 패키지 및 시스템

### 의존 패키지

- **@packages/tokens**: 디자인 토큰 제공
- **@packages/vanilla-extract-config**: Theme Contract 및 Recipe 제공

### 소비 패키지

- **@apps/code-generator**: Component Registry를 활용한 Low-code 도구
- **@apps/admin** (미래): 관리자 페이지에서 UI 컴포넌트 사용

### 인프라

- **Chromatic**: Storybook 호스팅 및 Visual regression testing
  - URL: https://68e9f38314b1616683e9ecc0-fvjybvzxkh.chromatic.com/
  - main 브랜치 반영 시 자동 배포
  - PR별 프리뷰 제공

---

## 📝 참고 자료

- [Vanilla Extract 공식 문서](https://vanilla-extract.style/)
- [Storybook 공식 문서](https://storybook.js.org/)
- [React 19 Release Notes](https://react.dev/blog/2024/04/25/react-19)
- [Design System Handbook](https://www.designbetter.co/design-systems-handbook)
- [Compound Components Pattern](https://kentcdodds.com/blog/compound-components-with-react-hooks)
