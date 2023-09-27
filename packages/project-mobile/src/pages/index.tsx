import { ImageViewer, List } from 'antd-mobile'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const enUrl = (url: string) => {
  return url.replace(/#/g, '$hash$')
}

const deUrl = (url: string) => {
  return url.replace(/\$hash\$/g, '#')
}

interface FileInfo {
  filePath: string
  file: string
  type: 'file' | 'dir' | 'other'
}

const Item: React.FC<{
  item: FileInfo
}> = ({ item: { filePath, file, type } }) => {
  const navigate = useNavigate()

  if (type === 'dir') {
    return (
      <div>
        <span style={{ color: 'blue' }} onClick={() => navigate(enUrl(filePath))}>
          {file}
        </span>
      </div>
    )
  }

  const fileName = file.toLowerCase()
  const fileext = fileName.split('.').pop()

  if (
    fileext === 'jpg' ||
    fileext === 'png' ||
    fileext === 'jpeg' ||
    fileext === 'gif' ||
    fileext === 'bmp'
  ) {
    return (
      <div>
        <img src={enUrl('/api/img' + filePath)} alt="" width="100%" />
      </div>
    )
  }

  return <div>{file}</div>
}

const PageIndex: React.FC = () => {
  const [list, setList] = useState<Array<FileInfo>>([])
  const location = useLocation()

  useEffect(() => {
    const dir = deUrl(decodeURI(window.location.hash.substring(1)))
    console.log(dir)
    fetch(enUrl('/api/readdir' + dir))
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setList(res)
      })
  }, [location])

  const demoImages = useMemo(() => {
    return list
      .filter((item) => {
        const fileName = item.file.toLowerCase()
        const fileext = fileName.split('.').pop()
        return (
          fileext === 'jpg' ||
          fileext === 'png' ||
          fileext === 'jpeg' ||
          fileext === 'gif' ||
          fileext === 'bmp'
        )
      })
      .map((item) => {
        return enUrl('/api/img' + item.filePath)
      })
  }, [list])

  return (
    <List>
      {list.map((item) => {
        return (
          <List.Item
            key={item.file}
            onClick={() => {
              const defaultIndex = demoImages.indexOf(enUrl('/api/img' + item.filePath))
              if (defaultIndex !== -1) {
                ImageViewer.Multi.show({
                  images: demoImages,
                  defaultIndex: demoImages.indexOf(enUrl('/api/img' + item.filePath)),
                })
              }
            }}
          >
            <Item item={item} />
          </List.Item>
        )
      })}
    </List>
  )
}

export default PageIndex
