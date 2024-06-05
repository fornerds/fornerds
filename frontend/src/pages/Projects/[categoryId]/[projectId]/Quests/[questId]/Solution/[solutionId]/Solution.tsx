import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Octokit } from '@octokit/rest';
import { Converter } from 'showdown';
import styles from './Solution.module.css';

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
  );
};

export default Solution;