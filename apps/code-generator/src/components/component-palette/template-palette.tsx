import { templates, type Template } from "../../templates";
import { useTreeStore } from "../../store/treeStore";
import { cloneNodeWithNewIds } from "../../utils/treeHelper";

/**
 * 템플릿 팔레트
 */
export function TemplatePalette() {
  const { insertIntoContainer } = useTreeStore();

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
    <div className="palette-content">
      {templateCategories.map((category) => {
        const categoryTemplates = templates.filter(
          (t) => t.category === category.key
        );

        if (categoryTemplates.length === 0) return null;

        return (
          <div key={category.key} className="category">
            <h3 className="category-title">
              <span className="category-icon">{category.icon}</span>
              {category.title}
            </h3>
            <div className={"category-content open"}>
              <div className="template-grid">
                {categoryTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onClick={() => handleTemplateClick(template)}
                  />
                ))}
              </div>
            </div>
          </div>
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
      className="template-card"
      onClick={onClick}
      title={template.description}
    >
      <div className="template-preview">
        {template.thumbnail ? (
          <img src={template.thumbnail} alt={template.name} />
        ) : (
          <div className="template-placeholder">{template.name.charAt(0)}</div>
        )}
      </div>
      <div className="template-info">
        <span className="template-name">{template.name}</span>
        <span className="template-description">{template.description}</span>
      </div>
    </button>
  );
}
