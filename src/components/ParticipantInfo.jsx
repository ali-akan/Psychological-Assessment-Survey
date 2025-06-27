import styles from './ParticipantInfo.module.css';
import useSurveyStore from '../store/surveyStore';

const ParticipantInfo = () => {
  const { name,  setName } = useSurveyStore();

  return (
    <div className={styles.infoGroup}>
      <div>
        <label className={styles.lab}>Ad Soyad: </label>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Adınızı giriniz"
        />
      </div>

    </div>
  );
};

export default ParticipantInfo;
