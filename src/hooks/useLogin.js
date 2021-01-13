import { useState, useEffect } from 'react'
import axios from 'axios'

function useLogin() {
  // 默认值: false-是否登录; true-是否正在发送请求
  const [status, setStatus] = useState([false, true])
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // 每次都加载这个方法是为了防止多端登录或者清空本地数据

      // ⭐ 定义加载用户是否登录的方法
      const loadUserStatus = async () => {
        try {
          await axios.get('/user', {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          // 登录成功, 非加载状态
          setStatus([true, false])
        } catch (error) {
          setStatus([false, false])
        }
      }
      // ⭐ 调用加载用户是否登录的方法
      loadUserStatus()
    } else {
      setStatus([false, false])
    }
  }, [])
  return status
}

export default useLogin
