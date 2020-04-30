/* eslint-disable no-param-reassign */
export default class ComplexNumber {
  constructor(values = { re: 0, im: 0 }) {
    // Real Number
    this.re = values.re || 0;
    // Imaginary Number
    this.im = values.im || 0;
  }

  makeObject(complexNumber) {
    let obj = complexNumber;
    if (typeof complexNumber !== 'object') {
      obj = { re: complexNumber, im: 0 };
    }
    return obj;
  }

  add(complexNumber) {
    complexNumber = this.makeObject(complexNumber);
    return {
      re: this.re + complexNumber.re,
      im: this.im + complexNumber.im,
    };
  }

  subtract(complexNumber) {
    complexNumber = this.makeObject(complexNumber);

    return {
      re: this.re - complexNumber.re,
      im: this.im - complexNumber.im,
    };
  }

  multiply(complexNumber) {
    complexNumber = this.makeObject(complexNumber);
    return {
      re: (this.re * complexNumber.re) - (this.im * complexNumber.im),
      im: (this.re * complexNumber.im) + (this.im * complexNumber.re),
    };
  }

  conjugate(complexNumber) {
    return {
      re: complexNumber.re,
      im: -1 * complexNumber.im,
    };
  }

  divide(divider) {
    // Make sure we're dealing with complex number.
    const complexDivider = this.makeObject(divider);

    // Get divider conjugate.
    const dividerConjugate = this.conjugate(complexDivider);

    // Multiply dividend by divider's conjugate.
    const finalDivident = this.multiply(dividerConjugate);

    // Calculating final divider using formula (a + bi)(a − bi) = a^2 + b^2
    const finalDivider = (complexDivider.re ** 2) + (complexDivider.im ** 2);

    return new ComplexNumber({
      re: finalDivident.re / finalDivider,
      im: finalDivident.im / finalDivider,
    });
  }

  getRadius() {
    return Math.sqrt((this.re ** 2) + (this.im ** 2));
  }

  radianToDegree(radian) {
    return radian * (180 / Math.PI);
  }

  getPhase(inRadians = true) {
    let phase = Math.atan(Math.abs(this.im) / Math.abs(this.re));

    if (this.re < 0 && this.im > 0) {
      phase = Math.PI - phase;
    } else if (this.re < 0 && this.im < 0) {
      phase = -(Math.PI - phase);
    } else if (this.re > 0 && this.im < 0) {
      phase = -phase;
    } else if (this.re === 0 && this.im > 0) {
      phase = Math.PI / 2;
    } else if (this.re === 0 && this.im < 0) {
      phase = -Math.PI / 2;
    } else if (this.re < 0 && this.im === 0) {
      phase = Math.PI;
    } else if (this.re > 0 && this.im === 0) {
      phase = 0;
    } else if (this.re === 0 && this.im === 0) {
      // More correctly would be to set 'indeterminate'.
      // But just for simplicity reasons let's set zero.
      phase = 0;
    }

    if (!inRadians) {
      phase = this.radianToDegree(phase);
    }

    return phase;
  }

  getPolarForm(inRadians = true) {
    return {
      radius: this.getRadius(),
      phase: this.getPhase(inRadians),
    };
  }
}
