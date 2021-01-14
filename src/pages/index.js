import React, { useState } from 'react'
// Paper,
import { Button, Grid, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
// import { makeStyles } from '@material-ui/core/styles'
import DialogAdd from '../components/DialogAdd'
import ShortCutCard from '../components/ShortCutCard'
import styles from '../styles/index.module.scss'
import { getStore, setStore } from '../utils/localStore'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     background: '#272c34',
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }))

export default function Home() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(getStore('shortcut') || [])
  const [currentItem, setCurrentItem] = useState({})
  // const classes = useStyles()

  const onSubmit = (values) => {
    // 存储
    const shortcutItems = getStore('shortcut') || []
    shortcutItems.push(values)
    // 更新本地数据
    setStore('shortcut', shortcutItems)
    // 更新组件数据
    setItems(shortcutItems)
    // 关闭弹窗
    setOpen(false)
  }

  const onOpen = (item) => {
    setCurrentItem(item)
    setOpen(true)
  }

  return (
    <div className={styles.home}>
      <Grid container spacing={1}>
        {items.map((item) => (
          <Grid key={item.id} item xs={1}>
            <ShortCutCard item={item} onOpen={onOpen} />
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
        onClose={() => {
          setOpen(false)
        }}
      />
    </div>
  )
}
