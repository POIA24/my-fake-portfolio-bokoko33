import Experience from "./Experience";
import { EventEmitter } from "events";
import GSAP from "gsap";
import convert from "./Utils/ConvertDivsToSpans";

export default class Preloader extends EventEmitter {
    constructor() {
        super();

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets = () => {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".first-sub"));
        convert(document.querySelector(".second-sub"));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        // console.log(this.roomChildren);
    };

    firstIntro = () => {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatethis", { y: 0, yPercent: 100 });
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document
                        .querySelector(".preloader")
                        .classList.add("hidden");
                },
            });

            if (this.device === "desktop") {
                this.timeline
                    .to(this.roomChildren.cube.scale, {
                        x: 1.4,
                        y: 1.4,
                        z: 1.4,
                        ease: "back.out(2.5)",
                        duration: 0.7,
                    })
                    .to(this.room.position, {
                        x: -1,
                        ease: "power1.out",
                        duration: 0.7,
                    });
            } else {
                this.timeline
                    .to(this.roomChildren.cube.scale, {
                        x: 1.4,
                        y: 1.4,
                        z: 1.4,
                        ease: "back.out(2.5)",
                        duration: 0.7,
                    })
                    .to(this.room.position, {
                        z: -1,
                        ease: "power1.out",
                        duration: 0.7,
                    });
            }
            this.timeline
                .to(".intro-text .animatethis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                })
                .to(
                    ".arrow-swg-wrapper",
                    {
                        opacity: 1,
                    },
                    "same"
                )
                .to(
                    ".toggle-bar",
                    {
                        opacity: 1,
                        onComplete: resolve,
                    },
                    "same"
                );
        });
    };

    secondIntro = () => {
        return new Promise((resolve) => {
            this.secondTimeline = new GSAP.timeline();
            // console.log(this.roomChildren);

            this.secondTimeline
                .to(
                    ".intro-text .animatethis",
                    {
                        yPercent: 100,
                        stagger: 0.05,
                        ease: "back.in(1.7)",
                    },
                    "fadeout"
                )
                .to(
                    ".arrow-swg-wrapper",
                    {
                        opacity: 0,
                    },
                    "fadeout"
                )
                .to(
                    this.room.position,
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                        ease: "power1.out",
                    },
                    "same"
                )
                .to(
                    this.roomChildren.cube.rotation,
                    {
                        y: 2 * Math.PI + Math.PI / 4,
                    },
                    "same"
                )
                .to(
                    this.roomChildren.cube.scale,
                    {
                        x: 9,
                        y: 9,
                        z: 9,
                    },
                    "same"
                )
                .to(
                    this.camera.orthographicCamera.position,
                    {
                        y: 3.7,
                    },
                    "same"
                )
                .to(
                    this.roomChildren.cube.position,
                    {
                        y: 3.5,
                    },
                    "same"
                )
                .to(this.roomChildren.body.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                })
                .to(
                    this.roomChildren.cube.scale,
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                        duration: 0.5,
                    },
                    "introtext"
                )
                .to(
                    ".hero-main-title .animatethis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".hero-main-description .animatethis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".first-sub .animatethis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".second-sub .animatethis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    this.roomChildren.desks.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.5)",
                        duration: 0.5,
                    },
                    ">-0.5"
                )
                .to(
                    this.roomChildren.table_stuff.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.5)",
                        duration: 0.5,
                    },
                    ">-0.4"
                )
                .to(
                    this.roomChildren.bed.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.5)",
                        duration: 0.5,
                    },
                    ">-0.3"
                )
                .to(
                    this.roomChildren.floor_items.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.5)",
                        duration: 0.5,
                    },
                    ">-0.2"
                )
                .to(
                    this.roomChildren.shelf.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.5)",
                        duration: 0.5,
                    },
                    ">-0.1"
                )
                .to(
                    this.roomChildren.computer.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.5)",
                        duration: 0.5,
                    },
                    "computer"
                )
                .to(
                    this.roomChildren.rectLight.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 0.5,
                    },
                    "computer"
                )
                .to(
                    this.roomChildren.chair.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 0.5,
                    },
                    "chair"
                )
                .to(
                    this.roomChildren.chair.rotation,
                    {
                        y: 4 * Math.PI + Math.PI + Math.PI / 2,
                        ease: "power2.out",
                    },
                    "chair"
                )
                .to(this.roomChildren["pendolo-palladx"].scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.5)",
                    duration: 0.5,
                })
                .to(this.roomChildren["pendolo-pallasx"].scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.5)",
                    duration: 0.5,
                })
                .to(".arrow-swg-wrapper", {
                    opacity: 1,
                    onComplete: resolve,
                });
        });
    };

    onScroll = (e) => {
        if (e.deltaY > 0) {
            this.playSecondIntro();
            this.removeEventListeners();
        }
    };

    onTouch = (e) => {
        this.initialY = e.touches[0].clientY;
    };

    onTouchMove = (e) => {
        // console.log("first");
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if (difference > 0) {
            this.playSecondIntro();
            this.removeEventListeners();
        }
        this.initialY = null;
    };

    removeEventListeners = () => {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    };

    playIntro = async () => {
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    };

    playSecondIntro = async () => {
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();
        document.querySelector(".page").style.overflow = "visible";
        this.scaleFlag = false;
        this.emit("enablecontrols");
    };

    move = () => {
        if (this.device === "desktop") {
            this.room.position.set(-1, 0, 0);
        } else {
            this.room.position.set(0, 0, -1);
        }
    };

    scale = () => {
        if (this.device === "desktop") {
            this.room.scale.set(0.33, 0.33, 0.33);
        } else {
            this.room.scale.set(0.2, 0.2, 0.2);
        }
    };

    update = () => {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    };
}
