import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName, history }) => {
  const navigate = useNavigate();
  const best = history.reduce((top, h) => (top === null || h.score > top.score ? h : top), null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    setPlayerName(playerName.trim());
    navigate('/play');
  };

  return (
    <div>
      <h1>Nhanh như chớp</h1>
      <ul>
        <li>Trả lời 15 câu hỏi về HTML, CSS, JavaScript và React, mỗi câu 15 giây.</li>
        <li>Trả lời sai hoặc hết giờ không bị loại, chỉ được 0 điểm cho câu đó.</li>
        <li>Trả lời đúng được điểm theo mức độ, cộng thêm 10 điểm cho mỗi giây còn lại.</li>
        <li>Có 3 quyền trợ giúp: Đổi câu hỏi, Nhân đôi, Dừng giờ, mỗi quyền dùng một lần.</li>
      </ul>
      {best && <p>{`Kỷ lục: ${best.score} điểm – ${best.name}`}</p>}
      <form className="toolbar" onSubmit={handleSubmit}>
        <label htmlFor="player-name">Tên người chơi</label>
        <input
          id="player-name"
          className="input"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button className="btn primary" type="submit" disabled={!playerName.trim()}>
          Bắt đầu
        </button>
      </form>
    </div>
  );
};

export default Home;
