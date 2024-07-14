import useMediaQuery from '@/hooks/useMediaQuery'

import { SubmitBookmarkDrawer } from '@/components/submit-bookmark/drawer'
import { SubmitBookmarkDialog } from '@/components/submit-bookmark/dialog'

const FeedbackButton = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <>
      {isMobile ? (
        <SubmitBookmarkDrawer>{children}</SubmitBookmarkDrawer>
      ) : (
        <SubmitBookmarkDialog>{children}</SubmitBookmarkDialog>
      )}
    </>
  )
}

export default FeedbackButton
