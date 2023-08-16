import styles from "./Suggestion.module.css";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import customAxios from "../../util/customAxios";
import Swal from "sweetalert2";
import mobile_logo from "./../../assets/images/mobile_logo.png";
import { FcAssistant } from "@react-icons/all-files/fc/FcAssistant";

export default function Suggestion({ show, handleClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      Swal.fire({
        icon: "warning",
        title: "제목과 내용 모두 입력해 주세요",
      });
      return;
    }

    const date = new Date().toISOString().split("T")[0];
    try {
      const response = await customAxios.post("/api/suggestions", {
        title: title,
        content: content,
        createdDate: date,
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "성공적으로 건의되었습니다",
        });
        handleClose();
        setTitle("");
        setContent("");
      } else {
        // Handle errors
      }
    } catch (error) {
      // Handle errors
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header style={{ padding: "0.5rem 1rem" }} closeButton>
        <Modal.Title className={styles.title}>
          <img
            src={mobile_logo}
            alt="mobile_logo"
            width={35}
            className="me-2"
          />
          <p style={{ margin: "0" }}>언오피셜 건의함</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: " 1.5rem 1.5rem" }}>
        <div className={styles.cautionContainer}>
          <p>
            언오피셜에 이 양식이 제출됩니다. 비밀번호와 같은 중요한 개인 정보가
            노출되지 않도록 주의해주세요.
          </p>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label className={styles.inputLabel}>제목</Form.Label>
            <Form.Control
              type="text"
              value={title}
              style={{ borderRadius: "0", fontSize: "13px" }}
              onChange={handleTitleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={styles.inputLabel}>
              건의하실 내용을 입력해주세요.
            </Form.Label>
            <Form.Control
              as="textarea"
              resize="none"
              rows={3}
              value={content}
              style={{ borderRadius: "0", fontSize: "13px" }}
              onChange={handleContentChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-light btn-sm me-2"
              onClick={() => handleClose()}
            >
              뒤로가기
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              제출하기
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
