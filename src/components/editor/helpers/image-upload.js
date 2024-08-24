import { createImageUpload } from 'novel/plugins'
import { toast } from 'sonner'

const onUpload = (file) => {
  const promise = fetch('/api/upload', {
    method: 'POST',
    headers: {
      'content-type': file?.type || 'application/octet-stream',
      'x-vercel-filename': file?.name || 'image.png'
    },
    body: file
  })

  return new Promise((resolve) => {
    toast.promise(
      promise.then(async (res) => {
        if (res.ok) {
          const data = await res.json()
          if (data.url) {
            // preload the image
            let image = new Image()
            image.src = data.url
            image.onload = () => {
              resolve(data.url)
            }
          } else {
            throw new Error('No URL in response')
          }
        } else {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Error uploading image')
        }
      }),
      {
        loading: 'Uploading image...',
        success: 'Image uploaded successfully.',
        error: (e) => e.message
      }
    )
  })
}

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes('image/')) {
      toast.error('File type not supported.')
      return false
    } else if (file.size / 1024 / 1024 > 20) {
      toast.error('File size too big (max 20MB).')
      return false
    }
    return true
  }
})
