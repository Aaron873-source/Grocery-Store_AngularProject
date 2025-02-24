import { Component, ElementRef, ViewChild } from '@angular/core';

interface ChatMessage {
  text: string;
  isUser: boolean;
}

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
})
export class ChatBotComponent {
  @ViewChild('chatMessages') private messagesContainer!: ElementRef;

  isOpen = false;
  userInput = '';
  messages: ChatMessage[] = [];

  // Add your FAQ database here
  private faqs = {
    delivery: 'We deliver within 3-5 business days.',
    payment: 'We accept all major credit cards and PayPal.',
    return: 'Returns are accepted within 30 days of purchase.',
    hours: 'Our business hours are 9 AM - 6 PM EST, Monday to Friday.',
    contact: 'You can reach us at support@aaronsfoodhub.com',
    purpose:
      "I'm a customer service chatbot designed to help you with questions about Aaron's Food-Hub's services, including delivery, payments, returns, business hours, and general support.",
    creation:
      "I was created by Aaron's Food-Hub's development team using Angular and natural language processing to assist customers with common questions and provide quick, helpful responses.",
    capabilities:
      "I can help you with information about deliveries, payments, returns, business hours, and getting in touch with our support team. While I can't process orders directly, I can guide you through our services and policies.",
    default:
      "I apologize, I don't have information about that. Please contact our support team for assistance.",
  };

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.addBotMessage('Hello! How can I help you today?');
    }
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Add user message
    this.addUserMessage(this.userInput);

    // Generate bot response
    this.generateResponse(this.userInput);

    // Clear input
    this.userInput = '';

    // Scroll to bottom
    setTimeout(() => this.scrollToBottom(), 100);
  }

  private addUserMessage(text: string) {
    this.messages.push({ text, isUser: true });
  }

  private addBotMessage(text: string) {
    this.messages.push({ text, isUser: false });
  }

  private generateResponse(input: string) {
    const lowercaseInput = input.toLowerCase();

    // Define keyword mappings for each FAQ topic
    const keywordMappings: Record<keyof typeof this.faqs, string[]> = {
      delivery: [
        'deliver',
        'delivery',
        'shipping',
        'ship',
        'how long',
        'when will',
        'receive',
        'get my order',
      ],
      payment: [
        'pay',
        'payment',
        'credit card',
        'debit',
        'paypal',
        'accept',
        'how to pay',
        'payment method',
      ],
      return: [
        'return',
        'refund',
        'money back',
        'cancel order',
        'send back',
        'exchange',
      ],
      hours: [
        'hour',
        'time',
        'open',
        'close',
        'business hour',
        'operating hour',
        'when are you',
      ],
      contact: [
        'contact',
        'reach',
        'support',
        'help',
        'phone',
        'email',
        'talk to',
        'customer service',
      ],
      purpose: [
        'what are you',
        'who are you',
        'what do you do',
        'your purpose',
        'why are you here',
        'what is your job',
        'what can you do',
      ],
      creation: [
        'who made you',
        'how were you made',
        'who created you',
        'where are you from',
        'how were you created',
        'who built you',
      ],
      capabilities: [
        'what can you do',
        'abilities',
        'features',
        'help me with',
        'capable of',
        'can you',
      ],
      default: [''],
    };

    // Check each topic's keywords against the input
    for (const [topic, keywords] of Object.entries(keywordMappings)) {
      if (keywords.some((keyword) => lowercaseInput.includes(keyword))) {
        return this.addBotMessage(this.faqs[topic as keyof typeof this.faqs]);
      }
    }

    // If no matches found, try to detect question intent
    if (this.isQuestionFormat(lowercaseInput)) {
      return this.addBotMessage(
        "I understand you have a question, but I'm not sure about the specific topic. " +
          'You can ask me about delivery times, payment methods, returns, business hours, or how to contact us.'
      );
    }

    // Default response
    this.addBotMessage(this.faqs.default);
  }

  private isQuestionFormat(input: string): boolean {
    const questionIndicators = [
      'how',
      'what',
      'when',
      'where',
      'why',
      'can',
      'could',
      'would',
      'will',
      'do',
      'does',
      'is',
      'are',
      '?',
    ];
    return questionIndicators.some((indicator) => input.includes(indicator));
  }

  private scrollToBottom() {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
