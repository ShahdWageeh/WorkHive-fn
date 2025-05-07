import { createRoot } from 'react-dom/client'
import './index.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import App from './App.jsx'
import '../node_modules/flowbite/dist/flowbite.min.js'
import '../node_modules/flowbite-datepicker'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'

createRoot(document.getElementById('root')).render(
    <App />,
)
