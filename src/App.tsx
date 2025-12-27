import { useState } from 'react';
import './App.css';
import Display from './components/Display';
import Keypad from './components/Keypad';

function App() {
  // Estados para gerenciar a lógica da calculadora
  const [displayValue, setDisplayValue] = useState('0');
  const [expression, setExpression] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState<string | null>(null);

  /**
   * Manipula a entrada de números
   */

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplayValue(num);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
    }
  };

  /**
   * Manipula a entrada de operadores (+, -, *, /).
   * Atualiza a expressão e o operador pendente.
   */
  const handleOperator = (nextOperator: string) => {

    // Se já houver um operador e estiver esperando um operando, substitui o operador atual
    if (operator && waitingForOperand) {
      setOperator(nextOperator);
      // Remove o operador anterior da expressão e adiciona o novo
      setExpression(expression.slice(0, -2) + ` ${nextOperator} `);
      return;
    }

    // Constrói a expressão
    if (expression === '') {
      setExpression(`${displayValue} ${nextOperator} `);
    } else {
      // Adiciona o valor atual e o novo operador à expressão existente
      setExpression(expression + `${displayValue} ${nextOperator} `);
    }

    setOperator(nextOperator); // Define o novo operador
    setWaitingForOperand(true); // Indica que está esperando o próximo operando
  };

  /**
   * Limpa todos os estados da calculadora, resetando-a para o estado inicial.
   */
  const handleClear = () => {
    setDisplayValue('0');
    setExpression('');
    setOperator(null);
    setWaitingForOperand(false);
  };

  /**
   * Realiza o cálculo da expressão atual.
   * Usa `eval` para avaliar a expressão completa.
   */
  const handleCalculate = () => {
    // Não calcula se não houver operador ou se estiver esperando um operando
    if (!operator || waitingForOperand) return;

    try {
      // Nota: eval é usado aqui para simplicidade neste exemplo de UI, 
      // em produção seria recomendado um parser matemático seguro.
      const fullExpression = expression + displayValue; // Constrói a expressão completa
      const result = eval(fullExpression); // Avalia a expressão

      setDisplayValue(String(result)); // Exibe o resultado
      setExpression(''); // Limpa a expressão
      setOperator(null); // Limpa o operador
      setWaitingForOperand(true); // Prepara para uma nova operação ou entrada
    } catch (error) {
      setDisplayValue('Error'); // Exibe 'Error' em caso de falha no cálculo
    }
  };

  /**
   * Função de demonstração para a funcionalidade de IA.
   */
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

      {/* Componente Display para mostrar o valor atual e a expressão */}
      <Display value={displayValue} expression={expression} />

      {/* Componente Keypad para os botões da calculadora */}
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
