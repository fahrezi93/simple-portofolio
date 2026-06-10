import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { User, Briefcase, FolderGit2, Mail, FileText, Monitor, Moon, Sun } from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => window.location.href = "#about")}>
            <User className="mr-2 h-4 w-4" />
            <span>About</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.href = "#experience")}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Experience</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.href = "#projects")}>
            <FolderGit2 className="mr-2 h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.href = "#contact")}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Contact</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Links">
          <CommandItem onSelect={() => runCommand(() => window.open("https://github.com/fahrezi93", "_blank"))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>GitHub Profile</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => runCommand(() => document.documentElement.classList.remove("dark"))}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light Mode</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => document.documentElement.classList.add("dark"))}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark Mode</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
