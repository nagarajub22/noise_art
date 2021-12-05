import { Canvas } from "@react-three/fiber";
import React from "react";
import { randFloat } from 'three/src/math/MathUtils';
import CGizmoHelper from '../helpers/GizmoHelper.component';
import ClassicArt from './ClassicArt.component';

interface Props {
  name:
  string
}

function App(props: Props) {
  return (
    <Canvas
      camera={{ 
        fov: 100, 
        near: 1, 
        far: 1000, 
        aspect: window.innerWidth / window.innerHeight, 
        position: [0, 1.5, 0]
      }}
    >
      <color attach={"background"} args={["#fff"]} />
      {/* <gridHelper /> */}
      <ambientLight intensity={0.5}/>
      <pointLight position={[10, 10, 10]} />
      {/* <CGizmoHelper/> */}
      <ClassicArt/>
    </Canvas>
  )

}

export default App;