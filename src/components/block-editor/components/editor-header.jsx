import { Icon } from '@/components/ui/icon'
import { Toolbar } from '@/components/ui/toolbar'
import { EditorInfo } from './editor-info'

export const EditorHeader = ({ characters, collabState, users, words, isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="flex flex-none flex-row items-center justify-between border-b border-neutral-200 bg-white py-2 pl-6 pr-3 text-black dark:border-neutral-800 dark:bg-black dark:text-white">
      <div className="flex flex-row items-center gap-x-1.5">
        <div className="flex items-center gap-x-1.5">
          <Toolbar.Button
            tooltip={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            onClick={toggleSidebar}
            active={isSidebarOpen}
            className={isSidebarOpen ? 'bg-transparent' : ''}
          >
            <Icon name={isSidebarOpen ? 'PanelLeftClose' : 'PanelLeft'} />
          </Toolbar.Button>
        </div>
      </div>
      <EditorInfo characters={characters} words={words} collabState={collabState} users={users} />
    </div>
  )
}
