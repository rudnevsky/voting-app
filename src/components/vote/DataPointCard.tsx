import React from 'react';
// import Tag from '../common/Tag';

const issuerIcons: Record<string, string> = {
  BUILD: 'https://placehold.co/40x40?text=B', // Replace with real icon URLs or use emoji
  Github: 'https://placehold.co/40x40?text=GH',
  Twitter: 'https://placehold.co/40x40?text=T',
  ENS: 'https://placehold.co/40x40?text=E',
};

type DataPointCardProps = {
  name: string;
  issuer: string;
  points: number;
  description: string;
  totalVotes?: number;
  onVote?: () => void;
  userVotes?: number;
  showUserVotes?: boolean;
};

const DataPointCard: React.FC<DataPointCardProps> = ({ name, issuer, points, description, totalVotes, onVote, userVotes, showUserVotes }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 12px #0001',
    padding: 24,
    gap: 18,
    margin: '0 0 16px 0',
    minWidth: 0,
    position: 'relative',
  }}>
    {/* Icon */}
    <div style={{ width: 40, height: 40, marginRight: 10, flexShrink: 0 }}>
      <img src={issuerIcons[issuer] || issuerIcons.BUILD} alt={issuer} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', background: '#f5f5f5' }} />
    </div>
    {/* Main content */}
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: 22, color: '#222', lineHeight: 1, marginBottom: 4 }}>{name}</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          <span style={{ background: '#f3f3f3', color: '#222', borderRadius: 16, padding: '2px 12px', fontSize: 14, fontWeight: 500 }}>{issuer}</span>
          <span style={{ background: '#f3f3f3', color: '#222', borderRadius: 16, padding: '2px 12px', fontSize: 14, fontWeight: 500 }}>{points} pts</span>
        </div>
        <div style={{ color: '#666', fontSize: 16, marginBottom: 18 }}>{description}</div>
        {showUserVotes && typeof userVotes === 'number' && userVotes > 0 && (
          <div style={{ color: '#888', fontWeight: 500, fontSize: 15, marginBottom: 0 }}>My Votes</div>
        )}
        {showUserVotes && typeof userVotes === 'number' && userVotes > 0 && (
          <div style={{ fontWeight: 700, fontSize: 28, color: '#222', marginBottom: 0 }}>{userVotes.toLocaleString()}</div>
        )}
        {!showUserVotes && (
          <>
            <div style={{ color: '#888', fontWeight: 500, fontSize: 15, marginBottom: 0 }}>Total Votes</div>
            <div style={{ fontWeight: 700, fontSize: 32, color: '#222', marginBottom: 0 }}>{totalVotes?.toLocaleString()}</div>
          </>
        )}
      </div>
      {/* Vote button at bottom right */}
      {onVote && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <button
            onClick={onVote}
            style={{
              background: '#6C38E8',
              border: 'none',
              color: '#fff',
              borderRadius: 20,
              fontWeight: 600,
              fontSize: 18,
              padding: '8px 28px',
              boxShadow: '0 2px 8px #6C38E822',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Vote
          </button>
        </div>
      )}
    </div>
  </div>
);

export default DataPointCard;
