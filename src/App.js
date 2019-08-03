import React, { useState, useEffect, useRef } from 'react'
import { hot } from 'react-hot-loader'

// Components
// import Button from '@components/Button'
import Icon from '@components/Icon'
import Layout from '@components/Layout'
import List from '@components/List'
import Player from '@components/Player'
import Track from '@components/Track'
import Typography from '@components/Typography'

// Variables / Functions
const formatTime = totalSeconds =>
  `${String(Math.floor(totalSeconds / 60)).padStart(2, '0')}:${String(Math.floor(totalSeconds % 60)).padStart(2, '0')}`
const audios = [
  {
    id: 0,
    title: 'For We Are Many',
    description: 'for we are many',
    audioPath: require('./assets/audios/For_We_Are_Many.mp3'),
    imagePath: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80',
    duration: 172.826122,
  },
  {
    id: 1,
    title: 'Metamorphosis',
    description: 'metamorphosis',
    audioPath: require('./assets/audios/Metamorphosis.mp3'),
    imagePath: 'https://images.unsplash.com/photo-1436831135709-48bdc150cce5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80',
    duration: 170.788571,
  },
  {
    id: 2,
    title: 'Slowly Until We Get There',
    description: 'slowly until we get there',
    audioPath: require('./assets/audios/Slowly_Until_We_Get_There.mp3'),
    imagePath: 'https://images.unsplash.com/photo-1529518969858-8baa65152fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80',
    duration: 97.149388,
  },
  {
    id: 3,
    title: 'Spirit of the Dead',
    description: 'spirit of the dead',
    audioPath: require('./assets/audios/Spirit_of_the_Dead.mp3'),
    imagePath: 'https://images.unsplash.com/photo-1540019838667-d61df4d4d92d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80',
    duration: 169.456327,
  },
  {
    id: 4,
    title: 'That Never Dies',
    description: 'that never dies',
    audioPath: require('./assets/audios/That_Never_Dies.mp3'),
    imagePath: 'https://images.unsplash.com/photo-1504622956513-06165f390646?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80',
    duration: 172.146939,
  },
  {
    id: 5,
    title: 'The Long Night',
    description: 'the long night',
    audioPath: require('./assets/audios/The_Long_Night.mp3'),
    imagePath: 'https://images.unsplash.com/photo-1474752651386-dc296d69dc90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80',
    duration: 169.404082,
  },
  {
    id: 6,
    title: 'Wishful Thinking',
    description: 'wishful thinking',
    audioPath: require('./assets/audios/Wishful_Thinking.mp3'),
    imagePath: 'https://images.unsplash.com/photo-1460036521480-ff49c08c2781?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80',
    duration: 99.604898,
  },
]

function App () {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState(audios[0])
  const [currentTime, setCurrentTime] = useState(0)

  const currentAudioIndex = audios.findIndex(audio => audio.id === currentAudio.id)
  const audioRef = useRef(null)
  const percentage = (currentTime / currentAudio.duration) * 100

  const activatePlaying = () => setIsPlaying(true)
  const unactivatePlaying = () => setIsPlaying(false)

  // 切換 audio 的時候
  useEffect(() => {
    if (audioRef.current !== null) {
      audioRef.current.pause()
      setCurrentTime(0)
      activatePlaying()
    }

    audioRef.current = new Audio(currentAudio.audioPath)

    const onTimeUpdate = event => {
      setCurrentTime(audioRef.current.currentTime)
    }

    audioRef.current.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      audioRef.current.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [currentAudio])

  // 改變播放狀態的時候
  useEffect(() => {
    if (audioRef.current === null) return

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [currentAudio, isPlaying])

  const handlePlaying = event => {
    if (isPlaying) {
      unactivatePlaying()
    } else {
      activatePlaying()
    }
  }
  const handleSelect = (event, audio) => {
    setCurrentAudio(audio)
    handlePlaying()
  }
  const handlePrev = event => {
    if (currentAudioIndex === 0) {
      const [lastAudio] = audios.slice(-1)

      setCurrentAudio(lastAudio)
    } else {
      const [prevAudio] = audios.slice(currentAudioIndex - 1)

      setCurrentAudio(prevAudio)
    }
  }
  const handleNext = event => {
    if (currentAudioIndex === audios.length - 1) {
      const [firstAudio] = audios

      setCurrentAudio(firstAudio)
    } else {
      const [nextAudio] = audios.slice(currentAudioIndex + 1)

      setCurrentAudio(nextAudio)
    }
  }
  const handlePercentageChange = (event, newPercentage) => {
    audioRef.current.currentTime = (newPercentage / 100) * currentAudio.duration
  }

  return (
    <Layout height='100vh'>
      <Layout.Sider isCollapsible={false} width={300}>
        <Layout>
          <Layout.Header isFlexbox>
            <Typography.Title level='h1' align='center' marginTop='20px' marginBottom='20px'>
              Play List
            </Typography.Title>
          </Layout.Header>

          <Layout.Content>
            <List>
              {audios.map((audio, index) => (
                <List.Item
                  key={index}
                  prefix={<Icon name={currentAudio.id === audio.id && isPlaying ? 'pause' : 'play'} mode='01' size={10} />}
                  suffix={formatTime(audio.duration)}
                  padding='10px 24px'
                  color={currentAudio.id === audio.id ? 'primary' : null}
                  withBorder
                  isSelectable
                  onClick={event => handleSelect(event, audio)}
                >
                  <List.Item.Meta
                    title={audio.title}
                    description={audio.description}
                    descriptionProps={{ color: currentAudio.id === audio.id ? 'primary' : 'gray' }}
                  />
                </List.Item>
              ))}
            </List>
          </Layout.Content>
        </Layout>
      </Layout.Sider>

      <Layout>
        <Layout.Content>
          <Track imageUrl={currentAudio.imagePath}>
            <Track.Meta title={currentAudio.title} description={currentAudio.description} />
          </Track>
        </Layout.Content>

        <Layout.Footer>
          <Player>
            <Player.Controls>
              <Player.Controls.ButtonGroup>
                <Player.Controls.Button title='啟用隨機播放'>
                  <Icon name='random' mode='01' />
                </Player.Controls.Button>

                <Player.Controls.Button title='切換上一首' onClick={handlePrev}>
                  <Icon name='step-backward' mode='01' />
                </Player.Controls.Button>

                <Player.Controls.Button isCircled title={isPlaying ? '暫停' : '播放'} onClick={handlePlaying}>
                  <Icon name={isPlaying ? 'pause' : 'play'} mode='01' size={14} style={{ marginLeft: isPlaying ? 2 : 4 }} />
                </Player.Controls.Button>

                <Player.Controls.Button title='切換下一首' onClick={handleNext}>
                  <Icon name='step-forward' mode='01' />
                </Player.Controls.Button>

                <Player.Controls.Button title='啟用單首重複播放'>
                  <Icon name='repeat' mode='01' />
                </Player.Controls.Button>
              </Player.Controls.ButtonGroup>

              <Player.Controls.PlaybackBar
                progressBarProps={{ percentage, onSliderChange: handlePercentageChange }}
                currentTime={formatTime(currentTime)}
                duration={formatTime(currentAudio.duration)}
              />
            </Player.Controls>

            <Player.ExtraControls>aa</Player.ExtraControls>
          </Player>
        </Layout.Footer>
      </Layout>
    </Layout>
  )
}

export default hot(module)(App)
