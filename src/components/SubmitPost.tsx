import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { errorHandring, globalAxios } from '../service/globalAxios'

const SubmitPost: React.FC = () => {
  const [body, setBody] = useState<string>('')
  const router = useRouter()

  const onChangeBody: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setBody(e.currentTarget.value)
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const params = { post: { body } }
    try {
      await globalAxios.post('/posts', params)
      alert('送信しました！')
      router.push('/')
    } catch (e) {
      errorHandring(e)
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="post-body">
          内容
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight duration-300 focus:outline-none focus:ring"
          id="post-body"
          type="text"
          value={body}
          onChange={onChangeBody}
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={!body}
          className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 w-full rounded duration-300 focus:outline-none"
        >
          送信
        </button>
      </div>
    </form>
  )
}

export { SubmitPost }
