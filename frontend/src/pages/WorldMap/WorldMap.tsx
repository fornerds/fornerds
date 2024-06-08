import React, { useEffect, useRef, useState } from 'react'
import styles from './WorldMap.module.css'
import planetsImages from '../../assets/images/planet'
import { Header } from '../../components/ModuleComponent'
import { Link } from '../../components/AtomComponent'
import star4 from '../../assets/images/gif/star4.gif'
import star6 from '../../assets/images/gif/star6.gif'

interface Location {
  id: number
  x: number
  y: number
  width: number
  height: number
  iconColor: string
  title: string
  description: string
  textX: number
  textY: number
  textAlign: 'start' | 'end'
}

interface GifLocation {
  id: number
  x: number
  y: number
  width: number
  height: number
  image: string
}

const planets: Location[] = [
  {
    id: 4,
    x: 245,
    y: 140,
    width: 331,
    height: 225,
    iconColor: planetsImages.game,
    title: 'Game development',
    description: '379 projects waiting for you',
    textX: 287,
    textY: 51,
    textAlign: 'start'
  },
  {
    id: 7,
    x: 462,
    y: 562,
    width: 329,
    height: 319,
    iconColor: planetsImages.embedded,
    title: 'Embedded systems',
    description: '379 projects waiting for you',
    textX: -121,
    textY: 268,
    textAlign: 'end'
  },
  {
    id: 3,
    x: 1027,
    y: 335,
    width: 220,
    height: 232,
    iconColor: planetsImages.android,
    title: 'Android development',
    description: '379 projects waiting for you',
    textX: 193,
    textY: 187,
    textAlign: 'start'
  },
  {
    id: 2,
    x: 1244,
    y: 205,
    width: 170,
    height: 170,
    iconColor: planetsImages.iOS,
    title: 'iOS development',
    description: '379 projects waiting for you',
    textX: 132,
    textY: 173,
    textAlign: 'start'
  },
  {
    id: 5,
    x: 1646,
    y: 617,
    width: 376,
    height: 388,
    iconColor: planetsImages.AI,
    title: 'AI, ML & Data science',
    description: '379 projects waiting for you',
    textX: -195,
    textY: 206,
    textAlign: 'end'
  },
  {
    id: 6,
    x: 2014,
    y: 233,
    width: 239,
    height: 240,
    iconColor: planetsImages.security,
    title: 'Cyber security',
    description: '379 projects waiting for you',
    textX: 249,
    textY: 92,
    textAlign: 'start'
  },
  {
    id: 8,
    x: 2264,
    y: 581,
    width: 248,
    height: 250,
    iconColor: planetsImages.IOT,
    title: 'Internet of Things (IOT)',
    description: '379 projects waiting for you',
    textX: 227,
    textY: 38,
    textAlign: 'start'
  },
  {
    id: 1,
    x: 2904,
    y: 117,
    width: 370,
    height: 355,
    iconColor: planetsImages.Web,
    title: 'Web development',
    description: '379 projects waiting for you',
    textX: -126,
    textY: 263,
    textAlign: 'end'
  },
  {
    id: 9,
    x: 3244,
    y: 548,
    width: 260,
    height: 260,
    iconColor: planetsImages.Blockchain,
    title: 'Blockchain technology',
    description: '379 projects waiting for you',
    textX: -183,
    textY: 51,
    textAlign: 'start'
  }
]

const gifs: GifLocation[] = [
  {
    id: 1,
    x: 213,
    y: 538,
    width: 152,
    height: 152,
    image: star4
  },
  {
    id: 2,
    x: 342,
    y: 523,
    width: 69,
    height: 69,
    image: star4
  },
  {
    id: 3,
    x: 1017,
    y: 107,
    width: 75,
    height: 75,
    image: star6
  },
  {
    id: 4,
    x: 1132,
    y: 84,
    width: 45,
    height: 45,
    image: star6
  },
  {
    id: 5,
    x: 1629,
    y: 213,
    width: 128,
    height: 128,
    image: star4
  },
  {
    id: 6,
    x: 2564,
    y: 285,
    width: 69,
    height: 69,
    image: star4
  },
  {
    id: 7,
    x: 2615,
    y: 168,
    width: 152,
    height: 152,
    image: star4
  },
  {
    id: 8,
    x: 2767,
    y: 699,
    width: 128,
    height: 128,
    image: star4
  },
  {
    id: 9,
    x: 3550,
    y: 405,
    width: 93,
    height: 93,
    image: star6
  },
  {
    id: 10,
    x: 3666,
    y: 468,
    width: 60,
    height: 60,
    image: star6
  }
]

