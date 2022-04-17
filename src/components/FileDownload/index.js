import * as React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FileDownload = ({ link, title, type, icon }) => {
  return (
    <a href={link} target="_blank" referrerPolicy="no-referrer" className={clsx('card shadow--md', styles.fileDownload)}>
      <div className="card__body">
        <div className="row align-items-center">
          <div className="col col--2">
            <div className={styles.customIconBlock}>
              <img src={icon} className={styles.customIcon} />
            </div>
          </div>
          <div className="col col--10">
            <h3>{title}</h3>
            <small>{type}</small>
          </div>
        </div>
      </div>
    </a>
  )
}

export default FileDownload;