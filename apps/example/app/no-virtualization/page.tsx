"use client";
import { Profiler } from "react";
import { NO_VIRTUALIZATION_ITEMS } from "../../constants";
export default function Page() {
  return (
    <div>
      <h1>No virtualization</h1>
      <Profiler
        id="NoVirtualization"
        onRender={(
          id,
          phase,
          actualDuration,
          baseDuration,
          startTime,
          commitTime
        ) => {
          console.log({
            id,
            phase,
            actualDuration,
            baseDuration,
            startTime,
            commitTime,
          });
        }}
      >
        <div style={{ width: "50vw", border: "1px solid gray" }}>
          {NO_VIRTUALIZATION_ITEMS.map((item) => (
            <div key={item} style={{ height: 50 }}>
              {item}
            </div>
          ))}
        </div>
      </Profiler>
    </div>
  );
}
