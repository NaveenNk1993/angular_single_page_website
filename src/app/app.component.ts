import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  sender: 'assistant' | 'visitor';
  text: string;
  actionLabel?: string;
  actionHref?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Single Page Website';

  services = [
    { number: '01', title: 'Brand Identity', desc: 'Naming, logo systems and visual languages that make your brand unmistakable across every touchpoint.', icon: 'identity' },
    { number: '02', title: 'Product Design', desc: 'From first wireframe to polished interface — digital products that feel effortless and ship beautifully.', icon: 'product' },
    { number: '03', title: 'Design Strategy', desc: 'Positioning workshops and roadmaps that connect creative ambition to measurable business outcomes.', icon: 'strategy' }
  ];

  contact = {
    name: '',
    email: '',
    message: ''
  };

  submitted = false;

  isChatOpen = false;
  chatInput = '';
  chatSuggestions = ['What services do you offer?', 'How do I start a project?'];
  chatMessages: ChatMessage[] = [
    {
      sender: 'assistant',
      text: 'Hello! I’m the Atelier Horizon assistant. Ask me about our services, process or getting started.'
    }
  ];

  onSubmit() {
    this.submitted = true;
  }

  sendChatMessage(message = this.chatInput) {
    const text = message.trim();
    if (!text) {
      return;
    }

    this.chatMessages.push({ sender: 'visitor', text });
    this.chatInput = '';
    this.chatSuggestions = [];
    this.chatMessages.push(this.getAssistantReply(text));
  }

  private getAssistantReply(message: string): ChatMessage {
    const question = message.toLowerCase();

    if (/identity|branding|brand|product|strategy|service|design/.test(question)) {
      return {
        sender: 'assistant',
        text: 'We bring brand identity, product design and design strategy together in one small team.',
        actionLabel: 'Explore our services',
        actionHref: '#services'
      };
    }

    if (/start|begin|project|contact|email|call|talk/.test(question)) {
      return {
        sender: 'assistant',
        text: 'Tell us a little about your goals using the contact form. The studio replies within two working days.',
        actionLabel: 'Contact the studio',
        actionHref: '#contact'
      };
    }

    if (/process|how.*work|approach/.test(question)) {
      return {
        sender: 'assistant',
        text: 'We start with clarity and research, then shape and test the right direction together. The same small team stays with your project from first conversation through delivery.',
        actionLabel: 'About the studio',
        actionHref: '#about'
      };
    }

    if (/where|location|located|address|amsterdam/.test(question)) {
      return {
        sender: 'assistant',
        text: 'Our studio is at Prinsengracht 402 in Amsterdam. We work with brands around the world.'
      };
    }

    if (/price|pricing|cost|budget|fee/.test(question)) {
      return {
        sender: 'assistant',
        text: 'Project costs depend on the scope. Share a little about what you have in mind and we can discuss the right fit.',
        actionLabel: 'Start a conversation',
        actionHref: '#contact'
      };
    }

    return {
      sender: 'assistant',
      text: 'I can help with our services, process, location or getting started. For anything else, send the studio a note.',
      actionLabel: 'Contact the studio',
      actionHref: '#contact'
    };
  }
}
