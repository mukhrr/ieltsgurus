import { capitalizeFirstLetter } from '@/lib/utils'

export const socialsInputPlaceholder = (option) => {
  if (option === 'facebook' || option === 'youtube' || option === 'telegram') {
    return `Enter ${capitalizeFirstLetter(option)} channel URL`
  }

  if (option === 'twitter' || option === 'instagram') {
    return `for ex. @muhammad_ali`
  }

  if (option === 'linkedin') {
    return `Enter ${capitalizeFirstLetter(option)} account URL`
  }

  return ''
}
