import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import FacebookCustomerChat from './components/FacebookCustomerChat';
import NavBtn from './components/NavBtn';
import SectionBtn from './components/SectionBtn';
import niniImg from './pics/Nini.png';
import nini3 from './pics/nini3.jpeg';
import niniFb from './pics/niniFB.jpg';
import niniInsta from './pics/niniInsta.jpg';
import niniTkt from './pics/niniTkt.jpg';
import Image from './components/Image';
import LargeImg from './components/LargeImg';
import GalleryImage from './components/galleryImage';
import ContactCard from './components/ContactCard';
import Masonry from 'react-masonry-css';
import { storage } from './firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';


const NAVBTN = [
  {name: 'მთავარი', id:'main'},
  {name: 'გალერეა', id:'gallery'},
  {name: 'ჩემს შესახებ', id:'about'},
  {name: 'კონტაქტი', id:'contact'}
];

const SECTIONBTN = [
  {name: 'საიმიჯო', id:'personal'},
  {name: 'ნათლობის', id:'baptism'},
  {name: 'საქორწილო', id:'wedding'},
  {name: 'საოჯახო', id:'family'},
  {name: 'დაბადების დღის', id:'birthday'}
];

const CONTACTCARD = [
  {name: 'Instagram', id: 'instagram', img: niniInsta, href: 'https://www.instagram.com/ninitokhishviliphotography/?igshid=MzRlODBiNWFlZA%3D%3D&fbclid=IwAR0LuuDGM5VBeO8GrvJkPRL_-A7ED2NnXfHuHxQVUF1WaB-U8AR49NLE8VE'},
  {name: 'Facebook', id: 'facebook', img: niniFb, href: 'https://www.facebook.com/TokhishviliNini?mibextid=LQQJ4d'},
  {name: 'TikTok', id: 'tiktok', img: niniTkt, href: 'https://www.tiktok.com/@ninitokhishvili?_t=8eTPONhPd7y&_r=1&fbclid=IwAR1WTCrFpbtP4sdEB3BqScO2kruyheaoY_UH5el1JW5G0yo_36dKrWsmJAA'},
]

//masonry breakpoints
const breakpoints = {
  default: 4,
  950: 2,
  700: 1,
}

function App(props) {

  const [personalImages, setPersonalImages] = useState([]);
  const [baptismImages, setBaptismImages] = useState([]);
  const [weddingImages, setWeddingImages] = useState([]);
  const [familyImages, setFamilyImages] = useState([]);
  const [birthdayImages, setBirthdayImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const [displayLarge, setDisplayLarge] = useState(false);
  const [imageUrl, setImageUrl] = useState('');


  // NAVIGATION BUTTONS
  const [current, setCurrent] = useState('main');
  
  const navigation = NAVBTN.map(item => (
    <NavBtn 
      liName={item.name}
      id={item.id}
      key={item.id}
      className={ current === item.id && item.id === 'about' ? 'activeB' : current === item.id ? 'active' : 'passive'}
      changeCurrentId={changeCurrent}
    />
  ))


  function changeCurrent(id) {
    id === 'main' && current === 'main'? window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }) : null;

    setCurrent(id)

    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behaviour: 'instant',
    // });
  }


  // SECTION BUTTONS
  const [currentSection, setCurrentSection] = useState('main');

  const section = SECTIONBTN.map(item => (
    <SectionBtn 
      sectionName={item.name}
      id={item.id}
      key={item.id}
      changeSectionId={changeSection}
      className={item.id === currentSection ? 'active' : 'passive'}
    />
  ))


  function changeSection(id) {
  const personal = document.querySelector('.personal');
  const personalPosition = personal.offsetTop;

  const scrollPositions = {
    personal: personalPosition,
    baptism: personalPosition * 2,
    wedding: personalPosition * 3,
    family: personalPosition * 4,
    birthday: personalPosition * 5,
  };

  const position = scrollPositions[id];

  if (position !== undefined) {
    window.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  }
}

// SECTION BUTTON COLOR
const [viewportPos, setViewportPos] = useState(0);

