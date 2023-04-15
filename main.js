'use strict';
const c = document.querySelector('#c');
const gl = document.querySelector('#c').getContext('webgl2');

c.width = 800;
c.height = 600;

var settings = {
    quads: 10,
    thickness: 0.05
};

const fs = document.getElementById("curve-fs").text;
const vs = document.getElementById("curve-vs").text;
const program = webglUtils.createProgramFromSources(gl, [vs, fs]);
const numVertsLoc = gl.getUniformLocation(program, 'numVerts');
const resolutionLoc = gl.getUniformLocation(program, 'resolution');
const thicknessLoc = gl.getUniformLocation(program, 'thickness');


gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

webglUtils.resizeCanvasToDisplaySize(gl.canvas);

// draw
function render(time) {
    time *= 0.001;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.1, 0.1, 0.2, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    const numVerts = 6 * settings.quads;
    gl.uniform1i(numVertsLoc, numVerts);
    gl.uniform1f(thicknessLoc, settings.thickness);
    gl.uniform2f(resolutionLoc, gl.canvas.width, gl.canvas.height);

    const offset = 0;
    gl.drawArrays(gl.TRIANGLES, offset, numVerts);
    //gl.drawArrays(gl.LINE_STRIP, offset, numVerts);

    window.requestAnimationFrame(render);
}
render();

var gui = new dat.GUI();
gui.add(settings, 'quads', 5, 500).step(1);
gui.add(settings, 'thickness', 0.01, 0.1).step(0.001);

