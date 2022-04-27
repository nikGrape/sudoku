export default arrowsHandler;

function arrowsHandler(event, key) {
    if (key === 'ArrowLeft')
         return handleLeft(event);
    else if (key === 'ArrowRight')
        return handleRight(event);
    else if (key ==='ArrowUp')
        return handleUp(event);
    else if (key === 'ArrowDown')
        return handleDown(event);
    else return event;
}


function handleLeft(event) {
    if (event.x === 0) event.x = 8;
    else event.x -= 1;
    return event;
}

function handleRight(event) {
    if (event.x === 8) event.x = 0;
    else event.x += 1;
    return event;
}

function handleUp(event) {
    if (event.y === 0) event.y = 8;
    else event.y -= 1;
    return event;
}

function handleDown(event) {
    if (event.y === 8) event.y = 0;
    else event.y += 1;
    return event;
}