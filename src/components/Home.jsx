import React from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import useSurveyStore from "../store/surveyStore";
import logo from "../assets/logo.png";

function Home() {
  const { name, setName } = useSurveyStore();

  return (
    <div className={classes.box}>
      <img
        className={classes.logo}
        alt="Two people looking at each other with EEG connected"
        src={logo}
      />
      <h1>KDD Deneyi Psikolojik Değerlendirme Aşaması</h1>

      <p>
        Merhaba, bu çalışmanın ilk aşamasında size birkaç psikolojik
        değerlendirme testi sunulacaktır. Bu testler sırasıyla:
      </p>

      <ul className={classes.list}>
        <li>Kişilik özelliklerinizi,</li>
        <li>Durumluk (state) ve sürekli (trait) kaygı düzeyinizi,</li>
        <li>Çocukluk döneminde yaşadığınız olası zorlukları,</li>
        <li>Kişilerarası ilişkilerdeki tutumlarınızı,</li>
        <li>Ve duygusal zekâ seviyenizi değerlendirmeyi amaçlamaktadır.</li>
      </ul>

      <p>
        Testlerin tamamı yaklaşık <strong>10–15 dakika</strong> sürmektedir. Tüm
        yanıtlarınız anonim şekilde kaydedilecek ve sadece bilimsel amaçlarla
        kullanılacaktır.
      </p>

      <p>
        Katılım tamamen gönüllülük esasına dayanır. Lütfen soruları içtenlikle
        ve dürüst şekilde yanıtlayınız.
      </p>

      <p>
        Sorularınız için araştırma yürütücüsü <strong>Hüseyin Sığırcı</strong>
        ’ya <a href="mailto:sigirci@metu.edu.tr">sigirci@metu.edu.tr</a>{" "}
        adresinden ulaşabilirsiniz.
      </p>

      <div className={classes.inputGroup}>
        <label htmlFor="name">Lütfen isminizi giriniz:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Adınızı girin"
        />
      </div>

      <Link to="/survey">
        <button disabled={!name.trim()}>Ankete Başla</button>
      </Link>
    </div>
  );
}

export default Home;
