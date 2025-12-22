const invalidSteps = [
  {
    id: 'welcome',
    messages: ['This configuration has invalid references.'],
    buttons: [
      {
        text: 'Go to non-existent step',
        nextStepId: 'nonExistentStep',
        type: 'button',
      },
      {
        text: 'Another broken link',
        nextStepId: 'anotherMissingStep',
        type: 'button',
      },
    ],
  },
  {
    id: 'orphaned',
    messages: ['This step cannot be reached from welcome.'],
    buttons: [
      {
        text: 'Dead end',
        nextStepId: 'welcome',
        type: 'button',
      },
    ],
  },
]

export default invalidSteps
