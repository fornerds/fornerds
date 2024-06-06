import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import * as monaco from 'monaco-editor';
import { Octokit } from '@octokit/rest';
import { Converter } from 'showdown';
import styles from './Solution.module.css';
import { NavLink, useParams } from 'react-router-dom';
import { Input } from '../../../../../../../../components/AtomComponent';

import { Comment } from '../../../../../../../../components/ModuleComponent/Comment';
import { CommentInput } from '../../../../../../../../components/ModuleComponent/CommentInput';
import { CommentProps } from '../../../../../../../../components/ModuleComponent/Comment/Comment';
import characters from '../../../../../../../../assets/images/character';
import { Tag } from '../../../../../../../../components/AtomComponent';
import {
  Header,
  Footer,
} from '../../../../../../../../components/ModuleComponent';

const dummyComments = [
  {
    id: 1,
    content:
      'Lorem ipsum dolor sit amet consectetur. Amet nulla auctor semper a varius. Aenean blandit lectus arcu faucibus. Convallis tortor nullam tincidunt turpis accumsan. In risus ac ullamcorper cum ornare volutpat sed..',
    likeCount: 235,
    createdAt: '2024-01-24',
    updatedAt: null,
    deletedAt: null,
    quest_id: 1,
    user_id: 'ecf4991e-7ba8-4d1d-a297-736d13b089ca',
    replyData: [],
  },
];

const dummyUserData = [
  {
    id: 'ecf4991e-7ba8-4d1d-a297-736d13b089ca',
    email: 'dmunoz@hotmail.com',
    password: 'QRF1Xku%#M',
    name: 'Marvin Kidd',
    nickname: 'ricediana',
    phoneNumber: '575-369-6607x2789',
    language: 'lb',
    country: 'Vanuatu',
    profileImage: 1,
    bio: 'Kid worker go off. Show cold dinner let public...',
    role: 'user',
    level: 65,
    exp: 4175,
    point: 881,
    cash: 318,
    isPublic: true,
    createdAt: '2020-10-18',
    updatedAt: '2023-11-22',
    deletedAt: null,
  },
];

const dummySolutionData = {
  id: '123456',
  repositoryUrl: 'https://github.com/user/repo',
  content:
    'Lorem ipsum dolor sit amet consectetur. Pretium cras bibendum convallis ornare non integer. Condimentum mollis suspendisse vitae integer eu ac blandit. Nunc fringilla in aliquam ornare sed nibh id volutpat. Cras ut sit odio nunc velit potenti tincidunt sem.',
  file: 'index.js',
  status: 'completed',
  feedback: 'Great job! Well optimized.',
  memoryUsage: 512,
  executionTime: 120,
  likeCount: 42,
  viewCount: 1045,
  createdAt: '2023-06-01',
  updatedAt: '2023-06-02',
  deletedAt: null,
  quest_id: 'quest123',
  user_id: 'user456',
  strengths: ['Readability', 'Maintainabilty', 'Efficiency', 'Test', 'Documentation'],
  skills: ['JavaScript', 'Redux', 'HTML', 'CSS'],
};

const octokit = new Octokit();

interface SolutionProps {}
interface Solution {
  id: string;
  repositoryUrl: string;
  file: string;
  status: string;
  feedback: string;
  memoryUsage: number;
  executionTime: number;
  likeCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  quest_id: string;
  user_id: string;
  skills: string[];
}
interface GitHubContent {
  type: string;
  size: number;
  name: string;
  path: string;
  content?: string;
  sha: string;
  url: string;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
  _links: {
    self: string;
    git: string | null;
    html: string | null;
  };
}

// Monaco Editor의 TypeScript 워커를 수동으로 로드
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  target: monaco.languages.typescript.ScriptTarget.ES2016,
  allowNonTsExtensions: true,
  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  module: monaco.languages.typescript.ModuleKind.CommonJS,
  noEmit: true,
  typeRoots: ['node_modules/@types'],
});

