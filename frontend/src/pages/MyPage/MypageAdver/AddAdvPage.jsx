import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AddAdvPage.module.css';

function AddAdvPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [redirectUrl, setRedirectUrl] = useState("");
    const [duration, setDuration] = useState("");
    const [adsCost, setAdsCost] = useState("");
    const userId = 1;
    const [inputKey, setInputKey] = useState(Date.now());

    const onFileChange = event => {
        if (event.target.files.length === 0) {
            console.log("No file selected");
            return;
        }

        const file = event.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            if (file.type === 'image/gif') {
                const img = new Image();
                img.onload = function() {
                    if (this.width !== 970 || this.height !== 120) {
                        alert("GIF image size must be 970x120.");
                        setInputKey(Date.now());
                        return;
                    } else {
                        setSelectedFile(file);
                        setPreview(reader.result);
                    }
                }
                img.src = e.target.result;
            } else {
                // Checking and preparing the image file for preview
                const img = new Image();
                img.src = e.target.result;
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    canvas.width = 970;
                    canvas.height = 120;

                    const x = this.width > canvas.width ? (this.width - canvas.width) / 2 : 0;
                    const y = this.height > canvas.height ? (this.height - canvas.height) / 2 : 0;

                    ctx.drawImage(this, x, y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                    setPreview(canvas.toDataURL());
                };
                
            }
        };
        reader.readAsDataURL(file);
    };

    const closeWindow = () => {
      window.close();
    };

    const uploadToServer = async () => {
        const formData = new FormData();
        return fetch(preview)
            .then(res => res.blob())
            .then(blob => {
                const fileType = blob.type.split('/')[1]; // Get the file type from the MIME type
                const file = new File([blob], `FileName.${fileType}`, { type: blob.type });
                formData.append('file', file);
                return axios.post('http://localhost:8080/api/ads/upload', formData);
            })
            .then(res => {
                console.log(res.data);
                return res.data;
            })
            .catch(err => {
                console.log(err);
                throw err; // Throw the error to be caught by the submitForm function
            });
    };

    const onRedirectUrlChange = event => {
        setRedirectUrl(event.target.value);
    };

    const onDurationChange = event => {
      const value = event.target.value;
      if (value < 0) {
          alert('Duration cannot be negative.');
          event.target.value = 0;
          return;
      }
      setDuration(value);
      setAdsCost(value * 100);
  };

    useEffect(() => {
        setAdsCost(duration * 100);  // update adsCost whenever duration changes
    }, [duration]);

    const submitForm = async (event) => {
        event.preventDefault();

        try {
            const uploadedImagePath = await uploadToServer();
            let endDate = new Date();
            endDate.setDate(endDate.getDate() + parseInt(duration));

            const adData = {
                imagePath: uploadedImagePath,
                redirectUrl: redirectUrl,
                endDate: endDate.toISOString(),
                adminConfirmed: false,
                adsCost: adsCost,
                userId: userId
            };

            await axios.post('http://localhost:8080/api/ads', adData)
                .then(res => {
                    console.log(res.data);
                    alert("광고 등록이 성공적으로 완료되었습니다.");
                    closeWindow();
                })
                .catch(err => {
                    console.log(err);
                    alert("광고 등록 중 오류가 발생했습니다.");
                });

        } catch (err) {
            alert("Image upload failed. Please try again.");
        }
    };

    return (
        <div className={styles.AdvformContainer}>
            <div className={styles.AdvformBox}>
                <h1>광고 신청</h1>

                <div className={styles.AdvSelect}>
                    <div>광고 파일 선택</div>
                    <input type="file" key={inputKey} onChange={onFileChange} />
                </div>
                
                <div className={styles.image_preview_container}>
                  {preview && <img src={preview} alt="Preview" />}
                </div>
                <div className={styles.Advurl}>
                    <div>연결할 주소 &nbsp;&nbsp; <input style={{width:'300px'}} type="text" placeholder="연결할 주소를 입력해주세요" onChange={onRedirectUrlChange} /></div>
                </div>

                <div className={styles.Advurl}>
                    <div>광고진행 기간&nbsp;&nbsp; <input style={{width:'300px'}} type="number" placeholder="여기 date selector 넣기" onChange={onDurationChange} /></div>
                    
                </div>

                <div className={styles.Advurl}>
                    <div>광고진행 마일리지&nbsp;&nbsp;  <input type="number" value={adsCost} readOnly /></div>
                </div>

                <div>
                    <button style={{backgroundColor: 'skyblue', color:"#ffffff"}} onClick={submitForm}>광고 신청</button> &nbsp;
                    <button style={{backgroundColor: '#ffffff'}} onClick={closeWindow}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default AddAdvPage;
