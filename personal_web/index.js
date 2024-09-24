document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.one, .two');

    const animationFrames = {
        one: [
            'image/frame1/resized_frame_1.jpg',
            'image/frame1/resized_frame_2.jpg',
            'image/frame1/resized_frame_3.jpg',
            'image/frame1/resized_frame_4.jpg',
            'image/frame1/resized_frame_5.jpg',
            'image/frame1/resized_frame_6.jpg',
            'image/frame1/resized_frame_7.jpg',
            'image/frame1/resized_frame_8.jpg',
            'image/frame1/resized_frame_9.jpg',
        ],
        two: [
            'image/frame2/resized_image_1.jpg',
            'image/frame2/resized_image_2.jpg',
            'image/frame2/resized_image_3.jpg',
        ]
    };

    let currentFrames = {
        one: 0,
        two: 0
    };

    let animationIntervals = {
        one: null,
        two: null
    };
    /*Stop the animation while the mouse move away */
    function startAnimation(element, animationKey) {
        const frames = animationFrames[animationKey];

        if (animationIntervals[animationKey] === null) {
            animationIntervals[animationKey] = setInterval(() => {
                element.querySelector('img').src = frames[currentFrames[animationKey]];
                currentFrames[animationKey] = (currentFrames[animationKey] + 1) % frames.length;
            }, 400); 
        }
    }

    function stopAnimation(animationKey) {
        clearInterval(animationIntervals[animationKey]);
        animationIntervals[animationKey] = null; 
    }

    // Add the eventlistener to block one and two
    elements.forEach(element => {
        const animationKey = element.classList.contains('one') ? 'one' : 'two';

        element.addEventListener('mouseover', function () {
            currentFrames[animationKey] = 0;
            startAnimation(element, animationKey);
        });

        element.addEventListener('mouseleave', function () {
            stopAnimation(animationKey);
        });
    });
});

