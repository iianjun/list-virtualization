"use client";

import { DynamicHeightVirtualList } from "virtualized";
import { DYNAMIC_HEIGHT_ITEMS } from "../../constants";

export default function Page() {
  return (
    <div>
      <h1>Dynamic height item List Virtualization Example</h1>
      <div style={{ width: "50vw", border: "1px solid gray" }}>
        <DynamicHeightVirtualList
          height={500}
          items={DYNAMIC_HEIGHT_ITEMS}
          renderItem={(item) => (
            <div style={{ height: item.height }}>{item.label}</div>
          )}
          estimatedItemHeight={50}
          overscan={5}
        />
      </div>
    </div>
  );
}
