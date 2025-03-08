"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Layout, Palette, Zap, Globe, Database, Lock, Star } from "lucide-react"

const categories = [
  {
    id: "ui",
    name: "UI Components",
    icon: <Layout className="h-5 w-5" />,
    description: "Beautiful and customizable UI components for your Flutter apps",
    packages: [
      {
        id: 1,
        name: "flutter_staggered_grid_view",
        description: "A staggered grid view which supports multiple columns with rows of varying sizes",
      },
      {
        id: 2,
        name: "flutter_slidable",
        description: "A Flutter implementation of slidable list item with directional slide actions",
      },
      {
        id: 3,
        name: "carousel_slider",
        description: "A carousel slider widget, support infinite scroll and custom child widget",
      },
      { id: 4, name: "flutter_spinkit", description: "A collection of loading indicators animated with flutter" },
      { id: 5, name: "flutter_svg", description: "SVG rendering and widget library for Flutter" },
      {
        id: 6,
        name: "shimmer",
        description: "A package provides an easy way to add shimmer effect in Flutter project",
      },
      {
        id: 7,
        name: "flutter_rating_bar",
        description: "A star rating bar for Flutter which allows you to rate with precision",
      },
      {
        id: 8,
        name: "flutter_sticky_header",
        description: "A Flutter implementation of sticky headers with a sliver as a child",
      },
    ],
  },
  {
    id: "animation",
    name: "Animation",
    icon: <Zap className="h-5 w-5" />,
    description: "Add smooth and beautiful animations to enhance user experience",
    packages: [
      { id: 1, name: "lottie", description: "Render After Effects animations natively on Flutter" },
      {
        id: 2,
        name: "animated_text_kit",
        description: "A flutter package which contains a collection of cool text animations",
      },
      {
        id: 3,
        name: "flutter_animate",
        description: "A powerful animation package that makes animations simple and concise",
      },
      {
        id: 4,
        name: "rive",
        description:
          "Runtime animation library that allows designers to create animations in Rive and use them in Flutter",
      },
      { id: 5, name: "simple_animations", description: "Create beautiful custom animations in Flutter with ease" },
      { id: 6, name: "flutter_sequence_animation", description: "Composite together animations in Flutter" },
      { id: 7, name: "spring", description: "Create spring animations in Flutter" },
      {
        id: 8,
        name: "flutter_staggered_animations",
        description: "Easily add staggered animations to your ListView, GridView, Column and Row",
      },
    ],
  },
  {
    id: "styling",
    name: "Styling & Themes",
    icon: <Palette className="h-5 w-5" />,
    description: "Customize the look and feel of your app with these styling packages",
    packages: [
      {
        id: 1,
        name: "google_fonts",
        description: "A package to include fonts from fonts.google.com in your Flutter app",
      },
      { id: 2, name: "flutter_screenutil", description: "A flutter plugin for adapting screen and font size" },
      {
        id: 3,
        name: "flex_color_scheme",
        description: "A Flutter package to create beautiful color schemes with ease",
      },
      { id: 4, name: "glassmorphism", description: "A package to create glassmorphism effect in Flutter" },
    ],
  },
  {
    id: "networking",
    name: "Networking",
    icon: <Globe className="h-5 w-5" />,
    description: "Connect your app to the world with these networking packages",
    packages: [
      {
        id: 1,
        name: "dio",
        description:
          "A powerful HTTP client for Dart/Flutter, supports Interceptors, FormData, Request Cancellation, File Downloading, Timeout etc.",
      },
      { id: 2, name: "http", description: "A composable, multi-platform, Future-based API for HTTP requests" },
      {
        id: 3,
        name: "graphql_flutter",
        description: "A GraphQL client for Flutter, bringing all the features from a modern GraphQL client to Flutter",
      },
      { id: 4, name: "retrofit", description: "A type-safe HTTP client for Dart and Flutter" },
    ],
  },
  {
    id: "storage",
    name: "Storage",
    icon: <Database className="h-5 w-5" />,
    description: "Persist data locally with these storage solutions",
    packages: [
      { id: 1, name: "hive", description: "Lightweight and blazing fast key-value database written in pure Dart" },
      {
        id: 2,
        name: "shared_preferences",
        description: "Flutter plugin for reading and writing simple key-value pairs",
      },
      {
        id: 3,
        name: "sqflite",
        description: "SQLite plugin for Flutter, a self-contained, high-reliability SQL database engine",
      },
      { id: 4, name: "isar", description: "Super fast cross-platform database for Flutter apps" },
    ],
  },
  {
    id: "auth",
    name: "Authentication",
    icon: <Lock className="h-5 w-5" />,
    description: "Secure your app with these authentication packages",
    packages: [
      {
        id: 1,
        name: "firebase_auth",
        description:
          "Flutter plugin for Firebase Auth, enabling authentication using passwords, phone numbers and more",
      },
      {
        id: 2,
        name: "google_sign_in",
        description: "Flutter plugin for Google Sign-In, enabling Google sign-in in Flutter apps",
      },
      { id: 3, name: "flutter_facebook_auth", description: "A Flutter plugin to use Facebook Sign In" },
      {
        id: 4,
        name: "local_auth",
        description: "Flutter plugin for local authentication methods like fingerprint, face, etc.",
      },
    ],
  },
]

export function CategorySection() {
  const [activeTab, setActiveTab] = useState("ui")

  return (
    <section id="categories" className="py-20 bg-gray-900">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find the perfect packages for your specific development needs
          </p>
        </motion.div>

        <Tabs defaultValue="ui" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-800 p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  <div className="flex items-center">
                    {category.icon}
                    <span className="ml-2 hidden md:inline">{category.name}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-400">{category.description}</p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {category.packages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className="bg-gray-800 border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer group overflow-hidden relative"
                      onClick={() => window.open(`https://pub.dev/packages/${pkg.name.toLowerCase()}`, "_blank")}
                    >
                      {/* Animated background elements that appear on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute rounded-full bg-blue-500/10"
                            style={{
                              width: `${Math.random() * 50 + 20}px`,
                              height: `${Math.random() * 50 + 20}px`,
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${i * 0.1}s`,
                              animation: "float 3s ease-in-out infinite alternate",
                            }}
                          />
                        ))}
                      </div>

                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-mono text-white truncate group-hover:text-blue-300 transition-colors">
                            {pkg.name}
                          </CardTitle>
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {[...Array(Math.floor(Math.random() * 2) + 3)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="h-16 overflow-hidden relative">
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                            {pkg.description}
                          </p>
                          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-800 to-transparent group-hover:opacity-0 transition-opacity"></div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className="bg-gray-700 text-blue-300 border-blue-800 group-hover:bg-blue-900/30 transition-colors"
                          >
                            {category.name}
                          </Badge>
                          <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            {Math.floor(Math.random() * 900) + 100}K
                          </span>
                        </div>
                      </CardContent>

                      {/* Animated arrow that appears on hover */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <ArrowRight className="h-4 w-4 text-blue-400" />
                      </div>
                    </Card>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center mt-10">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() =>
                    window.open(`https://pub.dev/flutter/packages?q=${category.name.toLowerCase()}`, "_blank")
                  }
                >
                  View all {category.name} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

