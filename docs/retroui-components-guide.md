# RetroUI Components Integration Guide

This guide helps you use RetroUI components in this Next.js project with a style close to retroui.dev.

Primary reference:

- https://www.retroui.dev/docs/components/sonner

## 1. Install Components

Run these commands from the project root.

```bash
pnpm dlx shadcn@latest add @retroui/button
pnpm dlx shadcn@latest add @retroui/card
pnpm dlx shadcn@latest add @retroui/accordion
pnpm dlx shadcn@latest add @retroui/alert
pnpm dlx shadcn@latest add @retroui/dialog
pnpm dlx shadcn@latest add @retroui/drawer
pnpm dlx shadcn@latest add @retroui/input
pnpm dlx shadcn@latest add @retroui/sonner
pnpm dlx shadcn@latest add @retroui/textarea
```

Notes:

- The docs explicitly show commands for button, card, accordion, alert, dialog, drawer, input, and sonner.
- Textarea follows the same package naming pattern and is documented here: https://www.retroui.dev/docs/components/textarea

## 2. Add Sonner Toaster Once

In your root layout file, render the toaster once.

```tsx
// app/layout.tsx
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

## 3. Example Usage Snippets

### Button + Animation

```tsx
import { Button } from "@/components/ui/button";

export function RetroButtonDemo() {
  return (
    <Button
      className="transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
      onClick={() => console.log("Clicked")}
    >
      Click Me
    </Button>
  );
}
```

### Textarea

```tsx
import { Textarea } from "@/components/ui/textarea";

export function RetroTextareaDemo() {
  return <Textarea placeholder="Write your message..." className="min-h-32" />;
}
```

### Card

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RetroCardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Highlight</CardTitle>
        <CardDescription>
          RetroUI style card for featured content.
        </CardDescription>
      </CardHeader>
      <CardContent>Build beautiful UI with a nostalgic touch.</CardContent>
    </Card>
  );
}
```

### Accordion

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function RetroAccordionDemo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is RetroUI?</AccordionTrigger>
        <AccordionContent>A retro-inspired component library.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

### Alert

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function RetroAlertDemo() {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        This section uses RetroUI alert styling.
      </AlertDescription>
    </Alert>
  );
}
```

### Dialog

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function RetroDialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogDescription>
            This dialog follows RetroUI styling.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
```

### Drawer

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export function RetroDrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            Additional actions in a slide-in panel.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Confirm</Button>
          <DrawerClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
```

### Input

```tsx
import { Input } from "@/components/ui/input";

export function RetroInputDemo() {
  return <Input type="text" placeholder="Favorite game..." />;
}
```

### Sonner Toast

```tsx
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function RetroSonnerDemo() {
  return (
    <Button onClick={() => toast.success("Saved successfully")}>
      Show Toast
    </Button>
  );
}
```

## 4. Suggested Component Mapping In Your App

- Home hero CTA: Button
- Project list and featured tiles: Card
- FAQ or timeline details: Accordion
- Form status messages: Alert
- Confirmation before critical actions: Dialog
- Mobile quick actions / filters: Drawer
- Contact form fields: Input + Textarea
- Global feedback on submit/save: Sonner

## 5. RetroUI Component Docs

- Button: https://www.retroui.dev/docs/components/button
- Textarea: https://www.retroui.dev/docs/components/textarea
- Card: https://www.retroui.dev/docs/components/card
- Accordion: https://www.retroui.dev/docs/components/accordion
- Alert: https://www.retroui.dev/docs/components/alert
- Dialog: https://www.retroui.dev/docs/components/dialog
- Drawer: https://www.retroui.dev/docs/components/drawer
- Input: https://www.retroui.dev/docs/components/input
- Sonner: https://www.retroui.dev/docs/components/sonner
