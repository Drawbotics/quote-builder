import React from 'react';
import { css, cx } from 'emotion';

import { openFileSelector, FileTypes } from './FileSelector';


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
      background: var(--primary-overlay);
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
  onSelectImage?: (f: string) => void,
}> = ({ photo, onSelectImage }) => {
  const onClickProfilePic: any = onSelectImage
    ? () => openFileSelector(FileTypes.Image, [{ name: 'Images', extensions: ['jpg', 'png'] }], onSelectImage)
    : (x: string) => x;
  return (
    <div
      className={cx(styles.photoWrapper, { [styles.clickDisabled]: ! onSelectImage })}
      onClick={() => onClickProfilePic()}>
      <div className={styles.photo}>
        {photo ? <img src={photo} /> : null}
      </div>
    </div>
  );
}


export default ProfilePicture;
