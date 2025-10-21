"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"

export function NFTMintForm() {
  const isConnected = false
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
    }
  }

  const handleMint = async () => {
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      // Simulate IPFS upload and minting
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert("NFT minted successfully!")
      setFormData({ title: "", description: "", image: null })
    } catch (error) {
      console.error("Minting failed:", error)
      alert("Minting failed")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground mb-4">Connect your wallet to mint NFTs</p>
        <p className="text-sm text-muted-foreground mt-2">Web3 functionality will be available in production</p>
      </Card>
    )
  }

  return (
    <Card className="p-6 space-y-6">
      {/* Image Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">NFT Image</label>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-input" />
          <label htmlFor="image-input" className="cursor-pointer">
            {formData.image ? (
              <div>
                <p className="font-medium text-foreground">{formData.image.name}</p>
                <p className="text-sm text-muted-foreground">Click to change</p>
              </div>
            ) : (
              <div>
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="font-medium text-foreground">Upload image</p>
                <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Title</label>
        <Input name="title" placeholder="Enter NFT title" value={formData.title} onChange={handleInputChange} />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Description</label>
        <textarea
          name="description"
          placeholder="Describe your NFT"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          rows={4}
        />
      </div>

      {/* Mint Button */}
      <Button onClick={handleMint} disabled={isLoading} className="w-full" size="lg">
        {isLoading ? "Minting..." : "Mint NFT"}
      </Button>
    </Card>
  )
}
