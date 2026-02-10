import React from 'react'
import Marquee from "react-fast-marquee";

export const QuoteMarquee = () => {
  const quotes = [
    "“Suck Tuah? More like suck you-ah” - Zain",
    "“I'm not washed, I'm just clean.” - Mang0",
    "“I don't lose to people who don't believe in themselves.” - Mang0",
    "“Everyone has a plan until they get rested.” - Hungrybox",
    "“If you're scared, you already lost.” - Mang0",
    "“Melee is sick because it lets bad ideas work if you believe in them enough.” - Plup",
    "“I am not playing bad. You are playing lucky.” - Leffen",
    "“People don't beat me. I let them win.” - Mew2King",
    "“You can't camp confidence.” - Zain",
    "“Technical skill doesn't matter if you're mentally broken.” - Armada",
    "“I'm just better. It's really that simple.” - iBDW",
    "“Melee rewards confidence more than respect.” - Plup",
    "“If I lose, it's because I didn't feel like winning.” - Mang0",
    "“I don't play to not lose. I play to win.” - Hungrybox",
  ];

  return (
    <Marquee className={`bg-darkest text-white text-center text-3xl`}>
      {quotes.map((quote) => (
        <span className='px-4'>{quote}</span>
      ))}
    </Marquee>
  )
}
