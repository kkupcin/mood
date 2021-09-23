import "./MainPage.css";
import img1 from '../img/leone-venter-VieM9BdZKFo-unsplash.jpg'

const MainPage = () => {
    const body = document.querySelector('body')
    body.style.backgroundImage = `url(${img1})`
    body.style.backgroundPosition = 'right'
    body.style.backgroundAttachment = 'fixed'

  return (
    <div className='main'>
      <h1 className='main__title'>How are you feeling today?</h1>
      <ul className='main__list'>
        <li className='main__list--item sad'>sad</li>
        <li className='main__list--item adventurous'>adventurous</li>
        <li className='main__list--item excited'>excited</li>
        <li className='main__list--item afraid'>afraid</li>
        <li className='main__list--item nostalgic'>nostalgic</li>
        <li className='main__list--item happy'>happy</li>
        <li className='main__list--item lonely'>lonely</li>
      </ul>
      <p className='main__text'>
        Mood is an app to track your mood changes and help you decide on your
        entertainment options - whether you'd like to read a book, watch a movie
        or listen to some music.
      </p>
    </div>
  );
};

export default MainPage;
