import { useRef, useState, useEffect } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import AboutSection from './AboutSection'
import BirthdayCountdown from './BirthdayCountdown'
import LoveLetter from './LoveLetter'
import ReasonsSection from './ReasonsSection'
import QuotesCarousel from './QuotesCarousel'
import HeartsDivider from './HeartsDivider'
import Timeline from './Timeline'
import MusicSection from './MusicSection'
import StorySection from './StorySection'
import MemoryArchive from './MemoryArchive'
import ThingsINeverSaid from './ThingsINeverSaid'
import IfYouNeverReadThis from './IfYouNeverReadThis'
import OneLastReply from './OneLastReply'
import ProposeSection from './ProposeSection'
import FinalChoice from './FinalChoice'
import FinalLetterSequence from './FinalLetterSequence'
import ContactSection from './ContactSection'
import SiteFooter from './SiteFooter'
import HeartCanvas from './HeartCanvas'
import DownloadMemory from './DownloadMemory'

export default function MainSite({ isPlaying, setIsPlaying, setMood }) {
  const audioRef = useRef(null)

  return (
    <div id="mainSite">
      <HeartCanvas />

      {/* Loader */}
      <Loader />

      <Navbar />

      <Hero />
      <AboutSection />
      <BirthdayCountdown />
      <LoveLetter />
      <ReasonsSection />
      <QuotesCarousel />
      <HeartsDivider />
      <Timeline />
      <MusicSection audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <ContactSection />
      <StorySection />
      <MemoryArchive />
      <ThingsINeverSaid />
      <IfYouNeverReadThis />
      <OneLastReply />
      <ProposeSection isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} />
      <FinalChoice isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} setMood={setMood} />
      <DownloadMemory />
      <FinalLetterSequence />
      <SiteFooter />
    </div>
  )
}

function Loader() {
  const [visible, setVisible] = useState(true)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const t1 = setTimeout(() => setOpacity(0), 2000)
    const t2 = setTimeout(() => setVisible(false), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null
  return (
    <div className="loader" id="loader" style={{ opacity, transition: 'opacity 0.8s ease' }}>
      <div className="loader-heart"><i className="fas fa-heart"></i></div>
      <p className="loader-text">Loading Love<span className="dots">...</span></p>
    </div>
  )
}
