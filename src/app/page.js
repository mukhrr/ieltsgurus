import GuruCard from '@/components/guru-card/GuruCard'

export default async function Index() {
  return (
    <div>
      <section className="flex max-w-[1230px] flex-1 flex-col gap-6">
        <GuruCard />
      </section>
    </div>
  )
}
