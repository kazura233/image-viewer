import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { fileTypeFromBuffer } from 'file-type'

export interface FileInfo {
  filePath: string
  file: string
  type: 'file' | 'dir' | 'other'
}

export const getFileInfo = (dir: string, file: string): FileInfo => {
  const filePath = path.join(dir, file)
  const stats = fs.statSync(filePath)
  if (stats.isFile()) {
    return { filePath, file, type: 'file' }
  }
  if (stats.isDirectory()) {
    return { filePath, file, type: 'dir' }
  }
  return { filePath, file, type: 'other' }
}

export const getFiles = (dir: string): FileInfo[] => {
  const files = fs.readdirSync(dir)
  return files
    .map((file) => getFileInfo(dir, file))
    .filter((file) => !(file.file.startsWith('.') || file.type === 'other'))
}

export const compressImage = async (dir: string): Promise<Buffer | null> => {
  const file = fs.readFileSync(dir)

  const fileType = await fileTypeFromBuffer(file)
  if (!fileType) return null

  // 进行压缩
  if (['jpg', 'png', 'bmp'].includes(fileType.ext)) {
    return await sharp(file)
      .jpeg({ quality: 80 })
      .flatten({ background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .toBuffer()
  }

  // 不压缩
  if (['gif'].includes(fileType.ext)) return file

  return null
}

export const enUrl = (url: string) => {
  return url.replace(/#/g, '$hash$')
}

export const deUrl = (url: string) => {
  return url.replace(/\$hash\$/g, '#')
}
