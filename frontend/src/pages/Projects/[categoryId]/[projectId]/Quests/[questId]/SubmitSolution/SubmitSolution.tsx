import React, { useState, useEffect } from 'react';
import styles from './SubmitSolution.module.css';

type SubmitSolutionProps = {
  onClose: () => void;
  expGained: number;
  currentExp: number;
  onExpUpdate: (exp: number) => void;
};

export function SubmitSolution({
  onClose,
  expGained,
  currentExp,
  onExpUpdate,
}: SubmitSolutionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [gitUrl, setGitUrl] = useState('');
  const [feedback, setFeedback] = useState('');
  const [exp, setExp] = useState(currentExp);
  const [level, setLevel] = useState(Math.floor(currentExp / 100) + 1);
  const [expBarWidth, setExpBarWidth] = useState(
    ((currentExp % 100) / 100) * 100,
  );
  const [newExpBarWidth, setNewExpBarWidth] = useState(0);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    if (!calculated) {
      const totalExp = currentExp + expGained;
      const newLevel = Math.floor(totalExp / 100) + 1;
      const remainingExp = totalExp % 100;

      setExp(totalExp);
      setLevel(newLevel);
      setExpBarWidth((remainingExp / 100) * 100);
      setNewExpBarWidth((expGained / 100) * 100);

      if (totalExp >= 100) {
        onExpUpdate(remainingExp);
      } else {
        onExpUpdate(totalExp);
      }

      setCalculated(true);
    }
  }, [currentExp, expGained, onExpUpdate, calculated]);

  useEffect(() => {
    const totalExp = exp;
    const newLevel = Math.floor(totalExp / 100) + 1;
    const remainingExp = totalExp % 100;

    setLevel(newLevel);
    setExpBarWidth((remainingExp / 100) * 100);
    setNewExpBarWidth(((exp - currentExp) / 100) * 100);

    if (totalExp >= currentExp + expGained) {
      onExpUpdate(remainingExp);
    }
  }, [exp, expGained, currentExp, onExpUpdate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setCalculated(false);
    onClose();
  };

  if (submitted) {
    return (
      <div className={styles.submitSolutionPopup}>
        <h3>You solved it!</h3>
        <p>Hope you enjoyed the journey solving the quest.</p>
        <p>AI will automatically check your code and provide feedback.</p>
        <div className={styles.result}>
          <span>Level {level}</span>
          <span>Current Exp: {currentExp}</span>
          <span>+{expGained} 🏆</span>
        </div>
        <div className={styles.expBar}>
          <div
            className={styles.expBarFill}
            style={{ width: `${expBarWidth}%` }}
          />
          <div
            className={styles.expBarNew}
            style={{
              width: `${newExpBarWidth}%`,
              left: `${expBarWidth}%`,
            }}
          />
        </div>
        <div className={styles.proficiency}>
          <span>Category proficiency</span>
          {/* TODO: 카테고리 숙련도 표시 */}
        </div>
        <div className={styles.proficiency}>
          <span>Language proficiency</span>
          {/* TODO: 언어 숙련도 표시 */}
        </div>
        <div className={styles.actions}>
          <button onClick={handleClose}>Got it</button>
          <button>View solution</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.submitSolutionPopup}>
      <h2>Submit solution</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Git URL *
          <input
            type="text"
            value={gitUrl}
            onChange={(e) => setGitUrl(e.target.value)}
            required
          />
        </label>
        <label>
          Feedback you want
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </label>
        <div className={styles.actions}>
          <button type="button" onClick={handleClose}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
