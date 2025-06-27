import styles from './Question.module.css';
import useSurveyStore from '../store/surveyStore';

const Question = ({ sectionKey, id, displayId, text }) => {
  const { answers, setAnswer } = useSurveyStore();
  const currentValue = answers[sectionKey][id] || 0;

  return (
    <div className={styles.question}>
      <p className={styles.questionText}>{displayId}. {text}</p>
      <div className={styles.options}>
        {[1, 2, 3, 4, 5].map(option => (
          <label key={option}>
            <input
              type="radio"
              name={`${sectionKey}-${id}`} // her anket unique olsun diye
              value={option}
              checked={currentValue === option}
              onChange={() => setAnswer(sectionKey, id, option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;
