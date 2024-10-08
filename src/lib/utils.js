import { cache } from 'react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

/**
 * Combines and merges multiple CSS class names or values using the classix and tailwind-merge libraries.
 * This function takes any number of arguments and passes them to the cx function from classix,
 * which generates a combined class name string. The result is then passed to twMerge from tailwind-merge,
 * which merges any overlapping or duplicate classes into a final single string.
 *
 * @param args - The CSS class names or values to be combined and merged.
 * @returns - A merged string containing the combined CSS class names or values.
 */
export function cn(...args) {
  return twMerge(clsx(args))
}

/**
 * Checks whether a given link is an external link by evaluating its href attribute.
 * If the href is empty or null, it is considered an internal link.
 * Otherwise, if the href does not start with '/' or '#', it is regarded as an external link.
 *
 * @param href - The href attribute value of the link to be checked.
 * @returns - A boolean value indicating whether the link is an external link.
 */
export const isExternalLink = (href) => {
  if (!href) return false
  return !href.startsWith('/') && !href.startsWith('#') && href.startsWith('http')
}

/**
 * Formats a given date string into a localized date representation based on the 'en-US' locale.
 * The resulting date format includes the full month name, two-digit day, and the numeric year.
 * e.g. 'June 23, 1992'
 *
 * @param date - The date string to be formatted.
 * @returns - A localized date string representation formatted as 'Month Day, Year'.
 */
export const getDateTimeFormat = (date) => {
  const dateObj = new Date(date)
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }).format(dateObj)
}

/**
 * Converts a given string to a dashed lowercase format.
 * This function replaces any occurrences of one or more consecutive spaces with a dash, and converts the resulting string to lowercase.
 *
 * @param text - The input text to be dasherized.
 * @returns - The dasherized version of the input text.
 */
export const dasherize = (text) => String(text).replace(/ +/g, '-').toLowerCase()

/**
 * Checks if the current environment is set to development mode.
 * The function compares the value of the `NODE_ENV` environment variable with 'development'.
 * @returns A boolean value indicating whether the current environment is set to development mode.
 */
export const isDevelopment = process.env.NODE_ENV === 'development'

/**
 * Sorts an array of objects based on the specified property in ascending order.
 * The function compares the property values in a case-insensitive manner.
 *
 * @param arr - The array to be sorted.
 * @param prop - The property name used for sorting the objects.
 * @returns - The sorted array in ascending order based on the specified property.
 */
export const sortByProperty = cache((arr, prop) => {
  return arr?.sort((a, b) => {
    const itemA = a[prop].toUpperCase()
    const itemB = b[prop].toUpperCase()

    if (itemA < itemB) {
      return -1
    } else if (itemA > itemB) {
      return 1
    }

    return 0
  })
})

/**
 * Sorts an array of blog post objects based on their date field (only for old blog posts) or publication dates in descending order.
 * The function compares the 'date' property of each post or 'firstPublishedAt' property from the 'sys' object.
 * The posts are sorted by creating Date objects from the publication dates and comparing them.
 *
 * @param posts - The array of blog post objects to be sorted.
 * @returns - The sorted array of blog posts in descending order based on their publication dates.
 */
export const getSortedPosts = cache((posts) => {
  return posts.sort((a, b) => {
    const dateA = a.date || a.sys.firstPublishedAt
    const dateB = b.date || b.sys.firstPublishedAt
    return new Date(dateB) - new Date(dateA)
  })
})

/**
 * Creates an instance of the DateTimeFormat object with 'en-US' locale,
 * specifying the format to include the month and year in a two-digit and numeric format, respectively.
 * This formatter can be used to format date objects into a string representation with only the month and year.
 */
export const dateWithMonthAndYearFormatter = Intl.DateTimeFormat('en-US', {
  month: '2-digit',
  year: 'numeric'
})

/**
 * Creates an instance of the DateTimeFormat object with 'tr-TR' locale,
 * specifying the format to include the day and month in a two-digit format.
 * This formatter can be used to format date objects into a string representation with the day and month included.
 */
export const dateWithDayAndMonthFormatter = Intl.DateTimeFormat('tr-TR', {
  day: '2-digit',
  month: '2-digit'
})

