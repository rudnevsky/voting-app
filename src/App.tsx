import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
// import { useAccount, useConnect, useSignMessage } from "wagmi";
import DataPointCard from './components/vote/DataPointCard';
import VoteTabs from './components/vote/VoteTabs';
import Timer from './components/common/Timer';
import VoteModal from './components/vote/VoteModal';
import { useUser } from './hooks/UserContext';

function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // Top-level tab: 'vote' or 'my-votes'
  const [mainTab, setMainTab] = useState<'vote' | 'my-votes'>('vote');
  // Status tab: 'voting', 'to-launch', 'launched'
  const [activeTab, setActiveTab] = useState('voting');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState(0);
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null);

  // Use user context
  const { user, dataPoints, voteForDataPoint, redeemVotes, totalVotingPower, available, locked } = useUser();

  // Filter data points by tab
  const filteredDataPoints = dataPoints.filter(dp => {
    if (mainTab === 'vote') {
      if (activeTab === 'voting') return dp.status === 'voting';
      if (activeTab === 'to-launch') return dp.status === 'to-launch';
      if (activeTab === 'launched') return dp.status === 'launched';
    } else {
      // My Votes: only show data points user has voted for
      if (dp.userVotes && dp.userVotes > 0) {
        if (activeTab === 'voting') return dp.status === 'voting';
        if (activeTab === 'to-launch') return dp.status === 'to-launch';
        if (activeTab === 'launched') return dp.status === 'launched';
      }
    }
    return false;
  });

  // Handler to open modal for a data point
  const handleOpenModal = (dp: any) => {
    setSelectedDataPoint(dp);
    setModalValue(dp.userVotes || 0);
    setModalOpen(true);
  };

  // Handler for voting in modal
  const handleVote = () => {
    if (selectedDataPoint) {
      voteForDataPoint(selectedDataPoint.id, modalValue);
      setModalOpen(false);
    }
  };

  // Handler for redeeming in modal
  const handleRedeem = () => {
    if (selectedDataPoint) {
      redeemVotes(selectedDataPoint.id, modalValue);
      setModalOpen(false);
    }
  };

  // Modal logic for max and redeem
  const currentUserVotes = selectedDataPoint?.userVotes || 0;
  const modalMax = available + currentUserVotes;
  const canRedeem = modalValue < currentUserVotes;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 16, background: '#fafafa', borderRadius: 16, border: '4px solid #222', minHeight: '100vh' }}>
      {/* Top-level tabs */}
      <div style={{ display: 'flex', gap: 0, fontSize: 32, fontWeight: 700, marginBottom: 8, borderRadius: 12, overflow: 'hidden', background: '#f7f7f7', border: '1px solid #eee' }}>
        <span
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '8px 0',
            borderBottom: mainTab === 'vote' ? '4px solid #6C38E8' : '4px solid transparent',
            color: mainTab === 'vote' ? '#222' : '#888',
            background: mainTab === 'vote' ? '#fff' : '#f7f7f7',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onClick={() => setMainTab('vote')}
        >
          Vote
        </span>
        <span
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '8px 0',
            borderBottom: mainTab === 'my-votes' ? '4px solid #6C38E8' : '4px solid transparent',
            color: mainTab === 'my-votes' ? '#222' : '#888',
            background: mainTab === 'my-votes' ? '#fff' : '#f7f7f7',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onClick={() => setMainTab('my-votes')}
        >
          My Votes
        </span>
      </div>

      {/* Voting Power Breakdown (My Votes tab) */}
      {mainTab === 'my-votes' && (
        <div style={{ margin: '24px 0 12px 0', padding: 0 }}>
          <div style={{ fontSize: 17, color: '#222', marginBottom: 4 }}>Your Builder Score <span style={{ float: 'right', fontWeight: 700 }}>{user.builderScore}</span></div>
          <div style={{ fontSize: 17, color: '#222', marginBottom: 4 }}>Your $TALENT Holdings <span style={{ float: 'right', fontWeight: 700 }}>{user.talentHoldings.toLocaleString()}</span></div>
          <div style={{ fontSize: 17, color: '#222', marginBottom: 8 }}>Your Total Voting Power <span style={{ float: 'right', fontWeight: 700, color: '#6C38E8' }}>{totalVotingPower}</span></div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 18, fontSize: 15, color: '#222', marginBottom: 12 }}>
            <span><span style={{ fontSize: 18, color: '#6C38E8', marginRight: 4 }}>●</span> Available {available}</span>
            <span><span style={{ fontSize: 18, color: '#888', marginRight: 4 }}>●</span> Locked {locked}</span>
          </div>
          <div style={{ background: '#f3f3f3', borderRadius: 12, padding: '12px 16px', fontSize: 15, color: '#666', marginBottom: 12, fontWeight: 500 }}>
            Total Voting Power = Builder Score + $TALENT Holdings
          </div>
        </div>
      )}

      {/* Voting round timer (Vote tab) */}
      {mainTab === 'vote' && (
        <div style={{ margin: '16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18, color: '#555' }}>🕒 Current voting round</span>
          <span style={{ background: '#eee', borderRadius: 12, padding: '2px 12px', fontSize: 16, color: '#555' }}>
            ends in <Timer seconds={3 * 24 * 60 * 60} />
          </span>
        </div>
      )}

      {/* Status tabs */}
      <VoteTabs active={activeTab} onChange={setActiveTab} />

      {/* Data Point Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {filteredDataPoints.map((dp, i) => (
          <DataPointCard key={i} {...dp} onVote={() => handleOpenModal(dp)} showUserVotes={mainTab === 'my-votes'} />
        ))}
      </div>

      {/* Vote Modal */}
      {selectedDataPoint && (
        <VoteModal
          isOpen={modalOpen}
          dataPointName={selectedDataPoint.name}
          value={modalValue}
          max={modalMax}
          available={available}
          onChange={setModalValue}
          onVote={handleVote}
          onRedeem={handleRedeem}
          onClose={() => setModalOpen(false)}
          canRedeem={canRedeem}
        />
      )}
    </div>
  );
}

export default App;
