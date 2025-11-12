"use client";

import { FixedHeightVirtualList } from "virtualized";
import "virtualized/style.css";

const ITEMS = Array.from({ length: 1000 }, (_, index) => `Item ${index}`);
export default function Home() {
  return (
    <main>
      <h1>List Virtualization Example</h1>
      <FixedHeightVirtualList
        height={500}
        items={ITEMS}
        renderItem={(item) => <div style={{ height: 50 }}>{item}</div>}
        itemHeight={50}
        overscan={5}
      />
    </main>
  );
}
