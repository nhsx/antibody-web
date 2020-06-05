// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.

import { Fade, Theme, createStyles, makeStyles } from "@material-ui/core";

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    wrapperRoot: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "rgba(0, 0, 0, .5)",
    },
    root: {
      margin: "auto",
    },
    label: {
      fontSize: "20px",
      display: "block",
      color: "#fff",
    },
  })
);

interface PhotoUploadProgressOverlayProps {
  progress: number;
}

export default (props: PhotoUploadProgressOverlayProps) => {
  const { progress } = props;
  const classnames = useStyle();

  return (
    <Fade
      in={true}
      timeout={1000}>
      <div className={classnames.wrapperRoot}>
        <CircularProgress
          classes={{ root: classnames.root }}
          size={150}
          value={progress}
          variant="static"
        />
        <Box
          alignItems="center"
          bottom={0}
          display="flex"
          justifyContent="center"
          left={0}
          position="absolute"
          flexDirection="column"
          right={0}
          top={10}
        >
          <Typography
            className={classnames.label}
            component="div"
            variant="caption"
          >
            Uploading
          </Typography>
          <Typography
            className={classnames.label}
            component="div"
            variant="caption"
          >{`${Math.round(progress)}%`}</Typography>
        </Box>
      </div>
    </Fade>
  );
};
