# @packages/vanilla-extract-config Tech Spec

## 📋 프로젝트 개요

`@packages/vanilla-extract-config`는 Vanilla Extract를 사용한 스타일링을 위한 **기본 설정과 재사용 가능한 스타일 구성 요소**를 제공하는 패키지입니다. 디자인 토큰을 기반으로 Theme Contract를 생성하고, Typography와 Layout에 대한 사전 정의된 Recipe를 제공하여 UI 컴포넌트 개발 시 일관된 스타일링을 손쉽게 적용할 수 있도록 합니다.

### 주요 역할

- **Theme Contract 제공**: `@packages/tokens`의 디자인 토큰을 Vanilla Extract의 Theme Contract로 변환
- **Typography Recipe**: 모든 타이포그래피 스타일을 type-safe한 recipe로 사전 정의
- **Layout Recipe**: Container, Section, Stack(Flexbox), Grid 등 레이아웃 컴포넌트를 위한 recipe 제공
- **타입 정의 및 상수**: 사용 가능한 variant 옵션을 타입과 상수로 export하여 개발 경험 향상
- **재사용 가능한 설정**: 다른 프로젝트나 디자인 시스템에 쉽게 적용 가능한 구조

---

## 🛠 기술 스택

### 핵심 기술

| 기술                           | 버전         | 용도                                   |
| ------------------------------ | ------------ | -------------------------------------- |
| **@vanilla-extract/css**       | ^1.17.4      | CSS-in-TypeScript, Theme Contract 생성 |
| **@vanilla-extract/recipes**   | ^0.5.7       | 타입 안전한 variant 기반 스타일 정의   |
| **@vanilla-extract/sprinkles** | ^1.6.5       | 유틸리티 스타일 생성 (현재 미사용)     |
| **@packages/tokens**           | workspace:\* | 디자인 토큰 소스                       |
| **TypeScript**                 | ^5.0.0       | 타입 안전성 및 자동완성                |

### 패키지 구조

```
src/
├── theme.css.ts              # Theme Contract 정의
├── typography.css.ts         # Typography Recipe
├── layout.css.ts            # Layout Recipes (Container, Section, Stack, Grid)
├── constants/
│   └── theme.ts             # 공통 타입 및 상수 정의
└── index.ts                 # Export 진입점
```

---

## 💡 기술 스택 선택 이유

### 1. Vanilla Extract를 선택한 이유

**CSS-in-JS의 문제점**:

- Runtime overhead: 스타일 계산이 런타임에 발생하여 성능 저하
- 번들 크기 증가: 스타일 라이브러리가 JavaScript 번들에 포함
- SSR 복잡성: 서버 사이드 렌더링 시 추가적인 설정 필요

**Vanilla Extract의 장점**:

#### 1-1. Zero-Runtime CSS

```typescript
// ✅ 빌드 타임에 CSS 생성 → 런타임 성능 저하 없음
import { style } from "@vanilla-extract/css";

export const button = style({
  backgroundColor: "blue",
  padding: "8px 16px",
});

// 빌드 결과: .button_abc123 { background-color: blue; padding: 8px 16px; }
```

**효과**:

- JavaScript 번들 크기 감소
- 런타임 성능 향상 (스타일 계산 없음)
- Critical CSS 자동 추출

#### 1-2. Type-Safe 스타일링

**문제 상황**:
일반 CSS나 CSS Modules는 타이포나 존재하지 않는 속성 사용을 방지할 수 없습니다.

```typescript
// ❌ 일반 CSS - 타입 안전성 없음
<div className="backgrund-color-blue" />; // 오타 감지 불가

// ✅ Vanilla Extract - 컴파일 타임 타입 체크
import { vars } from "@packages/vanilla-extract-config";

const myStyle = style({
  backgroundColor: vars.color.brand[500], // 자동완성 + 타입 체크
  color: vars.color.text.base.default, // 토큰 구조 그대로 사용
});
```

**효과**:

- IDE 자동완성으로 사용 가능한 토큰 즉시 확인
- 잘못된 토큰 참조 시 컴파일 에러
- 리팩토링 안정성 확보

#### 1-3. Theme Contract를 통한 토큰 시스템 통합

**왜 궁합이 좋은가**:

```typescript
// tokens 패키지에서 생성된 객체
export const themeTokens = {
  color: {
    brand: {
      "500": "#3355ff",
    },
  },
  typography: {
    heading: {
      lg: {
        fontFamily: "Inter",
        fontSize: "24px",
        fontWeight: "600",
      },
    },
  },
};

// Vanilla Extract의 createThemeContract와 완벽한 호환
import { createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract(themeTokens);
// → vars.color.brand[500] 형태로 타입 안전하게 사용 가능
```

