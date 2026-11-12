import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS } from '../data';

const QuestionBank = ({ questions }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('id');
  const [keyword, setKeyword] = useState('');

  const handleKeywordShift = (e) => setKeyword(e.target.value);

  const filters = [
    { key: 'all', label: 'Tất cả', count: questions.length },
    { key: 'main', label: 'Chính thức', count: questions.filter((q) => !q.reserve).length },
    { key: 'reserve', label: 'Dự bị', count: questions.filter((q) => q.reserve).length },
  ];

  const kw = keyword.trim().toLowerCase();
  const visible = questions
    .filter((q) => filter === 'all' || (filter === 'reserve' ? q.reserve : !q.reserve))
    .filter((q) => q.question.toLowerCase().includes(kw));

  const sorted = [...visible].sort((a, b) => {
    if (sortBy === 'asc') return a.level - b.level || a.id - b.id;
    if (sortBy === 'desc') return b.level - a.level || a.id - b.id;
    return a.id - b.id;
  });

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>
      <div className="toolbar">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`btn ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {`${f.label} (${f.count})`}
          </button>
        ))}
        <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="id">Theo số thứ tự</option>
          <option value="asc">Mức độ: Dễ → Khó</option>
          <option value="desc">Mức độ: Khó → Dễ</option>
        </select>
        <input
          className="input"
          placeholder="Tìm kiếm theo nội dung câu hỏi"
          value={keyword}
          onChange={handleKeywordShift}
        />
      </div>
      <p>{`Có ${sorted.length} câu hỏi`}</p>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mức độ</th>
            <th>Loại</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((q) => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{LEVELS[q.level]}</td>
              <td>{q.reserve ? 'Dự bị' : 'Chính thức'}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;
