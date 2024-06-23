import GuruCard from '@/components/guru-card/GuruCard'

import gurus_mock_data from '@/lib/mock-data/gurus.json'

export default function GurusSearched() {
  const searchResult = gurus_mock_data.slice(0, 4)

  return (
    <div className="grid grid-cols-2 gap-3 p-4 lg:grid-cols-3">
      {searchResult.map(({ id, fullName, image, ieltsScore, shortInfo, description, social_networks }) => (
        <GuruCard
          key={id}
          fullName={fullName}
          image={image}
          score={ieltsScore}
          shortInfo={shortInfo}
          description={description}
          social_networks={social_networks}
        />
      ))}
    </div>
  )
}
