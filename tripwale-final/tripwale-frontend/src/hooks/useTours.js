import { useState, useEffect, useCallback } from 'react'
import { toursAPI } from '../services/api'

// Generic hook for fetching tours from API
export const useTours = (pageType = null, extraParams = {}) => {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = { active: true, limit: 100, ...extraParams }
      if (pageType) params.pageType = pageType
      const res = await toursAPI.getAll(params)
      if (res.success) {
        setTours(res.tours)
      }
    } catch (err) {
      setError(err.message || 'Failed to load tours')
      setTours([])
    } finally {
      setLoading(false)
    }
  }, [pageType, JSON.stringify(extraParams)])

  useEffect(() => { fetch() }, [fetch])

  return { tours, loading, error, refetch: fetch }
}

export const useTour = (id) => {
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    const fetch = async () => {
      setLoading(true)
      try {
        const res = await toursAPI.getById(id)
        if (res.success) setTour(res.tour)
        else setError('Tour not found')
      } catch (err) {
        setError(err.message || 'Tour not found')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  return { tour, loading, error }
}

export const usePageContent = (page) => {
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!page) return
    const fetch = async () => {
      try {
        const { contentAPI } = await import('../services/api')
        const res = await contentAPI.getPage(page)
        if (res.content?.sections) setContent(res.content.sections)
      } catch { /* use empty default */ }
      finally { setLoading(false) }
    }
    fetch()
  }, [page])

  return { content, loading }
}

export const useSiteSettings = () => {
  const [settings, setSettings] = useState({})

  useEffect(() => {
    const fetch = async () => {
      try {
        const { settingsAPI } = await import('../services/api')
        const res = await settingsAPI.getAll()
        if (res.success) setSettings(res.settings)
      } catch {}
    }
    fetch()
  }, [])

  return settings
}
