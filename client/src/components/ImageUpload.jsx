import { useRef, useEffect, useState } from 'react'
import './ImageUpload.css'

// Cloudinary 위젯용 환경변수 (client/.env 또는 client/.env.local)
// - VITE_CLOUDINARY_CLOUD_NAME: Cloudinary 대시보드 상단 cloud name
// - VITE_CLOUDINARY_UPLOAD_PRESET: Settings > Upload > Unsigned preset 이름
const CLOUD_NAME = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '').trim()
const UPLOAD_PRESET = (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '').trim()
const CLOUDINARY_READY = Boolean(CLOUD_NAME && UPLOAD_PRESET)

function ImageUpload({ value = '', onChange, placeholder = '/jpg/01.jpg' }) {
  const widgetRef = useRef(null)
  const fileInputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(value || placeholder)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setPreviewUrl(value || placeholder)
  }, [value, placeholder])

  const openCloudinaryWidget = () => {
    if (!CLOUDINARY_READY) {
      setError('Cloudinary 설정이 필요합니다. .env에 VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET을 설정하세요.')
      return
    }
    if (!window.cloudinary) {
      setError('Cloudinary 위젯을 불러오는 중입니다. 잠시 후 다시 시도하세요.')
      return
    }
    setError('')
    if (!widgetRef.current) {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: CLOUD_NAME,
          uploadPreset: UPLOAD_PRESET,
          sources: ['local', 'url', 'camera'],
          multiple: false,
          maxFiles: 1,
          cropping: true,
          croppingAspectRatio: 1.2,
          language: 'ko',
        },
        (err, result) => {
          if (err) {
            setError(err.message || '업로드 중 오류가 발생했습니다.')
            return
          }
          if (result.event === 'success' && result.info?.secure_url) {
            const url = result.info.secure_url
            setPreviewUrl(url)
            onChange?.(url)
            setError('')
          }
        }
      )
    }
    widgetRef.current?.open()
  }

  const handleLocalFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있습니다.')
      return
    }
    if (!CLOUDINARY_READY) {
      setError('Cloudinary 설정이 필요합니다. .env에 VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET을 설정하세요.')
      e.target.value = ''
      return
    }
    setError('')
    setUploading(true)
    const tempUrl = URL.createObjectURL(file)
    setPreviewUrl(tempUrl)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', UPLOAD_PRESET)

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      )
      const data = await res.json()
      if (data.secure_url) {
        setPreviewUrl(data.secure_url)
        onChange?.(data.secure_url)
      } else {
        setError(data.error?.message || '업로드에 실패했습니다.')
        setPreviewUrl(value || placeholder)
      }
    } catch (err) {
      setError(err?.message || '업로드에 실패했습니다.')
      setPreviewUrl(value || placeholder)
    } finally {
      URL.revokeObjectURL(tempUrl)
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleUrlChange = (e) => {
    const url = e.target.value.trim()
    setPreviewUrl(url || placeholder)
    onChange?.(url || '')
    setError('')
  }

  return (
    <div className="image-upload">
      <div className="image-upload-preview">
        <img
          src={previewUrl}
          alt="상품 미리보기"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%23f5f5f5" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="14"%3E이미지%3C/text%3E%3C/svg%3E'
          }}
        />
        {uploading && (
          <div className="image-upload-overlay">
            <span>업로드 중...</span>
          </div>
        )}
      </div>

      <div className="image-upload-actions">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="image-upload-input-hidden"
          onChange={handleLocalFile}
          disabled={uploading}
        />
        <button
          type="button"
          className="image-upload-btn"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          📁 로컬 파일 선택
        </button>
        <button
          type="button"
          className="image-upload-btn"
          onClick={openCloudinaryWidget}
          disabled={uploading}
        >
          ☁️ Cloudinary에서 선택
        </button>
      </div>

      <div className="image-upload-url-row">
        <label>또는 URL 직접 입력</label>
        <input
          type="text"
          value={value || ''}
          onChange={handleUrlChange}
          placeholder="https://... 또는 /jpg/01.jpg"
        />
      </div>

      {error && <p className="image-upload-error">{error}</p>}
    </div>
  )
}

export default ImageUpload
