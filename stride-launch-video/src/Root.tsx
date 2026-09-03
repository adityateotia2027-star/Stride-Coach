import { Composition, Folder } from "remotion";
import { StrideLaunchVideo } from "./StrideLaunchVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="StrideIQ">
        <Composition
          id="StrideLaunch"
          component={StrideLaunchVideo}
          durationInFrames={900}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
