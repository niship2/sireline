import { useAmp } from 'next/amp'
import AmpSidebar from '../components/ampsidebar'

export const config = { amp: 'hybrid' }

function About(props) {
  const isAmp = useAmp()

  return (
    <div>
      <h3>My AMP About Page!</h3>
      {isAmp ? (
       <AmpSidebar/>  
      ) : (
        <img width="300" height="300" src="/my-img.jpg" alt="a cool image" />
      )}
    </div>
  )
}

export default About