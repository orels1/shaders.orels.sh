import * as React from 'react';

const BunnyPlayer = ({ videoId, autoplay = true, loop = true, muted = true }) => {
  const url = `https://iframe.mediadelivery.net/embed/165/${videoId}?autoplay=${autoplay}&loop=${loop}&muted=${muted}`;

  return (
    <div style={{position: "relative", paddingTop: "64.73354231974922%"}}>
      <iframe
        src={url}
        loading="lazy"
        style={{border: "none", position: "absolute", top: 0, height: "100%", width: "100%"}}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowfullscreen="true"
      />
    </div>
  )
}

export default BunnyPlayer;