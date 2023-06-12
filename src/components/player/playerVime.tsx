import React, { CSSProperties } from 'react'
import {
  Player,
  Hls,
  DefaultUi,
  Ui,
  ClickToPlay,
  LoadingScreen,
  Spinner,
  Controls,
  PlaybackControl,
} from '@vime/react'
import '@vime/core/themes/default.css'
import '@vime/core/themes/light.css'

interface Props {
    srcVideo: string
}

export const VideoPlayer = (props : Props) => {
  return (
    <Player
      theme="dark"
      style={{ '--vm-player-theme': '#14b8a6' } as React.CSSProperties}
    >
      <Hls >
        <source
          data-src={props.srcVideo}
          type="application/x-mpegURL"
        />
      </Hls>

      <DefaultUi/>
      <Ui>
        <ClickToPlay />
        <LoadingScreen></LoadingScreen>
        <Spinner
          style={
            { '--vm-spinner-track-color': '#14b8a6' } as React.CSSProperties
          }
        />
      </Ui>
    </Player>
  )
}
