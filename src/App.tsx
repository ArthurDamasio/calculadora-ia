import { useState } from 'react';
import './App.css';
import Display from './components/Display';
import Keypad from './components/Keypad';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [expression, setExpression] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState<string | null>(null);

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplayValue(num);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForOperand) {
      setOperator(nextOperator);
      setExpression(expression.slice(0, -2) + ` ${nextOperator} `);
      return;
    }

    if (expression === '') {
      setExpression(`${displayValue} ${nextOperator} `);
    } else {
      setExpression(expression + `${displayValue} ${nextOperator} `);
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
  };

  const handleClear = () => {
    setDisplayValue('0');
    setExpression('');
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleCalculate = () => {
    if (!operator || waitingForOperand) return;

    try {
      // Nota: eval é usado aqui para simplicidade neste exemplo de UI, 
      // em produção seria recomendado um parser matemático seguro.
      const fullExpression = expression + displayValue;
      const result = eval(fullExpression);

      setDisplayValue(String(result));
      setExpression('');
      setOperator(null);
      setWaitingForOperand(true);
    } catch (error) {
      setDisplayValue('Error');
    }
  };

  const handleAI = () => {
    alert('Integração com IA em breve!');
  };

  return (
    <div className="glass-panel" style={{
      padding: '2rem',
      width: '100%',
      maxWidth: '400px',
    }}>
      <h1 style={{
        fontSize: '1.5rem',
        margin: '0 0 1.5rem 0',
        background: 'var(--accent-gradient)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 700,
        textAlign: 'center'
      }}>
        AI CALCULATOR
      </h1>

      <Display value={displayValue} expression={expression} />

      <Keypad
        onNumber={handleNumber}
        onOperator={handleOperator}
        onClear={handleClear}
        onCalculate={handleCalculate}
        onAI={handleAI}
      />
    </div>
  );
}

export default App;
