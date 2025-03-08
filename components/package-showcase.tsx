"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Code, Copy, Check } from "lucide-react"

const showcasePackages = [
  {
    id: "flutter_bloc",
    name: "flutter_bloc",
    description: "Flutter Widgets that make it easy to implement the BLoC design pattern.",
    code: `
// Define Events
abstract class CounterEvent {}
class IncrementEvent extends CounterEvent {}
class DecrementEvent extends CounterEvent {}

// Define States
class CounterState {
  final int count;
  CounterState(this.count);
}

// Create Bloc
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterState(0)) {
    on<IncrementEvent>((event, emit) {
      emit(CounterState(state.count + 1));
    });
    on<DecrementEvent>((event, emit) {
      emit(CounterState(state.count - 1));
    });
  }
}

// Use in UI
BlocProvider(
  create: (context) => CounterBloc(),
  child: BlocBuilder<CounterBloc, CounterState>(
    builder: (context, state) {
      return Text('Count: \${state.count}');
    },
  ),
)`,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "get",
    name: "GetX",
    description: "A lightweight yet powerful state management, dependency injection, and route management solution.",
    code: `
// Define Controller
class CounterController extends GetxController {
  var count = 0.obs;
  
  void increment() => count++;
  void decrement() => count--;
}

// Use in UI
class CounterView extends StatelessWidget {
  final controller = Get.put(CounterController());
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Obx(() => Text('Count: \${controller.count}')),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: controller.increment,
        child: Icon(Icons.add),
      ),
    );
  }
}`,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "riverpod",
    name: "Riverpod",
    description: "A reactive caching and data-binding framework built for Flutter.",
    code: `
// Define Provider
final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});

class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);
  
  void increment() => state++;
  void decrement() => state--;
}

// Use in UI
class CounterView extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    
    return Scaffold(
      body: Center(
        child: Text('Count: \$count'),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => ref.read(counterProvider.notifier).increment(),
        child: Icon(Icons.add),
      ),
    );
  }
}`,
    image: "/placeholder.svg?height=300&width=500",
  },
]

