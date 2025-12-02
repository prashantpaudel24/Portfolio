import { useGLTF, useAnimations, Center } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function RobotModel() {
  const group = useRef();

  // Load scene + animations
  const { scene, animations } = useGLTF("/robot_playground.glb");

  // Extract animation actions
  const { actions } = useAnimations(animations, group);

  // Play the first animation automatically
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const first = Object.keys(actions)[0];
      actions[first].play();
    }
  }, [actions]);

  // Cursor movement + floating effect
  useFrame((state) => {
    if (!group.current) return;

    const { x, y } = state.mouse;
    const t = state.clock.getElapsedTime();

    // Cursor tilt
    group.current.rotation.y = x * 0.8;
    group.current.rotation.x = -y * 0.3;

    // Floating animation
    group.current.position.y = Math.sin(t * 1.5) * 0.15 + 0.2;
  });

  return (
    <Center>
      <primitive ref={group} object={scene} />
    </Center>
  );
}