const getScaledValue = (value: number) => {
  const vh = window.innerHeight * 0.01
  return (value * (vh * 100 - 70)) / 1080
}

export function WorldMap() {
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null)
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef<boolean>(false)

  const handleMouseEnter = (planet: Location) => {
    setHoveredLocation(planet)
  }

  const handleMouseLeave = () => {
    setHoveredLocation(null)
  }

  const handleScroll = (event: WheelEvent): void => {
    if (mainContainerRef.current && !isScrolling.current) {
      event.preventDefault()
      isScrolling.current = true
      smoothScroll(mainContainerRef.current, event.deltaY * 200)
    }
  }

  const smoothScroll = (container: HTMLDivElement, delta: number) => {
    const maxScrollLeft = container.scrollWidth - container.clientWidth
    const minScrollLeft = 0

    const start = container.scrollLeft
    const end = Math.min(
      Math.max(start + delta * 2.5, minScrollLeft),
      maxScrollLeft
    )
    const duration = 1000 // 애니메이션 지속 시간 (밀리초)
    const startTime = performance.now()

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = easeOutCubic(progress)
      container.scrollLeft = start + (end - start) * easeProgress

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        isScrolling.current = false
      }
    }

    requestAnimationFrame(animateScroll)
  }

  useEffect(() => {
    const handleScrollInside = (event: WheelEvent): void => {
      if (mainContainerRef.current && !isScrolling.current) {
        event.preventDefault()
        isScrolling.current = true
        smoothScroll(mainContainerRef.current, event.deltaY * 200)
      }
    }

    const mainContainer = mainContainerRef.current
    if (mainContainer) {
      mainContainer.addEventListener('wheel', handleScrollInside, {
        passive: false
      })
      return () => {
        mainContainer.removeEventListener('wheel', handleScrollInside)
      }
    }
  }, [])

  return (
    <div className={styles.background}>
      <Header />
      <div className={styles.mainContainer} ref={mainContainerRef}>
        <main className={styles.main}>
          <div className={styles.backgroundImage} />
          {gifs.map((star) => (
            <div
              className={styles.gifContainer}
              key={star.id}
              style={{
                left: getScaledValue(star.x),
                top: getScaledValue(star.y)
              }}
            >
              <img
                src={star.image}
                alt="GIF"
                width={getScaledValue(star.width)}
                height={getScaledValue(star.height)}
              />
            </div>
          ))}
          {planets.map((planet) => (
            <Link to={`/projects/${planet.id}`} key={planet.id}>
              <div
                key={planet.id}
                className={styles.planetContainer}
                style={{
                  left: getScaledValue(planet.x),
                  top: getScaledValue(planet.y),
                  width: getScaledValue(planet.width),
                  height: getScaledValue(planet.height),
                  textAlign: planet.textAlign
                }}
                onMouseEnter={() => handleMouseEnter(planet)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={planet.iconColor}
                  alt={planet.title}
                  className={`${styles.planet} ${hoveredLocation === planet ? styles.planetHover : ''}`}
                  width={planet.width}
                  height={planet.height}
                />
                <div
                  className={`${styles.planetText} ${hoveredLocation === planet ? styles.planetHoverText : ''}`}
                  style={{
                    left:
                      planet.textX < 0
                        ? planet.textX
                        : getScaledValue(planet.textX),
                    top: getScaledValue(planet.textY),
                    textAlign: planet.textAlign
                  }}
                >
                  <h3 className="font-pixellari-sub-header">{planet.title}</h3>
                  <p className="font-roboto-body-2">{planet.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </div>
  )
}
