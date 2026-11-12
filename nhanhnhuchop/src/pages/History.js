import { renderStars, TOTAL_QUESTIONS } from '../utils';

const History = ({ history, onDelete, onClear }) => {
  const sorted = [...history].sort(
    (a, b) => b.score - a.score || b.correctCount - a.correctCount
  );
  const count = history.length;
  const totalScore = history.reduce((sum, h) => sum + h.score, 0);
  const totalCorrect = history.reduce((sum, h) => sum + h.correctCount, 0);
  const average = count ? Math.round(totalScore / count) : 0;
  const rate = count ? Math.round((totalCorrect / (TOTAL_QUESTIONS * count)) * 100) : 0;

  return (
    <div>
      <h2>Lịch sử</h2>
      {count === 0 ? (
        <p>Chưa có lượt chơi nào.</p>
      ) : (
        <div>
          <p>{`Số lượt chơi: ${count}`}</p>
          <p>{`Điểm trung bình: ${average}`}</p>
          <p>{`Tỉ lệ trả lời đúng: ${rate}%`}</p>
          <div className="toolbar">
            <button className="btn" onClick={onClear}>Xóa lịch sử</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Người chơi</th>
                <th>Số câu đúng</th>
                <th>Xếp loại</th>
                <th>Điểm</th>
                <th>Thời gian</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((h) => (
                <tr key={h.id}>
                  <td>{h.name}</td>
                  <td>{h.correctCount}</td>
                  <td>{renderStars(h.stars)}</td>
                  <td>{h.score}</td>
                  <td>{h.playedAt}</td>
                  <td>
                    <button className="btn" onClick={() => onDelete(h.id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
