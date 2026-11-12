const PowerUps = ({ used, doubleActive, disabled, onSwap, onDouble, onFreeze }) => (
  <div className="powerups">
    <button className="btn" disabled={disabled || used.swap} onClick={onSwap}>
      Đổi câu hỏi
    </button>
    <button className="btn" disabled={disabled || used.double} onClick={onDouble}>
      {doubleActive ? 'Đang nhân đôi' : 'Nhân đôi'}
    </button>
    <button className="btn" disabled={disabled || used.freeze} onClick={onFreeze}>
      Dừng giờ
    </button>
  </div>
);

export default PowerUps;
