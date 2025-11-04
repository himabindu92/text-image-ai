import React, { useState } from 'react'; 
import './index.css'; 

const TextImage = () => { 
     const [text, setText] = useState(''); 
     const [imageUrl, setImageUrl] = useState(''); 
     const [bgColor, setBgColor] = useState('#3f3f3f');
     const[height,setHeight]=useState(250);
     const[width,setWidth]=useState(250);
     const[Loading,setLoading]=useState(false);

    const onImageGenerate = (event) => {
        setText(event.target.value);
    }

    const GeneratedImage = async () => { 
        setLoading(true);
       const url=`https://image.pollinations.ai/prompt/${encodeURIComponent(text)}`; 
       console.log(url)   
       setImageUrl(url) 
       setText('');
       setLoading(false);
    } 

   
   const onimageDownload = async (url) => {
  try {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();

    //  Ensure it's a valid image
    if (!blob.type.startsWith("image/")) {
      alert("This image source does not support direct download. Try right-click → Save image as.");
      return;
    }

    const downloadImageUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
   
    link.href = downloadImageUrl;
    console.log(blob.type);
    console.log(downloadImageUrl);
   

    //  Extract extension safely
    const extension = blob.type.split("/")[1] || "png";
    console.log(extension);
    link.download = `generated-image.${extension}`;
   console.log(link.download);
  
   
    document.body.appendChild(link);
    link.click();
    console.log(link)
    document.body.removeChild(link);

    window.URL.revokeObjectURL(downloadImageUrl);
  } catch (error) {
    console.error("Image download failed:", error);
    alert("Failed to download the image. Try right-click → Save image as.");
  }
};


    const onColorChange = (event) => {
        setBgColor(event.target.value);
    } 

    const changeWidthValue = (event) => {
        setWidth(event.target.value);
    }

    const changeHeightValue = (event) => {
        setHeight(event.target.value);
    }

     return(
        <div className="text-image-container"> 
            <h1 className="heading">Generate Text to Image</h1>
            <input 
                type="text" 
                value={text} 
                onChange={onImageGenerate}
                placeholder="Enter Your Prompt"
                className="text-input"
            />
            <button  className="button"onClick={GeneratedImage}>Generate Image</button> 
   
          

            <div className="background-color-section"> 
                <label className='color-label' >Background Color: </label> 
                <input type="color" className='size-input' onChange={onColorChange}/>  
            </div>
           

             <div className="width-section"> 
            <label className='size-label'>Width Size: {width}px</label>
            <input type="number" className='size-input' placeholder='Width' value={width} onChange={changeWidthValue}/> 
            </div>

            <div className="height-section">
            <label className='size-label'>Height Size: {height}px </label>
            <input type="number" className='size-input' placeholder='Height' value={height} onChange={changeHeightValue}/>
            </div>

            <div className="image-container" style={{backgroundColor: bgColor}}> 
               {Loading && <p className="loading-text">Loading...</p>}
            {imageUrl && <img src={imageUrl} alt="Generated" style={{width:`${width}px`, height:`${height}px`}} className='images'/>}  
             
            <button className="button" onClick={() => onimageDownload(imageUrl)}>
            Download
            </button>

            </div>
        </div>

     )




} 


export default TextImage;
