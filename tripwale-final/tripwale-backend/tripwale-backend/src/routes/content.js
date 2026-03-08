const express = require('express')
const ContentBlock = require('../models/ContentBlock')
const Activity = require('../models/Activity')
const { protect } = require('../middleware/auth')

const router = express.Router()

// GET /api/content/:page - Get all content for a page (public)
router.get('/:page', async (req, res) => {
  try {
    const blocks = await ContentBlock.find({ page: req.params.page })
    // Convert to key-value object
    const content = {}
    blocks.forEach(b => { content[b.section] = b.value })
    res.json({ success: true, content, blocks })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/content - Get all content (admin)
router.get('/', protect, async (req, res) => {
  try {
    const blocks = await ContentBlock.find().sort({ page: 1, section: 1 })
    res.json({ success: true, blocks })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/content/:page/:section - Update a content block (admin)
router.put('/:page/:section', protect, async (req, res) => {
  try {
    const { value, type, label, description } = req.body
    const block = await ContentBlock.findOneAndUpdate(
      { page: req.params.page, section: req.params.section },
      { value, type, label, description },
      { new: true, upsert: true, runValidators: true }
    )
    
    await Activity.create({
      adminId: req.admin._id, adminName: req.admin.name,
      action: `Updated ${req.params.page} > ${req.params.section}`,
      entity: 'content', type: 'update',
    })
    
    res.json({ success: true, block })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// POST /api/content/bulk-update - Update multiple blocks at once (admin)
router.post('/bulk-update', protect, async (req, res) => {
  try {
    const { page, updates } = req.body // updates: [{ section, value, type, label }]
    
    const ops = updates.map(u => ({
      updateOne: {
        filter: { page, section: u.section },
        update: { $set: { value: u.value, type: u.type, label: u.label, description: u.description } },
        upsert: true,
      }
    }))
    
    await ContentBlock.bulkWrite(ops)
    
    await Activity.create({
      adminId: req.admin._id, adminName: req.admin.name,
      action: `Bulk updated ${updates.length} blocks on ${page} page`,
      entity: 'content', type: 'update',
    })
    
    const blocks = await ContentBlock.find({ page })
    res.json({ success: true, blocks })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/content/:id - Delete a block (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    await ContentBlock.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Block deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
