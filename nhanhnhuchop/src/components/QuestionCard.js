import AnswerButton from './AnswerButton';
import { LEVELS, LETTERS } from '../data';
import { TOTAL_QUESTIONS } from '../utils';

const QuestionCard = ({ number, question, getState, cursor, disabled, onChoose }) => (
  <div>
    <div>{`Câu ${number}/${TOTAL_QUESTIONS} · ${LEVELS[question.level]}`}</div>
    <div className="question-text">{question.question}</div>
    <div className="answer-grid">
      {question.options.map((opt, i) => (
        <AnswerButton
          key={i}
          letter={LETTERS[i]}
          text={opt}
          state={getState(i)}
          focused={!disabled && cursor === i}
          disabled={disabled}
          onClick={() => onChoose(i)}
        />
      ))}
    </div>
  </div>
);

export default QuestionCard;
