import type { Hero, GameMap } from "./mock-data"

export interface TeamComposition {
  tank: Hero | null
  dps1: Hero | null
  dps2: Hero | null
  support1: Hero | null
  support2: Hero | null
}

export interface AnalysisRequest {
  myHero: Hero
  myTeam: TeamComposition
  enemyTeam: TeamComposition
  map: GameMap | null
}

export interface AnalysisResult {
  heroRecommendation: string
  perkRecommendations: {
    minor1: string
    minor2: string
    major1: string
    major2: string
  }
  counterAnalysis: string
  synergyAnalysis: string
  overallTip: string
}
