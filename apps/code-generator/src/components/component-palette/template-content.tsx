import { useState } from "react";
import { templates, type Template } from "../../templates";
import { useTreeStore } from "../../store/treeStore";
import { cloneNodeWithNewIds } from "../../utils/treeHelper";
import { PaletteCategory } from "./palette-category";
import {
  componentGrid,
  paletteContent,
  templateCard,
  templateDescription,
  templateInfo,
  templateName,
  templatePlaceholder,
  templatePreview,
} from "./component-palette.css";

/**
 * 템플릿 팔레트
 */
export function TemplateContent() {
  const { insertIntoContainer } = useTreeStore();

  const [openTemplates, setOpenTemplates] = useState<Record<string, boolean>>(
    {}
  );

  const toggleTemplateCategory = (category: string) => {
    setOpenTemplates((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  function handleTemplateClick(template: Template) {
    const clonedTree = template.tree.map((node) => cloneNodeWithNewIds(node));

    // Canvas에 추가
    clonedTree.forEach((node) => {
      insertIntoContainer("canvas-root", node);
    });
  }

  // 템플릿 카테고리
  const templateCategories = [
    {
      title: "Forms",
      key: "forms" as const,
      icon: "📝",
    },
  ];

  return (
    <div className={paletteContent}>
      {templateCategories.map((category) => {
        const categoryTemplates = templates.filter(
          (t) => t.category === category.key
        );

        if (categoryTemplates.length === 0) return null;

        const isOpen = openTemplates[category.title] || false;

        return (
          <PaletteCategory
            key={category.key}
            category={category.title}
            isOpen={isOpen}
            toggleCategory={toggleTemplateCategory}
          >
            <div className={componentGrid({ mode: "template" })}>
              {categoryTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onClick={() => handleTemplateClick(template)}
                />
              ))}
            </div>
          </PaletteCategory>
        );
      })}
    </div>
  );
}

/**
 * 템플릿 카드
 */
function TemplateCard({
  template,
  onClick,
}: {
  template: Template;
  onClick: () => void;
}) {
  return (
    <button
      className={templateCard}
      onClick={onClick}
      title={template.description}
    >
      <div className={templatePreview}>
        {template.thumbnail ? (
          <img src={template.thumbnail} alt={template.name} />
        ) : (
          <div className={templatePlaceholder}>{template.name.charAt(0)}</div>
        )}
      </div>
      <div className={templateInfo}>
        <span className={templateName}>{template.name}</span>
        <span className={templateDescription}>{template.description}</span>
      </div>
    </button>
  );
}