**효과**:

- JSON 토큰 → JavaScript 객체 → Theme Contract의 원활한 흐름
- 토큰 변경 시 자동으로 타입 업데이트
- 디자인 시스템과 코드의 완벽한 동기화

#### 1-4. Recipe를 통한 Variant 시스템

**문제 상황**:
컴포넌트의 다양한 스타일 변형(size, color, state 등)을 관리하기 어렵습니다.

```typescript
// ❌ 수동 className 조합 - 에러 발생 가능
<button className={`btn btn-${size} btn-${variant}`} />;

// ✅ Recipe - 타입 안전한 variant 시스템
import { recipe } from "@vanilla-extract/recipes";

export const buttonRecipe = recipe({
  variants: {
    size: {
      sm: { padding: "4px 8px", fontSize: "14px" },
      md: { padding: "8px 16px", fontSize: "16px" },
      lg: { padding: "12px 24px", fontSize: "18px" },
    },
    variant: {
      primary: { backgroundColor: vars.color.brand[500] },
      secondary: { backgroundColor: vars.color.neutral[300] },
    },
  },
});

// 사용 시 타입 안전
<button className={buttonRecipe({ size: "md", variant: "primary" })} />;
```

**효과**:

- Variant 조합의 타입 안전성
- 불가능한 조합 방지
- 명확한 API 제공

### 2. 왜 Config 패키지로 분리했는가

**설계 의도**:

- **관심사의 분리**: 토큰 정의(`@packages/tokens`)와 스타일 설정(`@packages/vanilla-extract-config`)를 분리
- **재사용성**: 다른 디자인 시스템이나 프로젝트에서도 토큰만 교체하여 사용 가능
- **유연성**: 차후 다른 형태의 config(예: Tailwind Config, Styled Components Theme)도 토큰 기반으로 생성 가능

**확장 가능한 아키텍처**:

```
@packages/tokens (JSON 토큰)
       ↓
@packages/vanilla-extract-config (Vanilla Extract용)
@packages/tailwind-config (Tailwind CSS용 - 미래)
@packages/styled-config (Styled Components용 - 미래)
       ↓
@packages/ui (UI 컴포넌트)
```

---

## 📚 기술 스택 활용 예제

### 예제 1: Theme Contract 생성

Theme Contract는 디자인 토큰을 Vanilla Extract에서 사용할 수 있는 형태로 변환합니다.

**src/theme.css.ts**

```typescript
import { createThemeContract } from "@vanilla-extract/css";
import { themeTokens } from "@packages/tokens/design-tokens";

// Theme Contract 생성 (타입만 정의, 실제 값은 나중에 적용)
export const vars = createThemeContract(themeTokens);
```

**왜 Contract만 생성하는가?**

- Contract는 "구조"만 정의 (타입 시스템)
- 실제 값(`createGlobalTheme`)은 소비하는 패키지에서 적용
- 이로 인해 여러 테마(light, dark 등)를 동일한 Contract로 적용 가능

**사용 예시**:

```typescript
// packages/ui/src/styles/global.css.ts
import { createGlobalTheme } from "@vanilla-extract/css";
import { vars } from "@packages/vanilla-extract-config";
import { themeTokens } from "@packages/tokens/design-tokens";

// ✅ UI 패키지에서 실제 값 적용
createGlobalTheme(":root", vars, themeTokens);
```

**타입 안전성**:

```typescript
import { vars } from "@packages/vanilla-extract-config";

// ✅ 자동완성과 타입 체크
const myColor = vars.color.brand[500]; // OK
const myFont = vars.typography.heading.lg; // OK
const invalid = vars.color.nonexistent; // ❌ Compile Error
```

### 예제 2: Typography Recipe - 모든 타이포그래피 스타일 정의

**src/typography.css.ts**

```typescript
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "./theme.css";

export const typographyRecipe = recipe({
  variants: {
    role: {
      // Heading 스타일들
      headingXxl: { ...vars.typography.heading.xxl },
      headingXl: { ...vars.typography.heading.xl },
      headingLg: { ...vars.typography.heading.lg },
      headingMd: { ...vars.typography.heading.md },
      headingSm: { ...vars.typography.heading.sm },
      headingXs: { ...vars.typography.heading.xs },

      // Body Text 스타일들
      textSmRegular: { ...vars.typography.text.sm.regular },
      textSmSemibold: { ...vars.typography.text.sm.semibold },
      textMdRegular: { ...vars.typography.text.md.regular },
      textMdSemibold: { ...vars.typography.text.md.semibold },
      textLgRegular: { ...vars.typography.text.lg.regular },
      textLgSemibold: { ...vars.typography.text.lg.semibold },

      // Display 스타일들
      displaySm: { ...vars.typography.display.sm },
      displayMd: { ...vars.typography.display.md },
      displayLg: { ...vars.typography.display.lg },

      // Caption & Code 스타일들
      captionSm: { ...vars.typography.caption.sm },
      captionMd: { ...vars.typography.caption.md },
      overline: { ...vars.typography.overline },
      codeInline: { ...vars.typography.code.inline },
      codeBlock: { ...vars.typography.code.block },
    },
  },
  defaultVariants: {
    role: "textMdRegular",
  },
});

// 타입 Export
export type TypographyRecipeVariants = RecipeVariants<typeof typographyRecipe>;

// 사용 가능한 role 목록 (런타임에서도 사용 가능)
export const TYPOGRAPHY_ROLES = [
  "headingXxl",
  "headingXl",
  // ... 모든 role
] as const;

export type TypographyRole = (typeof TYPOGRAPHY_ROLES)[number];
```

