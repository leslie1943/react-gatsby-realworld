import React, { useEffect } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'

import useInput from '../hooks/useInput'
import { generateId } from '../utils/index'

export default function DialogAdd({ open, onClose, onSubmit, onDelete, item }) {
  const name = useInput('')
  const url = useInput('')
  // 如果 useState 需要接收 props的值需要 useEffect 监听 props的值
  useEffect(() => {
    name.input.setValue(item.name || '')
    url.input.setValue(item.url || '')
  }, [item])

  /**
   * 弹窗触发提交事件
   */
  const handleSubmit = () => {
    const nameValue = name.input.value
    const urlValue = url.input.value
    if (nameValue.trim() && urlValue.trim()) {
      onSubmit({
        name: nameValue,
        url: urlValue,
        id: item.id || generateId(),
        action: item.id ? 'UPDATE' : 'CREATE',
      })
      // 重置表单数据
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
        onClose={onClose}
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
          <Button variant="contained" onClick={onClose}>
            取消
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            完成
          </Button>
          {item.url && (
            <IconButton aria-label="delete" onClick={() => onDelete(item)}>
              <DeleteIcon fontSize="large" />
            </IconButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}
