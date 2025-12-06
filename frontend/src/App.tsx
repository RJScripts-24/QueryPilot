import { Header } from './components/Header';
import { ChatContainer } from './components/ChatContainer';
import { InputArea } from './components/InputArea';
import { BackgroundEffects } from './components/BackgroundEffects';
import { AnimatedRobot } from './components/AnimatedRobot';
import { useState } from 'react';

export default function App() {
  const [isThinking, setIsThinking] = useState(false);

  const handleSendMessage = () => {
    setIsThinking(true);
    
    
    setTimeout(() => {
      setIsThinking(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0F0C29 0%, #1E1B36 100%)'
    }}>
      <BackgroundEffects />
      <AnimatedRobot isThinking={isThinking} />
      <Header />
      <main className="flex-1 flex items-center justify-center px-8 py-12 relative z-10">
        <div className="w-full max-w-[800px] space-y-6">
          <ChatContainer />
        </div>
      </main>
      <InputArea onSendMessage={handleSendMessage} />
    </div>
  );
}