import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import customAxios from "../../util/customAxios";
import Swal from 'sweetalert2';

export default function Suggestion({show, handleClose}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!title || !content) {
        Swal.fire({
          icon: 'warning',
          title: '제목과 내용 모두 입력해 주세요',
        });
        return;
      }

      const date = new Date().toISOString().split('T')[0];
      try {
        const response = await customAxios.post("/api/suggestions", {
          title: title,
          content: content,
          createdDate: date,
        });
        if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: '성공적으로 건의되었습니다',
            });
            handleClose();
            setTitle('');
            setContent('');
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
        <Modal.Header closeButton>
          <Modal.Title>건의하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>제목</Form.Label>
              <Form.Control type="text" value={title} onChange={handleTitleChange} required />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" rows={3} value={content} onChange={handleContentChange} required />
            </Form.Group>
  
            <Button variant="primary" type="submit">확인</Button>
            <Button variant="secondary" onClick={handleClose}>취소</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
}