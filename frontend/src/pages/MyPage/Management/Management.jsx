import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Management.module.css'
import customAxios from '../../../util/customAxios';
const containerStyle = {
    maxHeight: '75vh', // Adjust this value as needed
    overflow: 'auto',
};
export default function Management() {
    const [ads, setAds] = useState([]);
    useEffect(() => {
        customAxios.get('/api/ads/wait')
            .then(response => {
                const sortedAds = response.data.sort((a, b) => b.adsId - a.adsId); // Sort by descending order of adsId
                setAds(sortedAds);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const approveAd = (id) => {
        customAxios.put(`/api/ads/confirm/${id}`)
            .then(response => {
                setAds(ads.map(ad =>
                    ad.adsId === id ? { ...ad, adminConfirmed: "APPROVED" } : ad
                ));
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const rejectAd = (id) => {
        customAxios.put(`/api/ads/reject/${id}`)
            .then(response => {
                setAds(ads.map(ad =>
                    ad.adsId === id ? { ...ad, adminConfirmed: "REJECTED" } : ad
                ));
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };
    return (
        <div>
    <div className={styles.titleContainer}>
        <p>광고 승인하기</p>
    </div>
    <div style={containerStyle}>
    {ads.map(ad => {
        let endDate = new Date(ad.endDate);
        endDate.setDate(endDate.getDate() - 1);
        const dateString = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
        return(
        <div key={ad.adsId}>
            <img src={ad.imagePath} alt="Ad" />
            <p>광고 ID:{ad.adsId} || 광고 URL: {ad.redirectUrl} || 광고 날짜: {dateString}까지 &nbsp; &nbsp;
            {ad.adminConfirmed === "PENDING" && (
                <>
                    <button onClick={() => approveAd(ad.adsId)} style={{backgroundColor: 'blue'}}>승인</button>&nbsp;
                    <button onClick={() => rejectAd(ad.adsId)} style={{backgroundColor: 'red'}}>거부</button>
                </>
            )}
            {ad.adminConfirmed === "APPROVED" && (
                <>
                    <button disabled style={{backgroundColor: 'grey'}}>승인</button>&nbsp;
                    <button onClick={() => rejectAd(ad.adsId)} style={{backgroundColor: 'red'}}>거부</button>
                </>
            )}
            {ad.adminConfirmed === "REJECTED" && (
                <>
                    <button onClick={() => approveAd(ad.adsId)} style={{backgroundColor: 'blue'}}>승인</button>&nbsp;
                    <button disabled style={{backgroundColor: 'grey'}}>거부</button>
                </>
            )}
            </p>
        </div>
        )
    })}
    </div>
</div>
    );
}
