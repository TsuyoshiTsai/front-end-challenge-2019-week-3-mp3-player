import React, { useCallback, useState, useEffect, useRef } from 'react'
import { hot } from 'react-hot-loader'
import shuffle from 'lodash/shuffle'

// Components
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
const getNewAudio = (type, playlist, index, isRepeat) => {
  let audio = null

  if (type === 'prev') {
    audio = index === 0 && isRepeat ? playlist[playlist.length - 1] : playlist[index - 1]
  } else if (type === 'next') {
    audio = index === playlist.length - 1 && isRepeat ? playlist[0] : playlist[index + 1]
  }

  return audio
}

function App () {
  const [isRandom, setIsRandom] = useState(false)
  const [isRepeatList, setIsRepeatList] = useState(false)
  const [isRepeatItem, setIsRepeatItem] = useState(false)
  const [playlist, setPlaylist] = useState(audios)
  const [currentAudio, setCurrentAudio] = useState(playlist[0])
  const [currentTime, setCurrentTime] = useState(0)

  const audioRef = useRef(null)

  const currentAudioIndex = playlist.findIndex(audio => audio.id === currentAudio.id)
  const percentage = (currentTime / currentAudio.duration) * 100
  const isPlaying = audioRef.current !== null && !audioRef.current.paused

  const handlePlaying = event => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }
  const handleSelect = (event, audio) => {
    setCurrentAudio(audio)
    audioRef.current.play()
  }
  // 手動按上一首按鈕 / 手動按下一首按鈕 / ended
  const handleNavigate = useCallback(
    type => {
      const newAudio = getNewAudio(type, playlist, currentAudioIndex, isRepeatList)

      // 單首循環
      if (isRepeatItem) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      } else if (typeof newAudio !== 'undefined') {
        // 列表循環找得到 newAudio，無循環則找不到
        setCurrentAudio(newAudio)
      }
    },
    [isRepeatItem, isRepeatList, playlist, currentAudioIndex]
  )
  const handleRandom = event => {
    if (isRandom) {
      setIsRandom(false)
      setPlaylist(audios)
    } else {
      setIsRandom(true)
      setPlaylist(shuffle(audios))
    }
  }
  const handleRepeat = event => {
    if (!isRepeatItem && !isRepeatList) {
      setIsRepeatList(true)
    } else if (isRepeatList) {
      setIsRepeatList(false)
      setIsRepeatItem(true)
    } else if (isRepeatItem) {
      setIsRepeatItem(false)
    }
  }
  const handlePercentageChange = (event, percentage) => {
    audioRef.current.currentTime = (percentage / 100) * currentAudio.duration
  }

  // 切換 audio 的時候
  useEffect(() => {
    let lastIsPlaying = false

    if (audioRef.current !== null) {
      lastIsPlaying = !audioRef.current.paused
      audioRef.current.pause()
      setCurrentTime(0)
    }

    audioRef.current = new Audio(currentAudio.audioPath)

    if (lastIsPlaying) {
      audioRef.current.play()
    }

    const onTimeUpdate = event => setCurrentTime(audioRef.current.currentTime)

    audioRef.current.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      audioRef.current.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [currentAudio])

  // 播完的時候
  useEffect(() => {
    if (audioRef.current === null || !audioRef.current.ended) return

    handleNavigate('next')
  }, [currentTime, handleNavigate])

  return (
    <Layout height='100vh'>
      <Layout.Sider isCollapsible={false} width={300}>
        <Layout>
          <Layout.Header isFlexbox>
            <Typography.Title level='h1' align='center' marginTop='20px' marginBottom='20px'>
              Playlist
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
                <Player.Controls.Button title={`${isRandom ? '停用' : '啟用'}隨機播放`} onClick={handleRandom} isActive={isRandom}>
                  <Icon name='random' mode='01' size={18} />
                </Player.Controls.Button>

                <Player.Controls.Button
                  title='切換上一首'
                  onClick={event => handleNavigate('prev')}
                  disabled={!(isRepeatItem || isRepeatList) && currentAudioIndex === 0}
                >
                  <Icon name='step-backward' mode='01' size={18} />
                </Player.Controls.Button>

                <Player.Controls.Button isCircled title={isPlaying ? '暫停' : '播放'} onClick={handlePlaying}>
                  <Icon name={isPlaying ? 'pause' : 'play'} mode='01' size={14} style={{ marginLeft: isPlaying ? 2 : 4 }} />
                </Player.Controls.Button>

                <Player.Controls.Button
                  title='切換下一首'
                  onClick={event => handleNavigate('next')}
                  disabled={!(isRepeatItem || isRepeatList) && currentAudioIndex === playlist.length - 1}
                >
                  <Icon name='step-forward' mode='01' size={18} />
                </Player.Controls.Button>

                <Player.Controls.Button
                  title={`${isRepeatItem ? '停用' : '啟用'}${isRepeatList ? '單首' : ''}重複播放`}
                  onClick={handleRepeat}
                  isActive={isRepeatItem || isRepeatList}
                >
                  <Icon name='repeat' mode={isRepeatItem ? '02' : '01'} size={18} />
                </Player.Controls.Button>
              </Player.Controls.ButtonGroup>

              <Player.Controls.PlaybackBar
                progressBarProps={{ percentage, onSliderChange: handlePercentageChange }}
                currentTime={formatTime(currentTime)}
                duration={formatTime(currentAudio.duration)}
              />
            </Player.Controls>
          </Player>
        </Layout.Footer>
      </Layout>
    </Layout>
  )
}

export default hot(module)(App)
