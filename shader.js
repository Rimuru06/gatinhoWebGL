export default class Shader {
  static createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      var info = gl.getShaderInfoLog(shader);
      console.log('Could not compile WebGL program:' + info);
    }

    return shader;
  }

  static createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      var info = gl.getProgramInfoLog(program);
      console.log('Could not compile WebGL program:' + info);
    }

    return program;
  }

  static isArrayBuffer(value) {
    return value && value.buffer instanceof ArrayBuffer && value.byteLength !== undefined;
  }

  static createBuffer(gl, type, data) {
    if (data.length == 0)
      return null;

    if (!Shader.isArrayBuffer(data)) {
      console.warn('Data is not an instance of ArrayBuffer');
      return null;
    }

    var buffer = gl.createBuffer();
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, data, gl.STATIC_DRAW);

    return buffer;
  }

  static createVAO(gl, posAttribLoc, colorAttribLoc, dataBuffer = null) {
    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    if (posAttribLoc != null && colorAttribLoc != null && dataBuffer != null) {
      // TODO Questão 1 foi aqui
      var type = gl.FLOAT;
      gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
      gl.vertexAttribPointer(posAttribLoc, 2, type, false, 0, 0);
      gl.vertexAttribPointer(colorAttribLoc, 3, type, false, 0, 4*42);
    }

    return vao;
  }
}