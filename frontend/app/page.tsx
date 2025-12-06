"use client";

import { Header } from "@/components/Header";
import { ChatContainer } from "@/components/ChatContainer";
import { InputArea } from "@/components/InputArea";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { AnimatedRobot } from "@/components/AnimatedRobot";
import { ErrorAlert } from "@/components/ErrorAlert";
import { useChat } from "@/lib/hooks/useChat";

export default function Home() {
  const { messages, isLoading, error, sendMessage, clearError } = useChat();

  const handleSendMessage = async (messageText: string) => {
    await sendMessage(messageText);
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-gradient-to-br from-[#0F0C29] to-[#1E1B36]">
      <BackgroundEffects />
      <AnimatedRobot isThinking={isLoading} />
      <Header />
      
      {error && (
        <ErrorAlert message={error} onDismiss={clearError} />
      )}

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 md:py-12 relative z-10">
        <div className="w-full max-w-[800px] space-y-6">
          <ChatContainer messages={messages} isLoading={isLoading} />
        </div>
      </main>
      
      <InputArea 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading}
      />
    </div>
  );
}
