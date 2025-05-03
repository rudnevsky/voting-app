import React from 'react';

type VoteModalProps = {
  isOpen: boolean;
  dataPointName: string;
  value: number;
  max: number;
  available: number;
  locked: number;
  onChange: (value: number) => void;
  onVote: () => void;
  onRedeem: () => void;
  onClose: () => void;
  canRedeem?: boolean;
};

const VoteModal: React.FC<VoteModalProps> = ({ isOpen, dataPointName, value, max, available, locked, onChange, onVote, onRedeem, onClose, canRedeem }) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 340, maxWidth: 400, width: '100%', boxShadow: '0 4px 32px #0002', position: 'relative', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <span style={{ fontWeight: 700, fontSize: 22 }}>
            Vote for <span style={{ color: '#6C38E8' }}>{dataPointName}</span>
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, color: '#888', cursor: 'pointer', marginLeft: 12 }}>&times;</button>
        </div>
        {/* Input and Max */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <input
            type="number"
            min={0}
            max={max}
            value={value}
            onChange={e => onChange(Math.max(0, Math.min(max, Number(e.target.value))))}
            style={{ width: 70, fontSize: 20, fontWeight: 600, border: '1px solid #eee', borderRadius: 10, padding: '8px 0', textAlign: 'center', marginRight: 16, background: '#fafafa' }}
          />
          <div style={{ flex: 1, textAlign: 'right', color: '#888', fontSize: 16, fontWeight: 500 }}>
            <span style={{ cursor: 'pointer', color: '#6C38E8', fontWeight: 600 }} onClick={() => onChange(max)}>Max</span> / {max}
          </div>
        </div>
        {/* Slider */}
        <input
          type="range"
          min={0}
          max={max}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#6C38E8', marginBottom: 0, marginTop: 0, height: 4 }}
        />
        {/* 0% and 100% labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#888', marginBottom: 16, marginTop: 2 }}>
          <span>0</span>
          <span>100%</span>
        </div>
        {/* Available and Locked */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', fontSize: 15, color: '#222', marginBottom: 24 }}>
          <span><span style={{ fontSize: 18, color: '#6C38E8', marginRight: 4 }}>●</span> Available {available}</span>
        </div>
        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={onRedeem}
            disabled={!canRedeem}
            style={{
              flex: 1,
              background: canRedeem ? '#ffeaea' : '#fafafa',
              border: canRedeem ? '1.5px solid #e74c3c' : '1.5px solid #eee',
              color: canRedeem ? '#e74c3c' : '#222',
              borderRadius: 14,
              fontWeight: 600,
              fontSize: 18,
              padding: '12px 0',
              cursor: canRedeem ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s',
              opacity: canRedeem ? 1 : 0.7,
            }}
          >
            Redeem
          </button>
          <button
            onClick={onVote}
            style={{
              flex: 1,
              background: '#6C38E8',
              border: 'none',
              color: '#fff',
              borderRadius: 14,
              fontWeight: 600,
              fontSize: 18,
              padding: '12px 0',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteModal;
