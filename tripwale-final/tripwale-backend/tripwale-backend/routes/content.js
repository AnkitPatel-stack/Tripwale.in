const express = require('express')
const router = express.Router()
const PageContent = require('../models/PageContent')
const { protect } = require('../middleware/auth')

// GET /api/content/:page - Public
router.get('/:page', async (req, res) => {
  try {
    let content = await PageContent.findOne({ page: req.params.page })
    if (!content) {
      // Return default empty content
      content = { page: req.params.page, sections: {}, seo: {} }
    }
    res.json({ success: true, content })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/content - Get all pages (admin)
router.get('/', protect, async (req, res) => {
  try {
    const pages = await PageContent.find({})
    res.json({ success: true, pages })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/content/:page - Admin only
router.put('/:page', protect, async (req, res) => {
  try {
    const { sections, seo } = req.body
    const content = await PageContent.findOneAndUpdate(
      { page: req.params.page },
      { 
        sections, 
        seo,
        lastModifiedBy: req.admin.name,
      },
      { new: true, upsert: true, runValidators: true }
    )
    res.json({ success: true, content, message: 'Page content updated successfully' })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PATCH /api/content/:page/section - Update specific section (admin)
router.patch('/:page/section', protect, async (req, res) => {
  try {
    const { sectionId, data } = req.body
    const content = await PageContent.findOne({ page: req.params.page })
    
    if (!content) {
      const newContent = await PageContent.create({
        page: req.params.page,
        sections: { [sectionId]: data },
        lastModifiedBy: req.admin.name,
      })
      return res.json({ success: true, content: newContent })
    }
    
    content.sections = { ...content.sections, [sectionId]: data }
    content.lastModifiedBy = req.admin.name
    await content.save()
    
    res.json({ success: true, content, message: 'Section updated' })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

module.exports = router