**핵심 아이디어**:

1. **Spread 연산자로 토큰 적용**: `...vars.typography.heading.lg`로 모든 타이포그래피 속성(fontFamily, fontSize, fontWeight 등)을 한 번에 적용
2. **Semantic한 이름**: `textMdRegular`, `headingLg` 등 디자인 의도가 명확한 이름 사용
3. **타입과 상수 동시 제공**: TypeScript 타입과 런타임 상수를 모두 export하여 다양한 활용 가능

**UI 컴포넌트에서 사용**:

```typescript
// packages/ui/src/components/display/typography.tsx
import { typographyRecipe, type TypographyRole } from '@packages/vanilla-extract-config';

interface TypographyProps {
  role?: TypographyRole;  // 타입 안전한 props
  children: React.ReactNode;
}

export const Typography = ({ role = 'textMdRegular', children }: TypographyProps) => {
  return (
    <span className={typographyRecipe({ role })}>
      {children}
    </span>
  );
};

// 사용 예시
<Text role="headingLg">제목</Text>
<Text role="textSmRegular">본문</Text>
<Text role="invalid">에러</Text>  // ❌ Compile Error
```

### 예제 3: Layout Recipe - Grid

**src/layout.css.ts - Grid Recipe**

```typescript
export const gridRecipe = recipe({
  base: {
    display: "grid",
  },
  variants: {
    gap: {
      xs: { gap: vars.layout.grid.gap.xs },
      sm: { gap: vars.layout.grid.gap.sm },
      md: { gap: vars.layout.grid.gap.md },
      lg: { gap: vars.layout.grid.gap.lg },
      xl: { gap: vars.layout.grid.gap.xl },
    },
    padding: {
      xs: { padding: vars.layout.grid.padding.xs },
      sm: { padding: vars.layout.grid.padding.sm },
      md: { padding: vars.layout.grid.padding.md },
      lg: { padding: vars.layout.grid.padding.lg },
      xl: { padding: vars.layout.grid.padding.xl },
    },
    columns: {
      1: { gridTemplateColumns: "repeat(1, 1fr)" },
      2: { gridTemplateColumns: "repeat(2, 1fr)" },
      3: { gridTemplateColumns: "repeat(3, 1fr)" },
      4: { gridTemplateColumns: "repeat(4, 1fr)" },
      6: { gridTemplateColumns: "repeat(6, 1fr)" },
      8: { gridTemplateColumns: "repeat(8, 1fr)" },
      12: { gridTemplateColumns: "repeat(12, 1fr)" },
      auto: { gridTemplateColumns: "auto-fit" },
    },
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
      stretch: { alignItems: "stretch" },
    },
    justify: {
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      between: { justifyContent: "space-between" },
    },
    inline: {
      true: { display: "inline-grid" },
    },
  },
  defaultVariants: {
    gap: "md",
    padding: "md",
    columns: 3,
    align: "start",
    justify: "start",
  },
});

// 타입 Export
export type GridRecipeVariants = RecipeVariants<typeof gridRecipe>;
```

**UI 컴포넌트에서 사용**:

```typescript
// packages/ui/src/components/layout/grid.tsx
import { gridRecipe, type GridRecipeVariants } from '@packages/vanilla-extract-config';

interface GridProps extends GridRecipeVariants {
  children: React.ReactNode;
}

export function Grid({
  container = false,
  size,
  gap,
  padding,
  columns,
  align,
  justify,
  inline,
  className,
  style,
  ref,
  children,
  ...props
}: GridProps) {
  const isContainer = container;

  // container
  const containerClass = isContainer
    ? gridRecipe({
        gap: gap ?? "md",
        padding,
        columns,
        align,
        justify,
        inline,
      })
    : undefined;

  // grid item
  const itemStyle: CSSProperties =
    !isContainer && size ? { gridColumn: `span ${size}` } : {};

  const classNames = cn(containerClass, className);

  return (
    <div
      ref={ref}
      className={classNames}
      style={{ ...style, ...itemStyle }}
      {...props}
    >
      {children}
    </div>
  );
}

// 사용 예시 - 카드 그리드
<Grid columns={3} gap="lg">
  <Card />
  <Card />
  <Card />
</Grid>

// 사용 예시 - 반응형 그리드 (12 column)
<Grid columns={12} gap="md">
  <div style={{ gridColumn: 'span 8' }}>Main Content</div>
  <div style={{ gridColumn: 'span 4' }}>Sidebar</div>
</Grid>
```

