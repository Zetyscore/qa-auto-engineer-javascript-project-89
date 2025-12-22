const simpleSteps = [
  {
    id: 'welcome',
    messages: ['Welcome! This is a simple chatbot.'],
    buttons: [
      {
        text: 'Start',
        nextStepId: 'question',
        type: 'button',
      },
    ],
  },
  {
    id: 'question',
    messages: ['What would you like to know?'],
    buttons: [
      {
        text: 'Tell me about features',
        nextStepId: 'features',
        type: 'button',
      },
      {
        text: 'Go back',
        nextStepId: 'welcome',
        type: 'button',
      },
    ],
  },
  {
    id: 'features',
    messages: [
      'This chatbot supports multiple messages.',
      'You can navigate between steps using buttons.',
    ],
    buttons: [
      {
        text: 'Got it!',
        nextStepId: 'welcome',
        type: 'button',
      },
    ],
  },
]

export default simpleSteps
