"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, X, RefreshCw } from "lucide-react"
import Confetti from "react-confetti"
import { useWindowSize } from "@/hooks/use-window-size"
import { PokeballBackground } from "@/components/pokeball-background"

export default function PokemonDateProposal() {
  const [stage, setStage] = useState(0)
  const [noCount, setNoCount] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()

  const NO_RESPONSES = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ]

  const getNoButtonText = () => {
    return NO_RESPONSES[Math.min(noCount, NO_RESPONSES.length - 1)]
  }

  const handleNoClick = () => {
    setNoCount(noCount + 1)
  }

  const handleYesClick = () => {
    setShowConfetti(true)
    setStage(3)
    setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
  }

  const handleReset = () => {
    setStage(0)
    setNoCount(0)
  }

  const allNoOptionsUsed = noCount >= NO_RESPONSES.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-red-600 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <PokeballBackground />

      {showConfetti && <Confetti width={width} height={height} recycle={false} />}

      {stage === 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center w-full max-w-2xl relative z-10"
        >
          <Card className="mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <CardContent className="p-8">
              <h1 className="pokemon-font-title text-2xl font-bold text-center mb-6 text-yellow-400">I Choose You!</h1>
              <p className="text-gray-700 mb-8 text-center text-lg">
                Hey there! Like a trainer searching for rare Pokémon, I've been looking for someone special...
              </p>
              <Button onClick={() => setStage(1)} className="w-full bg-blue-500 hover:bg-blue-600 text-lg py-6">
                <span className="pokemon-font text-sm">Continue</span>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {stage === 1 && (
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
          className="text-center w-full max-w-2xl relative z-10"
        >
          <Card className="mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <CardContent className="p-8">
              <h1 className="pokemon-font-title text-2xl font-bold text-center mb-6 text-yellow-400">
                Will you join me on an adventure?
              </h1>
              <p className="text-gray-700 mb-8 text-center text-lg">
                In the world of Pokémon, trainers go on amazing journeys together. Would you like to go on a date with
                me?
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full sm:w-auto ${allNoOptionsUsed ? "sm:w-2/3" : ""}`}
                >
                  <Button
                    onClick={handleYesClick}
                    className={`bg-green-500 hover:bg-green-600 px-8 w-full sm:w-auto text-lg py-6 ${
                      allNoOptionsUsed ? "text-xl py-8" : ""
                    }`}
                    size="lg"
                  >
                    {allNoOptionsUsed ? (
                      <span className="pokemon-font text-sm">Please :(</span>
                    ) : (
                      <>
                        <Heart className="mr-2 h-5 w-5" /> <span className="pokemon-font text-sm">Yes!</span>
                      </>
                    )}
                  </Button>
                </motion.div>

                {noCount < NO_RESPONSES.length && (
                  <div className="w-full sm:w-auto">
                    <Button
                      onClick={handleNoClick}
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50 px-8 w-full sm:w-auto text-lg py-6"
                      size="lg"
                    >
                      <X className="mr-2 h-5 w-5" /> <span className="pokemon-font text-sm">{getNoButtonText()}</span>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {stage === 3 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full max-w-2xl relative z-10"
        >
          <Card className="mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <CardContent className="p-8">
              <h1 className="pokemon-font-title text-2xl font-bold text-center mb-6 text-yellow-400">It's a date!</h1>
              <p className="text-gray-700 mb-6 text-center text-lg">
                Like a Master Ball, you've captured my heart! Text me for the location! 💕
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-50 flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" /> <span className="pokemon-font text-xs">Start Over</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
