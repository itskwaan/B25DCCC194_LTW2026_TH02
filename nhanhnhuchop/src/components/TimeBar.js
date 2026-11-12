import { TIME_PER_QUESTION } from '../data';

const TimeBar = ({ timeLeft, frozen }) => {
  const percent = Math.max(0, (timeLeft / TIME_PER_QUESTION) * 100);
  return (
    <div>
      <div className="timebar-text">
        {frozen ? `Còn ${timeLeft} giây (đã dừng)` : `Còn ${timeLeft} giây`}
      </div>
      <div className="timebar-track">
        <div
          className="timebar-fill"
          style={{ width: `${percent}%`, background: timeLeft <= 5 ? '#e53935' : '#4caf50' }}
        />
      </div>
    </div>
  );
};

export default TimeBar;