/**
 * Initializes an instance of `Intl.NumberFormat` named `viewCountFormatter`
 * with the 'nl-NL' locale for formatting view counts.
 *
 * @example
 * const count = 1000000;
 * const formattedCount = viewCountFormatter.format(count);
 * console.log(formattedCount); // Output: "1.000.000"
 */
export const viewCountFormatter = new Intl.NumberFormat('nl-NL')

/**
 * Function to group items by year based on the provided date.
 *
 * @param items - The array of items to be grouped by year.
 * @returns - An array of arrays, each containing items grouped by year.
 */
export const getItemsByYear = (items) => {
  return items.reduce((acc, item) => {
    const year = new Date(item.created_at).getFullYear()
    const yearArr = acc.find((item) => item[0] === year)
    if (!yearArr) {
      acc.push([year, [item]])
    } else {
      yearArr[1].push(item)
    }

    return acc
  }, [])
}

/**
 * Function to get first two letters of name.
 *
 * @param fullName - The full name of mentor
 * @returns - The first letter of full name.
 */
export const getInitials = (fullName) => {
  return fullName
    .split(' ')
    .map((name) => name[0])
    .join('')
}

export const convertFilterToColumnName = (filter) => {
  // Remove special characters like '+', replace spaces with underscores
  const columnName = filter
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '_')
    .toLowerCase()

  switch (columnName) {
    case 'writing_expert':
      return 'writing'
    case 'general_ielts_preparation':
      return 'general'
    case 'reading_guru':
      return 'reading'
    case 'speaking_practice_master':
      return 'speaking'
    case 'experienced_in_listening':
      return 'listening'
    case 'most_recommended':
      return 'recommended'

    default:
      return columnName
  }
}

/**
 * Replaces all spaces in the input string with a plus sign.
 * @param {string} str - The input string.
 * @return {string} - The modified string with spaces replaced by plus signs.
 */
export const replaceSpacesWithPlus = (str) => {
  return str.split(' ').join('+')
}

export const strToCamelCase = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

export const capitalizeFirstLetter = (str) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

export const calculateIeltsOverall = (score) => {
  if (!score || typeof score !== 'object') {
    throw new Error('Invalid input: score must be an object')
  }

  const validScores = ['reading', 'listening', 'writing', 'speaking'].map((skill) => {
    const value = score[skill]
    if (typeof value !== 'number' || value < 0 || value > 9) {
      throw new Error(`Invalid ${skill} score: must be a number between 0 and 9`)
    }
    return value
  })

  const sum = validScores.reduce((acc, curr) => acc + curr, 0)
  const average = sum / 4

  // Round to the nearest 0.5
  return Math.round(average * 2) / 2
}

/**
 * Remove "@" from a string
 * @param {string} input - The input string
 * @returns {string} - The modified string with "@" removed
 */
export const removeAtSymbol = (input) => {
  return input.startsWith('@') ? input.replace(/@/g, '') : input
}

export const addAtSymbol = (input) => {
  return input.startsWith('@') ? input : `@${input}`
}

export const generateImagePathOnStore = (image) =>
  isExternalLink(image) ? image : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${image}`

export const generateSocialNetworkLink = (key, url) => {
  switch (key) {
    case 'telegram':
      return isExternalLink(url) ? url : `https://t.me/${removeAtSymbol(url)}`
    case 'twitter':
      return isExternalLink(url) ? url : `https://x.com/${removeAtSymbol(url)}`
    case 'linkedin':
      return isExternalLink(url) ? url : `https://www.linkedin.com/in/${removeAtSymbol(url)}`
    case 'instagram':
      return isExternalLink(url) ? url : `https://www.instagram.com/${removeAtSymbol(url)}`
    case 'facebook':
      return isExternalLink(url) ? url : `https://www.facebook.com/${removeAtSymbol(url)}`
    case 'youtube':
      return isExternalLink(url) ? url : `https://www.facebook.com/${addAtSymbol(url)}`

    default:
      return ''
  }
}
//
// export const jsonToHtml = (jsonContent) => {
//   const content = typeof jsonContent === 'string' ? JSON.parse(jsonContent) : jsonContent
//
//   const html = generateHTML(content, defaultExtensions)
//
//   return html
// }
