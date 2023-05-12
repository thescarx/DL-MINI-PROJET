import {ImSortNumbericDesc} from "react-icons/im"
import {FaRobot} from "react-icons/fa"
import { useTranslation } from "react-i18next";
import { useContext,useState } from "react";
import { DarkModeContext } from "./components/DarkMode/darkmode";
import {BsFillMoonFill, BsFillSunFill} from "react-icons/bs"

import api from './api';

let gg = []
function App() {
const [x, setX] = useState([]);
const [loading,setLoading] = useState(false)
const[firstTime,setFirstTime] = useState(true)
 const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };


  const callapi = (number)=>{
    setFirstTime(false)
    api.get(`/generate_images/${number}`)
                        .then(data => {
                            for (const image of data.data.images) {
                                const img = document.createElement("img");
                                img.src = "data:image/png;base64," + image;
                                gg.push(img)
                                console.log(gg)
                            }
                            setX(gg)
                        }).then(setLoading(false))
  .catch(error => console.error(error));
  }



  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)
  const {t , i18n} = useTranslation()
  return (
    <div className=" flex flex-col px-8 justify-center items-center" >
       <h1 className={`${darkMode ? 'text-white' : 'text-black'} font-bold text-[40px] `} >{t('How to use the image generator')}</h1>
       <div className=" flex flex-row justify-center items-center " >
        <p className=" text-blue-700 flex flex-row gap-2 font-semibold justify-center items-center" > <span> {t('Choose a number')} </span> <ImSortNumbericDesc/> </p> 
        <div class="h-[1px] mx-4 w-[200px] bg-blue-700 bg-opacity-20">
</div>
        <p className=" flex flex-row justify-center items-center gap-2 text-blue-700 font-semibold " > <span>{t('AI processing')}</span>  <FaRobot/> </p>

       </div>

       <div className=" my-10 sm:flex-row flex-col gap-8  h-[90vh] w-full px-16 flex" >
        <div className=" flex flex-col justify-center items-center gap-8 w-[50%]"  >
          <div className="flex  backdrop-blur rounded-[8px]  justify-center items-center h-[60%] w-full" style={{color:darkMode ? "white":'black'}} >
            {t("In our web app, you can provide a simple number 'n' as input and the GAN model will generate a matrix of 'n' by 'n' images that are created randomly from the trained images. These generated images are not exact copies of the original images, but rather unique variations created by the GAN model. The more images the model is trained on, the better quality and diversity of the generated images.")}
            

         
          

          </div>
          <div className="  flex flex-col justify-start items-center w-[60%]" >
            <div className=" w-full  flex justify-start items-center" >
            <label htmlFor="" style={{color:darkMode ? "white":'black'}}>{t('Number :')}</label>

            </div>
            
            <input   className=" outline-none rounded-[4px] py-1 w-full px-4 border-[1px] border-[#000]"  placeholder={t("Enter a number")} type="number" 
            value={value} onChange={handleChange}  />
          </div>

          <div className=" w-[60%] " >
            <button className=" text-white font-semibold bg-blue-600 w-full rounded-[4px] px-4 py-2 "onClick={()=> {callapi(value)}} >{t('Start the process')} </button>
          </div>


        </div>
        <div className=" min-h-screen max-h-screen overflow-scroll w-[50%]  py-5 " >
          <div className=" flex justify-center items-center bg-gradient-to-r text-white font-bold from-orange-500 via-orange-500/50 to-orange-500/0" >
          <p className=" text-[25px]" >{t('Output')}</p>
          </div>
          {firstTime && <div className=" h-[80%] flex flex-row gap-4 flex-wrap" >
            Start the process so you can see the output here.
           

          </div> }
          {!firstTime && loading && <div className=" h-[80%] flex flex-row gap-4 flex-wrap" >
            Loading ...
           

          </div>}
          {!firstTime && !loading &&
          <div className=" min-h-screen flex flex-row gap-2 py-5 flex-wrap" >
          
          
          
          {x.map((img,index)=>{
            return(
              
            <img src={img.currentSrc} alt="" className=" w-[45%] h-[250px] object-cover  " />
          
            )
          })
}
          </div>
           }
            
          

        </div>

        <div className="flex flex-col justify-center items-center">
          {darkMode ? <BsFillSunFill size={20} onClick={toggleDarkMode} style={{color:"white",cursor:"pointer"}}/> : <BsFillMoonFill size={20} onClick={toggleDarkMode} style={{cursor:"pointer"}}/>}
          <p className=" transform rotate-90 inline-block my-2 " style={{color:darkMode ? "white":'black',cursor:"pointer"}} onClick={(e)=>i18n.changeLanguage("fr")}>Fr</p>
          <p className=" transform rotate-90 inline-block my-2 " style={{color:darkMode ? "white":'black',cursor:"pointer"}} onClick={(e)=>i18n.changeLanguage("ar")}>Ar</p>
          <p className=" transform rotate-90 inline-block my-2 " style={{color:darkMode ? "white":'black',cursor:"pointer"}} onClick={(e)=>i18n.changeLanguage("en")}>En</p>
        </div>
       </div>

    </div>
  );
}

export default App;
