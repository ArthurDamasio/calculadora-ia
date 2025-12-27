import React, { useState } from 'react';

interface AIInputProps {
    onClose: () => void;
    onSolve: (prompt: string) => void;
    isLoading: boolean;
}

const AIInput: React.FC<AIInputProps> = ({ onClose, onSolve, isLoading }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim() && !isLoading) {
            onSolve(prompt);
        }
    };

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            borderRadius: '24px',
            padding: '1.5rem'
        }}>
            <div className="glass-panel" style={{
                padding: '2rem',
                width: '100%',
                maxWidth: '350px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                border: '1px solid var(--glass-highlight)'
            }}>
                <h2 style={{
                    margin: 0,
                    fontSize: '1.25rem',
                    background: 'var(--accent-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700,
                    textAlign: 'center'
                }}>
                    PERGUNTE À IA
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ex: Quanto é a raiz quadrada de 144 somada a 50?"
                        autoFocus
                        style={{
                            width: '100%',
                            minHeight: '100px',
                            padding: '1rem',
                            borderRadius: '12px',
                            border: '1px solid var(--glass-border)',
                            background: 'rgba(0, 0, 0, 0.2)',
                            color: 'var(--text-primary)',
                            fontFamily: 'inherit',
                            fontSize: '0.9rem',
                            resize: 'none',
                            outline: 'none',
                        }}
                    />

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: '12px',
                                border: '1px solid var(--glass-border)',
                                background: 'transparent',
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !prompt.trim()}
                            style={{
                                flex: 2,
                                padding: '0.75rem',
                                borderRadius: '12px',
                                border: 'none',
                                background: 'var(--accent-gradient)',
                                color: 'white',
                                cursor: (isLoading || !prompt.trim()) ? 'not-allowed' : 'pointer',
                                fontWeight: 700,
                                opacity: (isLoading || !prompt.trim()) ? 0.6 : 1,
                                transition: 'transform 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading && prompt.trim()) e.currentTarget.style.transform = 'scale(1.02)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            {isLoading ? 'Resolvendo...' : 'Resolver'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AIInput;
