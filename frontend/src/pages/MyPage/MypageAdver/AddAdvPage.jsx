/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./AddAdvPage.module.css";
import customAxios from "../../../util/customAxios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useDocumentTitle from "../../../useDocumentTitle";

export default function AddAdvPage() {
  useDocumentTitle("광고신청");

  const authUser = useSelector((state) => state.authUser);
  const accessToken = authUser.accessToken;

  useEffect(() => {
    if (!accessToken) {
      alert("로그인 후에 사용해 주세요.");
      navigate("/");
      return;
    }
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [adsCost, setAdsCost] = useState("");
  const [userId, setUserId] = useState(null);
  const [userPoint, setUserPoint] = useState(null);
  const [inputKey, setInputKey] = useState(Date.now());
  const navigate = useNavigate();
  const onFileChange = (event) => {
    if (event.target.files.length === 0) {
      console.log("광고 이미지가 없습니다.");
      return;
    }

    const file = event.target.files[0];
    // 파일 크기 확인
    if (file.size > 5 * 1024 * 1024) { // 5MB를 초과하는 경우
      alert("파일 크기가 5MB를 초과할 수 없습니다.");
      setInputKey(Date.now()); // 입력 필드를 초기화
      return; // 함수 종료
    }
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (file.type === "image/gif") {
        const img = new Image();
        img.onload = function () {
          if (this.width !== 920 || this.height !== 120) {
            alert("GIF이미지는 반드시 920x120의 크기여야 합니다.");
            setInputKey(Date.now());
            return;
          } else {
            setSelectedFile(file);
            setPreview(reader.result);
          }
        };
        img.src = e.target.result;
      } else {
        // Checking and preparing the image file for preview
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = 920;
          canvas.height = 120;

          const x =
            this.width > canvas.width ? (this.width - canvas.width) / 2 : 0;
          const y =
            this.height > canvas.height ? (this.height - canvas.height) / 2 : 0;

          ctx.drawImage(
            this,
            x,
            y,
            canvas.width,
            canvas.height,
            0,
            0,
            canvas.width,
            canvas.height
          );
          setPreview(canvas.toDataURL());
        };
      }
    };
    reader.readAsDataURL(file);
  };

  const closeWindow = () => {
    navigate("/user/advertisement/myadv");
  };

  const uploadToServer = async () => {
    const formData = new FormData();
    return fetch(preview)
      .then((res) => res.blob())
      .then((blob) => {
        const fileType = blob.type.split("/")[1]; // Get the file type from the MIME type
        const file = new File([blob], `FileName.${fileType}`, {
          type: blob.type,
        });
        formData.append("file", file);
        return customAxios.post("/api/ads/upload", formData);
      })
      .then((res) => {
        // console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw err; // Throw the error to be caught by the submitForm function
      });
  };

  const onRedirectUrlChange = (event) => {
    setRedirectUrl(event.target.value);
  };

  const onDurationChange = (event) => {
    const value = event.target.value;

    if (value && !/^\d+$/.test(value)) {
      alert("정수만 입력 가능합니다.");
      event.target.value = duration;
      return;
    }
    if (value < 0) {
      alert("음수는 불가능 합니다.");
      event.target.value = 1;
      return;
    }
    setDuration(value);
    setAdsCost(value * 100);
  };
  useEffect(() => {
    setAdsCost(duration * 100); // update adsCost whenever duration changes
  }, [duration]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await customAxios.get("/api/users/user"); // You need to adjust this endpoint
        setUserId(response.data.id);
        setUserPoint(response.data.point);
        //console.log("User ID:", response.data.id);
        //console.log("User Point:", response.data.point);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchUserInfo();
  }, []); // Only fetch user info once

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      if (!selectedFile) {
        alert("이미지를 먼저 업로드해주세요.");
        return; // Return early to stop the rest of the function
      }

      if (adsCost > userPoint) {
        alert(
          "광고 비용이 현재 사용 가능한 포인트보다 높습니다. 광고 비용을 조정해주세요."
        );
        return; // Return early to stop the rest of the function
      }
      if (duration === "0" || duration === 0) {
        alert("광고 기간은 0일일 수 없습니다.");
        return; // Return early to stop the rest of the function
      }
      const uploadedImagePath = await uploadToServer();
      let endDate = new Date();
      endDate.setDate(endDate.getDate() + parseInt(duration) + 1);

      const adData = {
        imagePath: uploadedImagePath,
        redirectUrl: redirectUrl,
        endDate: endDate.toISOString(),
        adminConfirmed: "PENDING",
        adsCost: adsCost,
        userId: userId,
      };

      await customAxios
        .post("/api/ads", adData)
        .then((res) => {
          alert("광고 등록이 성공적으로 완료되었습니다.");
          closeWindow();
        })
        .catch((err) => {
          console.log(err);
          alert("광고 등록 중 오류가 발생했습니다.");
        });
    } catch (err) {
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.AdvformContainer}>
      <div className={styles.mypageNavContainer}>
        <div className={styles.AdvformBox}>
          <h3 className="mb-5">광고 신청</h3>

          <div className={styles.AdvSelect}>
            <label for="formFile" class="form-label">
              광고 파일 선택
            </label>
            <input
              className="form-control form-control-sm"
              type="file"
              id="formFile"
              key={inputKey}
              onChange={onFileChange}
            />
          </div>
          <div className={styles.image_preview_container}>
            {preview ? (
              <img src={preview} alt="Preview" />
            ) : (
              <p>제한 크기 : 5MB, 920 X 120px ( .jpg / .gif / .png / .jpeg )</p>
            )}
          </div>

          <div className="row g-3 align-items-center mb-2">
            <div className="col-auto">
              <label for="inputAddress" className="col-form-label">
                연결하는 주소
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                id="inputAddress"
                className="form-control form-control"
                placeholder="(선택)  ex) https://www.naver.com"
                onChange={onRedirectUrlChange}
              />
            </div>
          </div>

          <div className="row g-3 align-items-center mb-2">
            <div className="col-auto">
              <label for="advDays" className="col-form-label">
                광고 기간 (일)
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                id="advDays"
                className="form-control form-control"
                placeholder="(필수)  ex) 3"
                onChange={onDurationChange}
              />
            </div>
          </div>

          <div className="row g-3 align-items-center mb-2">
            <div className="col-auto">
              <label for="myMileage" className="col-form-label">
                나의 마일리지
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                id="myMileage"
                className="form-control form-control"
                value={userPoint}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="row g-3 align-items-center mb-5">
            <div className="col-auto">
              <label for="myMileage" className="col-form-label">
                필요 마일리지
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                id="myMileage"
                className="form-control form-control"
                value={adsCost}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-1">
              언오피셜 마일리지를 소모하여 유저광고를 집행합니다.
            </p>
            <p className="mb-1">
              부적절한 유저광고는 광고 집행 임의 중단이나 계정 차단 등 언오피셜
              이용에 불이익을 받을 수 있습니다.
            </p>
            <p className="mb-1">광고는 관리자의 승인 후 게시가 진행됩니다.</p>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-light btn-sm mx-2"
              onClick={() => {
                navigate("/user/advertisement/myadv");
              }}
            >
              신청 취소
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm mx-2"
              onClick={submitForm}
            >
              광고 신청
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
