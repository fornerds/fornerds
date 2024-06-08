import React, { useState, useEffect } from 'react';
import styles from './SubmitSolution.module.css';


const dummyUserData = [
  {
    "id": "ecf4991e-7ba8-4d1d-a297-736d13b089ca",
    "email": "dmunoz@hotmail.com",
    "password": "QRF1Xku%#M",
    "name": "Marvin Kidd",
    "nickname": "ricediana",
    "phoneNumber": "575-369-6607x2789",
    "language": "lb",
    "country": "Vanuatu",
    "profileImage": 1,
    "bio": "Kid worker go off. Show cold dinner let public...",
    "role": "user",
    "level": 40,
    "exp": 95,
    "point": 881,
    "cash": 318,
    "isPublic": true,
    "createdAt": "2020-10-18T05:10:22",
    "updatedAt": "2023-11-22T03:34:04",
    "deletedAt": null
  }]
interface QuestData {
  userQuestId: string | undefined;
  difficulty: string;
  isBookmarked: boolean;
  bookmarkCount: number;
  title: string;
  description: string;
  skills: string[];
  developerCount: number;
  remaining_quests: number;
  deadline: number;
  rewardCash: number;
  rewardExp: number;
  status: string;
  // createdAt: string | null;
  positionName: string;
  QuestStatus: string;
  link: string;
}

type SubmitSolutionProps = {
  onClose: () => void;
  questData: QuestData
};

export function SubmitSolution({
  onClose,
  questData
}: SubmitSolutionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [userData, setUserData] = useState(dummyUserData[0])
  const [gitUrl, setGitUrl] = useState('');
  const [feedback, setFeedback] = useState('');
  const [exp, setExp] = useState(dummyUserData[0].exp);
  const [level, setLevel] = useState(dummyUserData[0].level);

  const [expBarWidth, setExpBarWidth] = useState((dummyUserData[0].exp/100)*100);
  const [newExpBarWidth, setNewExpBarWidth] = useState((questData.rewardExp/100)*100);
  const [calculated, setCalculated] = useState(false);

  const [categoryProficiency, setCategoryProficiency] = useState(0);
  const [languageProficiencies, setLanguageProficiencies] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (!calculated) {
      const totalExp = exp + questData.rewardExp;
      if (totalExp >= 100) {
        setLevel(level+1)
        const remainingExp = totalExp - 100;
        setExp(remainingExp)
        setExpBarWidth(0);
        setNewExpBarWidth((remainingExp / 100) * 100);
      }
      else {
        setExp(totalExp)
      }
      setCalculated(true);
    }
  }, [userData, exp, expBarWidth, newExpBarWidth, calculated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    // 카테고리 숙련도 증가
    setCategoryProficiency((prevProficiency) => prevProficiency + 1);

    // 언어 숙련도 증가
    const updatedProficiencies = { ...languageProficiencies };
    questData.skills.forEach((language) => {
      if (updatedProficiencies[language]) {
        updatedProficiencies[language] += 1;
      } else {
        updatedProficiencies[language] = 1;
      }
    });
    setLanguageProficiencies(updatedProficiencies);
  }, [questData.skills]);

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
          <span>Current Exp: {dummyUserData[0].exp}</span>
          <span>+{questData.rewardExp} 🏆</span>
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
          <span>{categoryProficiency}</span>
          <span>+1</span>
        </div>
        <div className={styles.proficiency}>
          <span>Language proficiency</span>
          {Object.entries(languageProficiencies).map(([language, proficiency]) => (
            <div key={language}>
              <span>{language}</span>
              <span>{proficiency}</span>
            </div>
          ))}
          <span>+1</span>
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
