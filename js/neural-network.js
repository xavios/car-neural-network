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
    this.input = new Array(inputCnt);
    this.output = new Array(outputCnt);

    this.bias = new Array(outputCnt);

    this.weights = new Array(inputCnt);
    for (let i = 0; i < inputCnt; i++) {
      this.weights[i] = new Array(outputCnt);
    }

    this.#randomize();
  }

  #randomize() {
    for (let i = 0; i < this.input.length; i++) {
      for (let j = 0; j < this.output.length; j++) {
        this.weights[i][j] = Math.random() * 2 - 1;
      }
    }

    for (let i = 0; i < this.output.length; i++) {
      this.bias[i] = Math.random() * 2 - 1;
    }
  }

  static feedForward(givenInputs, level) {
    level.input = givenInputs;
    for (let i = 0; i < level.output.length; i++) {
      let sum = 0;
      for (let j = 0; j < level.input.length; j++) {
        sum += level.input[j] * level.weights[j][i];
      }
      level.output[i] = sum > level.bias[i] ? 1 : 0;
    }
    return level.output;
  }
}