(window as any).MonacoEnvironment = {
  getWorker: (workerId: string, label: string) => {
    if (label === 'typescript' || label === 'javascript') {
      return monaco.languages.typescript.getTypeScriptWorker();
    }
    return null;
  },
};

export function Solution() {
  let { categoryId, projectId, questId } = useParams();
  const [repoUrl, setRepoUrl] = React.useState('');
  const [files, setFiles] = React.useState<any[]>([]);
  const [currentFile, setCurrentFile] = React.useState('');
  const [currentPath, setCurrentPath] = React.useState('');
  const [fileContent, setFileContent] = React.useState('');
  const [solution, setSolution] = React.useState<Solution>(dummySolutionData);

  // Comment 관련
  const [commentData, setCommentData] =
    React.useState<CommentProps[]>(dummyComments);
  const [visibleComments, setVisibleComments] = React.useState(4);

  const updateComment = (updatedComment: CommentProps) => {
    const updatedComments = commentData.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment,
    );
    setCommentData(updatedComments);
  };

  const deleteComment = (commentId: number) => {
    const updatedComments = commentData.filter(
      (comment) => comment.id !== commentId,
    );
    setVisibleComments(visibleComments - 1);
    setCommentData(updatedComments);
  };

  const submitComment = (content: string) => {
    const newComment: CommentProps = {
      id: commentData.length + 1,
      content,
      likeCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      deletedAt: null,
      quest_id: 1,
      user_id: dummyUserData[0].id,
      replyData: [],
    };
    commentData.unshift(newComment);
    setCommentData(commentData); // 업데이트된 commentData로 상태 업데이트
    setVisibleComments(visibleComments + 1);
    console.log('댓글리스트 이후 : ', commentData);
  };

  const loadMoreComments = () => {
    setVisibleComments(visibleComments + 4);
  };

  // github에서 정보 불러오기
  const fetchRepoFiles = React.useCallback(
    async (path: string = '') => {
      const [owner, repo] = repoUrl.split('/').slice(-2);
      const { data } = await octokit.repos.getContent({ owner, repo, path });

      if (Array.isArray(data)) {
        setFiles(data);
        if (data.length > 0) {
          const firstFile = data[0] as GitHubContent;
          setCurrentFile(firstFile.path);
          const { data: fileData } = (await octokit.repos.getContent({
            owner,
            repo,
            path: firstFile.path,
          })) as { data: GitHubContent };
          if (fileData.content) {
            setFileContent(atob(fileData.content));
          }
        }
        setCurrentPath(path);
      }
    },
    [repoUrl],
  );

  // 폴더 클릭시
  const handleFileClick = React.useCallback(
    async (file: GitHubContent) => {
      if (file.type === 'dir') {
        await fetchRepoFiles(`${currentPath}/${file.name}`);
      } else {
        const [owner, repo] = repoUrl.split('/').slice(-2);
        const { data: fileData } = (await octokit.repos.getContent({
          owner,
          repo,
          path: file.path,
        })) as { data: GitHubContent };
        setCurrentFile(file.path);
        if (fileData.content) {
          setFileContent(atob(fileData.content));
        }
      }
    },
    [repoUrl, currentPath],
  );

  const loadFile = React.useCallback(
    async (file: GitHubContent) => {
      const [owner, repo] = repoUrl.split('/').slice(-2);
      const { data: fileData } = (await octokit.repos.getContent({
        owner,
        repo,
        path: file.path,
      })) as { data: GitHubContent };
      setCurrentFile(file.path);
      if (fileData.content) {
        setFileContent(atob(fileData.content));
      }
    },
    [repoUrl],
  );

  const renderMarkdown = React.useCallback((content: string) => {
    const converter = new Converter();
    return converter.makeHtml(content);
  }, []);

  React.useEffect(() => {
    // Define the custom theme
    monaco.editor.defineTheme('myCustomTheme', {
      base: 'vs-dark', // Use 'vs-dark' for a dark theme base
      inherit: true, // Inherit from the base theme
      rules: [],
      colors: {
        'editor.background': '#1e1e1e', // Custom background color
        'editor.foreground': '#ffffff', // Custom text color
      },
    });
  }, []);

  return (
    <div className={styles.background}>
      <Header />
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <header className={styles.solutionHeader}>
            <div className={styles.headerTop}>
              <span className={`${styles.navList} font-roboto-body-2`}>
                <NavLink to={'/'} className={styles.prevPage}>
                  Home /
                </NavLink>
                <NavLink
                  to={`/projects/${categoryId}`}
                  className={styles.prevPage}
                >
                  Project list /
                </NavLink>
                <NavLink
                  to={`/projects/${categoryId}/${projectId}`}
                  className={styles.prevPage}
                >
                  Project detail /
                </NavLink>
                <NavLink
                  to={`/projects/${categoryId}/${projectId}/quests/${questId}`}
                  className={styles.prevPage}
                >
                  Quest detail /
                </NavLink>
                <span className={styles.prevPage}>Solution detail</span>
              </span>
              <div className={styles.icons}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 0.296875C5.37188 0.296875 0 5.66875 0 12.2969C0 17.5613 3.43812 22.0338 8.2075 23.6303C8.80625 23.7481 9.0275 23.3731 9.0275 23.0475C9.0275 22.7513 9.01688 21.9375 9.01063 21.0138C5.67188 21.7013 4.9675 19.2413 4.9675 19.2413C4.4375 17.8575 3.69875 17.4838 3.69875 17.4838C2.6775 16.8063 3.77063 16.8188 3.77063 16.8188C4.89625 16.8975 5.46688 17.9875 5.46688 17.9875C6.46375 19.7388 8.08 19.2738 8.725 18.9775C8.83875 18.2738 9.12375 17.7863 9.4375 17.505C6.8725 17.22 4.18688 16.1738 4.18688 11.5338C4.18688 10.1863 4.66625 9.09313 5.46688 8.25813C5.335 7.9625 4.90688 6.68125 5.58688 5.07125C5.58688 5.07125 6.63 4.7625 8.99875 6.34813C9.9275 6.08688 10.9363 5.96063 11.945 5.95438C12.9538 5.96063 13.9625 6.08688 14.8925 6.34813C17.2613 4.7625 18.3038 5.07125 18.3038 5.07125C18.985 6.68125 18.5563 7.9625 18.4238 8.25813C19.2263 9.09313 19.7038 10.1863 19.7038 11.5338C19.7038 16.1863 17.0125 17.2163 14.4375 17.505C14.8613 17.8963 15.2363 18.61 15.2363 19.6488C15.2363 21.1575 15.2213 22.5488 15.2213 23.0475C15.2213 23.3763 15.4388 23.755 16.0438 23.6303C20.8113 22.0338 24.25 17.5613 24.25 12.2969C24.25 5.66875 18.8781 0.296875 12 0.296875Z"
                    fill="white"
                    stroke="white"
                    stroke-opacity="0.85"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21L13.082 17.195C12.7593 16.9874 12.3837 16.877 12 16.877C11.6163 16.877 11.2407 16.9874 10.918 17.195L5 21Z"
                    stroke="white"
                    stroke-opacity="0.85"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 8.25C21 5.76472 18.9013 3.75 16.3125 3.75C14.3769 3.75 12.7153 4.87628 12 6.48342C11.2847 4.87628 9.62312 3.75 7.6875 3.75C5.09867 3.75 3 5.76472 3 8.25C3 15.4706 12 20.25 12 20.25C12 20.25 21 15.4706 21 8.25Z"
                    stroke="white"
                    stroke-opacity="0.85"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className={styles.questInfo}>
              <span className={styles.category}>Blockchain Technology</span>
              <h2
                className={styles.title}
              >{`${solution.user_id}'s solution`}</h2>
              <div className={styles.language}>
                {solution.skills.map((skill, index) => (
                  <Tag
                    key={index}
                    className={`${styles.skill} font-roboto-button text-color-lighten`}
                    variant="default"
                  >
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
          </header>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="GitHub repository URL"
              className={styles.input}
            />
            <button
              onClick={() =>
                fetchRepoFiles(currentPath.split('/').slice(0, -1).join('/'))
              }
              className={styles.button}
            >
              Fetch Files
            </button>
          </div>
          <div className={styles.ideContainer}>
            <div className={styles.filesContainer}>
              {currentPath && (
                <div
                  onClick={() =>
                    fetchRepoFiles(
                      currentPath.split('/').slice(0, -1).join('/'),
                    )
                  }
                >
                  <span className={styles.folderIcon}>📁</span> ..
                </div>
              )}
              <ul className={styles.fileList}>
                {files.map((file) => (
                  <li
                    key={file.path}
                    onClick={() => handleFileClick(file)}
                    className={styles.fileItem}
                  >
                    {file.type === 'dir' ? (
                      <span className={styles.folderIcon}>📁</span>
                    ) : (
                      <span className={styles.fileIcon}>📄</span>
                    )}
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.codeContainer}>
              {currentFile.endsWith('.md') ? (
                <div
                  className={styles.markdownContainer}
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(fileContent),
                  }}
                />
              ) : (
                <MonacoEditor
                  language="typescript"
                  value={fileContent}
                  options={{
                    readOnly: true,
                  }}
                  theme="myCustomTheme"
                  className={styles.editorContainer}
                  editorDidMount={(editor, monaco) => {
                    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
                      {
                        target: monaco.languages.typescript.ScriptTarget.ES2016,
                        allowNonTsExtensions: true,
                        moduleResolution:
                          monaco.languages.typescript.ModuleResolutionKind
                            .NodeJs,
                        module: monaco.languages.typescript.ModuleKind.CommonJS,
                        noEmit: true,
                        typeRoots: ['node_modules/@types'],
                      },
                    );
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightBox}>
            <div className={styles.rightBoxHeader}>
              <div className={styles.solver}>
                <span>by</span>
                <img
                  src={characters[dummyUserData[0].profileImage]}
                  className={styles.character}
                  alt="User Profile"
                />
                <div className={styles.name}> {dummyUserData[0].nickname} </div>
                <div className={styles.date}>{dummySolutionData.createdAt}</div>
              </div>
            </div>
            <div className={styles.contents}>
              <span className={styles.text}>{dummySolutionData.content}</span>
              <div className={styles.readmore}>Read more</div>
            </div>
          </div>
          <div className={styles.rightBox}>
            <div className={styles.rightBoxHeader}>
              <div className={styles.solver}>
                <div className={styles.subTitle}> Ai Comment </div>
                <div className={styles.date}>{dummySolutionData.createdAt}</div>
              </div>
            </div>
            <div className={styles.contents}>
              <span className={styles.text}>{dummySolutionData.content}</span>
              <div className={styles.readmore}>Read more</div>
            </div>
          </div>
          <div className={styles.solutionStrengths}>
            <div className={styles.subTitle}> What does this code do well? </div>
            <div className={styles.language}>
                {dummySolutionData.strengths.map((str, index) => (
                  <Tag
                    key={index}
                    className={`${styles.skill} font-roboto-button text-color-lighten`}
                    variant="default"
                  >
                    {str}
                  </Tag>
                ))}
              </div>
          </div>
          <div className={styles.commentInput}>
            <CommentInput
              buttonText="Submit"
              onSubmit={submitComment}
              profileImage={dummyUserData[0].profileImage}
            />
          </div>
          <div className={styles.commentList}>
            {commentData.slice(0, visibleComments).map((commentData) => (
              <Comment
                key={commentData.id}
                commentData={commentData}
                updateComment={updateComment}
                deleteComment={deleteComment}
                hideEditDelete={false}
                currentUser={dummyUserData[0]}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Solution;
