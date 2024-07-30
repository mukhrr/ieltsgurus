import useMediaQuery from '@/hooks/useMediaQuery'

import { SubmitFeedbackDrawer } from '@/components/submit-feedback/drawer'
import { SubmitFeedbackDialog } from '@/components/submit-feedback/dialog'

const FeedbackButton = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <>
      {isMobile ? (
        <SubmitFeedbackDrawer>{children}</SubmitFeedbackDrawer>
      ) : (
        <SubmitFeedbackDialog>{children}</SubmitFeedbackDialog>
      )}
    </>
  )
}

export default FeedbackButton
