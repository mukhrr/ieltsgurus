import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDownIcon } from 'lucide-react'
import { Link } from '@/components/link'

const FAQ_ITEMS = [
  {
    question: 'What is IELTS GURUS?',
    answer:
      'IELTS GURUS is a platform that features top IELTS instructors and links to their channels, providing invaluable content and resources for IELTS preparation.'
  },
  {
    question: 'How can IELTS GURUS help me with my IELTS preparation?',
    answer:
      'The platform offers direct access to content from experienced IELTS instructors, including tips, strategies, and practice materials to help you succeed in the IELTS exam.'
  },
  {
    question: 'Is IELTS GURUS free to use?',
    answer: 'Yes, accessing the resources and instructor channels on IELTS GURUS is completely free.'
  },
  {
    question: 'Is that all?! Just a list of IELTS mentors?',
    answer: 'For now, YES! We are actively working on new features.'
  },
  {
    question: 'What features are coming soon to IELTS GURUS?',
    answer:
      'We are working on adding new features such as personalized AI mock examiners, study plans, mentor blogs, and community forums to enhance your learning experience.',
    link: {
      text: 'Here you can see the Roadmap',
      path: 'https://ieltsgurus.productroad.com/roadmap/roadmap'
    }
  }
]

const FAQItem = ({ question, answer, link }) => (
  <Collapsible>
    <CollapsibleTrigger className="hover:bg-muted flex w-full items-center justify-between rounded-md bg-background px-4 py-3 text-lg font-bold transition-colors">
      {question}
      <ChevronDownIcon className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
    </CollapsibleTrigger>
    <CollapsibleContent className="text-muted-foreground px-4 pt-2">
      {answer} {link && <Link href={link.path}>{link.text}</Link>}
    </CollapsibleContent>
  </Collapsible>
)

export default function FAQ() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <Collapsible>
              {FAQ_ITEMS.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} link={item.link} />
              ))}
            </Collapsible>
          </div>
        </div>
      </div>
    </section>
  )
}
