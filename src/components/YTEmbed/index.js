import * as React from 'react';
import styles from './styles.module.css';

const YTEmbed = ({ videoId }) => {
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className={styles.responsiveEmbed}>
      <iframe src={url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  );
}

export default YTEmbed;