import { MicroscopeIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Categories from '@/components/categories'
import GurusSearched from '@/components/gurus/gurus-searched'

export default async function Index() {
  return (
    <div className="m-auto max-w-[1230px]">
      <section>
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="mb-8 flex items-center justify-between" />
          <div className="text-center">
            <h1 className="mb-2 text-5xl font-bold">Discover IELTS Instructors</h1>
            <p className="mb-6 text-lg">150 gurus found and counting</p>
            <div className="relative">
              <Input placeholder="Search within the top IELTS intructors hub" className="w-full py-3 pl-4 pr-10" />
              <MicroscopeIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
            </div>
            <div className="mt-6 flex items-center justify-center space-x-4">
              {/*<Button variant="outline">Submit your profile</Button>*/}
              {/*<span>|</span>*/}
              <Button variant="outline">Help us to grow - Share your feedback*</Button>
            </div>
          </div>
        </div>
      </section>
      <Categories />
      <GurusSearched />
    </div>
  )
}
