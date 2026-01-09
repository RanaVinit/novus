import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import { ArrowRight, User } from "lucide-react";
import { useState } from "react";

export default function Landing() {
    const [authType, setAuthType] = useState(null);

    return (
        <div className="min-h-screen font-sans text-gray-900 selection:bg-gray-900 selection:text-white overflow-hidden flex flex-col">
            <Navbar
                onLoginClick={() => setAuthType("login")}
                isLoggedIn={false}
                hideNav={true}
            />

            <main className="flex-grow flex items-center justify-center relative px-6 py-12 md:px-12">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 w-full">

                    <div className="text-center lg:text-left mt-10 lg:mt-0">
                        <h1 className="font-hero-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-6 animate-fade-in-up">
                            Write purpose. <br />
                            <span className="text-gray-400">Share perspective.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-500 mb-8 leading-relaxed animate-fade-in-up animation-delay-200 max-w-lg mx-auto lg:mx-0">
                            A minimal space for writers and readers to connect without the noise.
                            Focus on the words, we handle the rest.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up animation-delay-400">
                            <button
                                onClick={() => setAuthType("signup")}
                                className="group px-8 py-3.5 bg-black text-white rounded-full font-semibold text-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                                Start Writing
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => setAuthType("login")}
                                className="px-8 py-3.5 bg-white text-gray-900 border border-gray-200 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors"
                            >
                                Read Stories
                            </button>
                        </div>
                    </div>

                    <div className="relative animate-fade-in-up animation-delay-400 hidden lg:block">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 rotate-2 hover:rotate-0 transition-all duration-500 transform-gpu bg-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000"
                                alt="Digital storytelling workspace"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-xl border border-gray-100 max-w-xs animate-bounce-slow">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <User size={20} />
                                </div>
                                <div>
                                    <div className="font-bold text-sm">New Reader</div>
                                    <div className="text-xs text-gray-500">Just joined</div>
                                </div>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full w-24 mb-2"></div>
                            <div className="h-2 bg-gray-100 rounded-full w-16"></div>
                        </div>
                    </div>

                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-100 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />
            </main>

            {authType && (
                <AuthModal
                    type={authType}
                    onClose={() => setAuthType(null)}
                    switchType={(to) => setAuthType(to)}
                />
            )}
        </div>
    );
}
