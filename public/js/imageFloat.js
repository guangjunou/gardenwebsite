const image = document.getElementById('floatingImage');

let angle = 0;

function moveImage() {
    const radius = 10; // Set the radius of the circular path
    const speed = 0.02; // Set the speed of rotation

    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    image.style.transform = `translate(0px, ${y}px)`;

    angle += speed;

    requestAnimationFrame(moveImage);
}

moveImage();