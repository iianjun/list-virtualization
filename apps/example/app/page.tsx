"use client";

import { DynamicHeightVirtualList, FixedHeightVirtualList } from "virtualized";
import "virtualized/style.css";
import { FIXED_HEIGHT_ITEMS, DYNAMIC_HEIGHT_ITEMS } from "../constants";

export default function Home() {
  return (
    <main>
      <h1>Fixed height item List Virtualization Example</h1>
      <div style={{ width: "50vw", border: "1px solid gray" }}>
        <FixedHeightVirtualList
          height={500}
          items={FIXED_HEIGHT_ITEMS}
          renderItem={(item) => <div style={{ height: 50 }}>{item}</div>}
          itemHeight={50}
          overscan={5}
        />
      </div>
      <h2>Dynamic height item List Virtualization Example</h2>
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
    </main>
  );
}
