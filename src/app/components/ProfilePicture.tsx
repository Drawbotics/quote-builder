import React from 'react';
import { css, cx } from 'emotion';


const styles = {
  photoWrapper: css`
    height: 150px;
    width: 150px;
    border-radius: 1000px;
    background: var(--tertiary);
    border: 3px solid var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background var(--transition-duration) ease-in-out;
  `,
  photo: css`
    position: relative;
    height: calc(100% - 14px);
    width: calc(100% - 14px);
    overflow: hidden;
    border-radius: 1000px;

    > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    &::after {
      content: 'Select image';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.6);
      opacity: 0;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      color: var(--white);
      transition: opacity var(--transition-duration-short) ease-in-out;
    }

    &:hover {
      cursor: pointer;

      &::after {
        opacity: 1;
        pointer-events: auto;
      }
    }
  `,
  clickDisabled: css`
    pointer-events: none;
  `,
}


const ProfilePicture: React.SFC<{
  photo: string,
  onClick?: () => void,
}> = ({ photo, onClick }) => {
  return (
    <div className={cx(styles.photoWrapper, { [styles.clickDisabled]: ! onClick })} onClick={onClick}>
      <div className={styles.photo}>
        <img src={photo} />
      </div>
    </div>
  );
}


export default ProfilePicture;
