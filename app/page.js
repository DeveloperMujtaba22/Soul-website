// app/page.jsx
import About from './_components/About'
import Activities from './_components/Activities'
import Benefits from './_components/Benefits'
import Program from './_components/Program'
import Serving from './_components/Serving'
import Team from './_components/Team'
import Footer from './_components/Footer'
import Process from './_components/Process'

export default function Page() {
  return  <>
      <About />
      <Program />
      <Process/>
      <Team/>
      <Activities/>
      <Benefits/>
      <Serving/>
      <Footer/>
    </>
}