// Simple Dart syntax highlighter
function highlightDartCode(code) {
  // Handle empty lines
  if (!code.trim()) return <span>&nbsp;</span>

  // Keywords in Dart
  const keywords = [
    "class",
    "extends",
    "implements",
    "abstract",
    "final",
    "const",
    "var",
    "void",
    "static",
    "new",
    "this",
    "super",
    "return",
    "if",
    "else",
    "for",
    "while",
    "switch",
    "case",
    "break",
    "continue",
    "default",
    "try",
    "catch",
    "finally",
    "throw",
    "on",
    "true",
    "false",
    "null",
    "async",
    "await",
    "yield",
    "get",
    "set",
    "late",
    "required",
  ]

  // Types in Dart
  const types = [
    "int",
    "double",
    "String",
    "bool",
    "List",
    "Map",
    "Set",
    "Future",
    "Stream",
    "dynamic",
    "Object",
    "Widget",
  ]

  // Split the code by special characters but keep the delimiters
  const tokens = code.split(/([{}()[\]<>:;,."'=+\-*/\\?!|&^%$#@~`]|\s+)/g).filter(Boolean)

  return tokens.map((token, index) => {
    // Comments
    if (token.startsWith("//")) {
      return (
        <span key={index} className="text-gray-500">
          {token}
        </span>
      )
    }

    // Strings
    if ((token.startsWith("'") && token.endsWith("'")) || (token.startsWith('"') && token.endsWith('"'))) {
      return (
        <span key={index} className="text-yellow-300">
          {token}
        </span>
      )
    }

    // Keywords
    if (keywords.includes(token)) {
      return (
        <span key={index} className="text-purple-400">
          {token}
        </span>
      )
    }

    // Types
    if (types.includes(token)) {
      return (
        <span key={index} className="text-blue-400">
          {token}
        </span>
      )
    }

    // Numbers
    if (!isNaN(token) || token === "true" || token === "false") {
      return (
        <span key={index} className="text-green-400">
          {token}
        </span>
      )
    }

    // Function calls (simplified detection)
    if (token.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) && index < tokens.length - 1 && tokens[index + 1] === "(") {
      return (
        <span key={index} className="text-yellow-200">
          {token}
        </span>
      )
    }

    // Class names (simplified detection - capitalized words)
    if (token.match(/^[A-Z][a-zA-Z0-9_]*$/)) {
      return (
        <span key={index} className="text-cyan-300">
          {token}
        </span>
      )
    }

    // Special characters
    if (token.match(/[{}()[\]<>:;,."'=+\-*/\\?!|&^%$#@~`]/)) {
      return (
        <span key={index} className="text-gray-400">
          {token}
        </span>
      )
    }

    // Default
    return <span key={index}>{token}</span>
  })
}

export function PackageShowcase() {
  const [activeTab, setActiveTab] = useState("flutter_bloc")
  const [copied, setCopied] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const copyCode = () => {
    const pkg = showcasePackages.find((p) => p.id === activeTab)
    if (pkg) {
      navigator.clipboard.writeText(pkg.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section ref={ref} className="py-20 bg-black">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">State Management Showcase</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore how different state management packages work in Flutter with these code examples.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-900 rounded-lg p-6 border border-gray-800"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-gray-800 mb-6">
                {showcasePackages.map((pkg) => (
                  <TabsTrigger
                    key={pkg.id}
                    value={pkg.id}
                    className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-300"
                  >
                    {pkg.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {showcasePackages.map((pkg) => (
                <TabsContent key={pkg.id} value={pkg.id} className="mt-0">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-gray-400">{pkg.description}</p>
                  </div>

                  <div className="relative">
                    <div className="absolute right-2 top-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyCode}
                        className="h-8 w-8 rounded-md bg-gray-800 hover:bg-gray-700"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="relative group">
                      <pre className="bg-gray-950 p-4 rounded-md overflow-x-auto text-sm font-mono text-gray-300 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/10 group-hover:border group-hover:border-blue-500/20">
                        <code className="dart-code">
                          {pkg.code.split("\n").map((line, i) => (
                            <div key={i} className="line hover:bg-gray-800/50 transition-colors px-2 -mx-2 rounded">
                              <span className="line-number text-gray-600 select-none mr-4">{i + 1}</span>
                              {highlightDartCode(line)}
                            </div>
                          ))}
                        </code>
                      </pre>

                      {/* Animated corner effect */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-blue-500/0 group-hover:border-r-blue-500/20 transition-all duration-300"></div>

                      {/* Animated line highlight indicator */}
                      <div className="absolute left-0 top-4 bottom-4 w-1 bg-blue-500/0 group-hover:bg-blue-500/30 transition-all duration-300 rounded-full"></div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-900 rounded-lg p-6 border border-gray-800"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Visual Preview</h3>
              <p className="text-gray-400">See how the state management solution works in a real app</p>
            </div>

            <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-video flex items-center justify-center">
              <Image
                src={showcasePackages.find((p) => p.id === activeTab)?.image || "/placeholder.svg?height=300&width=500"}
                alt="Package preview"
                width={500}
                height={300}
                className="rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() =>
                    window.open(
                      `https://pub.dev/packages/${showcasePackages.find((p) => p.id === activeTab)?.name.toLowerCase()}/example`,
                      "_blank",
                    )
                  }
                >
                  <Code className="mr-2 h-4 w-4" /> View Demo
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Key Features:</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  </div>
                  <span>Reactive state management</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  </div>
                  <span>Separation of UI and business logic</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  </div>
                  <span>Testable architecture</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  </div>
                  <span>Efficient dependency injection</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() =>
                  window.open(
                    `https://pub.dev/packages/${showcasePackages.find((p) => p.id === activeTab)?.name.toLowerCase()}`,
                    "_blank",
                  )
                }
              >
                Learn More About {showcasePackages.find((p) => p.id === activeTab)?.name}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      <style jsx global>{`
        .dart-code .line {
          display: block;
          position: relative;
          line-height: 1.6;
        }
        
        .dart-code .line:hover {
          transform: translateX(2px);
        }
        
        .dart-code .line-number {
          opacity: 0.5;
          display: inline-block;
          min-width: 1.5rem;
          user-select: none;
        }
        
        /* Animation for the code block */
        @keyframes codeGlow {
          0% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
          }
          100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
          }
        }
        
        .group:hover pre {
          animation: codeGlow 2s infinite;
        }
      `}</style>
    </section>
  )
}

