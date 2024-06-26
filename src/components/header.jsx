"use client"

import {useEffect, useRef, useState} from "react"
import {Menu} from "lucide-react"

import {cn} from "@/lib/utils"

import CommandMenu from "@/components/command-menu"
// import MobileSidebar from "../MobileSidebar"
import {Button} from "@/components/ui/button"


export default function Header({children}) {
    const navRef = useRef(null)
    const [scroll, setScroll] = useState(false)
    const [open, setOpen] = useState(false)

    console.log(open)
    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                setScroll(!entries[0].isIntersecting)
            },
            {
                root: null,
                rootMargin: `10px 0px`,
                threshold: 0,
            },
        )

        intersectionObserver.observe(navRef.current
        )

        return () => intersectionObserver.disconnect()
    }, [])

    return (
        <>
            <div ref={navRef}></div>
            <div
                className={cn(
                    "fixed right-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-6 xl:w-[calc(100%-240px)]",
                    {
                        "h-12": scroll,
                    },
                )}
            >
                <div className='flex items-center gap-4'>
                    <Button
                        variant='ghost'
                        className='-ml-3 xl:hidden'
                        size='icon'
                        onClick={() => setOpen(true)}
                    >
                        <Menu size={24}/>
                    </Button>

                    <CommandMenu/>
                </div>

                <div className='flex items-center gap-4'>{children}</div>
            </div>

            {/*<MobileSidebar open={open} onOpenChange={setOpen}/>*/}
        </>
    )
}
