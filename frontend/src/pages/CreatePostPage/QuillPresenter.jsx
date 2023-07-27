import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled  from 'styled-components';

const Container = styled.div`
    height : 700px;
`;

const QuillPresneter = (props) => {
  const {value, modules, formats, onChangeValue } = props;

  return (
    <Container>
      <ReactQuill 
          id="react-quill"
          value={value}
          onChange={onChangeValue}
          modules={modules}
          formats={formats}
          selection={{ start: 0, end: 0 }}
          theme="snow"
          style={{height:'100%'}}
      />
    </Container>
  );
};

export default QuillPresneter;