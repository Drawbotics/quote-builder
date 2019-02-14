// changes scrollbar style on MacOS only

export const styles = `
  ::-webkit-scrollbar {
    width: 3px;
    background-color: rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--primary);
  }
`;
