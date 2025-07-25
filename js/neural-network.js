class NeuralNetwork {
  constructor(neuronCounts) {
    this.levels = [];
    for (let i = 0; i < neuronCounts.length - 1; i++) {
      this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
    }
  }

  static feedForward(givenInputs, network) {
    let outputs = Level.feedForward(givenInputs, network.levels[0]);
    for (let i = 1; i < network.levels.length; i++) {
      outputs = Level.feedForward(outputs, network.levels[i]);
    }
    return outputs;
  }
}

class Level {
  constructor(inputCnt, outputCnt) {
    this.inputs = new Array(inputCnt);
    this.outputs = new Array(outputCnt);

    this.biases = new Array(outputCnt);

    this.weights = new Array(inputCnt);
    for (let i = 0; i < inputCnt; i++) {
      this.weights[i] = new Array(outputCnt);
    }

    this.#randomize();
  }

  #randomize() {
    for (let i = 0; i < this.inputs.length; i++) {
      for (let j = 0; j < this.outputs.length; j++) {
        this.weights[i][j] = Math.random() * 2 - 1;
      }
    }

    for (let i = 0; i < this.outputs.length; i++) {
      this.biases[i] = Math.random() * 2 - 1;
    }
  }

  static feedForward(givenInputs, level) {
    level.inputs = givenInputs;
    for (let i = 0; i < level.outputs.length; i++) {
      let sum = 0;
      for (let j = 0; j < level.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i];
      }
      level.outputs[i] = sum > level.biases[i] ? 1 : 0;
    }
    return level.outputs;
  }
}
