// touch scroll logika
var curYPos, curXPos, curDown;
window.addEventListener('mousemove', function (e) {
    if (curDown) {
        window.scrollBy(curXPos - e.pageX, curYPos - e.pageY);
    }
});
window.addEventListener('mousedown', function (e) {
    curYPos = e.pageY;
    curXPos = e.pageX;
    curDown = true;
});
window.addEventListener('mouseup', function (e) {
    curDown = false;
});