### 예제 4: Constants - 공통 타입 및 상수

**src/constants/theme.ts**

```typescript
// Size Variants
export const SIZE_VARIANTS = ["sm", "md", "lg"] as const;
export type SizeVariant = (typeof SIZE_VARIANTS)[number];

// Theme Color Variants (역할 기반)
export const THEME_COLOR_VARIANTS = [
  "brand",
  "primary",
  "secondary",
  "tertiary",
] as const;
export type ThemeColorVariants = (typeof THEME_COLOR_VARIANTS)[number];

// State Color Variants (상태 기반)
export const STATE_COLOR_VARIANTS = [
  "info",
  "success",
  "warning",
  "danger",
] as const;
export type StateColorVariants = (typeof STATE_COLOR_VARIANTS)[number];

// 통합 Color Variants
export const COLOR_VARIANTS = [
  ...THEME_COLOR_VARIANTS,
  ...STATE_COLOR_VARIANTS,
];
export type ColorVariants = (typeof COLOR_VARIANTS)[number];

// Alignment Variants
export const ALIGN_VARIANTS = ["left", "center", "right"] as const;
export type AlignVariant = (typeof ALIGN_VARIANTS)[number];
```

**UI 컴포넌트에서 사용**:

```typescript
// packages/ui/src/components/ui/button.tsx
import {
  type SizeVariant,
  type ColorVariants,
  SIZE_VARIANTS,
} from "@packages/vanilla-extract-config";

interface ButtonProps {
  size?: SizeVariant;
  variant?: ColorVariants;
  children: React.ReactNode;
}

export const Button = ({
  size = "md",
  variant = "primary",
  children,
}: ButtonProps) => {
  // ...
};

// Storybook에서 활용
export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    size: {
      control: "select",
      options: SIZE_VARIANTS, // 런타임 상수 활용
    },
  },
};
```

### 예제 5: Export 구조

**src/index.ts**

```typescript
// Theme Contract
export * from "./theme.css";

// Theme Constants
export * from "./constants/theme";

// Typography Recipes
export * from "./typography.css";

// Layout Recipes
export * from "./layout.css";
```

**소비자 패키지에서 사용**:

```typescript
// packages/ui/src/components/MyComponent.tsx
import {
  vars, // Theme Contract
  typographyRecipe, // Typography Recipe
  containerRecipe, // Container Recipe
  stackRecipe, // Stack Recipe
  type TypographyRole, // 타입
  TYPOGRAPHY_ROLES, // 런타임 상수
} from "@packages/vanilla-extract-config";

// 모든 것을 한 곳에서 import 가능
```

---

## 🎯 개인적인 회고: 문제 해결 과정

### 1. 문제 인식

#### 1-1. createGlobalTheme을 패키지 외부에서 호출 시 Vanilla Extract 오류

**문제 상황**:
초기에는 `theme.css.ts`에서 Theme Contract 생성과 함께 Global Theme 적용을 모두 수행하려 했습니다.

```typescript
// ❌ 초기 시도 - theme.css.ts
import { createThemeContract, createGlobalTheme } from "@vanilla-extract/css";
import { themeTokens } from "@packages/tokens/design-tokens";

export const vars = createThemeContract(themeTokens);

// ❌ 여기서 Global Theme 적용 시도
createGlobalTheme(":root", vars, themeTokens);
```

**발생한 오류**:

```
Error: createGlobalTheme can only be used inside a .css.ts context
```

**왜 문제였는가**:

- Vanilla Extract는 `.css.ts` 파일을 빌드 타임에 처리
- `createGlobalTheme`은 실제 CSS를 생성하는 명령어
- 패키지가 빌드될 때와 소비될 때의 컨텍스트가 달라서 오류 발생
- Vanilla Extract의 빌드 시스템이 패키지 경계를 넘어선 CSS 생성을 제대로 처리하지 못함

**구체적 시나리오**:

