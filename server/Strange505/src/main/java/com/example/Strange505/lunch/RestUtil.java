package com.example.Strange505.lunch;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import javax.naming.AuthenticationException;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class RestUtil {

    private static WebClient webClient;
    private static final WebClient EduSsafyClient = WebClient.builder()
            .baseUrl("https://project.ssafy.com/ssafy/api/auth/signin")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE)
            .build();

    public static String requestPostGetHeader(String url, String path, Map<String, String> payloads) throws Exception {

        webClient = WebClient.create(url);

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        for (String key : payloads.keySet()) {
            formData.add(key, payloads.get(key));
        }

        ClientResponse response = webClient.post()
                .uri(path)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(formData))
                .exchange()
                .block();
        return response.headers().asHttpHeaders().get("set-cookie").get(0);
    }

    public static String requestPost(String url, String path, Map<String, String> headers, Map<String, String> payloads) throws Exception {
        String responseMessage = null;
        webClient = WebClient.builder()
                .baseUrl(url)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE)
                .build();

        ObjectMapper mapper = new ObjectMapper();
        try {
            responseMessage = webClient.post()
                    .uri(path)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(mapper.writeValueAsString(payloads)))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (WebClientResponseException ex) {
            responseMessage = ex.getResponseBodyAsString(StandardCharsets.UTF_8);
        }
        return responseMessage;
    }

    public static String eduSsafyLogin(Map<String, String> payloads) throws Exception {
        String responseMessage = null;
        ObjectMapper mapper = new ObjectMapper();
        try {
            responseMessage = EduSsafyClient.post()
                    .body(BodyInserters.fromValue(mapper.writeValueAsString(payloads)))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (WebClientResponseException ex) {
            responseMessage = ex.getResponseBodyAsString(StandardCharsets.UTF_8);
        }
        return responseMessage;
    }

    public static String requestGet(String apiUrl, Map<String, String> header) throws Exception {
        HttpURLConnection conn = null;
        StringBuffer response = new StringBuffer();

        //URL 설정
        URL url = new URL(apiUrl);
        conn = (HttpURLConnection) url.openConnection();

        //Request header 설정
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-Type", "application/json");


        for (String key : header.keySet()) {
            conn.setRequestProperty(key, header.get(key));
        }

        //request에 JSON data 준비
        conn.setDoOutput(true);

        //보내고 결과값 받기
        int responseCode = conn.getResponseCode();

        if (responseCode == 400) {
            System.out.println("400:: 해당 명령을 실행할 수 없음");
        } else if (responseCode == 401) {
            System.out.println("401:: Authorization가 잘못됨");
        } else if (responseCode == 500) {
            System.out.println("500:: 서버 에러, 문의 필요");
            throw new AuthenticationException();
        } else { // 성공 후 응답 JSON 데이터받기

            Charset charset = Charset.forName("UTF-8");
            BufferedReader br = new BufferedReader(new InputStreamReader((InputStream) conn.getContent(), charset));

            String inputLine;
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
        }
        conn.disconnect();

        return response.toString();
    }
}
