// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { useRef } from 'react';

interface ImageSelectorInputProps {
  onImageSelected: (image: File) => void;
  disabled: boolean;
}

export default (props: ImageSelectorInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target && target.files && target.files[0]) {
      props.onImageSelected(target.files[0]);
    }
  };

  return (
    <div>
      <input
        id="fileInput"
        ref={inputRef}
        style={{
          border: '0',
          clip: 'rect(0 0 0 0)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          width: '1px',
        }}
        type="file"
        onChange={handleChange}
      />
      <button
        disabled={props.disabled}
        onClick={() => {
          if (!inputRef || !inputRef.current) {
            return;
          } else {
            inputRef.current.click();
          }
        }}
      >
        <span className="icon is-medium"></span>
        <span>Upload a Photo</span>
      </button>
    </div>
  );
};
