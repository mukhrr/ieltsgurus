import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDownIcon } from 'lucide-react'
import { Link } from '@/components/link'

const FAQ_ITEMS = [
  {
    question: 'What is IELTStify?',
    answer: 'IELTStify is a platform that features top IELTS instructors, providing invaluable content and resources for IELTS preparation. It now includes instructor blogs, account management features, and more.'
  },
  {
    question: 'How can IELTStify help me with my IELTS preparation?',
    answer: 'The platform offers direct access to content from experienced IELTS instructors, including tips, strategies, and practice materials. You can now read instructor blogs for in-depth IELTS tips and manage your account for a personalized experience.'
  },
  {
    question: 'Is IELTStify free to use?',
    answer: 'Yes! It is totally free to use.'
  },
  {
    question: 'What new features are available in IELTStify?',
    answer: 'IELTStify introduces instructor blogs on IELTS tips, account management features for users, and enhanced content delivery. These additions provide a more comprehensive and personalized IELTS preparation experience.'
  },
  {
    question: 'Can instructors now contribute their own content to IELTStify?',
    answer: 'Yes, IELTS instructors can now run their own blogs on the platform, sharing valuable tips and insights directly with users.'
  },
  {
    question: 'Are there any upcoming features for IELTStify?',
    answer: 'We are continuously improving IELTStify. Future updates may include features like personalized AI mock examiners, study plans, learning marathons, and community forums to further enhance your learning experience.',
    link: {
      text: 'Check our Roadmap for upcoming features',
      path: 'https://ieltsgurus.productroad.com/roadmap/roadmap'
    }
  }
]

const FAQItem = ({ question, answer, link }) => (
  <Collapsible>
    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-background px-4 py-3 text-lg font-bold transition-colors hover:bg-muted">
      {question}
      <ChevronDownIcon className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
    </CollapsibleTrigger>
    <CollapsibleContent className="px-4 pt-2 text-muted-foreground">
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
