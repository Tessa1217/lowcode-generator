import { useState, useRef } from "react";

export function useCanvasMove() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [panMode, setPanMode] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  // 잦은 이동 시 화면 버벅거림 발생으로 인해 requestAnimationFrame 적용
  // requestAnimationFrame 아이디 저장용 ref
  const rafId = useRef<number | null>(null);
  // 최신 좌표 저장용 ref
  const latestPos = useRef<{ x: number; y: number }>(offset);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!panMode) return;
    e.preventDefault();
    setDragging(true);
    setStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const updatePosition = () => {
    setOffset(latestPos.current);
    rafId.current = null;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    e.preventDefault();
    latestPos.current = { x: e.clientX - start.x, y: e.clientY - start.y };

    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(updatePosition);
    }
  };

  const onMouseUp = () => {
    setDragging(false);
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  const togglePanMode = () => {
    setPanMode((prev) => !prev);
    // 모드 전환 시 드래그 상태 초기화
    setDragging(false);
  };

  const resetPosition = () => {
    setOffset({ x: 0, y: 0 });
    latestPos.current = { x: 0, y: 0 };
  };

  return {
    dragging,
    offset,
    panMode,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    togglePanMode,
    resetPosition,
  };
}
