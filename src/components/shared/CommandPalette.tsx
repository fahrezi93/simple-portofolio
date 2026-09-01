import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { User, Briefcase, FolderGit2, Mail, FileText, Moon, Sun, Award, Layers, GraduationCap } from "lucide-react";

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
            <span>About Me</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.href = "#experience")}>
            <GraduationCap className="mr-2 h-4 w-4" />
            <span>Education & Experience</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.href = "#projects")}>
            <FolderGit2 className="mr-2 h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.href = "#tech-stack")}>
            <Layers className="mr-2 h-4 w-4" />
            <span>Tech Stack</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.href = "#certifications")}>
            <Award className="mr-2 h-4 w-4" />
            <span>Certifications</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.href = "#contact")}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Contact</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Links & Documents">
          <CommandItem onSelect={() => runCommand(() => window.open("/CV%20Mohammad%20Fahrezi%20Dev.pdf", "_blank"))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>View Resume (CV)</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.open("https://github.com/fahrezi93", "_blank"))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>GitHub Profile</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.open("https://linkedin.com/in/mohammad-fahrezi", "_blank"))}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>LinkedIn Profile</span>
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
