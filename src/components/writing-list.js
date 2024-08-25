'use client'

import Link from 'next/link'
import { domAnimation, LazyMotion } from 'framer-motion'

import { cn, dateWithDayAndMonthFormatter, dateWithMonthAndYearFormatter } from '@/lib/utils'

export const WritingList = ({ items, username }) => {
  return (
    <LazyMotion features={domAnimation}>
      <div className="text-sm">
        <div className="grid grid-cols-6 py-2 font-medium text-gray-500">
          <span className="col-span-1 hidden text-left md:grid">Year</span>
          <span className="col-span-6 md:col-span-5">
            <span className="grid grid-cols-4 items-center md:grid-cols-8">
              <span className="col-span-1 text-left">Date</span>
              <span className="col-span-2 md:col-span-6">Title</span>
            </span>
          </span>
        </div>

        <div className="group/list-wrapper">
          {items.map((item) => {
            const [year, itemsArr] = item

            return (
              <ul className="group/list list-none" key={year}>
                {itemsArr.map((item, itemIndex) => {
                  const { title, id, created_at } = item
                  const dateObj = new Date(created_at)
                  const dateWithDayAndMonth = dateWithDayAndMonthFormatter.format(dateObj)
                  const dateWithMonthAndYear = dateWithMonthAndYearFormatter.format(dateObj)

                  return (
                    <li
                      key={id}
                      className="group/list-item grid grid-cols-6 p-0 group-hover/list-wrapper:text-gray-300"
                    >
                      <span
                        className={cn(
                          'pointer-events-none col-span-1 hidden items-center tabular-nums transition-colors duration-300 group-hover/list:text-gray-900 md:grid',
                          itemIndex === 0 && 'border-t border-gray-200'
                        )}
                      >
                        {itemIndex === 0 ? year : ''}
                      </span>
                      <Link
                        href={`/${username}/blog/${id}`}
                        className="col-span-6 group-hover/list-item:text-gray-900 md:col-span-5"
                      >
                        <span className="grid grid-cols-4 items-center gap-2 border-t border-gray-200 py-4 md:grid-cols-8">
                          <span className="col-span-1 text-left tabular-nums">
                            <time dateTime={created_at} className="hidden md:block" suppressHydrationWarning>
                              {dateWithDayAndMonth}
                            </time>
                            <time dateTime={created_at} className="md:hidden" suppressHydrationWarning>
                              {dateWithMonthAndYear}
                            </time>
                          </span>
                          <span className="col-span-2 line-clamp-4 md:col-span-6">{title}</span>
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </div>
      </div>
    </LazyMotion>
  )
}
