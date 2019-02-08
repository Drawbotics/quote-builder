export const styles = `
  [data-tooltip] {
    position: relative;

    &:hover {
      &::after, &::before {
        opacity: 1;
      }
    }
  }

  [data-tooltip]::before {
    content: ' ';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px 6px 0 6px;
    border-style: solid;
    border-color: var(--text-primary) transparent transparent transparent;
    z-index: 100;
    opacity: 0;
  }

  [data-tooltip]::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 50%;
    top: -8px;
    transform: translateX(-50%) translateY(-100%);
    background: var(--text-primary);
    text-align: center;
    color: var(--tertiary);
    padding: 4px 8px;
    font-size: 0.7rem;
    min-width: 60px;
    border-radius: 5px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
  }

  [data-tooltip-side="left"] {
    &::before {
      top: 50%;
      left: 0;
      transform: translateY(-50%) translateX(-100%) rotate(-90deg);
    }

    &::after {
      left: -8px;
      top: 50%;
      transform: translateX(-100%) translateY(-50%);
    }
  }
`;
