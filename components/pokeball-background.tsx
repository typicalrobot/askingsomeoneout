"use client"

import { useEffect, useState } from "react"

type Pokeball = {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export function PokeballBackground() {
  const [pokeballs, setPokeballs] = useState<Pokeball[]>([])

  useEffect(() => {
    // Generate random pokeballs
    const balls: Pokeball[] = []
    const count = 20 // Keep it minimal with just 20 pokeballs

    for (let i = 0; i < count; i++) {
      balls.push({
        id: i,
        x: Math.random() * 100, // Random x position (0-100%)
        y: Math.random() * 100, // Random y position (0-100%)
        size: Math.random() * 15 + 10, // Random size between 10-25px
        delay: Math.random() * 2, // Random delay for animation
        duration: Math.random() * 2 + 2, // Random duration between 2-4s
      })
    }

    setPokeballs(balls)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pokeballs.map((ball) => (
        <div
          key={ball.id}
          className="absolute"
          style={{
            left: `${ball.x}%`,
            top: `${ball.y}%`,
            animation: `float ${ball.duration}s ease-in-out infinite`,
            animationDelay: `${ball.delay}s`,
          }}
        >
          <Pokeball size={ball.size} />
        </div>
      ))}

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  )
}

function Pokeball({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-30"
    >
      <circle cx="50" cy="50" r="50" fill="white" />
      <path d="M50 0C22.4 0 0 22.4 0 50h100C100 22.4 77.6 0 50 0z" fill="#FF1111" />
      <rect x="0" y="48" width="100" height="4" fill="black" />
      <circle cx="50" cy="50" r="15" fill="white" stroke="black" strokeWidth="4" />
      <circle cx="50" cy="50" r="7" fill="white" />
    </svg>
  )
}
