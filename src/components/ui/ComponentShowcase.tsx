import { useState } from 'react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalFooter,
} from './index';

/**
 * Component showcase for testing and demonstrating UI components
 * This component can be used during development to verify component functionality
 */
export function ComponentShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Simple validation example
    if (value.length < 3 && value.length > 0) {
      setInputError('Must be at least 3 characters');
    } else {
      setInputError('');
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">
        UI Component Showcase
      </h1>

      {/* Button Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Button Components</CardTitle>
          <CardDescription>
            Various button styles and states for different use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Button Variants */}
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="danger">Danger</Button>
            </div>

            {/* Button Sizes */}
            <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>

            {/* Button States */}
            <div className="flex flex-wrap gap-3">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Components */}
      <Card>
        <CardHeader>
          <CardTitle>Input Components</CardTitle>
          <CardDescription>
            Form inputs with validation states and accessibility features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-w-md">
            <Input
              label="Default Input"
              placeholder="Enter some text..."
              helperText="This is a helper text"
            />

            <Input
              label="Input with Value"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type at least 3 characters..."
              error={inputError}
            />

            <Input
              label="Success State"
              variant="success"
              value="Valid input"
              helperText="This input is valid"
            />

            <Input
              label="With Icons"
              placeholder="Search..."
              leftIcon={
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
              rightIcon={
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              }
            />

            <Input label="Disabled Input" disabled value="Cannot edit this" />
          </div>
        </CardContent>
      </Card>

      {/* Card Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Default Card</CardTitle>
            <CardDescription>
              Standard card with border and shadow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600">
              This is the default card variant with standard styling.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Elevated Card</CardTitle>
            <CardDescription>Card with enhanced shadow</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600">
              This card has an elevated appearance with more prominent shadow.
            </p>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardHeader>
            <CardTitle>Outlined Card</CardTitle>
            <CardDescription>Card with prominent border</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600">
              This card emphasizes the border without shadow.
            </p>
          </CardContent>
        </Card>

        <Card variant="filled" interactive>
          <CardHeader>
            <CardTitle>Interactive Filled Card</CardTitle>
            <CardDescription>Clickable card with hover effects</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600">
              This card is interactive and responds to hover and click.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Modal Component */}
      <Card>
        <CardHeader>
          <CardTitle>Modal Component</CardTitle>
          <CardDescription>
            Accessible modal dialogs with various configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="md">
        <ModalHeader>
          <ModalTitle>Example Modal</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <p className="text-neutral-600 mb-4">
            This is an example modal dialog. It includes proper focus
            management, keyboard navigation, and accessibility features.
          </p>
          <p className="text-neutral-600">
            You can close this modal by clicking the X button, pressing Escape,
            or clicking outside the modal area.
          </p>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setModalOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
