import "./index.css";
import { Composition } from "remotion";
import { Video } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FridayReveal"
        component={Video}
        durationInFrames={5400}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
