function dragElement(elmnt, callback) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        //
        var y = (elmnt.offsetTop - pos2);
        var x = (elmnt.offsetLeft - pos1);
        elmnt.style.top = y + "px";
        elmnt.style.left = x + "px";

        callback(x, y);
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


function addVisualPoint(x, y, callback) {
    var elem = document.createElement('div');
    elem.className = "point";
    document.body.appendChild(elem);
    dragElement(elem, callback);
    elem.style.top = y + "px";
    elem.style.left = x + "px";
}
