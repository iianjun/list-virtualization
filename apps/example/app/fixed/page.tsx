"use client";
import { FixedHeightVirtualList } from "virtualized";
import { FIXED_HEIGHT_ITEMS } from "../../constants";

export default function Page() {
  return (
    <div>
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
    </div>
  );
}
