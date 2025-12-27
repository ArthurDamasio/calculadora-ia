import React from 'react';

interface KeypadProps {
    onNumber: (num: string) => void;
    onOperator: (op: string) => void;
    onClear: () => void;
    onCalculate: () => void;
    onAI: () => void;
}

/**
 * Componente Keypad: Responsável por renderizar todos os botões da calculadora.
 * Gerencia a renderização em grid e as ações de clique.
 */
const Keypad: React.FC<KeypadProps> = ({ onNumber, onOperator, onClear, onCalculate, onAI }) => {
    // Definição de todos os botões e suas respectivas ações
    const buttons = [
        { label: 'C', action: onClear, type: 'special' },
        { label: 'AI', action: onAI, type: 'ai' },
        { label: '/', action: () => onOperator('/'), type: 'operator' },
        { label: '*', action: () => onOperator('*'), type: 'operator' },
        { label: '7', action: () => onNumber('7'), type: 'number' },
        { label: '8', action: () => onNumber('8'), type: 'number' },
        { label: '9', action: () => onNumber('9'), type: 'number' },
        { label: '-', action: () => onOperator('-'), type: 'operator' },
        { label: '4', action: () => onNumber('4'), type: 'number' },
        { label: '5', action: () => onNumber('5'), type: 'number' },
        { label: '6', action: () => onNumber('6'), type: 'number' },
        { label: '+', action: () => onOperator('+'), type: 'operator' },
        { label: '1', action: () => onNumber('1'), type: 'number' },
        { label: '2', action: () => onNumber('2'), type: 'number' },
        { label: '3', action: () => onNumber('3'), type: 'number' },
        { label: '=', action: onCalculate, type: 'calculate' },
        { label: '0', action: () => onNumber('0'), type: 'number', double: true },
        { label: '.', action: () => onNumber('.'), type: 'number' },
    ];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem',
            marginTop: '1rem'
        }}>
            {buttons.map((btn, index) => (
                <button
                    key={index}
                    onClick={btn.action}
                    style={{
                        gridColumn: btn.double ? 'span 2' : 'span 1',
                        padding: '1.25rem',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        borderRadius: '16px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: btn.type === 'operator' ? 'rgba(129, 140, 248, 0.2)' :
                            btn.type === 'calculate' ? 'var(--accent-gradient)' :
                                btn.type === 'ai' ? 'rgba(244, 114, 182, 0.2)' :
                                    'rgba(255, 255, 255, 0.05)',
                        color: btn.type === 'calculate' ? 'white' : 'var(--text-primary)',
                        backdropFilter: 'blur(5px)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.background = btn.type === 'calculate' ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.background = btn.type === 'operator' ? 'rgba(129, 140, 248, 0.2)' :
                            btn.type === 'calculate' ? 'var(--accent-gradient)' :
                                btn.type === 'ai' ? 'rgba(244, 114, 182, 0.2)' :
                                    'rgba(255, 255, 255, 0.05)';
                    }}
                >
                    {btn.label}
                </button>
            ))}
        </div>
    );
};

export default Keypad;
