import React, { Component } from 'react';
import './App.css';

import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import VideoCinema from './components/VideoCinema';
import { VideoService } from './services/VideoService';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: {}
    };

    this.selectVideo = this.selectVideo.bind(this);

  }

  async componentDidMount(){
    const videos = await VideoService.list();
    this.setState({videos});

    this.selectVideo(videos[0]);
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
        <VideoList videos={state.videos} />
        <VideoCinema isActive={false} />
      </div>
    );
  }
}

export default App;
