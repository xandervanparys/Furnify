import { Box3Helper } from 'three';

export const ErrorBox = ({ box }) => {
  // Create a bounding box helper for the provided Box3 object
  const boxHelper = new Box3Helper(box, 0xffff00); // Yellow color

  return (
    <primitive object={boxHelper} />
  );
};


