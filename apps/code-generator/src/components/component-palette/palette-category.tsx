import {
  categoryContent,
  categoryTitle,
  categoryWrapper,
} from "./component-palette.css";

export interface PaletteCategoryProps {
  category: string;
  isOpen: boolean;
  toggleCategory: (category: string) => void;
  children: React.ReactNode;
}

export function PaletteCategory({
  category,
  isOpen,
  toggleCategory,
  children,
}: PaletteCategoryProps) {
  return (
    <div className={categoryWrapper} data-category={category}>
      <h4
        className={categoryTitle({ isOpen })}
        onClick={() => toggleCategory(category)}
      >
        {category}
      </h4>
      <div className={categoryContent({ isOpen })}>{children}</div>
    </div>
  );
}
