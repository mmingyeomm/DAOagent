import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter, Route, Routes } from "react-router";
import Chat from "./routes/chat";
import Overview from "./routes/overview";
import Home from "./routes/home";
import Contracts from "./routes/contracts";
import About from "./routes/about";
import useVersion from "./hooks/use-version";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

// Import wallet adapter context
import { WalletContextProvider } from "./lib/wallet-adapter";
// Import wallet connect button
import { WalletConnectButton } from "./components/ui/wallet-connect-button";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Number.POSITIVE_INFINITY,
        },
    },
});

function App() {
    useVersion();
    return (
        <QueryClientProvider client={queryClient}>
            <WalletContextProvider>
                <div
                    className="dark antialiased"
                    style={{
                        colorScheme: "dark",
                    }}
                >
                    <BrowserRouter>
                        <TooltipProvider delayDuration={0}>
                            <div className="flex flex-1 flex-col size-full relative">
                                {/* WalletConnectButton positioned at top right with Lucy style */}
                                <div className="absolute top-4 right-4 z-10 flex items-center">
                                    <div className="text-xs text-primary/50 font-mono mr-2 hidden md:block">SECURE NETWORK</div>
                                    <WalletConnectButton />
                                </div>

                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="chat/:agentId" element={<Chat />} />
                                    <Route path="settings/:agentId" element={<Overview />} />
                                    <Route path="contracts" element={<Contracts />} />
                                    <Route path="about" element={<About />} />
                                </Routes>
                            </div>
                            <Toaster />
                        </TooltipProvider>
                    </BrowserRouter>
                </div>
            </WalletContextProvider>
        </QueryClientProvider>
    );
}

export default App;