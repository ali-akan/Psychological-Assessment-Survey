import React from "react";
import styles from "./ThankYouPage.module.css"; // Create a CSS module if needed

/**
 * Displays a "Thank You" message after the user completes the survey.
 * Includes a button to reload the page and start over.
 */

const ThankYouPage = () => {
  /**
   * Reloads the current page in the browser, effectively resetting the application.
   */
  // const handleReload = () => {
  //   window.location.reload();
  // };

  return (
    <div className={styles.container}>
      <h1>Teşekkürler!</h1>
      <p>Ankete katıldığınız için teşekkür ederiz.</p>
      <p>Değerli katkılarınız bizim için çok önemli.</p>
      {/* <button
        onClick={handleReload}
      >
        Tekrar Başlat
      </button> */}
    </div>
  );
};

export default ThankYouPage;
