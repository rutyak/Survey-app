import Navbar from '../Navbar/Navbar'
import './Survey.css'
import DrawerExample from '../Drawer/DrawerExample'
import { useEffect, useState } from 'react'
import axios from 'axios'
const BaseUrl = 'http://localhost:5000';

const Survey = () => {

  type questionType ={
    options: string[],
    question: string,
    type: string
  }

  type formType={
    desc: string,
    title: string,
    type: string,
    _id: string,
    stage: string,
    questions: questionType
  }

  type videoType={
    desc: string,
    title: string,
    type: string,
    videoType: string,
    videoUrl: string,
    _id: string,
    stage: string,
  }

  type imageType={
    desc: string,
    title: string,
    type: string,
    imageFile: string[],
    _id: string,
    stage: string,
  }


  const [video, setVideo] = useState<videoType[]>();
  const [image, setImage] = useState<imageType[]>();
  const [form, setForm] = useState<formType[]>();

  useEffect( ()=>{
     axios.get(`${BaseUrl}/videoData`).then((response) => setVideo(response.data.data))
     axios.get(`${BaseUrl}/imageData`).then((response)=> setImage(response.data.data))
     axios.get(`${BaseUrl}/formData`).then((response) => setForm(response.data.data))
  },[])

  console.log("vInfo",video);
  console.log("iInfo",image);
  console.log("fInfo",form);

   

  return (
    <div className='surveyContainer'>
      <Navbar />
      <div className='survey-container' data-testid='survey-container'>
        <div className='formBlock'>
          <h2>Forms</h2>
          <div className="fBlock">
            {form?.map((form: any, i: number) => (
              <div className='formSurvey'>
                <p>{form.title}<DrawerExample data={form} /> </p>
              </div>
            ))
            }
          </div>
        </div>
        <div className='videoBlock'>
          <h2>Videos</h2>
          <div className="vBlock">
            {video?.map((video: any, i: number) => (
              <div className='videoSurvey'>
                <p>{video.title}<DrawerExample data={video} /></p>
              </div>
            ))}
          </div>

        </div>
        <div className='imageBlock'>
          <h2>Images</h2>
          <div className="iBlock">
            {image?.map((img: any, i: number) => (
              <div className='imgSurvey'>
                <p>{img.title}<DrawerExample data={img} /></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Survey