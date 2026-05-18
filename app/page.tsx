"use client"

import { useState } from "react"
import InputPage from "@/components/InputPage"
import ResultPage from "@/components/ResultPage"
import type { AnalysisRequest, AnalysisResult } from "@/lib/types"

type PageState = "input" | "result"

export default function Home() {
  const [page, setPage] = useState<PageState>("input")
  const [isLoading, setIsLoading] = useState(false)
  const [analysisRequest, setAnalysisRequest] = useState<AnalysisRequest | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (req: AnalysisRequest) => {
    setIsLoading(true)
    setError(null)
    setAnalysisRequest(req)

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      })

      if (!res.ok) {
        throw new Error("분석 API 오류")
      }

      const data: AnalysisResult = await res.json()
      setAnalysisResult(data)
      setPage("result")
    } catch (err) {
      setError("분석 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    setPage("input")
    setAnalysisResult(null)
  }

  return (
    <>
      {page === "input" && (
        <InputPage onAnalyze={handleAnalyze} isLoading={isLoading} />
      )}

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-ow-panel border border-ow-blue rounded-lg px-10 py-8 flex flex-col items-center gap-4 shadow-2xl">
            <div className="w-10 h-10 border-4 border-ow-blue border-t-transparent rounded-full animate-spin" />
            <div className="text-ow-text font-semibold text-sm">AI가 분석 중입니다...</div>
            <div className="text-ow-muted text-xs">팀 구성과 상성을 분석하고 있어요</div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-red-900 border border-red-500 text-red-200 rounded px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {page === "result" && analysisRequest && analysisResult && (
        <ResultPage
          request={analysisRequest}
          result={analysisResult}
          onBack={handleBack}
        />
      )}
    </>
  )
}
