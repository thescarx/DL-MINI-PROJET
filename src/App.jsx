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
    gg = []
    setX([])
    setLoading(true)
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
            <button className=" text-white font-semibold bg-blue-600 w-full rounded-[4px] px-4 py-2 "onClick={()=> {setLoading(true);callapi(value)}} >{t('Start the process')} </button>
          </div>


        </div>
        <div className=" min-h-screen max-h-screen overflow-scroll w-[50%]  py-5 " >
          <div className=" flex justify-center items-center bg-gradient-to-r text-white font-bold from-orange-500 via-orange-500/50 to-orange-500/0" >
          <p className=" text-[25px]" >{t('Output')}</p>
          </div>
          {firstTime && <div className=" h-[80%] flex flex-row gap-4 flex-wrap"  style={{color:darkMode ? "white" :''}}>
            {t('Start the process so you can see the output here.')}
          </div> }
          { !firstTime && x.length === 0 && <div role="status">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg" style={{margin:"50%"}}>
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div> }
        {
          !loading && x && <div className=" min-h-screen flex flex-row gap-2 py-5 flex-wrap" >
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