```
1. @packages/vanilla-extract-config 빌드
   → theme.css.ts 처리
   → createGlobalTheme 실행 시도
   → ❌ 소비자의 스타일 컨텍스트가 없어서 실패

2. @packages/ui에서 import
   → 이미 빌드된 파일 사용
   → Global Theme이 적용되지 않음
```

#### 1-2. Theme Contract와 Global Theme의 역할 혼동

**개념적 혼란**:

- **Theme Contract**: 토큰 구조만 정의 (타입 시스템과 CSS 변수 이름)
- **Global Theme**: 실제 값을 CSS 변수에 할당

초기에는 이 둘을 같은 곳에서 처리해야 한다고 생각했지만, 실제로는 분리가 필요했습니다.

**왜 분리가 필요한가**:

```typescript
// Contract는 "구조"만 정의
const vars = createThemeContract({
  color: {
    primary: null, // 구조만 정의, 값은 나중에
  },
});

// Global Theme은 "값"을 할당
createGlobalTheme(":root", vars, {
  color: {
    primary: "#3355ff", // 실제 값 할당
  },
});
```

이렇게 분리하면:

- 동일한 Contract로 여러 테마(light, dark) 적용 가능
- 테마 전환 시 구조는 유지하고 값만 변경
- 각 소비자 패키지에서 필요에 맞게 테마 적용 가능

---

### 2. 문제 해결

#### 2-1. Theme Contract와 Global Theme 분리

**해결 방법**:

**Step 1: Config 패키지에서는 Contract만 생성**

```typescript
// packages/vanilla-extract-config/src/theme.css.ts
import { createThemeContract } from "@vanilla-extract/css";
import { themeTokens } from "@packages/tokens/design-tokens";

// ✅ Contract만 생성 (구조 정의)
export const vars = createThemeContract(themeTokens);

// ❌ createGlobalTheme은 여기서 호출하지 않음!
```

**Step 2: UI 패키지에서 Global Theme 적용**

```typescript
// packages/ui/src/styles/global.css.ts
import { createGlobalTheme } from "@vanilla-extract/css";
import { vars } from "@packages/vanilla-extract-config";
import { themeTokens } from "@packages/tokens/design-tokens";

// ✅ UI 패키지의 CSS 컨텍스트에서 Global Theme 적용
createGlobalTheme(":root", vars, themeTokens);
```

**핵심 아이디어**:

1. **Config 패키지**: "어떤 토큰들이 있다"는 구조만 제공 (Contract)
2. **UI 패키지**: "이 토큰들의 실제 값"을 CSS 변수로 할당 (Global Theme)
3. **분리의 장점**: 각 패키지가 Vanilla Extract의 올바른 컨텍스트에서 실행됨

**생성되는 CSS**:

```css
/* UI 패키지의 빌드 결과 */
:root {
  --color-brand-500: #3355ff;
  --color-brand-600: #2944cc;
  --typography-heading-lg-fontFamily: "Inter";
  --typography-heading-lg-fontSize: 24px;
  /* ... */
}
```

#### 2-2. 정확한 책임 분리

**아키텍처 개선**:

```
@packages/tokens
  └─ 토큰 JSON 정의 및 JavaScript 객체 생성

@packages/vanilla-extract-config
  └─ Theme Contract 생성 (구조)
  └─ Recipe 정의 (Typography, Layout)
  └─ 타입 및 상수 Export

@packages/ui
  └─ Global Theme 적용 (실제 값)
  └─ Contract와 Recipe를 사용한 컴포넌트 개발
```

**각 패키지의 명확한 역할**:

| 패키지                 | 역할             | 출력물                 |
| ---------------------- | ---------------- | ---------------------- |
| tokens                 | 토큰 정의        | JavaScript 객체        |
| vanilla-extract-config | 스타일 구조 정의 | Theme Contract, Recipe |
| ui                     | 실제 스타일 적용 | CSS 파일, 컴포넌트     |

#### 2-3. 테마 전환 가능한 구조 확보

**부수적 이점**:
이 구조 덕분에 다크 모드 같은 테마 전환도 쉽게 구현 가능합니다.

```typescript
// packages/ui/src/styles/global.css.ts
import { createGlobalTheme, createTheme } from "@vanilla-extract/css";
import { vars } from "@packages/vanilla-extract-config";
import { themeTokens, darkThemeTokens } from "@packages/tokens/design-tokens";

// Light Theme (기본)
createGlobalTheme(":root", vars, themeTokens);

// Dark Theme
export const darkTheme = createTheme(vars, darkThemeTokens);

// 사용
<div className={isDark ? darkTheme : undefined}>{/* 테마 자동 전환 */}</div>;
```

**핵심 포인트**:

- Contract(`vars`)는 변경 없음
- 값만 교체하여 테마 전환
- 모든 컴포넌트가 자동으로 새 테마 적용

