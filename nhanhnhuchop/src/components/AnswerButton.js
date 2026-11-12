const AnswerButton = ({ letter, text, state, focused, disabled, onClick }) => (
  <button
    className={`answer-btn ${state} ${focused ? 'focused' : ''}`}
    disabled={disabled}
    onClick={onClick}
  >
    {`${letter}. ${text}`}
  </button>
);

export default AnswerButton;
