const ScorePanel = ({ score, correctCount, gain }) => (
  <div className="score-panel">
    <div>{`Điểm: ${score}`}</div>
    <div>{`Số câu đúng: ${correctCount}`}</div>
    {gain !== null && <div className="gain">{`+${gain} điểm`}</div>}
  </div>
);

export default ScorePanel;