---

### 3. 다시 만든다면 이렇게 할 것

#### 3-1. Compound Variants 활용

**현재 한계**:
Recipe에서 variant 조합에 따른 특별한 스타일을 정의할 수 없습니다.

```typescript
// ❌ 현재는 불가능
// size="sm" + variant="primary"일 때만 특별한 스타일
```

**개선 방안**:

```typescript
export const buttonRecipe = recipe({
  variants: {
    size: {
      sm: { padding: "4px 8px" },
      md: { padding: "8px 16px" },
    },
    variant: {
      primary: { backgroundColor: vars.color.brand[500] },
      secondary: { backgroundColor: vars.color.neutral[300] },
    },
  },
  // ✅ Compound Variants 추가
  compoundVariants: [
    {
      variants: {
        size: "sm",
        variant: "primary",
      },
      style: {
        // sm + primary 조합일 때만 적용되는 스타일
        fontWeight: "700",
        textTransform: "uppercase",
      },
    },
  ],
});
```

**기대 효과**:

- 특정 조합에 대한 세밀한 스타일 제어
- 디자인 시스템의 예외 케이스 처리
- 더욱 풍부한 variant 시스템

#### 3-2. Responsive Variants 시스템

**현재 한계**:
반응형 스타일을 수동으로 media query로 작성해야 합니다.

```typescript
// ❌ 현재 방식 - 수동 media query
const responsive = style({
  "@media": {
    "screen and (min-width: 768px)": {
      fontSize: "18px",
    },
  },
});
```

**개선 방안**:

```typescript
// src/responsive.css.ts
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { vars } from "./theme.css";

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "mobile",
  properties: {
    fontSize: vars.font.size,
    padding: vars.spacing,
    display: ["none", "block", "flex", "grid"],
  },
});

export const responsiveSprinkles = createSprinkles(responsiveProperties);

// ✅ 사용 - 타입 안전한 반응형 스타일
<div
  className={responsiveSprinkles({
    display: {
      mobile: "none",
      tablet: "block",
      desktop: "flex",
    },
    padding: {
      mobile: "4",
      desktop: "8",
    },
  })}
/>;
```

**기대 효과**:

- 타입 안전한 반응형 스타일링
- 중복 코드 제거
- 일관된 breakpoint 사용

#### 3-3. Animation & Transition Recipe

**현재 한계**:
애니메이션과 트랜지션을 매번 수동으로 정의해야 합니다.

**개선 방안**:

```typescript
// src/animation.css.ts
import { keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

// 키프레임 정의
const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideUp = keyframes({
  from: { transform: "translateY(20px)", opacity: 0 },
  to: { transform: "translateY(0)", opacity: 1 },
});

// Animation Recipe
export const animationRecipe = recipe({
  variants: {
    animation: {
      fadeIn: {
        animation: `${fadeIn} 0.3s ease-out`,
      },
      slideUp: {
        animation: `${slideUp} 0.4s ease-out`,
      },
    },
    duration: {
      fast: { animationDuration: "0.15s" },
      normal: { animationDuration: "0.3s" },
      slow: { animationDuration: "0.5s" },
    },
  },
});

// Transition Recipe
export const transitionRecipe = recipe({
  variants: {
    property: {
      all: { transition: "all 0.2s ease" },
      colors: { transition: "background-color 0.2s, color 0.2s" },
      transform: { transition: "transform 0.2s ease" },
    },
  },
});
```

**기대 효과**:

- 일관된 애니메이션 타이밍
- 재사용 가능한 애니메이션 패턴
- 성능 최적화된 애니메이션

#### 3-4. Form Recipe - Input States

**현재 한계**:
Form 관련 상태(focus, error, disabled) 스타일을 컴포넌트마다 개별 정의해야 합니다.

**개선 방안**:

```typescript
// src/form.css.ts
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "./theme.css";

export const inputRecipe = recipe({
  base: {
    borderRadius: vars.shape.borderRadius.md,
    padding: vars.spacing[3],
    fontSize: vars.font.size.md,
    transition: "all 0.2s",
  },
  variants: {
    state: {
      default: {
        borderColor: vars.color.border.input.default,
        backgroundColor: vars.color.background.input.default,
      },
      focused: {
        borderColor: vars.color.border.focused,
        backgroundColor: vars.color.background.input.default,
        outline: `2px solid ${vars.color.border.focused}`,
        outlineOffset: "2px",
      },
      error: {
        borderColor: vars.color.border.input.error,
        backgroundColor: vars.color.background.input.default,
      },
      disabled: {
        borderColor: vars.color.border.input.disabled,
        backgroundColor: vars.color.background.input.disabled,
        cursor: "not-allowed",
        opacity: "0.6",
      },
    },
    size: {
      sm: {
        padding: vars.spacing[2],
        fontSize: vars.font.size.sm,
      },
      md: {
        padding: vars.spacing[3],
        fontSize: vars.font.size.md,
      },
      lg: {
        padding: vars.spacing[4],
        fontSize: vars.font.size.lg,
      },
    },
  },
  defaultVariants: {
    state: "default",
    size: "md",
  },
});
```

