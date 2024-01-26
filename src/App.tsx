import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import Open from './icon/Open.png'
import Close from "./icon/Close.png"
import Fav from "./icon/Fav.png"
import FavAction from "./icon/FavActive.png"
import {DivPanel, LinkDiv, Img, DivImgs, BlockDrops, ButtonDropDown, TextButton} from './Component'
import { json } from "stream/consumers";

export default function App() {
  document.cookie = ""

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
const DivLinks = styled.div`
  margin-top: 0.8em;
  vertical-align: middle;

`
function Layout() {
  const [Catalog, setCatalog] = useState("action")
  const [Ezbran, setEzbran] = useState("")
  const SetCatalog = () =>{
    setCatalog("action")
    setEzbran("")
  }
  const SetEzbran = () =>{
    setCatalog("")
    setEzbran("action")
  }

  return (
    <div>
    <DivPanel>
      <LinkDiv className={Catalog}>
        <DivLinks>
          <Link className="Links " onClick={SetCatalog}  to="/">Каталог</Link>
        </DivLinks>
      </LinkDiv>
      <LinkDiv className={Ezbran}>
        <DivLinks>
          <Link className="Links" onClick={SetEzbran} to="/about">Избранное</Link>
        </DivLinks>
      </LinkDiv>
    </DivPanel>
    <Outlet />
    </div>
  );
}

let ApiData:string[] = [];
let ApiDataBigPhoto: string[] = [];
function getUser(){
  for(let i = 1; i < 9; i ++){
    fetch('https://jsonplaceholder.typicode.com/photos/'+i)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      ApiDataBigPhoto.push(data.url)
      ApiData.push(data.thumbnailUrl)
    });
  }
 
}
getUser();
const FavIcon = styled.img`
top: 5px;
left: 115px;
position: absolute;
margin-top: auto;
`
const DivImg = styled.div`
  position:relative;
`
let cookieState: string[] = []

function Home() {
  const [cookie, setCookie] = useState("")

  const [StateLeanne, setStateLeanne] = useState(false)
  const [StateHowell, setStateHowell] = useState(false)
  const [StateGraham, setStateGrahm] = useState(false)

  const EditStateLeanne = () =>{setStateLeanne(!StateLeanne)}
  const EditStateHowell = () =>{setStateHowell(!StateHowell)}
  const EditStateGrahm = () =>{setStateGrahm(!StateGraham)}

  function StateStar(urls: string){
    let obj = cookieState.find(e => e == urls);
      if(obj == urls){
        return (
          <FavIcon onClick={() => {
            if (cookieState.indexOf(urls) !== -1) {
              cookieState.splice(cookieState.indexOf(urls), 1);
              setCookie("") 

            }
            console.log(cookie);

            }} src={FavAction}></FavIcon>
        )
      }
      else{
        return(
          <FavIcon onClick={() => {cookieState.push(urls); setCookie(urls); console.log(cookie)}} src={Fav}></FavIcon>
        )
      }
  }

  let StringsCookie: string; 
  
  useEffect(() =>{

    cookieState.map(e => StringsCookie += (e +"\n"))
    console.log(document.cookie)
  }, [cookieState, JSON.stringify(cookieState), cookie, JSON.stringify(cookie)])

 
  const List_Leanne = ApiData.map(urls =>
    <DivImg >
      <Img src={urls}  key={(Number(ApiData.indexOf(urls)) + 1)}></Img>
      {StateStar(urls)}
    </DivImg>
  
  );

  function VisibleImgStateLeanne(){
    if(StateLeanne){
     return( 
      <DivImgs>
        {List_Leanne}
      </DivImgs>
      )
    }
  }
  function VisibleImgStateHowell(){
    if(StateHowell){
     return( 
      <DivImgs>
        {List_Leanne}
      </DivImgs>
      )
    }
  }
  function VisibleImgStateGrahm(){
    if(StateGraham){
     return( 
      <DivImgs>
        {List_Leanne}
      </DivImgs>
      )
    }
  }
  /*
  const ImgStratched = styled.img`
    position: absolute;
    left: 20%;
    right: 20%;
  `*/


  return (
    <div>
      
    <BlockDrops>
      <ButtonDropDown>
        <img src={(StateLeanne)?Close : Open}/>
        <TextButton onClick={EditStateLeanne}>Leanne Graham</TextButton>     
      </ButtonDropDown>
      {VisibleImgStateLeanne()}
    </BlockDrops>
    <BlockDrops>
      <ButtonDropDown>
        <img src={(StateHowell)?Close : Open}/>
        <TextButton onClick={EditStateHowell}>Ervin Howell</TextButton>     
      </ButtonDropDown>
      {VisibleImgStateHowell()}
    </BlockDrops>
    <BlockDrops>
      <ButtonDropDown>
        <img src={(StateGraham)?Close : Open}/>
        <TextButton onClick={EditStateGrahm}>Leanne Graham</TextButton>     
      </ButtonDropDown>
      {VisibleImgStateGrahm()}
    </BlockDrops>
    </div>
    
  );
}

function About() {
  let CookieData = document.cookie
  return (
    <div>
      {CookieData}
    </div>
  );
}


function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
