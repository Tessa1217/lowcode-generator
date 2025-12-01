export function isInteractiveElement(target: HTMLElement): boolean {
  return (
    target.tagName === "INPUT" ||
    target.tagName === "BUTTON" ||
    target.tagName === "TEXTAREA" ||
    !!target.closest("input") ||
    !!target.closest("button") ||
    !!target.closest("textarea")
  );
}
