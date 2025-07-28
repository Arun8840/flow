import { useTheme } from "next-themes"
import React from "react"
import { Button } from "./button"
import { Moon, Sun } from "lucide-react"

const DarkModeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const darkmodeHandler = () => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }
  return (
    <>
      <Button
        onClick={darkmodeHandler}
        variant={"secondary"}
        className="size-7 shadow-none border-none"
      >
        {theme === "light" ? <Moon /> : <Sun />}
      </Button>
    </>
  )
}

export default DarkModeSwitcher
