// src/types/react-player.d.ts
declare module 'react-player' {
    import * as React from 'react';
  
    export interface ReactPlayerProps {
      url: string;
      playing?: boolean;
      loop?: boolean;
      controls?: boolean;
      volume?: number;
      muted?: boolean;
      playbackRate?: number;
      width?: string | number;
      height?: string | number;
      style?: React.CSSProperties;
      progressInterval?: number;
      playsinline?: boolean;
      pip?: boolean;
      stopOnUnmount?: boolean;
      fallback?: React.ReactNode;
      wrapper?: any;
      config?: any;
    }
  
    export default class ReactPlayer extends React.Component<ReactPlayerProps, any> {}
  }
  