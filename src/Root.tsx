import React from "react";
import { Composition } from "remotion";
import DAILY from "./DAILY/Main";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="DAILY-Short"
        component={DAILY}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
