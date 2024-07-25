import CardLoading from '@/components/guru-card/CardLoading'

export default function Loading({ itemsAmount = 9 }) {
  return (
    <div className="m-auto grid max-w-[1230px]  gap-3 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: itemsAmount }).map((_, index) => (
        <CardLoading key={index} />
      ))}
    </div>
  )
}
