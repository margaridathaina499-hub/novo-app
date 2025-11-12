"use client";

import { useState } from "react";
import { Dumbbell, Camera, BookOpen, Users, Calendar, TrendingUp, Menu, X, Home, Search, Plus, User, Play, Info, MessageCircle, HelpCircle, Send, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";

export default function FitPro() {
  const [activeTab, setActiveTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [showSupport, setShowSupport] = useState(false);
  const [supportMessages, setSupportMessages] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<any>({});

  const supportQuestions = [
    {
      question: "Como posso começar meu primeiro treino?",
      answer: "Para começar, escolha seu perfil (Masculino ou Feminino) na página inicial, depois navegue até a aba 'Exercícios' e selecione um treino pronto ou monte o seu próprio!"
    },
    {
      question: "Como funciona o contador de calorias?",
      answer: "Vá até a aba 'Calorias', clique em 'Tirar Foto do Prato' e nossa IA irá identificar os alimentos e calcular as calorias automaticamente. Simples assim!"
    },
    {
      question: "Como contratar um personal trainer?",
      answer: "Acesse a aba 'Comunidade', role até 'Personal Trainers Disponíveis' e escolha o profissional ideal baseado em avaliações, especialidade e preço. O valor mensal é de R$ 50,00."
    },
    {
      question: "Como acompanhar meu progresso?",
      answer: "Use a aba 'Progresso' para ver gráficos de evolução de peso, medidas corporais e estatísticas completas. Na aba 'Diário' você registra seus treinos diários."
    },
    {
      question: "Posso usar o app gratuitamente?",
      answer: "Sim! Você tem acesso a mais de 850 exercícios, contador de calorias, diário de treino e comunidade gratuitamente. O plano Premium (R$ 50/mês) oferece acompanhamento personalizado com personal trainer."
    },
    {
      question: "Como funciona a assinatura Premium?",
      answer: "Por apenas R$ 50/mês você tem acesso a um personal trainer dedicado que cria treinos personalizados, acompanha seu progresso e ajusta seu programa mensalmente via chat no app."
    }
  ];

  const quizQuestions = [
    {
      question: "Qual é o seu principal objetivo?",
      options: [
        { label: "Perder peso e emagrecer", value: "weight_loss", icon: "📉" },
        { label: "Ganhar massa muscular", value: "muscle_gain", icon: "💪" },
        { label: "Melhorar condicionamento físico", value: "fitness", icon: "🏃" },
        { label: "Tonificar e definir o corpo", value: "toning", icon: "✨" }
      ]
    },
    {
      question: "Qual é o seu nível de experiência com exercícios?",
      options: [
        { label: "Iniciante - Nunca treinei ou parei há muito tempo", value: "beginner", icon: "🌱" },
        { label: "Intermediário - Treino há alguns meses", value: "intermediate", icon: "🔥" },
        { label: "Avançado - Treino regularmente há mais de 1 ano", value: "advanced", icon: "⚡" }
      ]
    },
    {
      question: "Quantos dias por semana você pode treinar?",
      options: [
        { label: "2-3 dias por semana", value: "2-3", icon: "📅" },
        { label: "4-5 dias por semana", value: "4-5", icon: "📆" },
        { label: "6-7 dias por semana", value: "6-7", icon: "🗓️" }
      ]
    },
    {
      question: "Onde você prefere treinar?",
      options: [
        { label: "Academia com equipamentos completos", value: "gym", icon: "🏋️" },
        { label: "Em casa com equipamentos básicos", value: "home_basic", icon: "🏠" },
        { label: "Em casa sem equipamentos", value: "home_bodyweight", icon: "🧘" }
      ]
    },
    {
      question: "Você tem alguma restrição ou condição especial?",
      options: [
        { label: "Não tenho restrições", value: "none", icon: "✅" },
        { label: "Problemas nas articulações (joelho, ombro, etc)", value: "joints", icon: "🦴" },
        { label: "Problemas na coluna", value: "back", icon: "🔙" },
        { label: "Outras condições (cardíacas, diabetes, etc)", value: "other", icon: "❤️" }
      ]
    }
  ];

  const handleSupportQuestion = (index: number) => {
    const qa = supportQuestions[index];
    setSupportMessages([
      ...supportMessages,
      { type: "question", text: qa.question },
      { type: "answer", text: qa.answer }
    ]);
    setCurrentQuestion(index);
  };

  const handleQuizAnswer = (value: string) => {
    const newAnswers = { ...quizAnswers, [quizStep]: value };
    setQuizAnswers(newAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Quiz completo - mostrar resultado
      setQuizStep(quizQuestions.length);
    }
  };

  const getRecommendedPlan = () => {
    const goal = quizAnswers[0];
    const level = quizAnswers[1];
    const frequency = quizAnswers[2];
    const location = quizAnswers[3];
    const restrictions = quizAnswers[4];

    // Lógica de recomendação baseada nas respostas
    if (goal === "weight_loss") {
      return {
        title: "Plano Emagrecimento Acelerado",
        description: "Treinos focados em queima de gordura com exercícios cardiovasculares e funcionais",
        features: [
          "Treinos HIIT de alta intensidade",
          "Circuitos funcionais para queima calórica",
          "Plano alimentar para déficit calórico",
          "Acompanhamento semanal de peso e medidas"
        ],
        duration: "30 dias",
        workoutsPerWeek: frequency === "6-7" ? "6 treinos" : frequency === "4-5" ? "5 treinos" : "3 treinos",
        price: "Grátis",
        premiumPrice: "R$ 50/mês com Personal"
      };
    } else if (goal === "muscle_gain") {
      return {
        title: "Plano Hipertrofia Muscular",
        description: "Programa completo para ganho de massa muscular com treinos progressivos",
        features: [
          "Treinos de musculação com sobrecarga progressiva",
          "Divisão de treino ABC ou ABCD",
          "Plano alimentar hipercalórico",
          "Suplementação recomendada"
        ],
        duration: "60 dias",
        workoutsPerWeek: frequency === "6-7" ? "6 treinos" : frequency === "4-5" ? "5 treinos" : "4 treinos",
        price: "Grátis",
        premiumPrice: "R$ 50/mês com Personal"
      };
    } else if (goal === "toning") {
      return {
        title: "Plano Tonificação e Definição",
        description: "Treinos para definir músculos e melhorar a composição corporal",
        features: [
          "Treinos de resistência muscular",
          "Exercícios de tonificação específicos",
          "Cardio moderado para definição",
          "Plano alimentar balanceado"
        ],
        duration: "45 dias",
        workoutsPerWeek: frequency === "6-7" ? "5 treinos" : frequency === "4-5" ? "4 treinos" : "3 treinos",
        price: "Grátis",
        premiumPrice: "R$ 50/mês com Personal"
      };
    } else {
      return {
        title: "Plano Condicionamento Físico",
        description: "Melhore sua saúde geral, resistência e disposição no dia a dia",
        features: [
          "Treinos cardiovasculares variados",
          "Exercícios funcionais para o corpo todo",
          "Melhora de flexibilidade e mobilidade",
          "Acompanhamento de evolução física"
        ],
        duration: "30 dias",
        workoutsPerWeek: frequency === "6-7" ? "5 treinos" : frequency === "4-5" ? "4 treinos" : "3 treinos",
        price: "Grátis",
        premiumPrice: "R$ 50/mês com Personal"
      };
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setShowQuiz(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-2 rounded-xl">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">FitPro</h1>
          </div>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              Início
            </Button>
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              Exercícios
            </Button>
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              Instrutores
            </Button>
            <Button 
              variant="ghost" 
              className="text-slate-300 hover:text-white"
              onClick={() => setShowSupport(true)}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Suporte
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
              Assinar Premium - R$ 50/mês
            </Button>
          </nav>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 p-4">
            <nav className="flex flex-col gap-3">
              <Button variant="ghost" className="text-slate-300 hover:text-white justify-start">
                Início
              </Button>
              <Button variant="ghost" className="text-slate-300 hover:text-white justify-start">
                Exercícios
              </Button>
              <Button variant="ghost" className="text-slate-300 hover:text-white justify-start">
                Instrutores
              </Button>
              <Button 
                variant="ghost" 
                className="text-slate-300 hover:text-white justify-start"
                onClick={() => setShowSupport(true)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Suporte
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                Assinar Premium - R$ 50/mês
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Quiz Modal */}
      {showQuiz && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowQuiz(false)}
        >
          <Card 
            className="bg-slate-900 border-slate-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {quizStep < quizQuestions.length ? (
              <>
                {/* Quiz Header */}
                <div className="p-6 border-b border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-2 rounded-xl">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Encontre seu Plano Ideal</h3>
                        <p className="text-sm text-slate-400">Pergunta {quizStep + 1} de {quizQuestions.length}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowQuiz(false)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-950 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Quiz Question */}
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-white mb-8 text-center">
                    {quizQuestions[quizStep].question}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quizQuestions[quizStep].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(option.value)}
                        className="group relative bg-slate-950 hover:bg-slate-900 border-2 border-slate-800 hover:border-orange-500 rounded-2xl p-6 transition-all text-left"
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{option.icon}</div>
                          <div className="flex-1">
                            <p className="text-white font-medium group-hover:text-orange-400 transition-colors">
                              {option.label}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-orange-500 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>

                  {quizStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setQuizStep(quizStep - 1)}
                      className="mt-6 border-slate-700 text-white hover:bg-slate-800"
                    >
                      Voltar
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Quiz Result */}
                <div className="p-6 border-b border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Seu Plano Personalizado</h3>
                        <p className="text-sm text-slate-400">Baseado nas suas respostas</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowQuiz(false)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  {(() => {
                    const plan = getRecommendedPlan();
                    return (
                      <>
                        <div className="text-center mb-8">
                          <div className="inline-block bg-gradient-to-r from-orange-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                            Recomendado para você
                          </div>
                          <h4 className="text-3xl font-bold text-white mb-3">{plan.title}</h4>
                          <p className="text-slate-300 text-lg">{plan.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                          <div className="bg-slate-950 rounded-xl p-4 text-center">
                            <p className="text-slate-400 text-sm mb-1">Duração</p>
                            <p className="text-2xl font-bold text-white">{plan.duration}</p>
                          </div>
                          <div className="bg-slate-950 rounded-xl p-4 text-center">
                            <p className="text-slate-400 text-sm mb-1">Frequência</p>
                            <p className="text-2xl font-bold text-white">{plan.workoutsPerWeek}</p>
                          </div>
                          <div className="bg-slate-950 rounded-xl p-4 text-center">
                            <p className="text-slate-400 text-sm mb-1">Investimento</p>
                            <p className="text-2xl font-bold text-emerald-400">{plan.price}</p>
                          </div>
                        </div>

                        <div className="bg-slate-950 rounded-xl p-6 mb-8">
                          <h5 className="text-lg font-bold text-white mb-4">O que está incluído:</h5>
                          <div className="space-y-3">
                            {plan.features.map((feature, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <p className="text-slate-300">{feature}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-500/20 to-pink-600/20 border border-orange-500/30 rounded-xl p-6 mb-6">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-2 rounded-lg">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h5 className="text-white font-bold mb-1">Upgrade para Premium</h5>
                              <p className="text-slate-300 text-sm mb-3">
                                Tenha acompanhamento personalizado de um personal trainer por apenas {plan.premiumPrice}
                              </p>
                              <ul className="space-y-2 text-sm text-slate-300">
                                <li className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-orange-400" />
                                  Treinos personalizados ajustados mensalmente
                                </li>
                                <li className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-orange-400" />
                                  Suporte via chat direto com seu personal
                                </li>
                                <li className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-orange-400" />
                                  Análise detalhada do seu progresso
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                            onClick={() => {
                              setShowQuiz(false);
                              setSelectedGender(null);
                            }}
                          >
                            Começar Agora Grátis
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={resetQuiz}
                            className="border-slate-700 text-white hover:bg-slate-800"
                          >
                            Refazer Quiz
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Support Chat Modal */}
      {showSupport && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSupport(false)}
        >
          <Card 
            className="bg-slate-900 border-slate-800 max-w-2xl w-full max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-2 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Suporte FitPro</h3>
                  <p className="text-sm text-slate-400">Perguntas frequentes</p>
                </div>
              </div>
              <button
                onClick={() => setShowSupport(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {/* Welcome Message */}
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-slate-950 rounded-2xl rounded-tl-none p-4">
                      <p className="text-white">Olá! 👋 Bem-vindo ao suporte do FitPro. Selecione uma pergunta abaixo ou escolha uma das opções frequentes:</p>
                    </div>
                  </div>
                </div>

                {/* Support Messages */}
                {supportMessages.map((msg, index) => (
                  <div key={index}>
                    {msg.type === "question" && (
                      <div className="flex gap-3 justify-end">
                        <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                          <p className="text-white">{msg.text}</p>
                        </div>
                      </div>
                    )}
                    {msg.type === "answer" && (
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="bg-slate-950 rounded-2xl rounded-tl-none p-4">
                            <p className="text-white">{msg.text}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Quick Questions */}
                {supportMessages.length === 0 && (
                  <div className="space-y-3 mt-4">
                    <p className="text-slate-400 text-sm font-medium mb-3">Perguntas Frequentes:</p>
                    {supportQuestions.map((qa, index) => (
                      <button
                        key={index}
                        onClick={() => handleSupportQuestion(index)}
                        className="w-full text-left bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-orange-500 rounded-xl p-4 transition-all group"
                      >
                        <div className="flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <p className="text-white group-hover:text-orange-400 transition-colors">{qa.question}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            {supportMessages.length > 0 && (
              <div className="p-4 border-t border-slate-800">
                <p className="text-slate-400 text-sm mb-3">Outras perguntas:</p>
                <div className="flex flex-wrap gap-2">
                  {supportQuestions.map((qa, index) => (
                    index !== currentQuestion && (
                      <button
                        key={index}
                        onClick={() => handleSupportQuestion(index)}
                        className="text-sm bg-slate-950 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 text-slate-300 hover:text-white px-4 py-2 rounded-full transition-all"
                      >
                        {qa.question}
                      </button>
                    )
                  ))}
                </div>
                <Button
                  onClick={() => setSupportMessages([])}
                  variant="outline"
                  className="w-full mt-4 border-slate-700 text-white hover:bg-slate-800"
                >
                  Começar Nova Conversa
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">
            Mais de 850 exercícios disponíveis
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transforme seu corpo com treinos profissionais
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Emagreça, ganhe massa muscular ou supere 30 dias em boa forma com nossos treinos personalizados e contador de calorias com IA
          </p>

          {/* Quiz CTA */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-orange-500/10 to-pink-600/10 border-orange-500/30 p-6 max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-4 rounded-2xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-white mb-2">Não sabe por onde começar?</h3>
                  <p className="text-slate-300">Faça nosso quiz rápido e descubra o plano ideal para seus objetivos</p>
                </div>
                <Button 
                  size="lg"
                  onClick={() => setShowQuiz(true)}
                  className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                >
                  Fazer Quiz
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Gender Selection */}
          {!selectedGender ? (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Escolha seu perfil de treino</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* Male Option */}
                <Card 
                  className="bg-slate-900 border-slate-800 p-6 hover:border-blue-500 transition-all cursor-pointer group"
                  onClick={() => setSelectedGender("male")}
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=600&fit=crop" 
                      alt="Treino Masculino"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Masculino</h4>
                  <p className="text-slate-400">Treinos focados em hipertrofia e força</p>
                </Card>

                {/* Female Option */}
                <Card 
                  className="bg-slate-900 border-slate-800 p-6 hover:border-pink-500 transition-all cursor-pointer group"
                  onClick={() => setSelectedGender("female")}
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1550345332-09e3ac987658?w=600&h=600&fit=crop" 
                      alt="Treino Feminino"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Feminino</h4>
                  <p className="text-slate-400">Treinos para tonificação e emagrecimento</p>
                </Card>
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Badge className="bg-gradient-to-r from-orange-500 to-pink-600 text-white">
                  Perfil: {selectedGender === "male" ? "Masculino" : "Feminino"}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedGender(null)}
                  className="border-slate-700 text-slate-300 hover:text-white"
                >
                  Alterar
                </Button>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-lg px-8">
              Começar Grátis
            </Button>
            <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 text-lg px-8">
              Ver Exercícios
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 bg-slate-900 border border-slate-800 mb-8">
            <TabsTrigger value="home" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-600">
              <Home className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Início</span>
            </TabsTrigger>
            <TabsTrigger value="exercises" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-600">
              <Dumbbell className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Exercícios</span>
            </TabsTrigger>
            <TabsTrigger value="calories" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-600">
              <Camera className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Calorias</span>
            </TabsTrigger>
            <TabsTrigger value="diary" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Diário</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-600">
              <Users className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Comunidade</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Progresso</span>
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Dumbbell className="w-8 h-8" />}
                title="Treinos Prontos"
                description="Programas completos criados por profissionais para todos os níveis"
                gradient="from-orange-500 to-pink-600"
              />
              <FeatureCard
                icon={<Camera className="w-8 h-8" />}
                title="Contador de Calorias IA"
                description="Tire foto do seu prato e descubra as calorias automaticamente"
                gradient="from-cyan-500 to-blue-600"
              />
              <FeatureCard
                icon={<BookOpen className="w-8 h-8" />}
                title="850+ Exercícios"
                description="Biblioteca completa com animações 3D de alta qualidade"
                gradient="from-purple-500 to-pink-500"
              />
              <FeatureCard
                icon={<Users className="w-8 h-8" />}
                title="Personal Trainers"
                description="Acompanhamento personalizado por apenas R$ 50/mês"
                gradient="from-emerald-400 to-teal-600"
              />
              <FeatureCard
                icon={<Calendar className="w-8 h-8" />}
                title="Diário de Treino"
                description="Registre seu progresso e acompanhe sua evolução"
                gradient="from-blue-500 to-indigo-600"
              />
              <FeatureCard
                icon={<MessageCircle className="w-8 h-8" />}
                title="Suporte no App"
                description="Tire suas dúvidas com perguntas programadas e respostas instantâneas"
                gradient="from-orange-400 to-red-500"
              />
            </div>

            {/* Popular Workouts */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-6">Treinos Populares</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <WorkoutCard
                  title="Perda de Peso"
                  duration="30 dias"
                  level="Iniciante"
                  image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
                />
                <WorkoutCard
                  title="Ganho de Massa"
                  duration="60 dias"
                  level="Intermediário"
                  image="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop"
                />
                <WorkoutCard
                  title="Treino Feminino"
                  duration="45 dias"
                  level="Todos"
                  image="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop"
                />
                <WorkoutCard
                  title="Abdômen Definido"
                  duration="21 dias"
                  level="Avançado"
                  image="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop"
                />
              </div>
            </div>
          </TabsContent>

          {/* Exercises Tab */}
          <TabsContent value="exercises" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Input 
                placeholder="Buscar exercícios..." 
                className="bg-slate-900 border-slate-800 text-white"
              />
              <Button className="bg-gradient-to-r from-orange-500 to-pink-600">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {["Peito", "Costas", "Pernas", "Ombros", "Braços", "Abdômen", "Glúteos", "Cardio"].map((muscle) => (
                <Button
                  key={muscle}
                  variant="outline"
                  className="border-slate-800 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 hover:border-transparent"
                >
                  {muscle}
                </Button>
              ))}
            </div>

            <ScrollArea className="h-[600px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exercises.map((exercise, index) => (
                  <ExerciseCard 
                    key={index} 
                    {...exercise} 
                    onClick={() => setSelectedExercise(exercise)}
                  />
                ))}
              </div>
            </ScrollArea>

            {/* Exercise Detail Modal */}
            {selectedExercise && (
              <div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedExercise(null)}
              >
                <Card 
                  className="bg-slate-900 border-slate-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedExercise(null)}
                      className="absolute top-4 right-4 z-10 bg-slate-950/80 hover:bg-slate-950 text-white rounded-full p-2 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>

                    {/* 3D Animation Area */}
                    <div className="relative aspect-video bg-gradient-to-br from-slate-950 to-slate-900 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* 3D Model Placeholder with Animation */}
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Animated 3D Figure */}
                          <div className="relative animate-pulse">
                            <img 
                              src={selectedGender === "female" 
                                ? "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&h=600&fit=crop"
                                : "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop"
                              }
                              alt="3D Exercise Animation"
                              className="w-full h-full object-contain opacity-90"
                            />
                            {/* Animation Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/80" />
                          </div>
                          
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 rounded-full p-6 shadow-2xl transform hover:scale-110 transition-all">
                              <Play className="w-12 h-12 text-white" fill="white" />
                            </button>
                          </div>

                          {/* Animation Indicator */}
                          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-950/90 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-800">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                              <span className="text-white font-medium">Animação 3D em Movimento</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Exercise Details */}
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-3">{selectedExercise.name}</h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                              {selectedExercise.muscle}
                            </Badge>
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              {selectedExercise.difficulty}
                            </Badge>
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                              {selectedExercise.equipment}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Exercise Instructions */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5 text-orange-500" />
                            Como Executar
                          </h4>
                          <div className="bg-slate-950 rounded-xl p-6 space-y-4">
                            {selectedExercise.steps.map((step: string, index: number) => (
                              <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                                  {index + 1}
                                </div>
                                <p className="text-slate-300 leading-relaxed pt-1">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Exercise Tips */}
                        <div>
                          <h4 className="text-xl font-bold text-white mb-4">💡 Dicas Importantes</h4>
                          <div className="bg-slate-950 rounded-xl p-6">
                            <ul className="space-y-3 text-slate-300">
                              {selectedExercise.tips.map((tip: string, index: number) => (
                                <li key={index} className="flex items-start gap-3">
                                  <span className="text-orange-500 mt-1">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Recommended Sets */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-slate-950 rounded-xl p-4 text-center">
                            <p className="text-slate-400 text-sm mb-1">Séries</p>
                            <p className="text-2xl font-bold text-white">{selectedExercise.sets}</p>
                          </div>
                          <div className="bg-slate-950 rounded-xl p-4 text-center">
                            <p className="text-slate-400 text-sm mb-1">Repetições</p>
                            <p className="text-2xl font-bold text-white">{selectedExercise.reps}</p>
                          </div>
                          <div className="bg-slate-950 rounded-xl p-4 text-center">
                            <p className="text-slate-400 text-sm mb-1">Descanso</p>
                            <p className="text-2xl font-bold text-white">{selectedExercise.rest}</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                          <Button className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Adicionar ao Treino
                          </Button>
                          <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                            Compartilhar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Calories Tab */}
          <TabsContent value="calories" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800 p-8">
              <div className="text-center space-y-6">
                <div className="inline-block bg-gradient-to-br from-orange-500 to-pink-600 p-4 rounded-2xl">
                  <Camera className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Contador de Calorias com IA</h3>
                <p className="text-slate-300 max-w-2xl mx-auto">
                  Tire uma foto do seu prato e nossa inteligência artificial irá identificar os alimentos e calcular as calorias automaticamente
                </p>
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                  <Camera className="w-5 h-5 mr-2" />
                  Tirar Foto do Prato
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800 p-6">
                <h4 className="text-lg font-bold text-white mb-4">Histórico de Hoje</h4>
                <div className="space-y-4">
                  <MealEntry meal="Café da Manhã" calories={450} time="08:30" />
                  <MealEntry meal="Almoço" calories={680} time="12:45" />
                  <MealEntry meal="Lanche" calories={200} time="16:00" />
                </div>
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="flex justify-between text-white font-bold">
                    <span>Total do Dia</span>
                    <span className="text-orange-500">1.330 kcal</span>
                  </div>
                  <div className="mt-2 text-sm text-slate-400">
                    Meta: 2.000 kcal
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-900 border-slate-800 p-6">
                <h4 className="text-lg font-bold text-white mb-4">Banco de Alimentos</h4>
                <Input 
                  placeholder="Buscar alimento..." 
                  className="bg-slate-950 border-slate-800 text-white mb-4"
                />
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {foodDatabase.map((food, index) => (
                      <FoodItem key={index} {...food} />
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>
          </TabsContent>

          {/* Diary Tab */}
          <TabsContent value="diary" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Meu Diário de Treino</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard label="Treinos Completos" value="24" icon="🏋️" />
                <StatCard label="Calorias Queimadas" value="12.5k" icon="🔥" />
                <StatCard label="Sequência" value="7 dias" icon="⚡" />
                <StatCard label="Peso Perdido" value="3.2 kg" icon="📉" />
              </div>
              
              <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Registrar Treino de Hoje
              </Button>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800 p-6">
                <h4 className="text-lg font-bold text-white mb-4">Últimos Treinos</h4>
                <div className="space-y-4">
                  <WorkoutEntry 
                    name="Treino de Peito e Tríceps"
                    date="Hoje, 18:30"
                    duration="45 min"
                    calories="320 kcal"
                  />
                  <WorkoutEntry 
                    name="Treino de Pernas"
                    date="Ontem, 19:00"
                    duration="60 min"
                    calories="450 kcal"
                  />
                  <WorkoutEntry 
                    name="Cardio HIIT"
                    date="2 dias atrás"
                    duration="30 min"
                    calories="280 kcal"
                  />
                </div>
              </Card>

              <Card className="bg-slate-900 border-slate-800 p-6">
                <h4 className="text-lg font-bold text-white mb-4">Próximos Treinos</h4>
                <div className="space-y-4">
                  <UpcomingWorkout 
                    name="Treino de Costas e Bíceps"
                    date="Amanhã"
                    time="18:00"
                  />
                  <UpcomingWorkout 
                    name="Treino de Ombros"
                    date="Sexta-feira"
                    time="19:00"
                  />
                  <UpcomingWorkout 
                    name="Treino de Pernas"
                    date="Sábado"
                    time="10:00"
                  />
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Feed da Comunidade</h3>
              <div className="space-y-6">
                <PostCard
                  user="Maria Silva"
                  avatar="👩"
                  time="2h atrás"
                  content="Acabei de completar meu treino de pernas! 💪 Quem mais treinou hoje?"
                  likes={24}
                  comments={8}
                />
                <PostCard
                  user="João Santos"
                  avatar="👨"
                  time="5h atrás"
                  content="Dica: sempre faça aquecimento antes do treino pesado. Previne lesões!"
                  likes={45}
                  comments={12}
                />
                <PostCard
                  user="Ana Costa"
                  avatar="👩‍🦰"
                  time="1 dia atrás"
                  content="Perdi 5kg em 30 dias com o programa de emagrecimento! Obrigada FitPro! 🎉"
                  likes={89}
                  comments={23}
                />
              </div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Personal Trainers Disponíveis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TrainerCard
                  name="Carlos Mendes"
                  specialty="Hipertrofia"
                  rating={4.9}
                  students={156}
                  price="R$ 50/mês"
                />
                <TrainerCard
                  name="Juliana Oliveira"
                  specialty="Emagrecimento"
                  rating={4.8}
                  students={203}
                  price="R$ 50/mês"
                />
                <TrainerCard
                  name="Roberto Lima"
                  specialty="Funcional"
                  rating={4.7}
                  students={98}
                  price="R$ 50/mês"
                />
              </div>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-900 border-slate-800 p-6">
                <h4 className="text-sm text-slate-400 mb-2">Peso Atual</h4>
                <p className="text-3xl font-bold text-white">72.5 kg</p>
                <p className="text-sm text-emerald-400 mt-2">↓ 3.2 kg este mês</p>
              </Card>
              <Card className="bg-slate-900 border-slate-800 p-6">
                <h4 className="text-sm text-slate-400 mb-2">IMC</h4>
                <p className="text-3xl font-bold text-white">23.4</p>
                <p className="text-sm text-emerald-400 mt-2">Peso normal</p>
              </Card>
              <Card className="bg-slate-900 border-slate-800 p-6">
                <h4 className="text-sm text-slate-400 mb-2">Meta</h4>
                <p className="text-3xl font-bold text-white">68 kg</p>
                <p className="text-sm text-orange-400 mt-2">Faltam 4.5 kg</p>
              </Card>
            </div>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Evolução de Peso</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {[75, 74.5, 74, 73.5, 73, 72.8, 72.5].map((weight, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-gradient-to-t from-orange-500 to-pink-600 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${(weight / 75) * 100}%` }}
                    />
                    <span className="text-xs text-slate-400">Sem {index + 1}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Medidas Corporais</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MeasurementCard label="Braço" value="35 cm" change="+1.5" />
                <MeasurementCard label="Peito" value="98 cm" change="+3.0" />
                <MeasurementCard label="Cintura" value="82 cm" change="-4.0" />
                <MeasurementCard label="Coxa" value="58 cm" change="+2.0" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Floating Support Button */}
      <button
        onClick={() => setShowSupport(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white rounded-full p-4 shadow-2xl transform hover:scale-110 transition-all z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-2 rounded-xl">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">FitPro</h3>
              </div>
              <p className="text-slate-400 text-sm">
                Transforme seu corpo com treinos profissionais e acompanhamento personalizado por apenas R$ 50/mês
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Recursos</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Exercícios</li>
                <li>Planos de Treino</li>
                <li>Contador de Calorias</li>
                <li>Personal Trainers</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Central de Ajuda</li>
                <li>Contato</li>
                <li>FAQ</li>
                <li>Termos de Uso</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Redes Sociais</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>YouTube</li>
                <li>TikTok</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
            © 2024 FitPro. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Components
function FeatureCard({ icon, title, description, gradient }: any) {
  return (
    <Card className="bg-slate-900 border-slate-800 p-6 hover:border-slate-700 transition-all group">
      <div className={`inline-block bg-gradient-to-br ${gradient} p-3 rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </Card>
  );
}

function WorkoutCard({ title, duration, level, image }: any) {
  return (
    <Card className="bg-slate-900 border-slate-800 overflow-hidden hover:border-orange-500 transition-all cursor-pointer group">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <span>{duration}</span>
          <span>•</span>
          <Badge variant="outline" className="border-slate-700">{level}</Badge>
        </div>
      </div>
    </Card>
  );
}

function ExerciseCard({ name, muscle, difficulty, equipment, image, onClick }: any) {
  return (
    <Card 
      className="bg-slate-900 border-slate-800 overflow-hidden hover:border-orange-500 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden bg-slate-950 relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* 3D Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          3D
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-white font-bold mb-2">{name}</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-slate-700 text-xs">{muscle}</Badge>
          <Badge variant="outline" className="border-slate-700 text-xs">{difficulty}</Badge>
          <Badge variant="outline" className="border-slate-700 text-xs">{equipment}</Badge>
        </div>
      </div>
    </Card>
  );
}

function MealEntry({ meal, calories, time }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg">
      <div>
        <p className="text-white font-medium">{meal}</p>
        <p className="text-sm text-slate-400">{time}</p>
      </div>
      <span className="text-orange-500 font-bold">{calories} kcal</span>
    </div>
  );
}

function FoodItem({ name, calories, portion }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg hover:bg-slate-900 cursor-pointer transition-colors">
      <div>
        <p className="text-white text-sm font-medium">{name}</p>
        <p className="text-xs text-slate-400">{portion}</p>
      </div>
      <span className="text-orange-500 text-sm font-bold">{calories} kcal</span>
    </div>
  );
}

function StatCard({ label, value, icon }: any) {
  return (
    <div className="bg-slate-950 p-4 rounded-lg">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}

function WorkoutEntry({ name, date, duration, calories }: any) {
  return (
    <div className="p-4 bg-slate-950 rounded-lg">
      <h5 className="text-white font-bold mb-2">{name}</h5>
      <div className="flex items-center gap-4 text-sm text-slate-400">
        <span>{date}</span>
        <span>•</span>
        <span>{duration}</span>
        <span>•</span>
        <span className="text-orange-500">{calories}</span>
      </div>
    </div>
  );
}

function UpcomingWorkout({ name, date, time }: any) {
  return (
    <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
      <h5 className="text-white font-bold mb-2">{name}</h5>
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Calendar className="w-4 h-4" />
        <span>{date} às {time}</span>
      </div>
    </div>
  );
}

function PostCard({ user, avatar, time, content, likes, comments }: any) {
  return (
    <div className="p-4 bg-slate-950 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center text-xl">
          {avatar}
        </div>
        <div>
          <p className="text-white font-bold">{user}</p>
          <p className="text-xs text-slate-400">{time}</p>
        </div>
      </div>
      <p className="text-slate-300 mb-3">{content}</p>
      <div className="flex items-center gap-6 text-sm text-slate-400">
        <button className="hover:text-orange-500 transition-colors">
          ❤️ {likes}
        </button>
        <button className="hover:text-orange-500 transition-colors">
          💬 {comments}
        </button>
      </div>
    </div>
  );
}

function TrainerCard({ name, specialty, rating, students, price }: any) {
  return (
    <Card className="bg-slate-950 border-slate-800 p-4 hover:border-orange-500 transition-all cursor-pointer">
      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto">
        👨‍🏫
      </div>
      <h4 className="text-white font-bold text-center mb-1">{name}</h4>
      <p className="text-sm text-slate-400 text-center mb-3">{specialty}</p>
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-yellow-500">⭐</span>
        <span className="text-white font-bold">{rating}</span>
        <span className="text-slate-400 text-sm">({students} alunos)</span>
      </div>
      <p className="text-center text-orange-500 font-bold mb-3">{price}</p>
      <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
        Contratar
      </Button>
    </Card>
  );
}

function MeasurementCard({ label, value, change }: any) {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-slate-950 p-4 rounded-lg">
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className="text-xl font-bold text-white mb-1">{value}</p>
      <p className={`text-sm ${isPositive ? 'text-emerald-400' : 'text-orange-400'}`}>
        {change} cm
      </p>
    </div>
  );
}

// Mock Data
const exercises = [
  { 
    name: "Supino Reto", 
    muscle: "Peito", 
    difficulty: "Intermediário", 
    equipment: "Barra",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    sets: "3-4",
    reps: "8-12",
    rest: "60-90s",
    steps: [
      "Deite-se no banco com os pés apoiados no chão e as costas totalmente encostadas",
      "Segure a barra com as mãos um pouco mais afastadas que a largura dos ombros",
      "Desça a barra controladamente até tocar o peito, mantendo os cotovelos em ângulo de 45 graus",
      "Empurre a barra para cima até estender completamente os braços, contraindo o peitoral",
      "Mantenha a respiração controlada: inspire na descida, expire na subida"
    ],
    tips: [
      "Mantenha os ombros retraídos e o peito estufado durante todo o movimento",
      "Não deixe a barra quicar no peito - controle o movimento",
      "Evite arquear excessivamente as costas",
      "Use um peso que permita executar o movimento com técnica perfeita"
    ]
  },
  { 
    name: "Agachamento Livre", 
    muscle: "Pernas", 
    difficulty: "Avançado", 
    equipment: "Barra",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop",
    sets: "4-5",
    reps: "6-10",
    rest: "2-3min",
    steps: [
      "Posicione a barra nas costas, apoiada no trapézio superior",
      "Pés na largura dos ombros, pontas levemente voltadas para fora",
      "Desça controladamente, flexionando quadril e joelhos simultaneamente",
      "Desça até as coxas ficarem paralelas ao chão (ou mais se tiver mobilidade)",
      "Empurre o chão com força, mantendo o core contraído durante a subida"
    ],
    tips: [
      "Mantenha o core sempre contraído para proteger a coluna",
      "Joelhos devem seguir a direção dos pés, sem ultrapassar muito a ponta",
      "Olhe para frente, não para baixo",
      "Comece com peso leve até dominar a técnica"
    ]
  },
  { 
    name: "Rosca Direta", 
    muscle: "Bíceps", 
    difficulty: "Iniciante", 
    equipment: "Halter",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop",
    sets: "3",
    reps: "10-15",
    rest: "45-60s",
    steps: [
      "Fique em pé com os pés na largura dos ombros",
      "Segure os halteres com as palmas voltadas para frente",
      "Mantenha os cotovelos fixos ao lado do corpo",
      "Flexione os cotovelos, levando os halteres em direção aos ombros",
      "Desça controladamente até estender completamente os braços"
    ],
    tips: [
      "Não balance o corpo - use apenas a força dos bíceps",
      "Mantenha os cotovelos fixos, sem movê-los para frente ou para trás",
      "Controle a descida - não deixe os halteres caírem",
      "Aperte o bíceps no topo do movimento"
    ]
  },
  { 
    name: "Desenvolvimento", 
    muscle: "Ombros", 
    difficulty: "Intermediário", 
    equipment: "Halter",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop",
    sets: "3-4",
    reps: "8-12",
    rest: "60-90s",
    steps: [
      "Sente-se com as costas apoiadas e os pés firmes no chão",
      "Segure os halteres na altura dos ombros, palmas para frente",
      "Empurre os halteres para cima até estender os braços",
      "Desça controladamente até os halteres voltarem à altura dos ombros",
      "Mantenha o core contraído durante todo o movimento"
    ],
    tips: [
      "Não arquear as costas ao empurrar o peso",
      "Mantenha os pulsos alinhados com os antebraços",
      "Não tranque completamente os cotovelos no topo",
      "Controle o movimento na descida"
    ]
  },
  { 
    name: "Levantamento Terra", 
    muscle: "Costas", 
    difficulty: "Avançado", 
    equipment: "Barra",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    sets: "3-4",
    reps: "5-8",
    rest: "2-3min",
    steps: [
      "Posicione-se com os pés sob a barra, na largura dos quadris",
      "Agache e segure a barra com as mãos na largura dos ombros",
      "Mantenha as costas retas, peito para cima e ombros para trás",
      "Levante a barra estendendo quadril e joelhos simultaneamente",
      "Desça a barra controladamente, mantendo-a próxima ao corpo"
    ],
    tips: [
      "NUNCA arredonde as costas - risco de lesão grave",
      "A barra deve subir em linha reta, próxima às pernas",
      "Use cinto de musculação para cargas pesadas",
      "Domine a técnica antes de aumentar o peso"
    ]
  },
  { 
    name: "Abdominal Crunch", 
    muscle: "Abdômen", 
    difficulty: "Iniciante", 
    equipment: "Peso Corporal",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    sets: "3-4",
    reps: "15-20",
    rest: "30-45s",
    steps: [
      "Deite-se de costas com os joelhos flexionados e pés apoiados",
      "Coloque as mãos atrás da cabeça ou cruzadas no peito",
      "Contraia o abdômen e levante os ombros do chão",
      "Mantenha a contração por 1 segundo no topo",
      "Desça controladamente sem relaxar completamente o abdômen"
    ],
    tips: [
      "Não puxe o pescoço com as mãos",
      "O movimento vem do abdômen, não do pescoço",
      "Mantenha a lombar sempre apoiada no chão",
      "Expire ao subir, inspire ao descer"
    ]
  },
];

const foodDatabase = [
  { name: "Arroz branco (100g)", calories: 130, portion: "1 xícara" },
  { name: "Frango grelhado (100g)", calories: 165, portion: "1 filé" },
  { name: "Batata doce (100g)", calories: 86, portion: "1 média" },
  { name: "Ovo cozido", calories: 78, portion: "1 unidade" },
  { name: "Banana", calories: 89, portion: "1 média" },
  { name: "Aveia (100g)", calories: 389, portion: "1 xícara" },
];
