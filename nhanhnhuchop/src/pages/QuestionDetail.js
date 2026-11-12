import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, LETTERS } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAnswer, setShowAnswer] = useState(false);
  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <div>
        <p>Không tìm thấy câu hỏi</p>
        <button className="btn" onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{`Câu hỏi số ${question.id} – ${LEVELS[question.level]} · ${question.reserve ? 'Dự bị' : 'Chính thức'}`}</h2>
      <p>{question.question}</p>
      {question.options.map((opt, i) => {
        const isRight = showAnswer && i === question.answer;
        return (
          <div key={i} className={`answer-row ${isRight ? 'correct' : ''}`}>
            {`${LETTERS[i]}. `}{opt}{isRight && ' (Đáp án đúng)'}
          </div>
        );
      })}
      {showAnswer && <p>{`Giải thích: ${question.explain}`}</p>}
      <div className="toolbar">
        <button className="btn primary" onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
        </button>
        <button className="btn" onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    </div>
  );
};

export default QuestionDetail;
