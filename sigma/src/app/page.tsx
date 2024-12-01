"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle, Heart, Brain } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { makeCohereChatRequest } from "./api/api";
import Image from "next/image";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const BrainrotLinkedIn = () => {
  const [post, setPost] = useState("");
  const [postLength, setPostLength] = useState(50);
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [formalityLevel, setFormalityLevel] = useState(50);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const generatePost = async () => {
    setLoading(true);
    setShowConfetti(false);

    const randomWords = ["Skibidi", "Sigma", "Rizz", "Gyatt", "Based"];
    const randomWord =
      randomWords[Math.floor(Math.random() * randomWords.length)];

    const prompt = `
      Generate a LinkedIn post based on the following description: ${description}. 
      Include emojis: ${includeEmojis}. 
      Formality level: ${formalityLevel}. 
      Keep the post around ${postLength} words long. Ensure the post is as close to ${postLength} words as possible.
      Add a random word: ${randomWord}.
    `;

    try {
      const response = await makeCohereChatRequest(prompt);

      setPost(response);
      setShowConfetti(true);
    } catch (error) {
      console.error("Error generating post:", error);
    } finally {
      setLoading(false);
    }
  };

  const shareOnLinkedIn = () => {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?text=${encodeURIComponent(
      post
    )}`;
    window.open(linkedInShareUrl, "_blank");
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    background: {
      color: {
        value: "#ffffff",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#000000",
      },
      links: {
        color: "#000000",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="relative max-w-2xl mx-auto p-4 space-y-4 overflow-x-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="tenor-gif-embed"
          data-postid="5247155368222868243"
          data-share-method="host"
          data-aspect-ratio="1"
          data-width="100%"
        >
          <a href="https://tenor.com/view/funny-gif-5247155368222868243">
            Funny GIF
          </a>
          from <a href="https://tenor.com/search/funny-gifs">Funny GIFs</a>
        </div>
        <script type="text/javascript" async src="https://tenor.com/embed.js" />
      </div>
      {showConfetti && (
        <div className="fixed inset-0 z-10 pointer-events-none">
          <Confetti width={width} height={height} />
        </div>
      )}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />
      <Card className="bg-white relative z-20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={24} height={24} />
            Brainrot LinkedIn AI Post Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label>Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter the description of your post"
                className="my-2"
              />
            </div>

            <div>
              <Label>Post Length (words)</Label>
              <Slider
                value={[postLength]}
                onValueChange={(value) => setPostLength(value[0])}
                min={10}
                max={500}
                step={10}
                className="my-2"
              />
              <div className="text-sm text-gray-500">{postLength} words</div>
            </div>

            <div>
              <Label>Formality Level</Label>
              <Slider
                value={[formalityLevel]}
                onValueChange={(value) => setFormalityLevel(value[0])}
                min={0}
                max={100}
                step={25}
                className="my-2"
              />
              <div className="text-sm text-gray-500">
                {formalityLevel <= 25
                  ? "Maximum Brainrot"
                  : formalityLevel <= 50
                  ? "Casual Vibes"
                  : formalityLevel <= 75
                  ? "Semi-Professional"
                  : "LinkedIn Professional"}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={includeEmojis}
                onCheckedChange={setIncludeEmojis}
                id="emoji-mode"
              />
              <Label htmlFor="emoji-mode">Include Emojis</Label>
            </div>

            <Button
              onClick={generatePost}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Absolutely Unhinged Post"}
            </Button>
          </div>

          {loading && (
            <div className="flex justify-center items-center">
              <div className="loader">Loading...</div>
            </div>
          )}

          {post && !loading && (
            <div className="space-y-4">
              <Card className="p-4 bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-12 h-12 bg-gray-300 rounded-full" />
                  <div>
                    <div className="font-bold">
                      {formalityLevel > 75
                        ? "Strategic Innovation Leader"
                        : formalityLevel > 50
                        ? "Digital Transformation Specialist"
                        : formalityLevel > 25
                        ? "Chief Rizz Officer"
                        : "Professional Skibidi Consultant"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formalityLevel > 50
                        ? "Web3 Innovation Strategist | Thought Leader"
                        : "Professional Gyatt Consultant | Sigma Grindset Coach"}
                    </div>
                  </div>
                </div>
                <div className="whitespace-pre-wrap">{post}</div>
                <div className="flex gap-4 mt-4 text-gray-600">
                  <button className="flex items-center gap-1" type="button">
                    <ThumbsUp className="w-4 h-4" />
                    {formalityLevel > 50 ? "Like" : "Be Based"}
                  </button>
                  <button className="flex items-center gap-1" type="button">
                    <MessageCircle className="w-4 h-4" />
                    {formalityLevel > 50 ? "Comment" : "Drop W"}
                  </button>
                  <button className="flex items-center gap-1" type="button">
                    <Heart className="w-4 h-4" />
                    {formalityLevel > 50 ? "Share" : "Show Rizz"}
                  </button>
                </div>
              </Card>
              <Button
                onClick={shareOnLinkedIn}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
              >
                Share on LinkedIn
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BrainrotLinkedIn;