useEffect(() => {
  const handleCurrentChange = () => {
    const main = document.querySelector('.main');
    const mainPos = main.getBoundingClientRect();
    const documentHeight = document.body.scrollHeight;
    setViewportPos(-mainPos.y);

    viewportPos < documentHeight/6.6 ? setCurrentSection('main') : null;
    documentHeight / 6.6 < viewportPos && viewportPos < documentHeight / 3.3 ? setCurrentSection('personal') : null;
    documentHeight / 3.3 < viewportPos && viewportPos < documentHeight / 2.2 ? setCurrentSection('baptism') : null;
    documentHeight / 2.2 < viewportPos && viewportPos < documentHeight / 1.6 ? setCurrentSection('wedding') : null;
    documentHeight / 1.6 < viewportPos && viewportPos < documentHeight / 1.25 ? setCurrentSection('family') : null;
    viewportPos > documentHeight / 1.25 ? setCurrentSection('birthday') : null;
  };

  window.addEventListener('scroll', handleCurrentChange);

  return () => {
    window.removeEventListener('scroll', handleCurrentChange);
  };
}, [viewportPos]);

  
  // downloading image urls
  
  useEffect(() => {
    const fetchImages = async () => {
      const imageListRef = ref(storage, 'საიმიჯო/');
      try {
        const response = await listAll(imageListRef);
        const downloadPromises = response.items.map(item => getDownloadURL(item));
        const urls = await Promise.all(downloadPromises);
        setPersonalImages(urls);
      } catch (error) {
        alert('Error fetching images:', error);
      }
    };
  
    fetchImages();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const imageListRef = ref(storage, 'ნათლობის/');
      try {
        const response = await listAll(imageListRef);
        const downloadPromises = response.items.map(item => getDownloadURL(item));
        const urls = await Promise.all(downloadPromises);
        setBaptismImages(urls);
      } catch (error) {
        alert('Error fetching images:', error);
      }
    };
  
    fetchImages();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const imageListRef = ref(storage, 'საქორწილო/');
      try {
        const response = await listAll(imageListRef);
        const downloadPromises = response.items.map(item => getDownloadURL(item));
        const urls = await Promise.all(downloadPromises);
        setWeddingImages(urls);
      } catch (error) {
        alert('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const imageListRef = ref(storage, 'საოჯახო/');
      try {
        const response = await listAll(imageListRef);
        const downloadPromises = response.items.map(item => getDownloadURL(item));
        const urls = await Promise.all(downloadPromises);
        setFamilyImages(urls);
      } catch (error) {
        alert('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);
  
  useEffect(() => {
    const fetchImages = async () => {
      const imageListRef = ref(storage, 'დაბადების დღის/');
      try {
        const response = await listAll(imageListRef);
        const downloadPromises = response.items.map(item => getDownloadURL(item));
        const urls = await Promise.all(downloadPromises);
        setBirthdayImages(urls);
      } catch (error) {
        alert('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const imageListRef = ref(storage, 'გალერეა/');
      try {
        const response = await listAll(imageListRef);
        const downloadPromises = response.items.map(item => getDownloadURL(item));
        const urls = await Promise.all(downloadPromises);
        setGalleryImages(urls);
      } catch (error) {
        alert('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);
  


  // handling enlarged images 
  function handleLargeImage(url) {
    setImageUrl(url);
    setDisplayLarge(true);
  }

  function handleCloseButton(ab) {
    setDisplayLarge(ab);
  }

  
  // PAGES

  /////////////// Main

  const mainPage = (
    <div className='mainPage'>
      {displayLarge == true && <LargeImg src={imageUrl} closeBtn={handleCloseButton} key={nanoid()}/>}

      <div className='sectionNav'>
        <ul>
          {currentSection !== 'main' && (
            <div>
                <li onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
                  <svg id='upArrow' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM135.1 217.4c-4.5 4.2-7.1 10.1-7.1 16.3c0 12.3 10 22.3 22.3 22.3H208v96c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V256h57.7c12.3 0 22.3-10 22.3-22.3c0-6.2-2.6-12.1-7.1-16.3L269.8 117.5c-3.8-3.5-8.7-5.5-13.8-5.5s-10.1 2-13.8 5.5L135.1 217.4z"/>
                  </svg>
                </li>
              </div>
          )}
          {section}
        </ul>
      </div>

      <section className='main section'>
        <div className='mainCenter'>
          <div className="niniPic"><img draggable='none' id='nini-img' src={niniImg} alt="ნინის ფოტო" /></div>
          <div className="mainText">
            <h2>Nini Tokhishvili</h2>
            <h2>Photography</h2>
          </div>
        </div>
      </section>

      <section className='personal section'>
        <ul className="imageContainer">
          {personalImages.map((url) => {
            return <Image key={nanoid()} url={url} largeImageUrl={handleLargeImage}
            />
          })}
        </ul>
      </section>

      <section className='baptism section'>
        <ul className="imageContainer">
          {baptismImages.map((url) => {
            return <Image key={nanoid()} url={url} largeImageUrl={handleLargeImage}
            />
          })}
        </ul>
      </section>

      <section className='wedding section'>
        <ul className="imageContainer">
          {weddingImages.map((url) => {
            return <Image key={nanoid()} url={url} largeImageUrl={handleLargeImage}
            />
          })}
        </ul>
      </section>

      <section className='family section'>
        <ul className="imageContainer">
          {familyImages.map((url) => {
            return <Image key={nanoid()} url={url} largeImageUrl={handleLargeImage}
            />
          })}
        </ul>
      </section>

      <section className='birthday section'>
        <ul className="imageContainer">
          {birthdayImages.map((url) => {
            return <Image key={nanoid()} url={url} largeImageUrl={handleLargeImage}
            />
          })}
        </ul>
      </section>

      <div className='mobile-contact page'>
      {CONTACTCARD.map((item) => {
        return <ContactCard 
        name={item.name} 
        id={item.id} 
        src={item.img}
        href={item.href}
        numb={item.name == 'Facebook' ? ` : 598148303` : null}
        contactText={item.name == 'Facebook' ? 'საკონტაქტო ინფორმაცია:' : null}
        iPhone={item.name == 'Facebook' ? true : false}
        />
      })}

        <div className='customerChat'><FacebookCustomerChat/></div>
      </div>
      
    </div>

  )
  
  /////////////// gallery
  const galleryPage = (
    <div className='gallery page'>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {galleryImages.map((url) => {
            return <GalleryImage key={nanoid()} url={url}
            />
        })}
      </Masonry>
    </div>
  )
  

  ////////////// about me
  const aboutPage = (
    <div className='about page'>
      <img src={nini3} alt="ნინის ფოტო"/>
      <h2>წლების გასვლასთან ერთად ვხვდები, რომ განვლილი ამბები და მოგონები, რომელსაც  ფოტო ალბომებში ვნახულობთ ყველაზე მეტად გვიცოცხლებს ემოციებს და გვაძლევს ახალი დღის მოტივაციას. ალბათ ამიტომ უკვე 5 წელია უამრვი ადამიანის ამბების და ემოცების მონაწილე ვხდები, რაც უდიდეს სიამოვნებას მანიჭებს.</h2>
      </div>
  )
  
  ///////////// contact
  const contactPage = (
    <div className='contact page'>

      {CONTACTCARD.map((item) => {
        return <ContactCard 
        name={item.name} 
        id={item.id} 
        src={item.img}
        href={item.href}
        numb={item.name == 'Facebook' ? ` : 598148303` : null}
        contactText={item.name == 'Facebook' ? 'საკონტაქტო ინფორმაცია:' : null}
        iPhone={item.name == 'Facebook' ? true : false}
        />
      })}

      <div className='customerChat'><FacebookCustomerChat/></div>
    </div>
  )



  // RETURN
  return (

    <div>

      <nav>
        <ul>
          {navigation}
        </ul>
      </nav>

      <div>
          {current === 'main'? mainPage : null}
          {current === 'gallery'? galleryPage : null}
          {current === 'about'? aboutPage : null}
          {current === 'contact'? contactPage : null}
      </div>

    </div>


  )
}

export default App
