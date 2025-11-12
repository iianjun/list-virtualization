"use client";
import { NO_VIRTUALIZATION_ITEMS } from "../../constants";
export default function Page() {
  return (
    <div>
      <h1>No virtualization</h1>
      <div style={{ width: "50vw", border: "1px solid gray" }}>
        {NO_VIRTUALIZATION_ITEMS.map((item) => (
          <div key={item} style={{ height: 50 }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