**기대 효과**:

- 일관된 Form 스타일
- 접근성 향상 (명확한 focus 상태)
- Input, Select, Textarea 등에 재사용

---

### 4. 더 해봤으면 좋았을 것들

#### 4-1. Component Token Recipe

**현재 한계**:
컴포넌트별 토큰(Button Token, Input Token)을 Recipe로 정의하지 않아서 UI 패키지에서 매번 스타일 정의가 필요합니다.

**구현 아이디어**:

```typescript
// src/components/button.css.ts
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "./theme.css";

export const buttonRecipe = recipe({
  base: {
    borderRadius: vars.shape.borderRadius.md,
    fontFamily: vars.font.family.text,
    fontWeight: vars.font.weight.semibold,
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s",
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.background.primary.default,
        color: vars.color.text.primary.inverse,
        ":hover": {
          backgroundColor: vars.color.background.primary.bold,
        },
      },
      secondary: {
        backgroundColor: vars.color.background.secondary.default,
        color: vars.color.text.secondary.inverse,
        ":hover": {
          backgroundColor: vars.color.background.secondary.bold,
        },
      },
      tertiary: {
        backgroundColor: "transparent",
        color: vars.color.text.tertiary.default,
        border: `1px solid ${vars.color.border.tertiary}`,
        ":hover": {
          backgroundColor: vars.color.background.tertiary.subtle,
        },
      },
    },
    size: {
      sm: {
        padding: `${vars.spacing[1]} ${vars.spacing[3]}`,
        fontSize: vars.font.size.sm,
      },
      md: {
        padding: `${vars.spacing[2]} ${vars.spacing[4]}`,
        fontSize: vars.font.size.md,
      },
      lg: {
        padding: `${vars.spacing[3]} ${vars.spacing[6]}`,
        fontSize: vars.font.size.lg,
      },
    },
    disabled: {
      true: {
        opacity: 0.6,
        cursor: "not-allowed",
        pointerEvents: "none",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
```

**기대 효과**:

- UI 패키지의 컴포넌트가 Config의 Recipe를 직접 사용
- 스타일 중복 제거
- 디자인 시스템 일관성 강화

#### 4-2. CSS Custom Properties 기반 Runtime Theming

**현재 한계**:
다크 모드 같은 테마 전환을 위해서는 새로운 토큰 세트를 빌드해야 합니다.

**구현 아이디어**:

```typescript
// src/theme-runtime.css.ts
import { createThemeContract, createTheme } from "@vanilla-extract/css";

// CSS Custom Properties 기반 Contract
export const runtimeVars = createThemeContract({
  color: {
    primary: null,
    background: null,
    text: null,
  },
});

// Light Theme
export const lightTheme = createTheme(runtimeVars, {
  color: {
    primary: "#3355ff",
    background: "#ffffff",
    text: "#1a1a1a",
  },
});

// Dark Theme
export const darkTheme = createTheme(runtimeVars, {
  color: {
    primary: "#5c77ff",
    background: "#1a1a1a",
    text: "#ffffff",
  },
});

// ✅ 런타임에 className 변경만으로 테마 전환
<body className={isDark ? darkTheme : lightTheme}>
  {/* 모든 컴포넌트 자동 테마 적용 */}
</body>;
```

**기대 효과**:

- JavaScript로 동적 테마 전환
- 사용자 설정 저장 및 복원
- 시간대별 자동 테마 변경

#### 4-3. Design Token Documentation Generator

**현재 한계**:
어떤 recipe와 variant가 있는지 문서를 수동으로 작성해야 합니다.

**구현 아이디어**:

```typescript
// scripts/generate-docs.ts
import { typographyRecipe, TYPOGRAPHY_ROLES } from "../src/typography.css";
import { stackRecipe, STACK_GAP, STACK_DIRECTION } from "../src/layout.css";

function generateRecipeDocs() {
  const docs = `
# Vanilla Extract Config Documentation

## Typography Recipe

Available roles:
${TYPOGRAPHY_ROLES.map((role) => `- \`${role}\``).join("\n")}

## Stack Recipe

### Variants

#### Gap
${STACK_GAP.map((gap) => `- \`${gap}\``).join("\n")}

#### Direction
${STACK_DIRECTION.map((dir) => `- \`${dir}\``).join("\n")}

