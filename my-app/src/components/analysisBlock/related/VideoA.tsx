import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import './VideoA.css'
import { useParams } from 'react-router-dom'
const BaseUrl = 'http://localhost:5000'


const Video = () => {

  const param = useParams();
  const videoId = param.videoId;
  console.log("videoId: ", videoId)
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [start, setStart] = useState<string>();
  const [end, setEnd] = useState<string>();

  function handleAnswer(start: string, end: string) {
    setStart(start);
    setEnd(end);

    if (videoRef.current) {
      const video = videoRef.current;
      console.log("videoRef: ", video)

      const onTimeUpdate = () => {
        const endTime = Number(end);
        if (video.currentTime >= endTime) {
          video.pause();
        }
      }
      const startTime = Number(start);
      video.currentTime = startTime;

      video.addEventListener('timeupdate', onTimeUpdate)

      return () => {
        video.removeEventListener('timeupdate', onTimeUpdate);
      }
    }

  }


  console.log(start, end);

  type ansType = {
    start: string,
    end: string
  }

  type videoAType = {
    desc: string,
    title: string,
    type: string,
    name: string,
    videoType: string,
    videoUrl: string,
    _id: string,
    stage: string,
    answer: ansType[],
  }

  const [videoA, setVideoA] = useState<videoAType[]>()

  useEffect(() => {
    axios.get(`${BaseUrl}/videoAnsData`).then(response => setVideoA(response.data.data))
  }, [])

  console.log("anaVideo", videoA)


  return (
    <div className='video-img-form-user-res'>
      <Navbar />
      <div className="video-img-from-res">
        <div>
          <h1>User response on video!!</h1>
        </div>
        <div className='video-res-container'>
          {
            videoA?.map((video: videoAType, i: number) => (
              video.title.trim() === videoId?.trim() ? (
                <div key={i} className='video-flex'>
                  <div className='res'>
                    <b className="response">Response by : {video.name}</b>
                  </div>
                  <div key={i}>
                    <video ref={videoRef} width="450px" controls onPlay={() => handleAnswer(video.answer[0].start, video.answer[0].end)}>
                      <source src={video.videoUrl} type={`video/${video.videoType}`} />
                    </video>
                    <p>User Like The Video From {video.answer[0].start}s to {video.answer[0].end}s</p>
                  </div>
                </div>
              ) : ''
            )
            )
          }
        </div>

      </div>
    </div>
  )
}

export default Video
