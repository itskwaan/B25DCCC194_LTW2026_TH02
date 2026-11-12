import { useState, useEffect, useMemo, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Countdown from '../components/Countdown';
import QuestionCard from '../components/QuestionCard';
import TimeBar from '../components/TimeBar';
import ScorePanel from '../components/ScorePanel';
import PowerUps from '../components/PowerUps';
import { TIME_PER_QUESTION } from '../data';
import { calcPoints, calcTotal, getStars, TOTAL_QUESTIONS } from '../utils';

const Game = ({ questions, playerName, addHistory }) => {
  const navigate = useNavigate();
  const mainQuestions = useMemo(
    () => questions.filter((q) => !q.reserve).sort((a, b) => a.id - b.id),
    [questions]
  );

  const [status, setStatus] = useState('countdown');
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [answers, setAnswers] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [cursor, setCursor] = useState(0);
  const [gain, setGain] = useState(null);
  const [swapped, setSwapped] = useState({});
  const [used, setUsed] = useState({ swap: false, double: false, freeze: false });
  const [doubleActive, setDoubleActive] = useState(false);
  const [frozen, setFrozen] = useState(false);

  const current = swapped[index] || mainQuestions[index];
  const correctCount = answers.filter((a) => a.correct).length;
  const score = calcTotal(answers);

  const handleCountdownDone = useCallback(() => setStatus('answering'), []);

  const reveal = useCallback(
    (chosenIdx) => {
      const correct = chosenIdx === current.answer;
      let points = correct ? calcPoints(current, timeLeft) : 0;
      if (correct && doubleActive) points *= 2;
      setAnswers((prev) => [
        ...prev,
        {
          id: current.id,
          number: index + 1,
          chosen: chosenIdx,
          answerIdx: current.answer,
          correct,
          timeLeft,
          points,
          swapped: current.id !== mainQuestions[index].id,
        },
      ]);
      setChosen(chosenIdx);
      setGain(correct ? points : null);
      setStatus('revealed');
    },
    [current, timeLeft, doubleActive, index, mainQuestions]
  );

  const handleChoose = useCallback(
    (i) => {
      if (status === 'answering') reveal(i);
    },
    [status, reveal]
  );

  useEffect(() => {
    if (status === 'answering' && timeLeft <= 0) reveal(null);
  }, [status, timeLeft, reveal]);

  useEffect(() => {
    if (status !== 'answering' || frozen) return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [status, index, frozen]);

  useEffect(() => {
    if (status !== 'revealed') return;
    const id = setTimeout(() => {
      if (index + 1 >= TOTAL_QUESTIONS) {
        const total = calcTotal(answers);
        const correctTotal = answers.filter((a) => a.correct).length;
        addHistory({
          id: Date.now(),
          name: playerName,
          score: total,
          correctCount: correctTotal,
          stars: getStars(correctTotal).stars,
          playedAt: new Date().toLocaleString('vi-VN'),
        });
        navigate('/result', {
          replace: true,
          state: { name: playerName, answers, score: total, correctCount: correctTotal },
        });
      } else {
        setIndex(index + 1);
        setTimeLeft(TIME_PER_QUESTION);
        setChosen(null);
        setGain(null);
        setCursor(0);
        setDoubleActive(false);
        setFrozen(false);
        setStatus('answering');
      }
    }, 1500);
    return () => clearTimeout(id);
  }, [status, index, answers, playerName, addHistory, navigate]);

  useEffect(() => {
    const handleKey = (e) => {
      if (status !== 'answering') return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCursor((c) => (c % 2 === 1 ? c - 1 : c));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCursor((c) => (c % 2 === 0 ? c + 1 : c));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCursor((c) => (c >= 2 ? c - 2 : c));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCursor((c) => (c < 2 ? c + 2 : c));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleChoose(cursor);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [status, cursor, handleChoose]);

  useEffect(() => {
    document.title = `Câu ${index + 1}/${TOTAL_QUESTIONS} – đúng ${correctCount} câu`;
    return () => {
      document.title = 'Nhanh như chớp';
    };
  }, [index, correctCount]);

  const handleSwap = () => {
    const reserve = questions.find((q) => q.reserve && q.level === current.level);
    if (!reserve) return;
    setSwapped({ ...swapped, [index]: reserve });
    setTimeLeft(TIME_PER_QUESTION);
    setUsed({ ...used, swap: true });
  };

  const handleDouble = () => {
    setDoubleActive(true);
    setUsed({ ...used, double: true });
  };

  const handleFreeze = () => {
    setFrozen(true);
    setUsed({ ...used, freeze: true });
  };

  if (status === 'countdown') return <Countdown onDone={handleCountdownDone} />;

  const getState = (i) => {
    if (status !== 'revealed') return 'normal';
    if (i === current.answer) return 'correct';
    if (i === chosen) return 'wrong';
    return 'normal';
  };

  return (
    <div>
      <ScorePanel score={score} correctCount={correctCount} gain={gain} />
      <TimeBar timeLeft={timeLeft} frozen={frozen} />
      <QuestionCard
        number={index + 1}
        question={current}
        getState={getState}
        cursor={cursor}
        disabled={status !== 'answering'}
        onChoose={handleChoose}
      />
      <PowerUps
        used={used}
        doubleActive={doubleActive}
        disabled={status !== 'answering'}
        onSwap={handleSwap}
        onDouble={handleDouble}
        onFreeze={handleFreeze}
      />
    </div>
  );
};

const Play = ({ questions, playerName, addHistory }) =>
  playerName.trim() ? (
    <Game questions={questions} playerName={playerName} addHistory={addHistory} />
  ) : (
    <Navigate to="/" replace />
  );

export default Play;
