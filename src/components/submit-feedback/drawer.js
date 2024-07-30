'use client'

import { useState } from 'react'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { SubmitFeedbackForm } from '@/components/submit-feedback/form'

import { SUBMIT_FEEDBACK_FORM_DESCRIPTION, SUBMIT_FEEDBACK_FORM_TITLE } from '@/lib/constants'

export const SubmitFeedbackDrawer = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="p-6">
        <DrawerHeader className="sm:text-center">
          <DrawerTitle>{SUBMIT_FEEDBACK_FORM_TITLE}</DrawerTitle>
          <DrawerDescription className="m-0">{SUBMIT_FEEDBACK_FORM_DESCRIPTION}</DrawerDescription>
        </DrawerHeader>
        <SubmitFeedbackForm setFormOpen={setOpen} className="py-8" />
      </DrawerContent>
    </Drawer>
  )
}