### Usage Example
\`\`\`typescript
<Stack gap="md" direction="row">
  {children}
</Stack>
\`\`\`
`;

  fs.writeFileSync("RECIPES.md", docs);
}
```

**기대 효과**:

- 자동 생성된 정확한 문서
- Recipe 변경 시 문서도 자동 업데이트
- Storybook과 연동 가능

#### 4-4. Utility-First Sprinkles System

**현재 상태**:
Sprinkles를 dependency에 포함했지만 실제로 사용하지 않습니다.

**구현 아이디어**:

```typescript
// src/sprinkles.css.ts
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { vars } from "./theme.css";

const atomicProperties = defineProperties({
  properties: {
    // Spacing
    margin: vars.spacing,
    marginTop: vars.spacing,
    marginBottom: vars.spacing,
    padding: vars.spacing,
    paddingX: vars.spacing,
    paddingY: vars.spacing,

    // Colors
    color: vars.color.text,
    backgroundColor: vars.color.background,

    // Typography
    fontSize: vars.font.size,
    fontWeight: vars.font.weight,

    // Layout
    display: ["none", "block", "flex", "grid", "inline-block"],
    width: vars.sizing,
    height: vars.sizing,
  },
  shorthands: {
    p: ["padding"],
    px: ["paddingX"],
    py: ["paddingY"],
    m: ["margin"],
    mt: ["marginTop"],
    mb: ["marginBottom"],
  },
});

export const sprinkles = createSprinkles(atomicProperties);

// ✅ 사용 - Tailwind CSS처럼
<div
  className={sprinkles({
    p: "4",
    mt: "8",
    backgroundColor: "primary.default",
    display: "flex",
  })}
/>;
```

**기대 효과**:

- Utility-first 스타일링 가능
- 프로토타이핑 속도 향상
- Recipe와 Sprinkles 혼합 사용

---

## 📊 성과 및 영향

### 정량적 성과

- **Recipe 개수**: Typography 1개, Layout 4개 (Container, Section, Stack, Grid)
- **지원 Variant 수**: 총 50+ variant 조합
- **타입 안전성**: 100% TypeScript 타입 커버리지
- **번들 크기**: Zero-runtime으로 JavaScript 번들에 영향 없음
- **CSS 생성**: 빌드 타임에 최적화된 CSS 파일 생성

### 정성적 영향

1. **개발 생산성 향상**

   - 자동완성으로 사용 가능한 variant 즉시 확인
   - 잘못된 variant 사용 시 컴파일 타임에 에러 감지
   - Recipe 재사용으로 컴포넌트 스타일링 시간 단축

2. **디자인 시스템 일관성**

   - 모든 컴포넌트가 동일한 토큰 기반 스타일 사용
   - Typography와 Layout의 일관된 적용
   - 디자이너-개발자 간 공통 언어 확립

3. **유지보수성 향상**

   - 토큰 변경 시 전체 시스템에 자동 반영
   - Recipe 수정으로 모든 컴포넌트 스타일 일괄 변경
   - 타입 시스템으로 리팩토링 안정성 확보

4. **성능 최적화**
   - Zero-runtime으로 JavaScript 실행 비용 제거
   - Critical CSS 자동 추출
   - 빌드 타임 최적화로 배포 번들 크기 최소화

---

## 🔗 관련 패키지

- **@packages/tokens**: 이 패키지가 소비하는 디자인 토큰
- **@packages/ui**: 이 패키지의 Theme Contract와 Recipe를 사용하는 UI 컴포넌트 라이브러리

---

## 🏗 확장 가능성

### 다른 디자인 시스템 적용

```typescript
// 다른 프로젝트의 토큰 사용
import { myProjectTokens } from "@my-company/design-tokens";

export const vars = createThemeContract(myProjectTokens);
// 동일한 Recipe 구조 재사용 가능
```

### 다른 형태의 Config 생성

```typescript
// Tailwind Config 생성
import { themeTokens } from "@packages/tokens/design-tokens";

export const tailwindConfig = {
  theme: {
    colors: themeTokens.color,
    spacing: themeTokens.spacing,
    fontSize: themeTokens.font.size,
  },
};

// Styled Components Theme 생성
export const styledTheme = {
  colors: themeTokens.color,
  typography: themeTokens.typography,
};
```

---

## 📝 참고 자료

- [Vanilla Extract 공식 문서](https://vanilla-extract.style/)
- [Vanilla Extract Recipes](https://vanilla-extract.style/documentation/packages/recipes/)
- [Vanilla Extract Sprinkles](https://vanilla-extract.style/documentation/packages/sprinkles/)
- [Design Tokens to CSS Variables](https://css-tricks.com/what-are-design-tokens/)
