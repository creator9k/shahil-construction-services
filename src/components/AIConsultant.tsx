/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Send, User, Sparkles, HardHat, ShieldCheck, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AIConsultant() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: t('ai.title') === 'शाहिल एआई सहायक' 
          ? 'नमस्ते! मैं शाहिल एआई सहायक हूँ। 🙏 मैं अंबिकापुर के पास आपके निर्माण कार्यस्थल के लिए आवश्यक ईंटों, रेत, बजरी (गिट्टी), या बाड़ पोल की गणना करने में आपकी सहायता कर सकता हूँ। मुझसे सामग्री, गुणवत्ता परीक्षण या प्रोजेक्ट साइज़िंग के बारे में कुछ भी पूछें!'
          : 'Namaste! Main Shahil AI Sahayak hoon. 🙏 I can help you calculate the bricks, sand, aggregate gravel (gitti), or fencing poles required for your construction site near Ambikapur. Ask me anything about materials, quality testing, or project sizing!',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [t]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    { text: 'Which size of gitti (aggregate) is best for roof slab casting?', label: 'Roof Slab casting' },
    { text: 'How many bricks are needed for a 10x12 room boundary wall?', label: 'Room bricks required' },
    { text: 'What are the benefits of precast compound walls over brick?', label: 'Precast vs Brick wall' },
    { text: 'Do you deliver bulk materials to Lakhanpur and Udaipur?', label: 'Delivery Location coverage' }
  ];

  // Auto-scroll to lowest chats
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend || inputText;
    if (!rawText.trim() || isLoading) return;

    setErrorText(null);
    const userMessageTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: rawText,
      timestamp: userMessageTime
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: rawText,
          history: messages.map(msg => ({
            role: msg.role === 'model' ? 'model' : 'user',
            text: msg.text
          }))
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Server returned an error');
      }

      const modelMessageTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const modelResponse: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply || 'Apologies, I could not generate a response right now.',
        timestamp: modelMessageTime
      };

      setMessages((prev) => [...prev, modelResponse]);
    } catch (err: any) {
      console.warn('Gemini chat error - falling back to smart client-side rules:', err);
      
      // Smart offline fallback logic based on keywords
      setTimeout(() => {
        let reply = '';
        const norm = rawText.toLowerCase();

        if (norm.includes('brick') || norm.includes('eeta') || norm.includes('it')) {
          reply = 'For brick masonry standard sizing in Ambikapur: a 9-inch double load-bearing wall requires approx. 10 red clay bricks per square foot. A partition 4.5-inch single brick wall takes 5 bricks per square foot. We sell premium baked chimney bricks at ₹7 per piece, which ensures maximum structural strength!';
        } else if (norm.includes('sand') || norm.includes('balu') || norm.includes('plaster')) {
          reply = 'Our River Sand (washed Balu) is obtained from the local Surguja river basin. It contains less than 3% silt, meaning it doesn\'t develop wall cracks on drying. The pricing is approx ₹2,800 per brass. Tell me your wall heights/widths so I can tell you exactly how many brass of sand you should order!';
        } else if (norm.includes('gitti') || norm.includes('gravel') || norm.includes('aggregate') || norm.includes('stone')) {
          reply = 'For roof slabs and load-bearing columns, 20mm angular crushed black granite aggregate (gitti) is strongly recommended. For plinth filling or sub-base laying, 40mm went is great. Our gitti is machine crushed and contains high mechanical locking values, priced at ₹3,200 per brass.';
        } else if (norm.includes('fence') || norm.includes('pole') || norm.includes('boundary')) {
          reply = 'Shahil Construction manufactures state-of-the-art concrete reinforced fencing poles (₹220 each, internal TMT strands) and modular interlocking precast boundary wall slabs (₹95 per square foot including setup!). Precast walls save you almost 60% of masonry labor costs and are completed within 1-2 days!';
        } else if (norm.includes('delivery') || norm.includes('location') || norm.includes('ambikapur') || norm.includes('where')) {
          reply = 'We are centrally based in Ambikapur, Chhattisgarh. We provide immediate site deliveries via dump trucks/trolleys directly to Ambikapur municipal areas, Lakhanpur, Udaipur, Rajpur, Ramanujganj, and wider Surguja Division zones! Surcharges vary based on radial distance.';
        } else {
          reply = 'Thank you for reaching out! In Ambikapur, Shahil Construction Services is synonymous with quality construction materials. For sand (balu), red bricks (eeta), gitti aggregate, or fencing slabs, call our personal line at +91 62630 63245 or submit an enquiry! Would you like me to guide you on calculating quantities?';
        }

        const modelMessageTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const modelResponse: ChatMessage = {
          id: `model-${Date.now()}`,
          role: 'model',
          text: reply,
          timestamp: modelMessageTime
        };

        setMessages((prev) => [...prev, modelResponse]);
        setErrorText('Running in adaptive offline assistance mode.');
      }, 700);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-neutral-900 border-t border-neutral-805 py-16 text-white" id="assistant-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded text-amber-505 text-[10px] font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{t('ai.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tighter text-white">
            {t('ai.title')}
          </h2>
          <p className="text-sm text-neutral-400 mt-2 font-light">
            {t('ai.desc')}
          </p>
        </div>

        {/* Console Shell */}
        <div className="bg-[#1f2937] border-t-4 border-t-amber-500 border-x border-b border-neutral-800 rounded-lg overflow-hidden shadow-2xl flex flex-col h-[550px]" id="assistant-chat-shell">
          {/* Top Panel bar */}
          <div className="bg-neutral-900 px-6 py-4 border-b border-neutral-800 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-500 text-neutral-950 p-2 rounded-xl">
                <HardHat className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-bold text-sm text-white">{t('ai.title')}</span>
                <span className="block text-[10px] text-emerald-400 font-mono tracking-wider flex items-center">
                  <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full inline-block mr-1.5 animate-ping"></span>
                  {t('ai.badge')}
                </span>
              </div>
            </div>
            <div className="text-xs text-neutral-450 font-mono hidden sm:block">
              Surguja District Helpdesk
            </div>
          </div>

          {/* Messages list canvas */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-neutral-950/60" id="chat-messages-container">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`p-2 rounded-xl flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-amber-500'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-amber-505 text-neutral-950 font-semibold'
                      : 'bg-neutral-900 border border-neutral-805 text-neutral-200'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="block text-[9px] text-neutral-500 font-mono text-right capitalize px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2.5 max-w-[80%]">
                <div className="p-2 rounded-xl bg-neutral-800 text-amber-500 animate-pulse">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-neutral-900 border border-neutral-805 text-neutral-300 p-3 rounded-2xl text-sm flex items-center space-x-2">
                  <span className="inline-block h-1.5 w-1.5 bg-amber-500 rounded-full animate-bounce"></span>
                  <span className="inline-block h-1.5 w-1.5 bg-amber-500 rounded-full animate-bounce delay-75"></span>
                  <span className="inline-block h-1.5 w-1.5 bg-amber-500 rounded-full animate-bounce delay-150"></span>
                  <span className="text-xs font-mono text-neutral-450 italic">Shahil calculations analyzing...</span>
                </div>
              </div>
            )}

            {errorText && (
              <div className="flex items-center space-x-2 bg-amber-500/5 border border-amber-500/10 px-4 py-2.5 rounded-xl text-amber-400 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorText} Ready to help locally.</span>
              </div>
            )}

            <div ref={messageEndRef} />
          </div>

          {/* Quick suggestions layout */}
          {messages.length === 1 && (
            <div className="px-5 py-3 border-t border-neutral-900 bg-neutral-950/40">
              <span className="block text-[10px] text-neutral-500 uppercase font-mono tracking-widest mb-1.5">Suggested Questions:</span>
              <div className="flex flex-wrap gap-1.5">
                {samplePrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(p.text)}
                    className="text-[11px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/20 text-neutral-300 px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box Footer */}
          <div className="p-4 bg-neutral-900 border-t border-neutral-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex space-x-2"
            >
              <input
                type="text"
                placeholder="Ask e.g. How many bricks do I need for a 150 sqft compound wall...?"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/60"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-850 disabled:text-neutral-600 text-neutral-950 p-3.5 rounded-xl transition-all cursor-pointer"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
