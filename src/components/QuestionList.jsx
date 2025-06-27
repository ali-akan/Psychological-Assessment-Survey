import Question from './Question';
import questions from '../data/questions';

const QuestionList = ({ sectionKey }) => {
  return (
    <div>
      {questions.map((item, index) => {
        const id = typeof item === "string" ? `${index + 1}` : item.id;
        const text = typeof item === "string" ? item : item.text;
        return (
          <Question
            key={id}
            sectionKey={sectionKey}
            id={id}
            displayId={index + 1}
            text={text}
          />
        );
      })}
    </div>
  );
};


export default QuestionList;
