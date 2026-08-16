import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiImage, FiUploadCloud } from 'react-icons/fi'
import { CATEGORIES } from '../data/dummyData'
import { fileToDataUrl } from '../utils/helpers'
import Button from './Button'

export default function UploadForm({
  onSubmit,
  onCancel,
  submitLabel = 'Publish Post',
  showStatusToggle = false,
  initialValues = null
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      category: initialValues?.category || CATEGORIES[0],
      status: initialValues?.status || 'published'
    }
  })
  const [preview, setPreview] = useState(initialValues?.image || null)

  async function handleImageChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await fileToDataUrl(file)
    setPreview(dataUrl)
  }

  async function submitHandler(values) {
    if (!preview) {
      // fall back to a nice placeholder if user skips the image
      setPreview('https://picsum.photos/800/600')
    }
    await onSubmit({ ...values, image: preview || 'https://picsum.photos/800/600' })
    reset()
    setPreview(null)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink-800">Title</label>
        <input
          {...register('title', { required: 'A title is required' })}
          placeholder="Give your post a clear, compelling title"
          className="input-field"
        />
        {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink-800">Description</label>
        <textarea
          {...register('description', { required: 'A description is required' })}
          rows={4}
          placeholder="What is this post about?"
          className="input-field resize-none"
        />
        {errors.description && <p className="mt-1 text-xs text-rose-600">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink-800">Category</label>
          <select {...register('category')} className="input-field">
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {showStatusToggle && (
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink-800">Status</label>
            <select {...register('status')} className="input-field">
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink-800">Image</label>
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-orchid-300/60 bg-white/40 py-8 text-center transition-colors hover:bg-white/60">
          <FiUploadCloud size={26} className="text-orchid-600" />
          <span className="text-sm font-medium text-ink-700/70">Click to upload an image</span>
          <span className="text-xs text-ink-700/50">PNG, JPG up to a few MB</span>
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>

        {preview ? (
          <div className="mt-4 overflow-hidden rounded-2xl">
            <img src={preview} alt="Preview" className="h-48 w-full object-cover" />
          </div>
        ) : (
          <div className="mt-4 flex h-24 items-center justify-center gap-2 rounded-2xl bg-white/30 text-sm text-ink-700/40">
            <FiImage size={16} /> No image selected yet
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={isSubmitting} className="flex-1">
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
