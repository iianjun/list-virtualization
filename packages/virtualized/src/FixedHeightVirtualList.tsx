import { ReactNode, useMemo, useRef } from "react";
import "./VirtualList.css";
import { useScrollTop } from "./hooks/useScrollTop";

export interface FixedHeightVirtualListProps<T = unknown> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => ReactNode;
  overscan?: number;
}

export const FixedHeightVirtualList = <T,>({
  items,
  itemHeight,
  height,
  renderItem,
  overscan = 0,
}: FixedHeightVirtualListProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollTop = useScrollTop(ref);

  const index = useMemo(() => {
    const visibleCount = Math.ceil(height / itemHeight);
    const startIndex = Math.floor(scrollTop / itemHeight);
    return {
      start: Math.max(0, startIndex - overscan),
      end: Math.min(startIndex + visibleCount + overscan, items.length),
    };
  }, [scrollTop, itemHeight, height, overscan, items]);

  return (
    <div
      className="fixed-height-virtual-container"
      style={{ height }}
      ref={ref}
    >
      <div
        className="fixed-height-virtual-viewport"
        style={{
          height: items.length * itemHeight,
        }}
      >
        {items.slice(index.start, index.end).map((item, visibleIndex) => {
          const realIndex = index.start + visibleIndex;
          return (
            <div
              key={realIndex}
              className="fixed-height-item"
              style={{
                height: itemHeight,
                top: realIndex * itemHeight,
              }}
            >
              {renderItem(item, realIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
