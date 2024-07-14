'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { SubmitBookmarkForm } from '@/components/submit-bookmark/form'

import { SUBMIT_FEEDBACK_FORM_DESCRIPTION, SUBMIT_FEEDBACK_FORM_TITLE } from '@/lib/constants'

export const SubmitBookmarkDialog = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{SUBMIT_FEEDBACK_FORM_TITLE}</DialogTitle>
          <DialogDescription>{SUBMIT_FEEDBACK_FORM_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <SubmitBookmarkForm setFormOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
