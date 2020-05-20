const controller = new Leap.Controller();
controller.connect();
controller.on('frame', (frame) => {
    leap = frame;
});
export let leap;