"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Twitter } from "lucide-react";

export default function RecentReviews() {
  const reviews = [
    {
      id: 1,
      before: "/placeholder.svg?height=400&width=600",
      after: "/placeholder.svg?height=400&width=600",
      tweetUrl: "https://twitter.com/example/status/1",
      date: "2024-01-20",
      angle: -5,
    },
    {
      id: 2,
      before: "/placeholder.svg?height=400&width=600",
      after: "/placeholder.svg?height=400&width=600",
      tweetUrl: "https://twitter.com/example/status/2",
      date: "2024-01-19",
      angle: 5,
    },
  ];

  return (
    <div className="grid gap-20">
      {reviews.map((review) => (
        <motion.div
          key={review.id}
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ rotate: `${review.angle}deg` }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="bg-white p-8 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <p className="text-sm text-gray-600">{review.date}</p>
              <a
                href={review.tweetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:opacity-70 transition-opacity"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">View on X (Twitter)</span>
              </a>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-medium mb-4">Before</p>
                <Image
                  src={review.before}
                  alt="Original design"
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-4">After</p>
                <Image
                  src={review.after}
                  alt="Redesign suggestion"
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
