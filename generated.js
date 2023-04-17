(function ($global) { "use strict";
var Main = function() {
	this.settings = { quads : 10, thickness : 0.05};
	this.canvas = window.document.querySelector("#c");
	this.gl = this.canvas.getContext("webgl2");
	this.canvas.width = 800;
	this.canvas.height = 600;
	var fs = window.document.getElementById("curve-fs").text;
	var vs = window.document.getElementById("curve-vs").text;
	this.program = webglUtils.createProgramFromSources(this.gl,[vs,fs]);
	this.numVertsLoc = this.gl.getUniformLocation(this.program,"numVerts");
	this.resolutionLoc = this.gl.getUniformLocation(this.program,"resolution");
	this.thicknessLoc = this.gl.getUniformLocation(this.program,"thickness");
	this.gl.enable(3042);
	this.gl.blendFunc(770,771);
	webglUtils.resizeCanvasToDisplaySize(this.gl.canvas);
	this.setupUi();
	this.render(0);
};
Main.main = function() {
	new Main();
};
Main.prototype = {
	render: function(intime) {
		this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height);
		this.gl.clearColor(0.1,0.1,0.2,1);
		this.gl.clear(16384);
		this.gl.useProgram(this.program);
		var numVerts = 6 * this.settings.quads;
		this.gl.uniform1i(this.numVertsLoc,numVerts);
		this.gl.uniform1f(this.thicknessLoc,this.settings.thickness);
		this.gl.uniform2f(this.resolutionLoc,this.gl.canvas.width,this.gl.canvas.height);
		this.gl.drawArrays(4,0,numVerts);
		window.requestAnimationFrame($bind(this,this.render));
	}
	,setupUi: function() {
		var gui = new dat.GUI();
		gui.add(this.settings,"quads",5,500).step(1);
		gui.add(this.settings,"thickness",0.01,0.1).step(0.001);
		addPoint(function(x,y) {
			console.log("src/Main.hx:57:",x);
			console.log("src/Main.hx:58:",y);
		});
	}
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
