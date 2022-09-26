import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";

import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel = () => {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                });
            }

            // console.log(child);

            if (child.name === "computer") {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

            // if (
            //     child.name === "tavolino" ||
            //     child.name === "mail" ||
            //     child.name === "mail_letter" ||
            //     child.name === "mail_stuff"
            // ) {
            //     child.scale.set(0, 0, 0);
            // }

            child.scale.set(0, 0, 0);

            // console.log(child.name);
            if (child.name === "Cube") {
                // child.scale.set(1, 1, 1);
                child.position.set(0, 0, 0);
                child.rotation.y = Math.PI / 4;
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        });

        const width = 0.38;
        const height = 0.18;
        const intensity = 10;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );
        rectLight.position.set(-2.95, 2.14, -0.83);
        rectLight.rotation.y = Math.PI + Math.PI / 4;
        this.actualRoom.add(rectLight);
        rectLight.scale.set(0, 0, 0);

        this.roomChildren["rectLight"] = rectLight;

        // const rectLightHelper = new RectAreaLightHelper(rectLight);
        // rectLight.add(rectLightHelper);

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.33, 0.33, 0.33);
    };

    setAnimation = () => {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        // console.log(this.room);
        this.moveSx = this.mixer.clipAction(this.room.animations[7]);
        this.moveDx = this.mixer.clipAction(this.room.animations[8]);
        this.moveDx.play();
        this.moveSx.play();
    };

    onMouseMove = () => {
        window.addEventListener("mousemove", (e) => {
            //console.log(e);
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });
    };

    resize = () => {};

    update = () => {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.001);
    };
}
