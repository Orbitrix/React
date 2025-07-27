import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.jsx'

function MyApp() {
  return (
    <div>
      <h1>Custom App | Orbitrix</h1>
    </div>
  )
}

// const reactElement = {
//   type: 'a',
//   props: {
//     href: 'https://google.com',
//     target: '_blank'
//   },
//   children: 'Click me to visit google'
// }

// const reactElements = React.createElement(
//   'a',
//   {href: 'https://google.com',target: '_blanck'},
//   'click me to visit google'

// )



createRoot(document.getElementById('root')).render(

  
  MyApp,
  <StrictMode>
    <App />
  </StrictMode>,
)
