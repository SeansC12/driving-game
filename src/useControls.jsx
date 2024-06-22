import { useEffect, useState } from "react";

export const useControls = (vehicleApi, chassisApi) => {
  let [controls, setControls] = useState({});

  useEffect(() => {
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: true,
      }));
    };

    const keyUpPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: false,
      }));
    };

    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
      window.removeEventListener(
        "keydown",
        keyDownPressHandler
      );
      window.removeEventListener(
        "keyup",
        keyUpPressHandler
      );
    };
  }, []);

  useEffect(() => {
    if (!vehicleApi || !chassisApi) return;

    if (controls.w) {
      vehicleApi.setBrake(0, 2);
      vehicleApi.setBrake(0, 3);
      vehicleApi.applyEngineForce(100, 2);
      vehicleApi.applyEngineForce(100, 3);
    } else if (controls.s) {
      // vehicleApi.applyEngineForce(-100, 2);
      // vehicleApi.applyEngineForce(-100, 3);
      vehicleApi.setBrake(3, 2);
      vehicleApi.setBrake(3, 3);
    } else {
      vehicleApi.setBrake(0, 2);
      vehicleApi.setBrake(0, 3);
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls.a) {
      vehicleApi.setSteeringValue(0.3, 2);
      vehicleApi.setSteeringValue(0.3, 3);
      vehicleApi.setSteeringValue(-0.002, 0);
      vehicleApi.setSteeringValue(-0.002, 1);
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.3, 2);
      vehicleApi.setSteeringValue(-0.3, 3);
      vehicleApi.setSteeringValue(0.002, 0);
      vehicleApi.setSteeringValue(0.002, 1);
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    if (controls.arrowdown)
      chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
    if (controls.arrowup)
      chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
    if (controls.arrowleft)
      chassisApi.applyLocalImpulse(
        [0, -5, 0],
        [-0.5, 0, 0]
      );
    if (controls.arrowright)
      chassisApi.applyLocalImpulse(
        [0, -5, 0],
        [+0.5, 0, 0]
      );

    if (controls.r) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
};
