import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LETTERS } from '../data';
import { getStars, renderStars, TOTAL_QUESTIONS } from '../utils';

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <Navigate to="/" replace />;

  const { name, answers, score, correctCount } = state;
  const rank = getStars(correctCount);

  return (
    <div>
      <h2>{rank.message}</h2>
      <p>{`Người chơi: ${name}`}</p>
      <p>{`Số câu trả lời đúng: ${correctCount}/${TOTAL_QUESTIONS}`}</p>
      <p>{`Điểm: ${score}`}</p>
      <p>
        {`Xếp loại: ${rank.stars} sao `}
        <span className="stars">{renderStars(rank.stars)}</span>
      </p>
      <h3>Xem lại</h3>
      <table>
        <thead>
          <tr>
            <th>Câu</th>
            <th>Bạn chọn</th>
            <th>Đáp án đúng</th>
            <th>Còn lại</th>
            <th>Điểm</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((a) => (
            <tr key={a.number} className={a.correct ? 'row-correct' : 'row-wrong'}>
              <td>{a.swapped ? `Câu ${a.number} (đổi sang câu ${a.id})` : `Câu ${a.number}`}</td>
              <td>{a.chosen === null ? '—' : LETTERS[a.chosen]}</td>
              <td>{LETTERS[a.answerIdx]}</td>
              <td>{`${a.timeLeft} giây`}</td>
              <td>{a.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="toolbar" style={{ marginTop: 16 }}>
        <button className="btn primary" onClick={() => navigate('/play')}>Chơi lại</button>
        <button className="btn" onClick={() => navigate('/')}>Về trang chủ</button>
      </div>
    </div>
  );
};

export default Result;
