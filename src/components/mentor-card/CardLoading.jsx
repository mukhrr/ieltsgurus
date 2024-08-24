import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function CardLoading() {
  return (
    <Card className="h-64 w-full max-w-md overflow-hidden  rounded-lg p-6 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
      <div className="mt-4 space-y-4">
        <Skeleton className="h-16 w-full" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </Card>
  )
}
