import React from 'react'
import { hot } from 'react-hot-loader'

// Components
import Button from '@components/Button'
import Layout from '@components/Layout'
import List from '@components/List'
import Typography from '@components/Typography'

// https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80
// https://images.unsplash.com/photo-1436831135709-48bdc150cce5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80
// https://images.unsplash.com/photo-1529518969858-8baa65152fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80
// https://images.unsplash.com/photo-1540019838667-d61df4d4d92d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80
// https://images.unsplash.com/photo-1504622956513-06165f390646?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80
// https://images.unsplash.com/photo-1474752651386-dc296d69dc90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80
// https://images.unsplash.com/photo-1460036521480-ff49c08c2781?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80

function App () {
  return (
    <Layout height='100vh'>
      <Layout.Sider isCollapsible={false} width={300}>
        <Layout>
          <Layout.Header isFlexbox>
            <Typography.Title level='h1' align='center'>
              Play List
            </Typography.Title>
          </Layout.Header>

          <Layout.Content padding='0 24px'>
            <List>
              <List.Item suffix={<i className='fas fa-play fa-1x' />} suffixSize='xs'>
                <List.Item.Meta title='Bed and Breakfast' description='The 126ers' />
              </List.Item>

              <List.Item suffix={<i className='fas fa-play' />} suffixSize='xs'>
                <List.Item.Meta title='Bed and Breakfast' description='The 126ers' />
              </List.Item>
            </List>
          </Layout.Content>
        </Layout>
      </Layout.Sider>

      <Layout>
        <Layout.Content
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1474752651386-dc296d69dc90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80')`,
          }}
        >
          <Button>app</Button>
        </Layout.Content>

        <Layout.Footer>aaa</Layout.Footer>
      </Layout>
    </Layout>
  )
}

export default hot(module)(App)
