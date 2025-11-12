import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { useScrollTop } from "./hooks/useScrollTop";

export interface DynamicHeightVirtualListProps<T = unknown> {
  items: T[];
  height: number;
  estimatedItemHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
  overscan?: number;
}

export const DynamicHeightVirtualList = <T,>({
  items,
  height,
  renderItem,
  overscan = 0,
  estimatedItemHeight,
}: DynamicHeightVirtualListProps<T>) => {
  const [measurementCache, setMeasurementCache] = useState<
    Record<number, number>
  >({});

  const ref = useRef<HTMLDivElement>(null);

  const scrollTop = useScrollTop(ref);

  // 새로운 item이 render 될때마다 offset을 계산
  const { offsets, totalHeight } = useMemo(() => {
    const offsets: number[] = [];
    let currentOffset = 0;
    for (let i = 0; i < items.length; i++) {
      offsets[i] = currentOffset;
      const itemHeight = measurementCache[i] ?? estimatedItemHeight;
      currentOffset += itemHeight;
    }

    return { offsets, totalHeight: currentOffset };
  }, [items.length, measurementCache, estimatedItemHeight]);

  // offset은 sorted array이기 때문에 binary search를 사용하여 startIndex를 찾음
  const findStartIndex = useCallback(
    (target: number) => {
      let low = 0;
      let high = items.length - 1;
      while (low <= high) {
        const mid = Math.floor((high + low) / 2);
        const offset = offsets[mid] || 0;

        if (offset === target) return mid;
        if (offset < target) {
          low = mid + 1;
        } else if (offset > target) {
          high = mid - 1;
        }
      }
      return Math.max(0, low - 1);
    },
    [offsets, items.length]
  );

  const index = useMemo(() => {
    const startIndex = findStartIndex(scrollTop);
    let endIndex = startIndex;
    let currentHeight = 0;
    while (endIndex < items.length && currentHeight < height) {
      currentHeight += measurementCache[endIndex] ?? estimatedItemHeight;
      endIndex++;
    }

    return {
      start: Math.max(0, startIndex - overscan),
      end: Math.min(endIndex + overscan, items.length),
    };
  }, [
    findStartIndex,
    scrollTop,
    items.length,
    height,
    overscan,
    measurementCache,
    estimatedItemHeight,
  ]);

  // mount 될때 measurementCache에 height 추가
  const measureItem = useCallback(
    (index: number) => (node: HTMLDivElement | null) => {
      if (!node) return;
      const height = node.offsetHeight;
      setMeasurementCache((prev) => {
        if (prev[index] === height) return prev;
        return { ...prev, [index]: height };
      });
    },
    []
  );

  return (
    <div
      className="dynamic-height-virtual-container"
      style={{ height }}
      ref={ref}
    >
      <div
        className="dynamic-height-virtual-viewport"
        style={{
          height: totalHeight,
        }}
      >
        {items.slice(index.start, index.end).map((item, visibleIndex) => {
          const realIndex = index.start + visibleIndex;
          const itemOffset = offsets[realIndex];
          return (
            <div
              key={realIndex}
              className="dynamic-height-item"
              ref={measureItem(realIndex)}
              style={{
                top: itemOffset,
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
