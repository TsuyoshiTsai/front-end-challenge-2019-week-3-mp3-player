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
// import ForWeAreManyMP3 from './assets/audios/For_We_Are_Many.mp3'

const playItem = {
  title: 'For We Are Many',
  audioPath: require('./assets/audios/For_We_Are_Many.mp3'),
  imagePath: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80',
}
// const playList = [
//   {
//     title: '',
//     audioPath: require('./assets/audios/For_We_Are_Many.mp3'),
//     imagePath: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80',
//   },
//   {
//     title: '',
//     audioPath: require('./assets/audios/Metamorphosis.mp3'),
//     imagePath: 'https://images.unsplash.com/photo-1436831135709-48bdc150cce5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80',
//   },
//   {
//     title: '',
//     audioPath: require('./assets/audios/Slowly_Until_We_Get_There.mp3'),
//     imagePath: 'https://images.unsplash.com/photo-1529518969858-8baa65152fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80',
//   },
//   {
//     title: '',
//     audioPath: require('./assets/audios/Spirit_of_the_Dead.mp3'),
//     imagePath: 'https://images.unsplash.com/photo-1540019838667-d61df4d4d92d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80',
//   },
//   {
//     title: '',
//     audioPath: require('./assets/audios/That_Never_Dies.mp3'),
//     imagePath: 'https://images.unsplash.com/photo-1504622956513-06165f390646?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80',
//   },
//   {
//     title: '',
//     audioPath: require('./assets/audios/The_Long_Night.mp3'),
//     imagePath: 'https://images.unsplash.com/photo-1474752651386-dc296d69dc90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80',
//   },
//   {
//     title: '',
//     audioPath: require('./assets/audios/Wishful_Thinking.mp3'),
//     imagePath: 'https://images.unsplash.com/photo-1460036521480-ff49c08c2781?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80',
//   },
// ]

function App () {
  const audioRef = useRef(null)
  const [audio] = useState(playItem)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  console.log('=== duration :', duration)

  useEffect(() => {
    audioRef.current = new Audio(audio.audioPath)
    // audio.current.play()
    console.log('audioRef.current.currentTime :', audioRef)
    console.log('audioRef.current.currentTime :', audioRef.current.duration)

    const onCanPlay = event => {
      console.log('event :', event)
      console.log('audioRef.current.duration :', audioRef.current.duration)
      console.log('audioRef.current.currentTime :', audioRef.current.currentTime)

      setDuration(audioRef.current.duration)
    }

    audioRef.current.addEventListener('canplay', onCanPlay)

    return () => {
      audioRef.current.removeEventListener('canplay', onCanPlay)
    }
  }, [audio])

  const handlePlaying = event => {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
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
              <List.Item prefix={<Icon name='play' mode='01' size={12} />} suffix='01:11' padding='10px 24px' withBorder isSelectable>
                <List.Item.Meta title='Bed and Breakfast' description='The 126ers' />
              </List.Item>

              <List.Item prefix={<Icon name='play' mode='01' size={12} />} suffix='01:11' padding='10px 24px' withBorder isSelectable>
                <List.Item.Meta title='Bed and Breakfast' description='The 126ers' />
              </List.Item>

              <List.Item prefix={<Icon name='play' mode='01' size={12} />} suffix='01:11' padding='10px 24px' withBorder isSelectable>
                <List.Item.Meta title='Bed and Breakfast' description='The 126ers' />
              </List.Item>
            </List>
          </Layout.Content>
        </Layout>
      </Layout.Sider>

      <Layout>
        <Layout.Content>
          <Track imageUrl='https://images.unsplash.com/photo-1474752651386-dc296d69dc90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80'>
            <Track.Meta title='Bed and Breakfast' description='The 126ers' />
          </Track>
        </Layout.Content>

        <Layout.Footer>
          <Player>
            <Player.Controls>
              <Player.Controls.Button title='啟用隨機播放'>
                <Icon name='random' mode='01' />
              </Player.Controls.Button>

              <Player.Controls.Button title='切換上一首'>
                <Icon name='step-backward' mode='01' />
              </Player.Controls.Button>

              <Player.Controls.Button isCircled title={isPlaying ? '暫停' : '播放'} onClick={handlePlaying}>
                <Icon name={isPlaying ? 'pause' : 'play'} mode='01' size={14} style={{ marginLeft: isPlaying ? 2 : 4 }} />
              </Player.Controls.Button>

              <Player.Controls.Button title='切換下一首'>
                <Icon name='step-forward' mode='01' />
              </Player.Controls.Button>

              <Player.Controls.Button title='啟用單首重複播放'>
                <Icon name='repeat' mode='01' />
              </Player.Controls.Button>
            </Player.Controls>
          </Player>
        </Layout.Footer>
      </Layout>
    </Layout>
  )
}

export default hot(module)(App)
