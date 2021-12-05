import { useRef } from 'react'
import { Clock, Color, DoubleSide, Vector2 } from 'three';
import vertexShader from '../shaders/wobble_vertex.glsl';
import fragmentShader from '../shaders/wobble_fragment.glsl'
import { useFrame } from '@react-three/fiber';


export default function ClassicArt() {
    const ref = useRef<any>();

    const canvas = document.getElementsByTagName('canvas')[0];
    const uniforms = {
        u_time: { value: 0 },
        u_size: { value: 6.0 },
        u_resolution: {
            value: new Vector2(canvas.width, canvas.height)
        },
        u_fromMin: { value: 0.370 },
        u_fromMax: { value: 0.670 },
        u_toMin: { value: 0.0 },
        u_toMax: { value: 1.0 },
        u_steps: { value: 10.0 },
        u_fromColor: { value: new Color('#68271A') },
        u_toColor: { value: new Color('#FF6040') }
    };

    const clock = new Clock();
    const mapRange = (value: number, low1: number, high1: number, low2: number, high2: number) => {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    };

    useFrame(() => {
        if (ref && ref.current && ref.current.material && ref.current.material.uniforms) {
            let value = Math.abs(Math.sin(clock.getElapsedTime()) * 20);
            let steps = mapRange(Math.ceil(value), 0, 20, 3, 10);
            ref.current.material.uniforms.u_steps.value = steps;
        }
    })

    return (
        <mesh
            ref={ref}
            scale={[10, 10, 10]}
            rotation={[-Math.PI / 1.8, 0, 0]}
        >
            <planeBufferGeometry attach={"geometry"} args={[1, 1, 1800, 1800]} onUpdate={
                (self) => self.computeVertexNormals()
            } />
            <shaderMaterial
                attach={"material"}
                side={DoubleSide}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent={true}
                lights={false}
            />
        </mesh>
    )
}