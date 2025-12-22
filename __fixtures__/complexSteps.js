const complexSteps = [
  {
    id: 'welcome',
    messages: ['Welcome to our service! How can we help you today?'],
    buttons: [
      {
        text: 'I need support',
        nextStepId: 'support',
        type: 'button',
      },
      {
        text: 'I want to learn more',
        nextStepId: 'learn',
        type: 'button',
      },
      {
        text: 'I want to buy',
        nextStepId: 'pricing',
        type: 'button',
      },
    ],
  },
  {
    id: 'support',
    messages: ['What kind of support do you need?'],
    buttons: [
      {
        text: 'Technical issue',
        nextStepId: 'technical',
        type: 'button',
      },
      {
        text: 'Billing question',
        nextStepId: 'billing',
        type: 'button',
      },
      {
        text: 'Back to main menu',
        nextStepId: 'welcome',
        type: 'button',
      },
    ],
  },
  {
    id: 'technical',
    messages: [
      'Please describe your technical issue.',
      'Our team will respond within 24 hours.',
    ],
    buttons: [
      {
        text: 'Contact support',
        nextStepId: 'contact',
        type: 'button',
      },
      {
        text: 'Back',
        nextStepId: 'support',
        type: 'button',
      },
    ],
  },
  {
    id: 'billing',
    messages: ['For billing questions, please contact our finance team.'],
    buttons: [
      {
        text: 'Contact finance',
        nextStepId: 'contact',
        type: 'button',
      },
      {
        text: 'Back',
        nextStepId: 'support',
        type: 'button',
      },
    ],
  },
  {
    id: 'learn',
    messages: [
      'Great! We offer various resources to help you learn.',
      'Check out our documentation and tutorials.',
    ],
    buttons: [
      {
        text: 'View documentation',
        nextStepId: 'docs',
        type: 'button',
      },
      {
        text: 'Watch tutorials',
        nextStepId: 'tutorials',
        type: 'button',
      },
      {
        text: 'Back to main menu',
        nextStepId: 'welcome',
        type: 'button',
      },
    ],
  },
  {
    id: 'docs',
    messages: ['Our documentation covers all features in detail.'],
    buttons: [
      {
        text: 'Back to learning',
        nextStepId: 'learn',
        type: 'button',
      },
      {
        text: 'Main menu',
        nextStepId: 'start',
        type: 'button',
      },
    ],
  },
  {
    id: 'tutorials',
    messages: ['We have video tutorials for beginners and advanced users.'],
    buttons: [
      {
        text: 'Back to learning',
        nextStepId: 'learn',
        type: 'button',
      },
      {
        text: 'Main menu',
        nextStepId: 'start',
        type: 'button',
      },
    ],
  },
  {
    id: 'pricing',
    messages: [
      'We offer flexible pricing plans.',
      'Choose the one that fits your needs.',
    ],
    buttons: [
      {
        text: 'See plans',
        nextStepId: 'plans',
        type: 'button',
      },
      {
        text: 'Contact sales',
        nextStepId: 'contact',
        type: 'button',
      },
      {
        text: 'Back',
        nextStepId: 'start',
        type: 'button',
      },
    ],
  },
  {
    id: 'plans',
    messages: ['Basic: $10/month, Pro: $50/month, Enterprise: Custom pricing'],
    buttons: [
      {
        text: 'Contact sales',
        nextStepId: 'contact',
        type: 'button',
      },
      {
        text: 'Back',
        nextStepId: 'pricing',
        type: 'button',
      },
    ],
  },
  {
    id: 'contact',
    messages: [
      'Thank you for your interest!',
      'You can reach us at support@example.com',
    ],
    buttons: [
      {
        text: 'Start over',
        nextStepId: 'welcome',
        type: 'button',
      },
    ],
  },
]

export default complexSteps
