import { useEditor } from 'novel'
import { Check, TextQuote, TrashIcon } from 'lucide-react'

import { CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/command'

const AICompletionCommands = ({ completion, onDiscard }) => {
  const { editor } = useEditor()

  return (
    <>
      <CommandGroup>
        <CommandItem
          className="gap-2 px-4"
          value="replace"
          onSelect={() => {
            const selection = editor.view.state.selection

            editor
              .chain()
              .focus()
              .insertContentAt(
                {
                  from: selection.from,
                  to: selection.to
                },
                completion
              )
              .run()
          }}
        >
          <Check className="text-muted-foreground h-4 w-4" />
          Replace selection
        </CommandItem>
        <CommandItem
          className="gap-2 px-4"
          value="insert"
          onSelect={() => {
            const selection = editor.view.state.selection
            editor
              .chain()
              .focus()
              .insertContentAt(selection.to + 1, completion)
              .run()
          }}
        >
          <TextQuote className="text-muted-foreground h-4 w-4" />
          Insert below
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />

      <CommandGroup>
        <CommandItem onSelect={onDiscard} value="thrash" className="gap-2 px-4">
          <TrashIcon className="text-muted-foreground h-4 w-4" />
          Discard
        </CommandItem>
      </CommandGroup>
    </>
  )
}

export default AICompletionCommands
