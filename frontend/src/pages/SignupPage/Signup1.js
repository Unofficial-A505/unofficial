/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Signup.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLocal, setGen } from "./../../store/signupSlice";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Signup1() {

  let user = useSelector((state) => state.user)

  useEffect(() => {
    if (!user.agreed) {
      navigate('/signup')
    }
  }, [])

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let [selectedLocal, setSelectedLocal] = useState("");
  let [selectedGen, setSelectedGen] = useState("");
  
  const handleLocalChange = (event) => {
    setSelectedLocal(event.target.value);
  };
  const handleGenChange = (event) => {
    setSelectedGen(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedLocal || !selectedGen) {
      alert("지역과 기수를 선택해주세요.");
    }

    dispatch(setLocal(selectedLocal));
    dispatch(setGen(selectedGen));
    navigate("/signup/register");
  };

  return (
    <form id={styles.container} onSubmit={handleSubmit}>
      <h2>언오피셜 회원가입</h2>
      <p className="my-0">
        언오피셜 계정으로 <b>점심식단, 자유게시판</b>등
      </p>
      <p className="my-0">다양한 교육생 서비스를 모두 이용하실 수 있습니다.</p>
      <br />
      <h2>선택</h2>
      <p className="mt-0 mb-3" style={{ color: "red" }}>
        선택한 지역과 기수는 이후 변경이 불가합니다.
      </p>

      <FormControl sx={{ m: 0, minWidth: "100%" }} size="small" className="mb-4">
        <InputLabel id="demo-select-small-label">지역</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={selectedLocal}
          label="지역"
          onChange={handleLocalChange}
        >
          <MenuItem value="">
            <em>지역을 선택하세요</em>
          </MenuItem>
          <MenuItem value="서울">서울 캠퍼스</MenuItem>
          <MenuItem value="대전">대전 캠퍼스</MenuItem>
          <MenuItem value="구미">구미 캠퍼스</MenuItem>
          <MenuItem value="광주">광주 캠퍼스</MenuItem>
          <MenuItem value="부울경">부울경 캠퍼스</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 0, minWidth: "100%" }} size="small" className="mb-4">
        <InputLabel id="demo-select-small-label">기수</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={selectedGen}
          label="지역"
          onChange={handleGenChange}
        >
          <MenuItem value="">
            <em>기수를 선택하세요</em>
          </MenuItem>
          <MenuItem value="1">1기</MenuItem>
          <MenuItem value="2">2기</MenuItem>
          <MenuItem value="3">3기</MenuItem>
          <MenuItem value="4">4기</MenuItem>
          <MenuItem value="5">5기</MenuItem>
          <MenuItem value="6">6기</MenuItem>
          <MenuItem value="7">7기</MenuItem>
          <MenuItem value="8">8기</MenuItem>
          <MenuItem value="9">9기</MenuItem>
          <MenuItem value="10">10기</MenuItem>
        </Select>
      </FormControl>

      <input type="submit" value="다음" />
    </form>
  );
}
