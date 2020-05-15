// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import { confirmAlert as reactConfirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export function confirmAlert(
  title: string,
  message: string,
  onClick?: () => void
) {
  reactConfirmAlert({
    title,
    message,
    buttons: [
      {
        label: 'OK',
        onClick: onClick || (() => {}),
      },
    ],
  });
}
