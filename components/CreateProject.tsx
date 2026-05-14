"use client";
import { addProject } from "@/app/actions/project";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Plus } from "lucide-react";
import { useActionState } from "react";

const CreateProject = () => {
  const [state, action, pending] = useActionState(addProject, undefined);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="h-35.7 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dotted border-fuchsia-500/70 bg-fuchsia-500/10 p-4 text-center text-lg font-semibold text-black/70 hover:bg-fuchsia-500/20 dark:text-white/70 dark:hover:bg-fuchsia-500/20"
        >
          <Plus className="size-5" />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Fill out the details for your new project. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="w-full">
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Pedro Duarte" />
              {state?.errors?.name && (
                <p className="text-red-500 text-xs mb-0">{state.errors.name}</p>
              )}
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Project description"
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-7">
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={pending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              Save changes
              {pending && <Loader className="ml-2 size-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
