import {
  componentPropsTable,
  componentPropsNestedObject,
  nestedObjectPair,
} from "./tree-view.css";

export function ComponentPropertyRenderer({ value }: { value: unknown }) {
  if (typeof value === "string" || typeof value === "number") {
    return <p>{value.toString() || "-"}</p>;
  }

  if (typeof value === "boolean") {
    return <p>{value ? "true" : "false"}</p>;
  }

  // Select의 Options와 같이 배열 형태인 경우
  if (Array.isArray(value)) {
    if (value.length === 0) return <p>[]</p>;

    if (typeof value[0] === "object" && value[0] !== null) {
      const keys = Object.keys(value[0]);
      return (
        <table className={componentPropsTable}>
          <thead>
            <tr>
              {keys.map((k) => (
                <th key={k}>{k}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.map((item, idx) => (
              <tr key={idx}>
                {keys.map((k) => (
                  <td key={k}>
                    {typeof item[k] === "object"
                      ? JSON.stringify(item[k])
                      : item[k]?.toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    // 일반 문자열/숫자 배열일 경우
    return <p>{value.join(", ")}</p>;
  }

  // 일반 객체인 경우
  if (typeof value === "object" && value !== null) {
    return (
      <div className={componentPropsNestedObject}>
        {Object.entries(value).map(([k, v]) => (
          <div key={k} className={nestedObjectPair}>
            <strong>{k}</strong>: {<ComponentPropertyRenderer value={v} />}
          </div>
        ))}
      </div>
    );
  }

  return <p>-</p>;
}
