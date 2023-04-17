package;

import js.Browser.document;
import js.Browser.window;
import js.html.webgl.RenderingContext;

class Main {
    private var gl:js.html.webgl.RenderingContext;
    private var canvas:js.html.CanvasElement;
    private var program:js.html.webgl.Program;
    private var numVertsLoc:js.html.webgl.UniformLocation;
    private var resolutionLoc:js.html.webgl.UniformLocation;
    private var thicknessLoc:js.html.webgl.UniformLocation;
    private var numControlPointsLoc:js.html.webgl.UniformLocation;
    private var controlPointsLoc:js.html.webgl.UniformLocation;

    private var settings:Dynamic = {
        points : [
            /* -1.0, -1.0, */
            /* -0.9, 0.8, */
            /* 0.0, 0.2, */
            /* 0.6, 0.8, */
            /* 0.8, 0.2, */
            /* -0.8, -0.5, */
            /* 0.0, -0.8, */
            /* 1.0, 0.2, */
            /* 1.0, 0.0, */
            /* -1.0, -1.0 */
        ],
        quads: 10,
        thickness: 0.05
    };

    public function new() {
        canvas = cast document.querySelector('#c');
        gl = canvas.getContext("webgl2");
        canvas.width = 800;
        canvas.height = 600;
        var fs = untyped document.getElementById("curve-fs").text;
        var vs = untyped document.getElementById("curve-vs").text;
        program = untyped webglUtils.createProgramFromSources(gl, [vs, fs]);
        numVertsLoc = gl.getUniformLocation(program, 'numVerts');
        resolutionLoc = gl.getUniformLocation(program, 'resolution');
        thicknessLoc = gl.getUniformLocation(program, 'thickness');
        controlPointsLoc = gl.getUniformLocation(program, 'controlPoints');
        numControlPointsLoc = gl.getUniformLocation(program, 'numControlPoints');
        gl.enable(RenderingContext.BLEND);
        gl.blendFunc(RenderingContext.SRC_ALPHA, RenderingContext.ONE_MINUS_SRC_ALPHA);
        untyped webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        setupUi();
        render(0);
    }

    function render(intime) {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0.1, 0.1, 0.2, 1);
        gl.clear(RenderingContext.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        var numVerts:Int = cast 6 * settings.quads;
        gl.uniform1i(numVertsLoc, numVerts);
        gl.uniform1f(thicknessLoc, settings.thickness);
        gl.uniform2f(resolutionLoc, gl.canvas.width, gl.canvas.height);
        gl.uniform2fv(controlPointsLoc, settings.points);
        gl.uniform1i(numControlPointsLoc, Std.int(settings.points.length / 2));
        gl.drawArrays(RenderingContext.TRIANGLES, 0, numVerts);
        //gl.drawArrays(gl.LINE_STRIP, offset, numVerts);
        window.requestAnimationFrame(render);
    }

    function setupUi() {
        var gui:Dynamic = js.Syntax.code("new dat.GUI()");
        gui.add(settings, 'quads', 5, 500).step(1);
        gui.add(settings, 'thickness', 0.01, 0.1).step(0.001);
        addPoint(0, 0);
        addPoint(200, 200);
        addPoint(300, 400);
        addPoint(600, 600);
    }

    function addPoint(x, y) {
        var index = settings.points.length;
        settings.points.push(x);
        settings.points.push(y);
        untyped addVisualPoint(x, y, function(x, y) {
            settings.points[index + 0] = x;
            settings.points[index + 1] = y;
        });
    }

    public static function main() {
        new Main();
    }
}
