/* eslint-disable no-unused-vars */
import styles from "./WebRtcPage.module.css";
import customAxios from "./../../util/customAxios";
import React, { Component } from "react";

import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "./UserVideoComponent";

import CallEndIcon from "@mui/icons-material/CallEnd";
import userAccount from "./../../assets/images/userAccount.png";

class WebRtcPage extends Component {
  constructor(props) {
    super(props);
    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: "",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined,
      subscribers: [],
    };
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.backToHome = this.backToHome.bind(this);
  }
  async componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    await this.findRoom().then(() => {
      console.log(this.state);
      this.joinSession();
    });
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    this.leaveSession();
  }
  onbeforeunload(event) {
    this.leaveSession();
  }
  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }
  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }
  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }
  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }
  joinSession() {
    // --- 1) Get an OpenVidu object ---
    this.OV = new OpenVidu();
    // --- 2) Init a session ---
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;
        // --- 3) Specify the actions when events take place in the session ---
        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);
          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });
        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });
        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });
        // --- 4) Connect to the session with a valid user token ---
        // Get a token from the OpenVidu deployment
        this.getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              // --- 5) Get your own camera stream ---
              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: true, // Whether to mirror your local video or not
              });
              // --- 6) Publish your stream ---
              mySession.publish(publisher);
              // Obtain the current video device in use
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );
              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }
  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    const mySession = this.state.session;
    let nowSessionId = null;
    try {
      nowSessionId = this.state.session.sessionId;
    } catch (e) {
      nowSessionId = null;
    }
    if (nowSessionId !== null && nowSessionId !== "") {
      this.leaveRoom(nowSessionId);
    }
    if (mySession) {
      mySession.disconnect();
    }
    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }
  async switchCamera() {
    alert("다른 방으로 이동합니다");
    console.log(
      "state switch ````````````````````````````````````````````````````````````````"
    );
    let sessionIdForSwitch = this.state.mySessionId;
    try {
      await this.leaveSession(); // Wait for leaveSession() to complete
      await this.findRoom(sessionIdForSwitch); // Once leaveSession() completes, find a room
      this.joinSession(); // Once findRoom() completes, join the session
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async backToHome() {
    await this.leaveSession();
    window.location.href = "/";
  }

  render() {
    // const mySessionId = this.state.mySessionId;
    // const myUserName = this.state.myUserName;
    return (
      <div className="container">
        <div id="session" className={styles.container}>
          <div id="video-container" className={styles.vedioContainer}>

            {this.state.publisher !== undefined ? (
              <div
                className="stream-container"
                onClick={() => this.handleMainVideoStream(this.state.publisher)}
              >
                <UserVideoComponent streamManager={this.state.publisher} />
              </div>
            ) : null}
            {this.state.subscribers.length ?
              this.state.subscribers.map((sub, _) => (
                <div
                  key={sub.id}
                  className="stream-container"
                  onClick={() => this.handleMainVideoStream(sub)}
                >
                  <UserVideoComponent streamManager={sub} />
                </div>
              )) : (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: "50%", color: "#fff" }}
                >
                  <p style={{ color: "#fff" }}>상대가 없습니다...</p>
                </div>
              )}
          </div>
          <div id="session-header" className={styles.buttonContainer}>
            <div
              className="btn btn-light rounded-pill me-3"
              type="button"
              id="buttonSwitchCamera"
              style={{ width: "5rem" }}
              onClick={this.switchCamera}
            >
              <img src={userAccount} alt="userAccount" width={25} />
            </div>
            <div
              className="btn btn-danger rounded-pill ms-3"
              type="button"
              id="buttonLeaveSession"
              style={{ width: "5rem" }}
              onClick={this.backToHome}
            >
              <CallEndIcon />
            </div>
          </div>
        </div>
      </div>
    );
  }
  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }
  async createSession(sessionId) {
    const response = await customAxios.post(
      `${process.env.REACT_APP_SERVER}/api/sessions`,
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  }
  async createToken(sessionId) {
    const response = await customAxios.post(
      `${process.env.REACT_APP_SERVER}/api/sessions/` +
      sessionId +
      "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }
  async findRoom(sessionId) {
    console.log("now session", sessionId);
    const response = await customAxios
      .get(
        `${process.env.REACT_APP_SERVER}/api/sessions/` +
        sessionId +
        `/getRoom`,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) =>
        console.log("findroom", (this.state.mySessionId = res.data))
      );
  }
  async leaveRoom(sessionId) {
    const response = await customAxios.get(
      `${process.env.REACT_APP_SERVER}/api/sessions/` + sessionId + "/leave",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }
}
export default WebRtcPage;