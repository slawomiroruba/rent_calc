class Logger {
    constructor() {
        this.logDiv = document.getElementById('logDiv');
        this.resetLog();
        this.showLog();
    }

    resetLog() {
        this.logDiv.innerHTML = '';
    }

    hideLog() {
        this.logDiv.classList.add('hidden');
    }

    log(label, message) {
        let p = document.createElement('p');

        if (!message) {
            p.style.textAlign = 'center';
            p.style.color = 'red';
            p.textContent = label;
        } else {
            let strong = document.createElement('strong');
            strong.textContent = label;
            p.appendChild(strong);

            let span = document.createElement('span');

            // If the message is a string and ends with ' zł', format it as a currency
            if (typeof message === 'string' && message.endsWith(' zł')) {
                let number = parseFloat(message.replace(' zł', ''));
                span.textContent = number.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' });
            } else {
                span.textContent = message;
            }

            span.style.cssFloat = 'right'; // This makes the message float to the right
            p.appendChild(span);
        }

        this.logDiv.appendChild(p);
    }

    showLog() {
        const logDiv = document.getElementById('logDiv');
        logDiv.classList.remove('hidden');
    }
}

class CarValuePredictor {
    constructor(data, degree = 2) {
      this.data = data;
      this.degree = degree;
      this.points = this.prepareData(data);
      this.coefficients = this.generatePolynomialModel(this.points, degree);
    }
  
    prepareData(data) {
      return data.sort((a, b) => a[0] - b[0]);
    }
  
    generatePolynomialModel(points, degree) {
      const x = points.map(p => p[0]);
      const y = points.map(p => p[1]);
  
      const X = [];
      for (let i = 0; i < x.length; i++) {
        const row = [];
        for (let j = 0; j <= degree; j++) {
          row.push(Math.pow(x[i], j));
        }
        X.push(row);
      }
  
      const XT = math.transpose(X);
      const XTX = math.multiply(XT, X);
      const XTY = math.multiply(XT, y);
  
      const coefficients = math.lusolve(XTX, XTY);
      return coefficients.map(c => c[0]);
    }
  
    predict(months) {
      let predictedValue = 0;
  
      for (let i = 0; i <= this.degree; i++) {
        predictedValue += this.coefficients[i] * Math.pow(months, i);
      }
  
      if (predictedValue < 0) predictedValue = 0;
      if (months <= 0) predictedValue = 100;
  
      return predictedValue.toFixed(0);
    }
  }
  


function preparePoints(dataObject) {
    const data = Object.entries(dataObject).map(([key, value]) => [Number(key), value]);
    console.log(data);
    return data;
}