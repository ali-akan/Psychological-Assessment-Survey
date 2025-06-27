import styles from './Description.module.css';

const Description = () => {
  return (
    <div className={styles.description}>
      <p>
        Aşağıda sizinle ilgili olabilecek bazı kişilik özellikleri sıralanmıştır.
        Örneğin, “Başkalarıyla vakit geçirmeyi severim” ifadesi sizin için ne kadar geçerli?
      </p>
      
      <p>
        Lütfen her bir ifadeye, ne ölçüde katıldığınızı belirtin.
      </p>

      <p>
        Değerlendirme için aşağıdaki ölçeği kullanınız:
      </p>

      <ul className={styles.scale}>
        <li>1 – Kesinlikle katılmıyorum</li>
        <li>2 – Katılmıyorum</li>
        <li>3 – Ne katılıyorum ne katılmıyorum</li>
        <li>4 – Katılıyorum</li>
        <li>5 – Kesinlikle katılıyorum</li>
      </ul>

      <p><strong>Kendimi şu şekilde biri olarak görüyorum...</strong></p>
    </div>
  );
};

export default Description;
