'use client'

import { useState } from 'react'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { SubmitBookmarkForm } from '@/components/submit-bookmark/form'

import { SUBMIT_FEEDBACK_FORM_TITLE, SUBMIT_FEEDBACK_FORM_DESCRIPTION } from '@/lib/constants'

export const SubmitBookmarkDrawer = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="px-6">
        <DrawerHeader className="sm:text-center">
          <DrawerTitle>{SUBMIT_FEEDBACK_FORM_TITLE}</DrawerTitle>
          <DrawerDescription className="m-0">{SUBMIT_FEEDBACK_FORM_DESCRIPTION}</DrawerDescription>
        </DrawerHeader>
        <SubmitBookmarkForm setFormOpen={setOpen} className="py-8" />
      </DrawerContent>
    </Drawer>
  )
}
