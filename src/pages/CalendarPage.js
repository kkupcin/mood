import Calendar from '../components/Calendar'
import './CalendarPage.css'
import img2 from '../img/tim-chow-9IcKPSQ9G5Q-unsplash.jpg'

const CalendarPage = () => {
    const body = document.querySelector('body')
    body.style.backgroundImage = `url(${img2})`
    body.style.backgroundPosition = 'top'
    body.style.backgroundAttachment = 'fixed'

    return <Calendar />
}

export default CalendarPage