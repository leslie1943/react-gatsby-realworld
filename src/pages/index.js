import React, { useState } from 'react'
import { Button, Grid, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import MuiAlert from '@material-ui/lab/Alert'

import DialogAdd from '../components/DialogAdd'
import ShortCutCard from '../components/ShortCutCard'
import SEO from '../components/SEO'

import styles from '../styles/index.module.scss'
import { getStore, setStore } from '../utils/localStore'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function Home() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(getStore('shortcut') || [])
  const [currentItem, setCurrentItem] = useState({})

  // 关闭弹窗
  const onClose = () => {
    setOpen(false)
    setCurrentItem({})
  }

  const onSubmit = (values) => {
    // 先获取现存的数据
    const localShortcuts = getStore('shortcut') || []

    // 更新操作
    if (values.action === 'UPDATE') {
      localShortcuts.forEach((item, index) => {
        if (item.id === values.id) localShortcuts[index] = values
      })
    } else {
      // 新增操作: 直接添加
      localShortcuts.push(values)
    }
    // 更新本地数据
    setStore('shortcut', localShortcuts)
    // 更新组件数据
    setItems(localShortcuts)
    // 关闭弹窗
    onClose()
  }

  // 删除某个快捷方式
  const onDelete = (item) => {
    const localShortcuts = getStore('shortcut') || []
    const filterredShortcuts = localShortcuts.filter(
      (doc) => doc.id !== item.id
    )
    // 更新本地数据
    setStore('shortcut', filterredShortcuts)
    // // 更新组件数据
    setItems(filterredShortcuts)

    onClose()
  }

  const onCardAction = (item) => {
    setCurrentItem(item)
    setOpen(true)
  }

  return (
    <div>
      <SEO title="Gatsby Home" />
      <div className={styles.alert}>
        <Grid container spacing={1} style={{ marginBottom: 40 }}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Alert severity="success">
              This Page Is For Demostrate Short Cuts!
            </Alert>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </div>
      <div className={styles.home}>
        <Grid container spacing={1}>
          {items.map((item) => (
            <Grid key={item.id} item xs={1}>
              <ShortCutCard item={item} onCardAction={onCardAction} />
            </Grid>
          ))}
          <Grid
            item
            xs={2}
            style={{
              borderRadius: 8,
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Tooltip title="添加快捷方式" placement="right-end">
              <Button
                onClick={() => {
                  setOpen(true)
                }}
                variant="contained"
                color="secondary"
              >
                <AddIcon />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
        <DialogAdd
          open={open}
          item={currentItem}
          onSubmit={onSubmit}
          onClose={onClose}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}
