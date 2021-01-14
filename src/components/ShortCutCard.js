import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import { blue } from '@material-ui/core/colors'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue[500],
  },
}))

export default function ShortCutCard({ item, onOpen }) {
  const classes = useStyles()

  const getTwoLetters = (value) => {
    if (value && value.length > 2) {
      return value.substring(0, 2)
    }
    return value
  }

  const handleOpen = () => {
    onOpen()
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {getTwoLetters(item.name)}
          </Avatar>
        }
        title={getTwoLetters(item.name)}
        action={
          <IconButton aria-label="settings" onClick={handleOpen}>
            <MoreVertIcon />
          </IconButton>
        }
      />
    </Card>
  )
}
