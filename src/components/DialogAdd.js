import React from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'

import useInput from '../hooks/useInput'
import { generateId } from '../utils/index'

export default function FormDialog({ open, onClose, onSubmit }) {
  const name = useInput('')
  const url = useInput('')

  const handleClose = () => {
    onClose()
  }
  const handleSubmit = () => {
    const nameValue = name.input.value
    const urlValue = url.input.value
    if (nameValue.trim() && urlValue.trim()) {
      onSubmit({ name: nameValue, url: urlValue, id: generateId() })
      // 重置
      name.input.setValue('')
      url.input.setValue('')
    }
  }

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">添加快捷方式</DialogTitle>

        <DialogContent>
          <div>
            <TextField
              value={name.input.value}
              onChange={name.input.onChange}
              label="名称"
              style={{ margin: 8 }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              value={url.input.value}
              onChange={url.input.onChange}
              label="网址"
              style={{ margin: 8 }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            取消
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            完成
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
