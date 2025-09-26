import React from 'react'

export default function DeleteModal({ open, itemName = 'item', onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Delete {itemName}?</h3>
        <p>Are you sure you want to delete this {itemName}? This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
          <button onClick={onCancel}>Cancel</button>
          <button className="danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}
