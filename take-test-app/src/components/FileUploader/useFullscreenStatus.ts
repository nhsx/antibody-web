// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React from 'react';

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}

export default function useFullscreenStatus(
  elRef: React.RefObject<HTMLDivElement>
): [boolean, (enabled: boolean) => void] {
  let fsElement: any;
  try {
    fsElement = getBrowserFullscreenElementProp();
  } catch (error) {
    fsElement = null;
  }
  const [isFullscreen, setIsFullscreen] = React.useState(
    fsElement && document[fsElement] !== null
  );

  const setFullscreen = (enabled: boolean) => {
    if (elRef.current == null || !fsElement) return;

    if (!enabled) {
      if (isFullscreen) {
        try {
          callExitFullScreen();
        } catch (e) {
          console.log('Error in fullscreen');
        }
      }

      setIsFullscreen(false);
      return;
    }
    if (enabled && !isFullscreen) {
      requestFullScreen(elRef.current)
        .then(() => {
          setIsFullscreen(document[getBrowserFullscreenElementProp()] !== null);
        })
        .catch(() => {
          setIsFullscreen(false);
        });
    }
  };

  React.useLayoutEffect(() => {
    document.onfullscreenchange = () => {
      setIsFullscreen(document[getBrowserFullscreenElementProp()] !== null);
    };
    return () => {
      document.onfullscreenchange = null;
    };
  });
  return [isFullscreen, setFullscreen];
}

function callExitFullScreen() {
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    if (typeof document.exitFullscreen !== 'undefined') {
      document.exitFullscreen();
    } else if (typeof document.msExitFullscreen !== 'undefined') {
      document.msExitFullscreen();
    } else if (typeof document.webkitExitFullscreen !== 'undefined') {
      document.webkitExitFullscreen();
    } else if (typeof document.mozCancelFullScreen !== 'undefined') {
      document.mozCancelFullScreen();
    } else {
      throw new Error('fullscreenElement is not supported by this browser');
    }
  }
}

function getBrowserFullscreenElementProp() {
  if (typeof document.fullscreenElement !== 'undefined') {
    return 'fullscreenElement';
  } else if (typeof document.mozFullScreenElement !== 'undefined') {
    return 'mozFullScreenElement';
  } else if (typeof document.msFullscreenElement !== 'undefined') {
    return 'msFullscreenElement';
  } else if (typeof document.webkitFullscreenElement !== 'undefined') {
    return 'webkitFullscreenElement';
  } else {
    throw new Error('fullscreenElement is not supported by this browser');
  }
}

async function requestFullScreen(element: HTMLElement) {
  if (typeof element.requestFullscreen !== 'undefined') {
    return element.requestFullscreen();
  } else if (typeof element.mozRequestFullscreen !== 'undefined') {
    return element.mozRequestFullscreen();
  } else if (typeof element.msRequestFullscreen !== 'undefined') {
    return element.msRequestFullscreen();
  } else if (typeof element.webkitRequestFullscreen !== 'undefined') {
    return element.webkitRequestFullscreen();
  } else {
    throw new Error('requestFullscreen is not supported by this browser');
  }
}
