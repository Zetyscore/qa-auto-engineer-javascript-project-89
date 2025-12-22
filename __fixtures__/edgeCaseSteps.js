const edgeCaseSteps = [
  {
    id: 'welcome',
    messages: [],
    buttons: [
      {
        text: 'Next',
        nextStepId: 'many-messages',
        type: 'button',
      },
    ],
  },
  {
    id: 'many-messages',
    messages: [
      'Message 1',
      'Message 2',
      'Message 3',
      'Message 4',
      'Message 5',
      'Message 6',
      'Message 7',
      'Message 8',
      'Message 9',
      'Message 10',
    ],
    buttons: [
      {
        text: 'Continue',
        nextStepId: 'many-buttons',
        type: 'button',
      },
    ],
  },
  {
    id: 'many-buttons',
    messages: ['Choose one of many options:'],
    buttons: [
      {
        text: 'Option 1',
        nextStepId: 'single-message',
        type: 'button',
      },
      {
        text: 'Option 2',
        nextStepId: 'single-message',
        type: 'button',
      },
      {
        text: 'Option 3',
        nextStepId: 'single-message',
        type: 'button',
      },
      {
        text: 'Option 4',
        nextStepId: 'single-message',
        type: 'button',
      },
      {
        text: 'Option 5',
        nextStepId: 'single-message',
        type: 'button',
      },
    ],
  },
  {
    id: 'single-message',
    messages: ['Single message with single button'],
    buttons: [
      {
        text: 'Done',
        nextStepId: 'welcome',
        type: 'button',
      },
    ],
  },
  {
    id: 'long-text',
    messages: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    ],
    buttons: [
      {
        text: 'Very Long Button Text That Should Be Displayed Properly',
        nextStepId: 'welcome',
        type: 'button',
      },
    ],
  },
  {
    id: 'special-chars',
    messages: [
      'Special characters test: <html> & "quotes" & \'apostrophes\'',
      'Emoji test: 😊 🎉 🚀 ✅',
      'Unicode test: 你好 مرحبا Привет',
    ],
    buttons: [
      {
        text: 'Test & "special" chars',
        nextStepId: 'welcome',
        type: 'button',
      },
    ],
  },
]

export default edgeCaseSteps
