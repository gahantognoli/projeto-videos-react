import React, { Component } from 'react';
import './App.css';

import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import VideoCinema from './components/VideoCinema';
import VideoInline from './components/VideoInline';
import { VideoService } from './services/VideoService';
import { Channel } from './services/EventService';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: {}
    };

    this.selectVideo = this.selectVideo.bind(this);
    this.inlineVideo = React.createRef();
    this.cinemaVideo = React.createRef();
  }

  async componentDidMount(){
    const videos = await VideoService.list();
    this.setState({videos});

    Channel.on('video:select', this.selectVideo)
  }

  componentWillUnmount(){
    Channel.removeAllListeners('video:select', this.selectVideo);
  }

  selectVideo(video) {
    this.setState({
      selectedVideo: video
    });
  }

  render() {
    const { state } = this;

    return (
      <div className="App">
        <VideoPlayer video={state.selectedVideo} />
        <VideoInline>
          <div ref={this.inlineVideo}></div>
        </VideoInline>
        <VideoList videos={state.videos} />
        <VideoCinema isActive={false}>
          <div ref={this.cinemaVideo}></div>
        </VideoCinema>
      </div>
    );
  }
}

export default App;
