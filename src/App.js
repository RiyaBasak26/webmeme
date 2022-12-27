import './App.css';
import React, { useRef, useState,createRef } from "react";
import Divider from '@mui/material/Divider';
import { Button } from 'antd';
import { BsFolderPlus } from 'react-icons/bs';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { RiTShirt2Line } from 'react-icons/ri';
import { AiOutlineStar } from 'react-icons/ai';
import { BiImage } from 'react-icons/bi';
import { VscGraphLine } from 'react-icons/vsc';
import { AiOutlineFileWord } from 'react-icons/ai';
import { RxColorWheel } from 'react-icons/rx';
import { Input,Space,Slider ,Radio,Checkbox ,InputNumber } from 'antd';
import { useScreenshot } from 'use-react-screenshot'
import WebCam from './Components/WebCam';
import Modal from "react-modal";


// import { SketchPicker } from 'react-color';
import Select from 'react-select';



function App() {
  const { TextArea } = Input;
  const ref = useRef();
  const inputRef = useRef();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [src, setSrc] = useState("");
  const [inputText, setInputText] = useState("");
  const [fontSize, setFontSize] = useState(20);
  const [value, setValue] = useState(1);
  const [width, setWidth] = useState(300);
  const [height, setHeigth] = useState(300);
  const [fontFamily, setFontFamily] = useState('');
  const [transform,setTransform]= useState(0)
  const [rotate,setRotate]= useState(0)
  const [fontColor,setFontColor]= useState("")
  const [radioValue, setRadioValue]=useState(true)
  const [lineGap ,setLineGap]=useState(1.3)
  const [cameraOpen, setCameraOpen]=useState(false)
  const options = [
    { value: 'SimHei', label: 'SimHei' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'cursive', label: 'cursive' },
    { value: 'fantasy', label: 'fantasy' },
    { value: 'monospace', label: 'monospace' },
    { value: 'revert', label: 'revert' },
  ];
  const marks = {
    0: "0px",
    100: "100px",
   
  };
  const secondMark= {
    0: '0°C',
    90: '90°C',
    180: '180°C',
    360: {
      label: <strong>360°C</strong>,
    },
  };
  const [image, takeScreenshot] = useScreenshot()
  const getImage = () => 
  {

    if(src)
    {
    console.log("image",image)
    setDownloadModal(true)
    takeScreenshot(ref.current)
    }
    else
    {
      alert('Please select a image')
    }
  }



  const selectImage = (file) => {
    setSrc(URL.createObjectURL(file));
  };

  const triggerFileSelectPoper = () => inputRef.current.click();

  const getTextFromInput = event => {
    setInputText(event.target.value);
  };

  const onChange = (e) => {
  
    setValue(e.target.value);
  };
  const onChangeFontSize=(e)=>{

    setFontSize(e)
  }
  const getImageDivWidth=(e)=>{
    // console.log(e);
    setWidth(e)

  }
  const getImageDivHeight=(e)=>{
    // console.log(e);
    setHeigth(e)
  }
  const onChangeDropdown=(e)=>{
    console.log(e.value);
    setFontFamily(e.value);
  }
  function closeModal() {
    setIsOpen(false);
    setCameraOpen(false);
  }
  const openModal=()=>{
    setIsOpen(true);
    setCameraOpen(true)
  }
  const rotateImage=(e)=>{
    setTransform(e)
    console.log(e)
  }
  const flipImage=(e)=>{
    setRotate(e)
  }
  const onChangeRadio=(e)=>{
    
    setRadioValue(e.target.value)
  }
   const getColor=(e)=>{
    setFontColor(e.target.value)
   }
   const onChangeIndependentText=(e)=>{
    
    if(e.target.checked=== true)
    {

      setLineGap( 1.8)
      console.log('radio checked true', e);
    }
    else
    {
      console.log('radio checked false', e);
      setLineGap(1)
    }
   }
  return (
    <div className="App">
     <div className='header'>

     <Divider className='divider'/>
     <h2 className='headerName'>react-meme-genetor</h2>
     <Divider className='divider' />
     </div>
     <div className='body'>
      <div className='leftBody'>
        <div className='imageDiv' style={{width:`${width}px`, height:`${height}px`}} ref={ref}>
          {src && <img src={src} alt='' className='imageWidth' style={{ transform: radioValue ? `rotate(${transform}deg) rotateX(${rotate}deg) rotateY(0deg) scale(1)`:`rotate(${transform}deg) rotateX(0deg) rotateY(${rotate}deg) scale(1)`}}/>}
       <div className='imageText' style={{fontSize:`${fontSize}px`, fontFamily:`${fontFamily}`,color:`${fontColor}`,lineHeight:`${lineGap}`}}>{inputText}</div>
        </div>
        <div className='buttonDiv'>
        <input
          type="file"
          onChange={(e) => {
            selectImage(e.target.files[0]);
          }}
          accept="image/*"
          ref={inputRef}
          style={{ display: "none" }}
        />
        <Button className='selectImgBtn' type="dashed"  onClick={triggerFileSelectPoper}><BsFolderPlus className='maginBtn'/>Select Image</Button>
        <Button className='selectImgBtn'type="dashed" onClick={openModal}><AiOutlineVideoCamera className='maginBtn'/> Use Camera</Button>
        <Modal isOpen={modalIsOpen}>
                <button onClick={closeModal} className='closeBtn'>x</button>
              {setCameraOpen && <WebCam setSrc={setSrc}/>}
            </Modal>
        </div>
        <div>
        </div>
      </div>
      
      <div className='rightBody'>
        <div className='textInputArea'>
        <Button className='selectImgBtn'type="dashed"><BsPencil className='maginBtn'/> Word</Button>
      
      <TextArea onChange={getTextFromInput} className="textInputWidth"/>
      </div>
      <div className='independentCheckbox'>
      <Checkbox onChange={onChangeIndependentText}>Independent control of each line of text</Checkbox>;
      </div>
      <div className='textInputArea'>
      <Button className='selectImgBtn'type="dashed"><AiOutlineFileAdd className='maginBtn'/> font</Button>
      <Select
        className="textInputWidth"
        options={options}
        onChange={onChangeDropdown}
      />
      
      </div>
      <div className='textInputArea' style={{justifyContent:'start'}}>
      <Button className='selectImgBtn'type="dashed"><RxColorWheel className='maginBtn'/> Text Color</Button>
      <div style={{ marginLeft:'9%'}}>
       <input type="color" onChange={getColor} className='colorInput'/>
      </div>
      
      </div>
      <div className='textInputArea'>
      <Button className='selectImgBtn'type="dashed"><VscGraphLine className='maginBtn'/> Size of picture</Button>
      <Space>
    <InputNumber addonBefore="width" addonAfter="px" defaultValue="300" onChange={getImageDivWidth}  />
    <InputNumber addonBefore="hight" addonAfter="px" defaultValue="300"  onChange={getImageDivHeight}/>
    </Space>
      </div>
      <div className='textInputArea'>
      <Button className='selectImgBtn'type="dashed"><AiOutlineFileWord className='maginBtn'/> Font Size</Button> 
      <Slider marks={marks}  defaultValue={20} style={{width:'75%'}} onChange={onChangeFontSize} />
      </div>
      <div className='textInputArea'>
      <Button className='selectImgBtn'type="dashed"><BiImage className='maginBtn'/> Image Rotate</Button> 
      <div style={{width:'75%'}}>
      <Slider marks={secondMark}  defaultValue={0} min={0} max={360} onChange={rotateImage}/>
      </div>
      </div>
      <div className='textInputArea'>
      <Button className='selectImgBtn'type="dashed"><AiOutlineShareAlt className='maginBtn'/> Image flip</Button> 
      <div style={{width:'55%'}}>
      <Slider marks={secondMark}  defaultValue={0}  min={0} max={360} onChange={flipImage}/>
      </div>
      <div>
      <Radio.Group onChange={onChangeRadio} value={radioValue}>
      <Space direction="vertical">
        <Radio value={true}>X-axis filp</Radio>
        <Radio value={false}>Y-axis filp </Radio>
        </Space>
        </Radio.Group>
      </div>
      </div>
      <div className='textInputArea' style={{justifyContent:'start'}}>
      <Button className='selectImgBtn'type="dashed"><RiTShirt2Line className='maginBtn'/> Image Compression</Button> 
      <Checkbox onChange={onChange}>Compression</Checkbox>
      </div>
      <div className='textInputArea' >
      <Space wrap>
          <Button type="primary" icon={<AiOutlineStar />} style={{width: '475%'}}  onClick={getImage} >
            Generate Emotions
          </Button>
          <Modal isOpen={downloadModal}>
                <button onClick={()=>setDownloadModal(false)} className='closeBtn'>x</button>
                <div className='modalImg'>
                 <img src={image} alt=""/>
                 </div>
                 <div className='modalDiv'>
                  
                 <Button href={image} download="download" target='_blank'>download</Button>
                 <Button   onClick={()=>setDownloadModal(false)}>Close</Button>
                 </div>
            </Modal>
        </Space>
      </div>
      </div>
     </div>
    </div>
  );
}

export default App;
