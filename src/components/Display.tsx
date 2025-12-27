import React from 'react';

// Props do componente Display
interface DisplayProps {
  // Valor principal exibido (o resultado ou número atual)
  value: string;
  // Expressão matemática completa sendo construída
  expression: string;
}

/**
 * Componente Display: Exibe a expressão atual e o valor principal.
 */
const Display: React.FC<DisplayProps> = ({ value, expression }) => {
  return (
    <div className="glass-panel" style={{
      marginBottom: '1.5rem',
      padding: '1.5rem',
      textAlign: 'right',
      background: 'rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      {/* Exibição da expressão (histórico) */}
      <div style={{
        color: 'var(--text-secondary)',
        fontSize: '1rem',
        minHeight: '1.5rem',
        marginBottom: '0.5rem',
        fontFamily: 'monospace'
      }}>
        {expression}
      </div>
      {/* Exibição do valor atual/resultado */}
      <div style={{
        color: 'var(--text-primary)',
        fontSize: '3.5rem',
        fontWeight: 600,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {value}
      </div>
    </div>
  );
};

export default Display;
