// ============================================================
// 오버워치 목데이터 - 실제 데이터로 교체 필요
// ============================================================

export type Role = "탱커" | "딜러" | "서포터"

export interface Hero {
  id: string
  name: string
  role: Role
  // TODO: 실제 초상화 이미지 경로로 교체 (예: /images/heroes/tracer.png)
  portrait: string | null
}

export interface Perk {
  id: string
  name: string
  description: string
  type: "minor" | "major"
  // TODO: 실제 특전 아이콘 이미지 경로로 교체
  icon: string | null
}

export interface GameMap {
  id: string
  name: string
  type: "점령" | "호위" | "하이브리드" | "밀기" | "격투"
}

// ============================================================
// TODO: 아래 영웅 목록을 실제 오버워치 영웅 데이터로 채워주세요
// ============================================================
export const HEROES: Hero[] = [
  // 탱커
  { id: "reinhardt", name: "라인하르트", role: "탱커", portrait: null },
  { id: "dva", name: "D.Va", role: "탱커", portrait: null },
  { id: "winston", name: "윈스턴", role: "탱커", portrait: null },
  { id: "orisa", name: "오리사", role: "탱커", portrait: null },
  { id: "roadhog", name: "로드호그", role: "탱커", portrait: null },
  { id: "sigma", name: "시그마", role: "탱커", portrait: null },
  { id: "zarya", name: "자리야", role: "탱커", portrait: null },
  { id: "junkerqueen", name: "정커퀸", role: "탱커", portrait: null },
  { id: "ramattra", name: "라마트라", role: "탱커", portrait: null },
  { id: "mauga", name: "마우가", role: "탱커", portrait: null },

  // 딜러
  { id: "tracer", name: "트레이서", role: "딜러", portrait: null },
  { id: "reaper", name: "리퍼", role: "딜러", portrait: null },
  { id: "soldier76", name: "솔저: 76", role: "딜러", portrait: null },
  { id: "genji", name: "겐지", role: "딜러", portrait: null },
  { id: "hanzo", name: "한조", role: "딜러", portrait: null },
  { id: "pharah", name: "파라", role: "딜러", portrait: null },
  { id: "widowmaker", name: "위도우메이커", role: "딜러", portrait: null },
  { id: "junkrat", name: "정크랫", role: "딜러", portrait: null },
  { id: "symmetra", name: "시메트라", role: "딜러", portrait: null },
  { id: "torbjorn", name: "토르비욘", role: "딜러", portrait: null },
  { id: "mccree", name: "캐서디", role: "딜러", portrait: null },
  { id: "ashe", name: "애쉬", role: "딜러", portrait: null },
  { id: "sombra", name: "솜브라", role: "딜러", portrait: null },
  { id: "echo", name: "에코", role: "딜러", portrait: null },
  { id: "bastion", name: "바스티온", role: "딜러", portrait: null },
  { id: "mei", name: "메이", role: "딜러", portrait: null },

  // 서포터
  { id: "mercy", name: "메르시", role: "서포터", portrait: null },
  { id: "lucio", name: "루시우", role: "서포터", portrait: null },
  { id: "ana", name: "아나", role: "서포터", portrait: null },
  { id: "zenyatta", name: "젠야타", role: "서포터", portrait: null },
  { id: "moira", name: "모이라", role: "서포터", portrait: null },
  { id: "brigitte", name: "브리기테", role: "서포터", portrait: null },
  { id: "baptiste", name: "바티스트", role: "서포터", portrait: null },
  { id: "kiriko", name: "키리코", role: "서포터", portrait: null },
  { id: "lifeweaver", name: "라이프위버", role: "서포터", portrait: null },
  { id: "illari", name: "일라리", role: "서포터", portrait: null },
]

// ============================================================
// TODO: 아래 맵 목록을 실제 오버워치 맵 데이터로 채워주세요
// ============================================================
export const MAPS: GameMap[] = [
  { id: "kings_row", name: "킹스 로우", type: "하이브리드" },
  { id: "numbani", name: "눔바니", type: "하이브리드" },
  { id: "hollywood", name: "할리우드", type: "하이브리드" },
  { id: "hanamura", name: "하나무라", type: "점령" },
  { id: "temple_anubis", name: "아누비스 신전", type: "점령" },
  { id: "volskaya", name: "볼스카야 인더스트리", type: "점령" },
  { id: "dorado", name: "도라도", type: "호위" },
  { id: "watchpoint", name: "감시기지: 지브롤터", type: "호위" },
  { id: "circuit_royal", name: "서킷 로얄", type: "호위" },
  { id: "ilios", name: "일리오스", type: "격투" },
  { id: "lijiang", name: "리장 타워", type: "격투" },
  { id: "nepal", name: "네팔", type: "격투" },
  { id: "busan", name: "부산", type: "격투" },
  { id: "new_queen_street", name: "뉴 퀸 스트리트", type: "밀기" },
  { id: "esperanca", name: "에스페란사", type: "밀기" },
]

// ============================================================
// TODO: 영웅별 특전 데이터를 실제 오버워치 특전 데이터로 채워주세요
// 형식: { [heroId]: Perk[] }
// ============================================================
export const PERKS_BY_HERO: Record<string, Perk[]> = {
  // 예시 구조 (실제 데이터로 교체 필요)
  reinhardt: [
    {
      id: "reinhardt_perk_1",
      name: "TODO: 특전 이름 1",
      description: "TODO: 특전 설명",
      type: "minor",
      icon: null,
    },
    {
      id: "reinhardt_perk_2",
      name: "TODO: 특전 이름 2",
      description: "TODO: 특전 설명",
      type: "minor",
      icon: null,
    },
    {
      id: "reinhardt_perk_3",
      name: "TODO: 특전 이름 3",
      description: "TODO: 특전 설명",
      type: "major",
      icon: null,
    },
    {
      id: "reinhardt_perk_4",
      name: "TODO: 특전 이름 4",
      description: "TODO: 특전 설명",
      type: "major",
      icon: null,
    },
  ],
}

export const ROLE_LABELS: Record<Role, string> = {
  탱커: "탱",
  딜러: "딜",
  서포터: "힐",
}

export const ROLES: Role[] = ["탱커", "딜러", "서포터"]

// 팀 구성 슬롯 정의 (우리팀 / 상대팀 동일 구조)
export const TEAM_SLOTS: { role: Role; label: string }[] = [
  { role: "탱커", label: "탱커" },
  { role: "딜러", label: "딜러 1" },
  { role: "딜러", label: "딜러 2" },
  { role: "서포터", label: "서포터 1" },
  { role: "서포터", label: "서포터 2" },
]
