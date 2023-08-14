package com.example.Strange505.rtc;

import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class RtcController {

	@Value("${OPENVIDU_URL}")
	private String OPENVIDU_URL;

	@Value("${OPENVIDU_SECRET}")
	private String OPENVIDU_SECRET;

	private OpenVidu openvidu;

	private RtcRoomService rtcRoomService;


	public RtcController(RtcRoomService rtcRoomService) {
//		this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
		this.rtcRoomService = rtcRoomService;
	}

	@PostConstruct
	public void init() {
		this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
	}

	/**
	 * @param params The Session properties
	 * @return The Session ID
	 */
	@PostMapping("/api/sessions")
	public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
			throws OpenViduJavaClientException, OpenViduHttpException {
		SessionProperties properties = SessionProperties.fromJson(params).build();
		Session session = session = openvidu.createSession(properties);
		return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
	}

	/**
	 * @param sessionId The Session in which to create the Connection
	 * @param params    The Connection properties
	 * @return The Token associated to the Connection
	 */
	@PostMapping("/api/sessions/{sessionId}/connections")
	public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
			@RequestBody(required = false) Map<String, Object> params)
			throws OpenViduJavaClientException, OpenViduHttpException {
		Session session = openvidu.getActiveSession(sessionId);
		System.out.println(session);
		if (session == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
		Connection connection = session.createConnection(properties);
		return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
	}

	@GetMapping("/api/sessions/getRoom")
	public ResponseEntity<String> getRoom() {
		return ResponseEntity.status(HttpStatus.OK).body(rtcRoomService.findRoom());
	}

	@GetMapping("/api/sessions/{sessionId}/leave")
	public ResponseEntity<?> outRoom(@PathVariable("sessionId") String sessionId) {
		rtcRoomService.leaveSession(sessionId);
		return ResponseEntity.ok().build();
	}
}
