import React from 'react';
import { css, cx } from 'emotion';

import { openFileSelector } from './FileSelector';
import { roundImage } from '../utils';


const styles = {
  photoWrapper: css`
    height: 120px;
    width: 120px;
    border-radius: 1000px;
    background: var(--tertiary);
    border: 3px solid var(--secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-duration) ease-in-out;
  `,
  selected: css`
    border-color: var(--primary);
  `,
  photo: css`
    position: relative;
    height: calc(100% - 10px);
    width: calc(100% - 10px);
    overflow: hidden;
    border-radius: 1000px;

    > img {
      height: 100%;
      width: 100%;
      object-fit: contain;
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
  selected?: boolean,
  onSelectImage?: (f: string) => void,
}> = ({ photo, onSelectImage, selected=true }) => {
  const onClickProfilePic: any = onSelectImage
    ? () => openFileSelector('Image', [{ name: 'Images', extensions: ['jpg', 'png'] }],
      async (file: string) => onSelectImage(await roundImage(file)))
    : (x: string) => x;
  return (
    <div
      className={cx(styles.photoWrapper, {
        [styles.clickDisabled]: ! onSelectImage,
        [styles.selected]: selected,
      })}
      onClick={() => onClickProfilePic()}>
      <div className={styles.photo}>
        {photo ? <img src={photo} /> : null}
      </div>
    </div>
  );
}


export default ProfilePicture;
