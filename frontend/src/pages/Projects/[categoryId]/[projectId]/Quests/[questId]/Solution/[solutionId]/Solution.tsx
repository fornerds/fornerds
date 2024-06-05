import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Octokit } from '@octokit/rest';
import { Converter } from 'showdown';
import styles from './Solution.module.css';

import { Comment } from '../../../../../../../../components/ModuleComponent/Comment'
import { CommentInput } from '../../../../../../../../components/ModuleComponent/CommentInput'
import { CommentProps } from '../../../../../../../../components/ModuleComponent/Comment/Comment'

const dummyComments = [
  {
    "id": 1,
    "content": "Lorem ipsum dolor sit amet consectetur. Amet nulla auctor semper a varius. Aenean blandit lectus arcu faucibus. Convallis tortor nullam tincidunt turpis accumsan. In risus ac ullamcorper cum ornare volutpat sed..",
    "likeCount": 235,
    "createdAt": "2024-01-24",
    "updatedAt": null,
    "deletedAt": null,
    "quest_id": 1,
    "user_id": "ecf4991e-7ba8-4d1d-a297-736d13b089ca",
    "replyData": []
  }]

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
    "level": 65,
    "exp": 4175,
    "point": 881,
    "cash": 318,
    "isPublic": true,
    "createdAt": "2020-10-18T05:10:22",
    "updatedAt": "2023-11-22T03:34:04",
    "deletedAt": null
  }]

const octokit = new Octokit();

interface SolutionProps { }

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

export function Solution() {
  const [repoUrl, setRepoUrl] = React.useState('');
  const [files, setFiles] = React.useState<any[]>([]);
  const [currentFile, setCurrentFile] = React.useState('');
  const [currentPath, setCurrentPath] = React.useState('');
  const [fileContent, setFileContent] = React.useState('');

  // Comment 관련
  const [commentData, setCommentData] = React.useState<CommentProps[]>(dummyComments)
  const [visibleComments, setVisibleComments] = React.useState(4)

  const updateComment = (updatedComment: CommentProps) => {
    const updatedComments = commentData.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment
    );
    setCommentData(updatedComments);
  };

  const deleteComment = (commentId: number) => {
    const updatedComments = commentData.filter((comment) => comment.id !== commentId);
    setVisibleComments(visibleComments - 1)
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
      replyData: []
    }
    commentData.unshift(newComment)
    setCommentData(commentData) // 업데이트된 commentData로 상태 업데이트
    setVisibleComments(visibleComments + 1)
    console.log("댓글리스트 이후 : ", commentData)
  }

  const loadMoreComments = () => {
    setVisibleComments(visibleComments + 4)
  }

  // github에서 정보 불러오기
  const fetchRepoFiles = React.useCallback(async (path: string = '') => {
    const [owner, repo] = repoUrl.split('/').slice(-2);
    const { data } = await octokit.repos.getContent({ owner, repo, path });

    if (Array.isArray(data)) {
      setFiles(data);
      if (data.length > 0) {
        const firstFile = data[0] as GitHubContent;
        setCurrentFile(firstFile.path);
        const { data: fileData } = await octokit.repos.getContent({ owner, repo, path: firstFile.path }) as { data: GitHubContent };
        if (fileData.content) {
          setFileContent(atob(fileData.content));
        }
      }
      setCurrentPath(path);
    }
  }, [repoUrl]);

  // 폴더 클릭시
  const handleFileClick = React.useCallback(async (file: GitHubContent) => {
    if (file.type === 'dir') {
      await fetchRepoFiles(`${currentPath}/${file.name}`);
    } else {
      const [owner, repo] = repoUrl.split('/').slice(-2);
      const { data: fileData } = await octokit.repos.getContent({ owner, repo, path: file.path }) as { data: GitHubContent };
      setCurrentFile(file.path);
      if (fileData.content) {
        setFileContent(atob(fileData.content));
      }
    }
  }, [repoUrl, currentPath]);

  const loadFile = React.useCallback(async (file: GitHubContent) => {
    const [owner, repo] = repoUrl.split('/').slice(-2);
    const { data: fileData } = await octokit.repos.getContent({ owner, repo, path: file.path }) as { data: GitHubContent };
    setCurrentFile(file.path);
    if (fileData.content) {
      setFileContent(atob(fileData.content));
    }
  }, [repoUrl]);

  const renderMarkdown = React.useCallback((content: string) => {
    const converter = new Converter();
    return converter.makeHtml(content);
  }, []);

  return (
    <div className={styles.container}>
      {/* left_box */}
      <div className={styles.leftBox}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={repoUrl}
            onChange={e => setRepoUrl(e.target.value)}
            placeholder="GitHub repository URL"
            className={styles.input}
          />
          <button onClick={() => fetchRepoFiles(currentPath.split('/').slice(0, -1).join('/'))} className={styles.button}>
            Fetch Files
          </button>
        </div>
        <div className={styles.filesContainer}>
          {currentPath && (
            <div onClick={() => fetchRepoFiles(currentPath.split('/').slice(0, -1).join('/'))}>
              <span className={styles.folderIcon}>📁</span> ..
            </div>
          )}
          <ul className={styles.fileList}>
            {files.map(file => (
              <li key={file.path} onClick={() => handleFileClick(file)} className={styles.fileItem}>
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
      </div>
      {/* right_box */}
      <div className={styles.middleBox}>
        <div className={styles.solutionHeader}>
          Title
        </div>
        {/* IDE 부분 */}
        {currentFile.endsWith('.md') ? (
          <div
            className={styles.markdownContainer}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(fileContent) }}
          />
        ) : (
          <MonacoEditor
            language="typescript"
            value={fileContent}
            options={{
              readOnly: true,
            }}
            className={styles.editorContainer}
          />
        )}
      </div>
      <div className={styles.rightBox}>
        <div className={styles.solutionDescription}>
          설명 부분
        </div>
        <div className={styles.aiComments}>
          AI 코맨트
        </div>
        <div className={styles.solutionStrengths}>
          강점체크 리스트
          - 1
          - 2
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
              currentUser={dummyUserData[0]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solution;