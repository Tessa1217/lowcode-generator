import { type PropsMeta } from "../../registry";
import "./property-field.css";

interface PropertyFieldProps {
  propName: string;
  propMeta: PropsMeta;
  value: unknown;
  onChange: (value: unknown) => void;
}

export function PropertyField({
  propName,
  propMeta,
  value,
  onChange,
}: PropertyFieldProps) {
  const currentValue = value ?? propMeta.default;

  return (
    <div className="property-field">
      <div className="property-field-header">
        <label htmlFor={propName}>
          {propName}
          {propMeta.required && <span className="required">*</span>}
        </label>
        {/* 기본값으로 리셋 버튼 */}
        {value !== undefined && value !== propMeta.default && (
          <button
            className="reset-button"
            onClick={() => onChange(propMeta.default)}
            title="기본값으로 리셋"
          >
            ↺
          </button>
        )}
      </div>

      {/* 컨트롤 렌더링 */}
      <div className="property-field-control">
        {propMeta.control === "select" && (
          <select
            id={propName}
            value={currentValue as string}
            onChange={(e) => onChange(e.target.value)}
          >
            {propMeta.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {propMeta.control === "text" && (
          <input
            id={propName}
            type="text"
            value={currentValue}
            onChange={(e) => onChange(e.target.value)}
          />
        )}

        {propMeta.control === "number" && (
          <input
            id={propName}
            type="number"
            value={currentValue}
            onChange={(e) => onChange(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                onChange(Number(currentValue) + (e.shiftKey ? 10 : 1));
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                onChange(Number(currentValue) - (e.shiftKey ? 10 : 1));
              }
            }}
          />
        )}

        {propMeta.control === "boolean" && (
          <label className="checkbox-wrapper">
            <input
              id={propName}
              type="checkbox"
              checked={currentValue}
              onChange={(e) => onChange(e.target.checked)}
            />
            <span className="checkbox-label">활성화</span>
          </label>
        )}

        {propMeta.control === "json" && (
          <textarea
            id={propName}
            value={
              typeof currentValue === "string"
                ? currentValue
                : JSON.stringify(currentValue, null, 2)
            }
            onChange={(e) => {
              try {
                // JSON 파싱 시도
                const parsed = JSON.parse(e.target.value);
                onChange(parsed);
              } catch {
                // 파싱 실패 시 문자열로
                onChange(e.target.value);
              }
            }}
            rows={4}
          />
        )}
      </div>

      {/* 설명 */}
      {propMeta.description && (
        <small className="property-description">{propMeta.description}</small>
      )}
    </div>
  );
}
