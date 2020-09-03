import React from 'react';
import { StylesDictionary } from 'style/utils'; 


const styles : StylesDictionary = {
  wrapper: {
    position: "absolute",
    display: "flex",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center"
  },
  opacityBlock: {
    opacity: 0.532,
    flex: "1 1 auto",
    background: "black"
  },
  overlay: {
    background: "url('/assets/images/overlay.png') center",
    position: "relative",
    zIndex: 2,
    maxWidth: 1920,
    backgroundSize: 'cover',
    width: "100%"
  }
};


export default () => (
  <div
    style={styles.wrapper}>
    <div style={styles.opacityBlock} />
    <div
      style={styles.overlay}>
    </div>
    <div style={styles.opacityBlock} />
  </div>
);